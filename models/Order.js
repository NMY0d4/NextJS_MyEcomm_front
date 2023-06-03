const { Schema } = require('mongoose');

const OrderSchema = new Schema({
  line_items: Object,
  name: String,
  city: String,
  email: String,
  postalCode: String,
  streetAddress: String,
  country: String,
  paid: Boolean,
});

const Order = models?.Order || model('Order', OrderSchema);