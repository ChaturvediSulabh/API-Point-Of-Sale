var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inventorySchema = new Schema({
  AdID: {type : Number, required: true},
  AdType:{type : String, required: true},
  BasePrice:{type : Number, required: true},
  Criteria: {type : String, required: true},
  Offer: {type : String, required: true}
});

module.exports = mongoose.model('AdInventory',inventorySchema);
