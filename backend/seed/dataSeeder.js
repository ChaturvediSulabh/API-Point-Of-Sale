var adinventory = require('../models/AdInventory');
//var deals = require('../models/deals');
var mongoose = require('mongoose');
mongoose.connect('mongodb://gdp:gdp123@ds161700.mlab.com:61700/gdpadinventory');

var inventory = [
  new adinventory({
    AdID: 1,
    AdType: 'Classic',
    BasePrice: 269.99,
    Criteria: 'Customer = UNILEVER',
    Offer: '3 for 2'
  }),
  new adinventory({
    AdID: 1,
    AdType: 'Classic',
    BasePrice: 269.99,
    Criteria: 'Customer = FORD',
    Offer: '5 for 4'
  }),
  new adinventory({
    AdID: 2,
    AdType: 'Standout',
    BasePrice: 322.99,
    Criteria: 'Customer = APPLE',
    Offer: 'NewPrice = 299.99'
  }),
  new adinventory({
    AdID: 2,
    AdType: 'Standout',
    BasePrice: 322.99,
    Criteria: 'Customer = FORD',
    Offer: 'NewPrice = 309.99'
  }),
  new adinventory({
    AdID: 3,
    AdType: 'Premium',
    BasePrice: 394.99,
    Criteria: 'Customer = NIKE and Quantity > 4',
    Offer: 'NewPrice = 379.99'
  }),
  new adinventory({
    AdID: 3,
    AdType: 'Premium',
    BasePrice: 394.99,
    Criteria: 'Customer = FORD and Quantity > 3',
    Offer: 'NewPrice = 389.99'
  })
];
var done = 0;
for(var i = 0;i < inventory.length;i++){
  inventory[i].save(function(err, result){
    done++;
    if(done === inventory.length){
      exit();
    }
  });
}
function exit(){
  mongoose.disconnect();
}
