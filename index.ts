import type { Schema } from './typings';
import 'dotenv/config';
import { v4 } from 'uuid';

import { createAgent } from '@forestadmin/agent';
import dynamoose, { model } from 'dynamoose';
import merchantOffers from './models/merchant-offers';
import merchant from './models/merchant';
import inAppContents from './models/in-app-contents';
import { createDynamooseDataSource } from './src/datasource-dynamoose';

(async () => {
  // Create new DynamoDB instance
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.AWS_REGION!,
  });

  // Set DynamoDB instance to the Dynamoose DDB instance
  dynamoose.aws.ddb.set(ddb);
  
  // Create your Forest Admin agent
  // This must be called BEFORE all other middleware on the app
  /**
   * @type {import('@forestadmin/agent').Agent<import('./typings').Schema>}
   */
  const agent = 
    createAgent<Schema>({
      authSecret: process.env.FOREST_AUTH_SECRET!,
      envSecret: process.env.FOREST_ENV_SECRET!,
      isProduction: process.env.NODE_ENV === 'production',
      forestServerUrl: process.env.FOREST_SERVER_URL,
      typingsMaxDepth: 5,
      typingsPath: './typings.ts',
      loggerLevel: 'Debug',
    });

  agent
    .addDataSource(createDynamooseDataSource([merchantOffers, merchant, inAppContents]))
    .customizeCollection('testForestAdmin-inAppContents', collection => {
      collection
        .addAction('Mark as visible', {
          scope: 'Bulk',
          execute: async (context, resBuilder) => {
            try {
              await context.collection.update(context.filter, { visible: true });
              return resBuilder.success('Marked as visible');
            } catch (err) {
              return resBuilder.error(err.message);
            }
          }
        })
        .addAction('Mark as invisible', {
          scope: 'Bulk',
          execute: async (context, resBuilder) => {
            try {
              await context.collection.update(context.filter, { visible: false });
              return resBuilder.success('Marked as visible');
            } catch (err) {
              return resBuilder.error(err.message);
            }
          }
        })
    })
    .customizeCollection('testForestAdmin-merchants', collection => {
      collection
        .addOneToManyRelation('offers', 'testForestAdmin-merchantOffers', {
          originKey: 'merchantId'
        })
        .addField('nbOfOffert', {
          columnType: 'Number',
          dependencies: ['merchantId'],
          getValues: async (records, context) => {
            const rids = records.map(r => r.merchantId);
            const offers = await context.dataSource
              .getCollection('testForestAdmin-merchantOffers')
              .aggregate({
                conditionTree: {
                  field: 'merchantId',
                  operator: 'In',
                  value: rids,
                },
              }, {
                operation: 'Count',
                groups: [{ field: 'merchantId' }],
              });

            return rids.map(id => {
              const o = offers.find(o => o.group.merchantId === id);
              return o?.value || 0;
            });
          }
        })
        .overrideCreate((context) => {
          context.data.forEach(d => { d.merchantId = v4() } );
          return context.collection.create(context.data);
        });
    })
    .customizeCollection('testForestAdmin-merchantOffers', collection => {
      collection.addManyToOneRelation('merchant', 'testForestAdmin-merchants', {
        foreignKey: 'merchantId'
      });
    });
  
  await agent
    .mountOnStandaloneServer(Number(process.env.APPLICATION_PORT))
    .start();
})()

