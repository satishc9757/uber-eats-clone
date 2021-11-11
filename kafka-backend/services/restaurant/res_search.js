const Restaurant = require('../../models/RestaurantModel');
const Dish = require('../../models/DishModel');

async function handle_request(msg, callback){

    const searchText = msg.searchText;
    //console.log("Inside getRes using mongo id"+resId);

    try{

        restaurantsByLocation = await getResByLocation(searchText);
        console.log("restaurantsByLocation "+ restaurantsByLocation)
        restaurantsByDishName = await getResByDishName(searchText);
        console.log("restaurantsByDishName "+ JSON.stringify(restaurantsByDishName));
        restaurants = restaurantsByLocation.concat(restaurantsByDishName);

        if(restaurants){
                responseData = [];
                restaurants.forEach(restaurant => responseData.push({
                        resId: restaurant._id,
                        resName: restaurant.resName,
                        resEmail: restaurant.resEmail,
                        resStreet: restaurant.resAddress ? restaurant.resAddress.street : "",
                        resCity: restaurant.resAddress ? restaurant.resAddress.city : "",
                        resStreet: restaurant.resAddress ? restaurant.resAddress.street : "",
                        resState: restaurant.resAddress ? restaurant.resAddress.state : "",
                        resZipcode: restaurant.resAddress ? restaurant.resAddress.zipcode : "",
                        resImage: restaurant.resImage,
                        resDescription: restaurant.resDescription,
                        resPhone: restaurant.resPhone,
                        resDeliveryType: restaurant.resDeliveryType,
                        dishTypes: restaurant.dishTypes
                    }));

                callback(null, { response_code: 200, response_data: responseData});
        } else{
            callback(null, { response_code: 200, response_data: []});
        }


    } catch(err){
        console.error("getRestaurantById : " + err);
        callback(null,{ response_code: 500, response_data: "Something went wrong!", err});
    }

};

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
        console.log("res ###"+ JSON.stringify(res));
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
        console.log("Res Map: " + JSON.stringify(resMap));
        restaurants = [];
        if(resMap){
            resMap.forEach((value, res) => {
                restaurants.push({...res, dishTypes: Array.from(value).join(',')});
            });
        }
    return restaurants;
}

exports.handle_request = handle_request;