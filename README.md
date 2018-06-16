# seek-GDP-POS
GDP Coding Exercise

# [Solution Link - https://gdp-checkout-microservice.herokuapp.com]
  Above page will let you know on how to use the app or test the app

# Build Summary
  Programming - Node.js (Express Middleware), Please refer package.json file to know about what packages have been used.
  DataBase - MongoDB, hosted on mLab - mongodb://gdp:gdp123@ds161700.mlab.com:61700/gdpadinventory
  TestData and How to Test - https://gdp-checkout-microservice.herokuapp.com/

# Detailed Documentation
  /doc/As-Is_Build.docx

GDP is in the process of rewriting its job ads checkout system. You have been assigned to build this new system. We want to offer different products to recruiters:

(i) Classic Ad : Offers the most basic level of advertisement.

(i) Standout Ad : Allows advertisers to use a company logo and use a longer presentation text.

(iii) Premium Ad : Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility.

Each of the product is billed as follows:

ID	Name	Price
classic	Classic Ad	$269.99
standout	Standout Ad	$322.99
Premium	Premium Ad	$394.99
We established a number of special pricing rules for a small number of privileged custome

(i) UNILEVER

Gets a “3 for 2” deal on Classic Ads
(ii) APPLE

Gets a discount on Standout Ads where the price drops to $299.99 per ad
(iii) NIKE

Gets a discount on Premium Ads where 4 or more are purchased. The price drops to $379.99 per ad
(iv) FORD

Gets a “5 for 4” deal on Classic Ads
Gets a discount on Standout Ads where the price drops to $309.99 per ad
Gets a discount on Premium Ads where 3 or more are purchased. The price drops to $389.99 per ad
These details are regularly renegotiated, so we want the pricing rules to be as flexible as possible as they can change in the future with little notice.
