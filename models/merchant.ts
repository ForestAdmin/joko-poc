import dynamoose from 'dynamoose';

export default dynamoose.model('testForestAdmin-merchants', {
  merchantId: String,
  name: String,
  logos: {
    type: Object,
    schema: { logoURLHighRes: String },
  },
});
