import dynamoose from 'dynamoose';

export default dynamoose.model('testForestAdmin-merchantOffers', {
  offerId: String,
  includedInMissedPointsNotifications: Boolean,
  manualApprovalPointThreshold: Number,
  priorPurchaseProbability: Number,
  fixedPoints: Number,
  platformAdvertiserId: String,
  shopOnDesktop: Boolean,
  region: String,
  affiliateLink: String,
  card: {
    type: Object,
    schema: {
      title: String,
      bannerURL: String,
      logoURL: String,
    },
  },
  multipleRatesForDisplay: {
    type: Array,
    schema: [{
      type: Object,
      schema: { text: String },
    }],
  },
  visible: Boolean,
  manualCheckIfOfferPotentialPoints: Boolean,
  affiliatePlatformId: String,
  matchToAffiliateTransaction: Boolean,
  browserInApp: Boolean,
  points: Number,
  useMarginOnAffiliateCommissionForPointsCalculation: Boolean,
  shouldAutomaticallyComputeAverageDaysInPending: Boolean,
  manualCheckIfNegativeMargin: Boolean,
  type: String,
  merchantId: String,
});
