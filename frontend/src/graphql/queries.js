export const GET_CUSTOMER = `query Profile($custId:String!){getCustomer(custId:$custId)
  {custId,custFirstName,custLastName,custEmail,custStreet,custCity,custState,
    custZipcode,custCountry,custImage,custPhone,custAbout,custNickname,custDob}}`;

export const GET_CUSTOMER_ORDERS = `query GetCustOrder($custId: String) {  getCustOrder(custId: $custId)
  { orderId,    orderTotal,    street,    city,    state,    zipcode,    orderTimestamp,
    orderStatus,    orderDeliveryFee,    orderServiceFee, resName}}`;

export const GET_RESTAURANT = `query GetRestaurant($resId: String) { getRestaurant(resId: $resId)
  { resId, resName, resEmail, resStreet, resCity, resState, resZipcode, resImage, resDescription, resPhone, } }`;

  export const RESTAURANT_SEARCH = `query Query($searchText: String) { restaurantSearch(searchText: $searchText)
    { resId, resName, resEmail, resStreet, resCity, resState, resZipcode, resImage, resDescription,
      resPhone, resDeliveryType, dishTypes, } }`;

export const GET_DISH =`query GetDish($dishId: String) { getDish(dishId: $dishId)
  { _id, dishName, dishResId, dishImage, dishPrice, dishDesc, dishCategory, dishType } }`;

export const GET_DISHES_BY_RESID =`query GetDishByResId($resId: String) { getDishByResId(resId: $resId)
  { _id, dishName, dishResId, dishImage, dishPrice, dishDesc, dishCategory, dishType, } }`;

export const GET_RES_ORDERS =`query GetResOrders($resId: String) { getResOrders(resId: $resId)
  { orderId, orderTotal, street, city, state, zipcode, orderTimestamp, orderStatus, orderDeliveryFee, orderServiceFee,
    custFirstName, custLastName } }`;

  export const GET_ORDERS_DETAILS =`query GetOrderDetails($orderId: String) { getOrderDetails(orderId: $orderId)
     dishName, odQuantity, odPrice, } }`;