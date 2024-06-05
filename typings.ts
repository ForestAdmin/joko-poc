/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type TestForestAdminMerchantOffersCustomizer = CollectionCustomizer<Schema, 'testForestAdmin-merchantOffers'>;
export type TestForestAdminMerchantOffersRecord = TPartialRow<Schema, 'testForestAdmin-merchantOffers'>;
export type TestForestAdminMerchantOffersConditionTree = TConditionTree<Schema, 'testForestAdmin-merchantOffers'>;
export type TestForestAdminMerchantOffersFilter = TPaginatedFilter<Schema, 'testForestAdmin-merchantOffers'>;
export type TestForestAdminMerchantOffersSortClause = TSortClause<Schema, 'testForestAdmin-merchantOffers'>;
export type TestForestAdminMerchantOffersAggregation = TAggregation<Schema, 'testForestAdmin-merchantOffers'>;

export type TestForestAdminMerchantsCustomizer = CollectionCustomizer<Schema, 'testForestAdmin-merchants'>;
export type TestForestAdminMerchantsRecord = TPartialRow<Schema, 'testForestAdmin-merchants'>;
export type TestForestAdminMerchantsConditionTree = TConditionTree<Schema, 'testForestAdmin-merchants'>;
export type TestForestAdminMerchantsFilter = TPaginatedFilter<Schema, 'testForestAdmin-merchants'>;
export type TestForestAdminMerchantsSortClause = TSortClause<Schema, 'testForestAdmin-merchants'>;
export type TestForestAdminMerchantsAggregation = TAggregation<Schema, 'testForestAdmin-merchants'>;

export type TestForestAdminInAppContentsCustomizer = CollectionCustomizer<Schema, 'testForestAdmin-inAppContents'>;
export type TestForestAdminInAppContentsRecord = TPartialRow<Schema, 'testForestAdmin-inAppContents'>;
export type TestForestAdminInAppContentsConditionTree = TConditionTree<Schema, 'testForestAdmin-inAppContents'>;
export type TestForestAdminInAppContentsFilter = TPaginatedFilter<Schema, 'testForestAdmin-inAppContents'>;
export type TestForestAdminInAppContentsSortClause = TSortClause<Schema, 'testForestAdmin-inAppContents'>;
export type TestForestAdminInAppContentsAggregation = TAggregation<Schema, 'testForestAdmin-inAppContents'>;


export type Schema = {
  'testForestAdmin-inAppContents': {
    plain: {
      'condition': string | null;
      'inAppContentId': string;
      'items': {'itemList': Array<{'image': string; 'title': string}>; 'itemType': string} | null;
      'layout': {'layoutParameters': {'numberOfRows': number; 'useScrollSnapping': boolean}; 'layoutType': string} | null;
      'position': number | null;
      'priority': number | null;
      'region': string | null;
      'title': string | null;
      'visible': boolean | null;
      'visibleOnWeb': boolean | null;
    };
    nested: {};
    flat: {};
  };
  'testForestAdmin-merchantOffers': {
    plain: {
      'affiliateLink': string | null;
      'affiliatePlatformId': string | null;
      'browserInApp': boolean | null;
      'card': {'bannerURL': string; 'logoURL': string; 'title': string} | null;
      'fixedPoints': number | null;
      'includedInMissedPointsNotifications': boolean | null;
      'manualApprovalPointThreshold': number | null;
      'manualCheckIfNegativeMargin': boolean | null;
      'manualCheckIfOfferPotentialPoints': boolean | null;
      'matchToAffiliateTransaction': boolean | null;
      'merchantId': string | null;
      'multipleRatesForDisplay': Array<{'text': string}> | null;
      'offerId': string;
      'platformAdvertiserId': string | null;
      'points': number | null;
      'priorPurchaseProbability': number | null;
      'region': string | null;
      'shopOnDesktop': boolean | null;
      'shouldAutomaticallyComputeAverageDaysInPending': boolean | null;
      'type': string | null;
      'useMarginOnAffiliateCommissionForPointsCalculation': boolean | null;
      'visible': boolean | null;
    };
    nested: {};
    flat: {};
  };
  'testForestAdmin-merchants': {
    plain: {
      'logos': {'logoURLHighRes': string} | null;
      'merchantId': string;
      'name': string | null;
    };
    nested: {};
    flat: {};
  };
};
