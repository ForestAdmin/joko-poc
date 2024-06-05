import dynamoose from 'dynamoose';

export default dynamoose.model('testForestAdmin-inAppContents', {
  inAppContentId: String,
  visible: Boolean,
  condition: String,
  visibleOnWeb: Boolean,
  priority: Number,
  layout: {
    type: Object,
    schema: {
      layoutParameters: {
        type: Object,
        schema: {
          useScrollSnapping: Boolean,
          numberOfRows: Number,
        },
      },
      layoutType: String,
    },
  },
  region: String,
  position: Number,
  items: {
    type: Object,
    schema: {
      itemType: String,
      itemList: {
        type: Array,
        schema: [{
          type: Object,
          schema: { title: String, image: String },
        }],
      },
    },
  },
  title: String,
});
