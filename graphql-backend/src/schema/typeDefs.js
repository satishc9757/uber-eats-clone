const { gql } = require("apollo-server");

const typeDefs = gql`
  type Customer {
    custId: String
    custFirstName: String
    custLastName: String
    custEmail: String
    custStreet: String
    custCity: String
    custState: String
    custZipcode: String
    custCountry: String
    custImage: String
    custPhone: String
    custAbout: String
    custNickname: String
    custDob: String
}
input Address {
    city: String
    street: String
    state: String
    country: String
    zipcode: Int
}
input CustomerInput {
    custId: String
    custFirstName: String
    custLastName: String
    custEmail: String
    custPassword: String
    custStreet: String
    custCity: String
    custState: String
    custZipcode: String
    custCountry: String
    custImage: String
    custPhone: String
    custAbout: String
    custNickname: String
    custDob: String
}
input Item {
  dishName: String
  dishPrice: Float
  dishQuantity: Int
}
input OrderInput {
  custId: String
  resId: String
  deliveryAddress: Address
  cartItems: [Item]
  deliveryFee: Float
  serviceFee: Float
  cartTotal: Float
}
type Order {
  _id: String
  orderId: String
  orderTotal: Float
  street: String
  city: String
  state: String
  zipcode: String
  orderTimestamp: String
  orderStatus: String
  orderDeliveryFee: Float
  orderServiceFee: Float
  custFirstName: String
  custLastName: String
  resName: String
}
type CustUser {
    custId: String
    custEmail: String
    custFirstName: String
    custLastName: String
    custImageLink: String
    custLocation: String
    message: String
  }
type OrderDetailItem {
  dishName: String
  odQuantity: Int
  odPrice: Float
}
type Restaurant {
  resId: String
  resName: String
  resEmail: String
  resStreet: String
  resCity: String
  resState: String
  resZipcode: String
  resImage: String
  resDescription: String
  resPhone: String
  resDeliveryType: String
  dishTypes: String
}
input ResInput {
  resName: String
  resEmail: String
  resPassword: String
  resStreet: String
  resCity: String
  resState: String
  resZipcode: String
  resCountry: String
}
input DishInput {
  dishId: String
  resId: String
  dishMainIngredients: String
  dishPrice: Float
  dishDesc: String
  dishCategory: String
  dishType: String
}
type Dish {
  _id: String
  dishName: String
  dishResId: String
  dishImage: String
  dishPrice: Float
  dishDesc: String
  dishCategory: String
  dishType: String
}
type Query {
    getCustomer(custId: String): Customer
    getCustOrder(custId: String): [Order]
    getRestaurant(resId: String): Restaurant
    restaurantSearch(searchText: String): [Restaurant]
    getDishByResId(resId: String): [Dish]
    getDish(dishId: String): Dish
    getResOrders(resId: String): [Order]
    getOrderDetails(orderId: String): [OrderDetailItem]
}
type Mutation {
    custLogin(email: String, password: String): CustUser
    custSignup(custInput: CustomerInput): CustUser
    custUpdate(custInput: CustomerInput): CustUser
    createOrder(custOrder: OrderInput): String
    restaurantSignup(resInput: ResInput): Restaurant
    resLogin(email: String, password: String): Restaurant
    createDish(dishInput: DishInput):Dish
    updateDish(dishInput: DishInput):Dish
    updateOrderStatus(orderId: String, orderStatus: String):Order
}
`;

module.exports = typeDefs;