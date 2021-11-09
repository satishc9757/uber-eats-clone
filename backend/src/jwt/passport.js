"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
var kafka = require('../kafka/client');

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            const user_id = jwt_payload._id;
            console.log("auth called "+user_id);
            kafka.make_request('validate_cust',{custId: user_id}, function(err,results){
                console.log('in result');
                console.log(results);
                if (err) {
                    return callback(err, false);
                } else if(results.response_code == 200){
                    console.log("Verification success")
                    callback(null, results.response_data);
                } else if(results.response_code == 400){
                    callback(null, false);
                } else {
                    callback(null, false);
                }

            });

        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
