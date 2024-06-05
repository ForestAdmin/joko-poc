import {
  AggregateResult,
  Aggregation,
  BaseCollection,
  Caller,
  DataSource,
  Filter,
  PaginatedFilter,
  Projection,
  RecordData,
  SchemaUtils,
} from "@forestadmin/datasource-toolkit";
import { Model } from "dynamoose/dist/Model";
import ConditionBuilder from "./condition-builder";
import SchemaBuilder from "./schema-builder";
import { ModelType } from "dynamoose/dist/General";
import { AnyItem } from "dynamoose/dist/Item";
import Internal from 'dynamoose/dist/Internal';

export class DynamooseCollection extends BaseCollection {
  private model: Model<any>;

  constructor(dataSource: DataSource, model: ModelType<AnyItem>) {
    super(model.name, dataSource);

    this.model = model;
    const schema = model.Model.getInternalProperties(Internal.General.internalProperties).schemas[0]
    const fields = SchemaBuilder.convert(
      schema.getInternalProperties(Internal.General.internalProperties).schemaObject,
      schema.hashKey,
      schema.rangeKey,
    );
    this.addFields(fields);
  }

  async create(caller: Caller, data: RecordData[]): Promise<RecordData[]> {
    await this.model.batchPut(data);
    return data;
  }

  async list(
    caller: Caller,
    filter: PaginatedFilter,
    projection: Projection,
  ): Promise<RecordData[]> {
    // Convert filter
    const condition = ConditionBuilder.fromTree(filter.conditionTree);

    // Handle pagination
    const limit = filter.page?.limit ?? 1;
    const skip = filter.page?.skip ?? 0;

    // Make requests satisfy the pagination settings.
    let scanSize = skip + limit ;
    let records = [];

    for (const method of [this.model.query, this.model.scan]) {
      try {
        records = await method(condition)
          .attributes(projection)
          .exec();

        break;
      } catch (e) {
        // If the scan failed, rethrow the error
        if (method === this.model.scan) throw e;
      }
    }

    return records.slice(skip, scanSize);
  }

  async update(caller: Caller, filter: Filter, patch: RecordData): Promise<void> {
    const columns = new Projection(...Object.keys(this.schema.fields));
    const records = await this.list(caller, filter, columns);

    for (const record of records) Object.assign(record, patch);

    await this.model.batchPut(records);
  }

  async delete(caller: Caller, filter: Filter): Promise<void> {
    const columns = new Projection().withPks(this);
    const records = await this.list(caller, filter, columns);

    await this.model.batchDelete(records);
  }

  async aggregate(
    caller: Caller,
    filter: Filter,
    aggregation: Aggregation,
    limit?: number,
  ): Promise<AggregateResult[]> {
    // There is no aggregation in dynamodb, so we emulate everything (count is disabled).
    return aggregation.apply(
      await this.list(caller, filter, aggregation.projection),
      caller.timezone,
      limit,
    );
  }
}
