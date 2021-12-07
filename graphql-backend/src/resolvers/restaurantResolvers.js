const Restaurant = require('../models/RestaurantModel');
const Dish = require('../models/DishModel');
const { UserInputError } = require("apollo-server");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Order = require('../models/OrdersModel');

const restaurantResolvers = {
   Query: {
     async getRestaurant(_, { resId }) {
         console.log("Fetching data for restaurant id : ", resId)
          try{
               let restaurant  = await Restaurant.findById(resId);
               console.log("Restaurant result : ",JSON.stringify(restaurant));
               if(restaurant){
                   return {
                       resId: restaurant._id,
                       resName: restaurant.resName,
                       resEmail: restaurant.resEmail,
                       resStreet: restaurant.resAddress.street,
                       resCity: restaurant.resAddress.city,
                       resStreet: restaurant.resAddress.street,
                       resState: restaurant.resAddress.state,
                       resZipcode: restaurant.resAddress.zipcode,
                       resImage: restaurant.resImage,
                       resDescription: restaurant.resDescription,
                       resPhone: restaurant.resPhone,
                   };
               } else{
                   return {};
               }

           } catch(err){
               throw new UserInputError("Something went wrong");
           }
      },

      async restaurantSearch(_, { searchText }) {
          try{

               restaurantsByLocation = await getResByLocation(searchText);
               restaurantsByDishName = await getResByDishName(searchText);
               restaurants = restaurantsByLocation.concat(restaurantsByDishName);

               if(restaurants){
                       responseData = [];
                       restaurants.forEach(restaurant => responseData.push({
                               resId: restaurant._id,
                               resName: restaurant.resName,
                               resEmail: restaurant.resEmail,
                               resStreet: restaurant.resAddress ? restaurant.resAddress.street : "",
                               resCity: restaurant.resAddress ? restaurant.resAddress.city : "",
                               resState: restaurant.resAddress ? restaurant.resAddress.state : "",
                               resZipcode: restaurant.resAddress ? restaurant.resAddress.zipcode : "",
                               resImage: restaurant.resImage,
                               resDescription: restaurant.resDescription,
                               resPhone: restaurant.resPhone,
                               resDeliveryType: restaurant.resDeliveryType,
                               dishTypes: restaurant.dishTypes
                           }));

                       return responseData;
               } else{
                   return [];
               }


           } catch(err){
               throw new UserInputError("Something went wrong : "+err);
           }
      },

      async getDishByResId(_, { resId }) {
          try{
               let dishesData  = await Dish.find({dishResId: ObjectId(resId)});

               if(dishesData){
                   return dishesData;
               } else{
                   return {};
               }

           } catch(err){
               throw new UserInputError("Something went wrong : "+err);
           }
      },

      async getDish(_, { dishId }) {
          try{
               let dishData  = await Dish.findById(dishId);

               if(dishData){
                   return dishData;
               } else{
                   return {};
               }

           } catch(err){
               throw new UserInputError("Something went wrong : "+err);
           }
      },

      async getResOrders(_, { resId }) {
          try{
            let orders  = await Order.aggregate([
                { $match: { "orderRestaurantId": ObjectId(resId) } },
                { $lookup:{
                    from: "customers",
                    localField: "orderCustId",
                    foreignField: "_id",
                    as: "cust_info"},
                },
                { $sort : { "orderTimestamp" : -1 } }
            ]);

            let ordersData = [];
            if(orders){

                orders.forEach(order => ordersData.push({
                    orderId: order._id,
                    orderTotal: getFormatedAmount(order.orderTotal),
                    custFirstName: order.cust_info[0] ? order.cust_info[0].custFirstName : null,
                    custLastName: order.cust_info[0] ? order.cust_info[0].custLastName : null,
                    custId: order.cust_info ? order.cust_info._id : null,
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

                console.log("orders data : "+ JSON.stringify(ordersData));
                return ordersData;
            } else{
                return [];
            }

        } catch(err){
            throw new UserInputError("Something went wrong "+err);
        }
      },

      async getOrderDetails(_, { orderId }) {
        try{
            let orders  = await Order.findById(orderId);
            // data = result;
            // console.log("orders output: "+JSON.stringify(orders[0]));
            // console.log("orders output: "+orders[1]);
            let ordersDetailsData = [];
            if(orders){
                orders.orderItems.forEach(item => ordersDetailsData.push({
                    dishName: item.itemName,
                    odQuantity: item.itemQuantity,
                    odPrice: getFormatedAmount(item.itemPrice)
                }));
            }
          if(ordersDetailsData){
            return ordersDetailsData;
          } else{
              return [];
          }

      } catch(err){
          throw new UserInputError("Something went wrong "+err);
      }
    },

     },
     Mutation: {
        async restaurantSignup(_, { resInput }) {
          const data = resInput;

          try {

              let restaurant = new Restaurant({
                  resName: data.resName,
                  resEmail: data.resEmail,
                  resPassword: data.resPassword,
                  resAddress: {
                      street: data.resStreet,
                      city: data.resCity,
                      state: data.resState,
                      zipcode: data.resZipcode,
                      country: data.resCountry,
                  },
                  resDeliveryType: data.resDeliveryType

              });

              const result = await restaurant.save();
              if(result){
                    return {
                         resName: result.resName,
                         resEmail: result.resEmail,
                         resCity: result.resAddress.city,
                       }
              } else {
                    return {};
              }

          } catch (err) {
               throw new UserInputError("Something went wrong : "+err);
          }
        },

        async resLogin(_, { email, password }) {
          console.log(email, password);
          const restaurant = await Restaurant.findOne({resEmail: email});
          const result = await restaurant.comparePassword(password);
          if (restaurant && result) {
            return {
               resId: restaurant._id,
               resEmail: restaurant.resEmail,
              resName: restaurant.resName,
              message: "login success",
            };
          } else {
            throw new UserInputError("Incorrect username or password.");
          }
        },


       async updateDish(_, { dishInput }) {
          const data = dishInput;
          try {

               const result = await Dish.updateOne(
                    {_id: data.dishId},
                    {
                        $set: {
                          dishName: data.dishName,
                          dishMainIngredients: data.dishMainIngredients,
                          dishPrice: data.dishPrice,
                          dishDesc: data.dishDesc,
                          dishCategory: data.dishCategory,
                          dishType: data.dishType,
                        }
                    });
          //     console.log("dish from "+JSON.stringify(result));
              if(result){
                    return dishInput;
              } else {
                    return {};
              }

          } catch (err) {
               throw new UserInputError("Something went wrong : "+err);
          }
        },

        async updateOrderStatus(_, { orderId, orderStatus }) {

          try {
               const result = await Order.updateOne(
                    {_id: orderId},
                    {
                        $set: {
                            orderStatus: orderStatus
                        }
                    });
              if(result){
                    const order = await Order.findById(orderId);
                    return order;
              } else {
                    return {};
              }

          } catch (err) {
               throw new UserInputError("Something went wrong : "+err);
          }
        },

     },
}

async function  getResByLocation(searchText){
     let restaurantsByLocation  = await Restaurant.aggregate([
         { $match: { "resAddress.city": searchText} },
         { $lookup:{
             from: "dishes",
             localField: "_id",
             foreignField: "dishResId",
             as: "dishesData"
         }
     }
     ]);

     for (resIndex in restaurantsByLocation) {
         let res = restaurantsByLocation[resIndex];
         let disheTypeSet = new Set();
         for(dish in res.dishesData){
             disheTypeSet.add(res.dishesData[dish].dishType);
         }
         res["dishTypes"] = Array.from(disheTypeSet).join(',');
         //console.log("res ###"+ JSON.stringify(res));
     }
     return restaurantsByLocation;
 }

 async function getResByDishName(searchText){
     let restaurantsByDishName  = await Dish.aggregate([
         { $match: { "dishName": searchText} },
         { $lookup:{
             from: "restaurants",
             localField: "dishResId",
             foreignField: "_id",
             as: "resData"
         }
     }
     ]);


         // data = result;
         let resMap = new Map();

         for (resIndex in restaurantsByDishName) {

             let resData = restaurantsByDishName[resIndex].resData[0];
             //console.log("res "+ JSON.stringify(resData));
             if(!resMap.has(resData)){
                 resMap.set(resData, new Set());
             }
             resMap.get(resData).add(restaurantsByDishName[resIndex].dishType);
         }
         //console.log("Res Map: " + JSON.stringify(resMap));
         restaurants = [];
         if(resMap){
             resMap.forEach((value, res) => {
                 restaurants.push({...res, dishTypes: Array.from(value).join(',')});
             });
         }
     return restaurants;
 }


 function getFormatedDate(date){
     return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
 }


 function getFormatedAmount(num){
     return (Math.round(num * 100) / 100).toFixed(2);
 }

module.exports = restaurantResolvers;
