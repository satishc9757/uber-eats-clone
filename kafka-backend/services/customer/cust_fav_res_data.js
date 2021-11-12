const Restaurant = require('../../models/RestaurantModel');
const Dish = require('../../models/DishModel');
const Customer = require('../../models/CustomerModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

async function handle_request(msg, callback){

    const custId = msg.custId;
    //console.log("Inside getRes using mongo id"+resId);

    try{
        // const favResIds = await getFavResIds(custId);
        // console.log("Fav favResIds : "+ favResIds);
        // let restaurants = await getFavRes(favResIds);
        // console.log("Fav data : "+ restaurants);
        // if(restaurants){
        //         responseData = [];
        //         restaurants.forEach(restaurant => responseData.push({
        //                 resId: restaurant._id,
        //                 resName: restaurant.resName,
        //                 resEmail: restaurant.resEmail,
        //                 resStreet: restaurant.resAddress ? restaurant.resAddress.street : "",
        //                 resCity: restaurant.resAddress ? restaurant.resAddress.city : "",
        //                 resStreet: restaurant.resAddress ? restaurant.resAddress.street : "",
        //                 resState: restaurant.resAddress ? restaurant.resAddress.state : "",
        //                 resZipcode: restaurant.resAddress ? restaurant.resAddress.zipcode : "",
        //                 resImage: restaurant.resImage,
        //                 resDescription: restaurant.resDescription,
        //                 resPhone: restaurant.resPhone,
        //                 resDeliveryType: restaurant.resDeliveryType,
        //                 dishTypes: restaurant.dishTypes
        //             }));

            let customer  = await Customer.findById(custId);
        if(customer){
            callback(null, { response_code: 200, response_data: customer.favRestaurants});
        } else {
            callback(null, { response_code: 200, response_data: []});
        }

    } catch(err){
        console.error("getRestaurantById : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

async function getFavResIds(custId){
    const customer = await Customer.findById(custId);
    if(customer){
        console.log("favs are "+ customer.favRestaurants)
        return customer.favRestaurants;
    }
    console.log("no favs");
    return [];
}


function getFavRes(favResIds){
    let favRestaurants = [];
    console.log(" favs "+favResIds);
    // Array.from(favResIds).forEach(async (resId) => {
    //     try{
    //         let favRestaurant  = await Restaurant.aggregate([
    //             { $match: { "_id": ObjectId(resId) } },
    //             { $lookup:{
    //                 from: "dishes",
    //                 localField: "_id",
    //                 foreignField: "dishResId",
    //                 as: "dishesData"
    //             }
    //         }
    //         ]);
    //         console.log(" fav 1 "+favRestaurant);
    //         favRestaurants.push(favRestaurant);
    //     } catch(err){
    //         console.log(err);
    //     }

    // })

    Array.from(favResIds).forEach((resId) => {
        try{
            Restaurant.aggregate([
                { $match: { "_id": ObjectId(resId) } },
                { $lookup:{
                    from: "dishes",
                    localField: "_id",
                    foreignField: "dishResId",
                    as: "dishesData"
                }
            }
            ], (err, result) => {
                if (err) throw err;
                    console.log(result);

                favRestaurants.push(result[0]);
              });
            //console.log(" fav 1 "+favRestaurant);

        } catch(err){
            console.log(err);
        }

    })

    for (resIndex in favRestaurants) {
        let res = favRestaurants[resIndex];
        let disheTypeSet = new Set();
        for(dish in res.dishesData){
            disheTypeSet.add(res.dishesData[dish].dishType);
        }
        res["dishTypes"] = Array.from(disheTypeSet).join(',');
        console.log("res ###"+ JSON.stringify(res));
    }
    console.log("final res@@@@: "+favRestaurants);
    return favRestaurants;
}

exports.handle_request = handle_request;