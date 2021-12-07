export const CUST_LOGIN = `mutation CustLogin($email: String!, $password: String!)
{ custLogin(email: $email, password: $password) { custId, custEmail, custFirstName,
  custLastName, custImageLink, custLocation, message, } }`;

export const CUST_SIGNUP = `mutation CustSignup($custInput: CustomerInput)
{ custSignup(custInput: $custInput) { custEmail, custFirstName, custLastName, custLocation, } }`;

export const CREATE_ORDER = `mutation CustLogin($custOrder: OrderInput) {
    createOrder(custOrder: $custOrder)
  }`;

export const CUST_UPDATE = `mutation CustUpdate($custInput: CustomerInput) { custUpdate(custInput: $custInput)
  { custId, custEmail, custFirstName, custLastName, custImageLink, custLocation, message } }`;

export const RES_LOGIN = `mutation ResLogin($email: String, $password: String) {  resLogin(email: $email, password: $password)
  {    resId,    resName,    resEmail  }}`;
export const RES_SIGNUP = `mutation RestaurantSignup($resInput: ResInput) { restaurantSignup(resInput: $resInput)
  { resName, resEmail, resCity } }`;

export const CREATE_DISH = `mutation CreateDish($dishInput: DishInput) { createDish(dishInput: $dishInput)
  { _id, dishName, dishResId, dishImage, dishPrice, dishDesc, dishCategory, dishType, } }`;

export const DISH_UPDATE = `mutation UpdateDish($dishInput: DishInput) { updateDish(dishInput: $dishInput)
  { dishName, dishResId, dishImage, dishPrice, dishDesc, dishCategory, dishType, } }`;

export const UPDATE_ORDER_STATUS = `mutation UpdateOrderStatus($orderId: String, $orderStatus: String)
{ updateOrderStatus(orderId: $orderId, orderStatus: $orderStatus) { _id, orderTotal, orderDeliveryFee,
  orderServiceFee, orderTimestamp, orderStatus, } }`;
