var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
//var Books = require('./services/books.js');
var CustLogin = require('./services/customer/cust_login');
var CustReg = require('./services/customer/cust_registration');
var CustData = require('./services/customer/cust_data');
var CustUpdate = require('./services/customer/cust_update');
var CreateOrder = require('./services/customer/create_order');
var CustOrders = require('./services/customer/cust_orders');
var OrderDetails = require('./services/customer/order_details');
var CancelOrder = require('./services/customer/cancel_order');
var OrderDeliveryAddress = require('./services/customer/cust_delivery_address');
var CustFavs = require('./services/customer/cust_favs');
var ValidateCust = require('./services/customer/validate_cust');
var CustFavResData = require('./services/customer/cust_fav_res_data');

var ResRegistration = require('./services/restaurant/res_registration');
var ResLogin = require('./services/restaurant/res_login');
var ResData = require('./services/restaurant/res_data');
var UpdateRes = require('./services/restaurant/update_res');
var CreateDish = require('./services/restaurant/create_dish');
var DishUpdate = require('./services/restaurant/dish_update');
var DishImageUpdate = require('./services/restaurant/dish_image_update');
var DishData = require('./services/restaurant/dish_data');
var ResOrders = require('./services/restaurant/res_oders');
var OrderStatus = require('./services/restaurant/order_status');
var ValidateRes = require('./services/restaurant/validate_res');
var DishDataByID = require('./services/restaurant/dish_data_by_id');
var ResSearch = require('./services/restaurant/res_search');

const { mongoConnectionURL } = require('./database/mongoConnection');
const mongoose = require('mongoose');

const mongoDbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 100
}

mongoose.connect(mongoConnectionURL, mongoDbOptions, (err, result) => {
    if(err){
      console.log("Error while connecting to mongoDB : "+err);
    } else {
      console.log("Connected to Mongo DB!");
    }
});


 function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', async function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        await fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("cust_login", CustLogin);
handleTopicRequest("cust_registration", CustReg);
handleTopicRequest("cust_data", CustData);
handleTopicRequest("cust_update", CustUpdate);
handleTopicRequest("create_order", CreateOrder);
handleTopicRequest("cust_orders", CustOrders);
handleTopicRequest("order_details", OrderDetails);
handleTopicRequest("cancel_order", CancelOrder);
handleTopicRequest("cust_delivery_address", OrderDeliveryAddress);
handleTopicRequest("cust_favs", CustFavs);
handleTopicRequest("validate_cust", ValidateCust);
handleTopicRequest("cust_fav_res_data", CustFavResData);

handleTopicRequest("res_registration", ResRegistration);
handleTopicRequest("res_login", ResLogin);
handleTopicRequest("res_data", ResData);
handleTopicRequest("update_res", UpdateRes);
handleTopicRequest("create_dish", CreateDish);
handleTopicRequest("dish_data", DishData);
handleTopicRequest("dish_update", DishUpdate);
handleTopicRequest("dish_image_update", DishImageUpdate);
// handleTopicRequest("order_details_res", CustFavs);
handleTopicRequest("order_status_update", OrderStatus);
// handleTopicRequest("res_data", CustFavs);

handleTopicRequest("res_orders", ResOrders);
handleTopicRequest("res_search", ResSearch);
handleTopicRequest("validate_res", ValidateRes);
handleTopicRequest("dish_data_by_id", DishDataByID);

// handleTopicRequest("res_search", Cust davs);
// handleTopicRequest("update_res", CustFavs);