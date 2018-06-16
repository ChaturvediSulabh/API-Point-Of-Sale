var express = require('express');
var router = express.Router();
var url = require('url');
var path = require('path');
var collection = require('../models/AdInventory');
/*****************************************************
Function to fetch data from MongoDB for each Customer
*****************************************************/
var adAndBasePrice = []; //default Price list
adAndBasePrice.push('1=269.99');
adAndBasePrice.push('2=322.99');
adAndBasePrice.push('3=394.99');
// push more here
var rest = [];
function getAllData(adAndBasePrice,collection,customer,claasic,standout,premium,callback){
  collection.find({Criteria: new RegExp(customer,'i')}).exec(function(err,result){
    if(err){
      console.log(err);
    }else if(result.length > 0){
      rest.push(result);
      callback();
    }
  });
}
function dototal(collection,adType,callback){
  var total = 0;
  collection.findOne({AdType: new RegExp(adType)},(err,res) => {
    if(err) throw err;
    total = parseInt(JSON.stringify(res.BasePrice));
    callback && callback(total);
  });
}
router.get('/checkout/*', function(req, res, next){
  var data = url.parse(req.url,true);
  var query = data.path;
  var customer = query.match(/[a-zA-Z]+/g).join('').replace('checkout','').toUpperCase();
  var purchases = query.match(/[0-9]+/g)[0].split('').map(num => parseInt(num));
  var classic = 0;
  var standout = 0;
  var premium = 0;
  for(var i = 0;i < purchases.length;i++){
    if(purchases[i] === 1){
      classic++;
    }else if (purchases[i] === 2){
      standout++;
    }else if (purchases[i] === 3){
      premium++;
    }
  }
  if(customer != 'DEFAULT'){
    getAllData(adAndBasePrice,collection,customer,classic,standout,premium,function(){
      console.log('customer = '+customer+'; classic = '+classic+' and standout = '+standout+' and Premium = '+premium);
      var totalAmount = 0;
      for(var i = 0;i < rest[0].length;i++){
         var str = JSON.stringify(rest[0][i]);
         console.log(rest[0][i]);
         var adId = str.replace("{","").replace("}","").split(",")[1].match(/[0-9]/g).map(Number).join();
         var offer = str.replace("{","").replace("}","").split(",")[5];
         var criteria = str.replace("{","").replace("}","").split(",")[4];
         var basePrice = str.replace("{","").replace("}","").split(",")[3];
         var quantity = 0;
         if(criteria.split('and').length > 1){
           quantity = criteria.match(/[0-9]+/g)[0];
           quantity = parseInt(quantity);
         }
         console.log('For Index = '+i+' -> adId = '+adId+' and offer = '+offer+' and criteria = '+criteria+' and basePrice = '+basePrice+' and quantity = '+quantity);
         function getOffer(){
           if(offer.search(/for/g) != -1){
             offer = offer.replace(/"/g,'').match(/[0-9]+/g).map(Number);
             x = offer[0];
             y = offer[1];
             offer = [];
             offer.push(x);
             offer.push(y);
             return offer;
           }else if(offer.search(/NewPrice/g) != -1){
             offer = offer.match(/[0-9.0-9]+/g).map(Number)[0];
             return offer;
           }
         } // End of function getOffer()
         function dealIs(ad,offer,basePrice){
           var sum = 0;
           basePrice = basePrice.match(/[0-9.0-9]+/g).map(Number);
           if(typeof(offer) === 'number'){
             sum = (ad.toFixed(2) * offer.toFixed(2));
             return sum;
           }else{
             if(ad >= offer[0]){
               if(ad % offer[0] === 0){
                 ad = ad/ad%3 * 2;
               }else{
                 ad = (ad/ad%3 * 2) + (ad % 3);
               }
             }else{
               ad = ad;
             }
             sum = ad * basePrice;
             return sum
           }
         } // End of function dealIs
        var adType = 0;
        if(classic > 0 && adId === '1'){
            adType = classic;
        }else if(standout > 0 && adId === '2'){
            adType = standout;
        }else if(premium > 0 && adId === '3'){
            adType = premium;
        }
        if(adType === undefined || adType === null){
          adType = 0;
        }
        offer = getOffer();
        var amount = totalAmount + dealIs(adType,offer,basePrice);
        console.log('dealIs amount = '+amount)
        var idx = 0;
        if(adId === '1'){
          totalAmount = amount;
          idx = adAndBasePrice.indexOf('1=269.99');
          adAndBasePrice.splice(idx, 1);
        }else if(adId === '2'){
           totalAmount = amount;
           idx = adAndBasePrice.indexOf('2=322.99');
           adAndBasePrice.splice(idx, 1);
        }else{
          totalAmount = amount;
          idx = adAndBasePrice.indexOf('3=394.99');
          adAndBasePrice.splice(idx, 1);
        }
       } // End of for(var i = 0;i < rest[0].length;i++){
       console.log('total amount ==>> '+totalAmount);
       rest = [];
       for(var i = 0;i < adAndBasePrice.length;i++){
           var ids = adAndBasePrice[i].split('=').map(Number);
           if(ids[0] === 1){
             totalAmount += (classic * ids[1]) ;
           }else if(ids[0] === 2){
             totalAmount += (standout * ids[1]) ;
           }else if(ids[0] === 3){
             totalAmount += (premium * ids[1]) ;
           }
       }
      customer = 'Customer: '+customer;
      var scanner = 'SKUs Scanned: Classic = '+classic+' and Standout = '+standout+' and Premium = '+premium;
      console.log(customer+'\n'+scanner+'\n'+totalAmount);
      res.writeHead(200, { 'Content-Type': 'text/string' });
      res.end(customer+'\n'+scanner+'\n'+'Total Expected: '+'Total Expected: '+totalAmount  );
      next();
    }); // End of  getAllData(collection,function(){
  } // End of if (customer != 'DEFAULT')
  else{
    var adAndBasePrice = []; //default Price list
    adAndBasePrice.push('1=269.99');
    adAndBasePrice.push('2=322.99');
    adAndBasePrice.push('3=394.99');
    customer = 'Customer: '+customer;
    var scanner = 'SKUs Scanned: Classic = '+classic+' and Standout = '+standout+' and Premium = '+premium;
    totalAmount = (classic * adAndBasePrice[0].split('=').map(Number)[1].toFixed(2)) + (standout * adAndBasePrice[1].split('=').map(Number)[1].toFixed(2)) + (premium * adAndBasePrice[2].split('=').map(Number)[1].toFixed(2));
    console.log(customer+'\n'+scanner+'\n'+totalAmount);
    res.writeHead(200, { 'Content-Type': 'text/string' });
    res.end(customer+'\n'+scanner+'\n'+'Total Expected: '+'Total Expected: '+totalAmount  );
    next();
  }
}); // End Of router.get('/checkout/*'
module.exports = router;
