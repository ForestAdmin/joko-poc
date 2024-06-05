import { ColumnSchema, ColumnType } from "@forestadmin/datasource-toolkit";
import { Schema, SchemaDefinition } from "dynamoose/dist/Schema";

export default class SchemaBuilder {
  static convert(schema: SchemaDefinition, hashKey: string, rangeKey: string): Record<string, ColumnSchema> {
    const columns = {};
    for (const [key, value] of Object.entries(schema)) {
      columns[key] = this.convertColumn(value);
      columns[key].isPrimaryKey = hashKey === key || rangeKey === key;
    }

    return columns;
  }

  private static convertColumn(column: any): ColumnSchema {
    return {
      type: 'Column',
      columnType: this.convertColumnType(column),
      filterOperators: new Set([
        'Equal',
        'Present',
        'LessThan',
        'GreaterThan',
        'StartsWith',
        'Contains',
        'In',
        'NotEqual',
        'NotContains',
        'Blank',
      ]),
    };
  }

  private static convertColumnType(column: any): ColumnType {
    if (column === Number) return 'Number';
    if (column === Buffer || column === String) return 'String';
    if (column === Object) return 'Json';
    if (column === Date) return 'Date';
    if (column === Array) return ['Json'];
    if (column === Boolean) return 'Boolean';
    if (column.type === Array) return [this.convertColumnType(column.schema[0])];
    if (column.type === Object) {
      const compositeType = {};
      for (const [key, subColumn] of Object.entries(column.schema))
        compositeType[key] = this.convertColumnType(subColumn);

      return compositeType;
    }
    if (column.type) return this.convertColumnType(column.type);

    console.log(`Unsupported ${column}`);
    //@ts-ignore
    return null;
  }
}
