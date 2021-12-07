const customerResolvers = require("./customerResolvers");
const restaurantResolvers = require("./restaurantResolvers");

module.exports = {
  Query: {
    ...customerResolvers.Query,
    ...restaurantResolvers.Query,
  },
  Mutation: {
    ...customerResolvers.Mutation,
    ...restaurantResolvers.Mutation,
  },
};
