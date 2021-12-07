const Customer = require('../models/CustomerModel');
const { UserInputError } = require("apollo-server");
const Order = require('../models/OrdersModel');
const Address = require('../models/AddressModel');
const OrderItem = require('../models/OrderItem');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const customerResolvers = {
    Query: {
        async getCustomer(_, { custId }) {
            let customer  = await Customer.findById(custId);
            if(customer){
                return {
                    custId: customer._id,
                    custFirstName: customer.custFirstName,
                    custLastName: customer.custLastName,
                    custEmail: customer.custEmail,
                    custStreet: customer.custAddress ? customer.custAddress.street : null,
                    custCity: customer.custAddress ? customer.custAddress.city : null,
                    custState: customer.custAddress ? customer.custAddress.state : null,
                    custZipcode: customer.custAddress ? customer.custAddress.zipcode : null,
                    custCountry: customer.custAddress ? customer.custAddress.country : null,
                    custImage: customer.custImage,
                    custPhone: customer.custPhone,
                    custAbout: customer.custAbout,
                    custNickname: customer.custNickname,
                    custDob: customer.custDob
                }
            }
        },

        async getCustOrder(_, { custId }) {
          try{
            let orders  = await Order.aggregate([
                { $match: { "orderCustId": ObjectId(custId) } },
                { $lookup:{
                        from: "restaurants",
                        localField: "orderRestaurantId",
                        foreignField: "_id",
                        as: "res_info"
                    }
                },
                { $sort : { "orderTimestamp" : -1 } }
            ]);

            // console.log("orders output: "+JSON.stringify(orders[0]));
            // console.log("orders output: "+orders[1]);
            let ordersData = [];
            if(orders){

                orders.forEach(order => ordersData.push({
                    orderId: order._id,
                    orderTotal: getFormatedAmount(order.orderTotal),
                    resName: order.res_info[0] ? order.res_info[0].resName : null,
                    street: order.orderAddress ? order.orderAddress.street : null,
                    city: order.orderAddress ? order.orderAddress.city : null,
                    state: order.orderAddress ? order.orderAddress.state : null,
                    zipcode: order.orderAddress ? order.orderAddress.zipcode : null,
                    orderTimestamp: getFormatedDate(new Date(order.orderTimestamp)),
                    orderStatus: order.orderStatus,
                    orderDeliveryFee: getFormatedAmount(order.orderDeliveryFee),
                    orderServiceFee: getFormatedAmount(order.orderServiceFee),
                    specialInstructions: order.specialInstructions
                }));

                return ordersData;
            } else{
                return [];
            }

        } catch(err){
            throw new UserInputError("Something went wrong");
        }
      },
      },
     Mutation: {
        async custLogin(_, { email, password }) {
            console.log(email, password);
            const customer = await Customer.findOne({custEmail: email});
            const result = await customer.comparePassword(password);
            if (customer && result) {
              return {
                custId: customer.custId,
                custEmail: customer.custEmail,
                custFirstName: customer.custFirstName,
                custLastName: customer.custLastName,
                custImageLink: customer.custImage,
                custLocation: customer.custAddress.city,
                message: "login success",
              };
            } else {
              throw new UserInputError("Incorrect username or password.");
            }
          },


       async custSignup(_, {  custInput }) {
        const custEmail = custInput.custEmail;
        const user = await Customer.findOne({ custEmail });
        console.log("CustSignup mutation called with custInput: "+JSON.stringify(custInput));
        if (user) {
          throw new UserInputError("Account with email id already exists.");
        } else {
            let customer = new Customer({
                custFirstName: custInput.custFirstName,
                custLastName: custInput.custLastName,
                custEmail: custInput.custEmail,
                custPassword: custInput.custPassword,
                custAddress: {
                  street: custInput.custStreet,
                  city: custInput.custCity,
                  state: custInput.custState,
                  zipcode: custInput.custZipcode,
                  country: custInput.custCountry,
              }
            });

            const res = await customer.save();

          return {
            custId: res._id,
            custEmail: res.custEmail,
            custFirstName: res.custFirstName,
            custLastName: res.custLastName,
            custImageLink: res.custImage,
            custLocation: res.custAddress.city,
            message: "signup success",
          };
        }
      },

      async custUpdate(_, {  custInput }) {
      const result = await Customer.updateOne(
            {_id: custInput.custId},
            {
                $set: {
                  custFirstName: custInput.custFirstName,
                  custLastName: custInput.custLastName,
                  custEmail: custInput.custEmail,
                  custAbout: custInput.custAbout,
                  custPhone: custInput.custPhone,
                  custDob: custInput.custDob,
                  custNickname: custInput.custNickname,
                  custAddress: {
                      street: custInput.custStreet,
                      city: custInput.custCity,
                      state: custInput.custState,
                      zipcode: custInput.custZipcode,
                      country: custInput.custCountry,
                  }
                }
            });

                if(!result){
                    throw new UserInputError("Somwthing went wrong.");
                } else {
                    return {
                        custId: res._id,
                        custEmail: res.custEmail,
                        custFirstName: res.custFirstName,
                        custLastName: res.custLastName,
                        custImageLink: res.custImage,
                        custLocation: res.custAddress.city,
                        message: "Cust update success",
                      };
                }
        },
        // {  custId, resId, deliveryAddress, cartItems, deliveryFee, serviceFee, cartTotal }
        async createOrder(_, {custOrder}) {
          console.log("here in createOrder "+ JSON.stringify(custOrder))
          const orderItems = custOrder.cartItems.map(item => {
            return {
                itemName: item.dishName,
                itemPrice: item.dishPrice,
                itemQuantity: item.dishQuantity
            };
        });

        let order = new Order({
            orderCustId: ObjectId(custOrder.custId),
            orderRestaurantId: ObjectId(custOrder.resId),
            orderAddress: custOrder.deliveryAddress,
            orderItems: orderItems,
            orderTimestamp: new Date(),
            orderStatus: "Order Placed",
            orderDeliveryFee: custOrder.deliveryFee,
            orderServiceFee: custOrder.serviceFee,
            orderTotal: custOrder.cartTotal
        });

        const result = await order.save();
        if(result){
            console.log("order created")
            return "Order Created";
        } else {
            console.log("error created "+err)
            throw new UserInputError("Something went wrong.");
        }

        },
      }
}

function getFormatedDate(date){
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}


function getFormatedAmount(num){
  return (Math.round(num * 100) / 100).toFixed(2);
}

module.exports = customerResolvers;
