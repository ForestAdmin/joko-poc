import {
  BaseDataSource,
  DataSourceFactory,
  Logger,
} from '@forestadmin/datasource-toolkit';
import { DynamooseCollection } from './collection-dynamoose';
import { ModelType } from 'dynamoose/dist/General';
import { AnyItem } from 'dynamoose/dist/Item';

export class DynamooseDataSource extends BaseDataSource {
  constructor(models: ModelType<AnyItem>[], logger?: Logger) {
    super();

    for (const model of models) {
      this.addCollection(new DynamooseCollection(this, model));
    }
  }
}

export function createDynamooseDataSource(models: ModelType<AnyItem>[]): DataSourceFactory {
  return async (logger: Logger) => new DynamooseDataSource(models, logger);
}
