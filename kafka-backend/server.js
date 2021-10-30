var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
//var Books = require('./services/books.js');
var CustLogin = require('./services/cust_login');



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
