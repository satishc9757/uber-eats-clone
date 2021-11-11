
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
var kafka = require('../kafka/client');

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            console.log("auth called cust "+JSON.stringify(jwt_payload));
            const user_id = jwt_payload._id;
            const userType = jwt_payload.userType;
            if(userType == "customer"){
                kafka.make_request('validate_cust',{custId: user_id}, function(err,results){
                    console.log(results);
                    if (err) {
                        console.log("Failure 1")
                        return callback(err, false);
                    } else if(results.response_code == 200){
                        console.log("Verification success")
                        callback(null, results.response_data);
                    } else if(results.response_code == 400){
                        console.log("Failure 2")
                        callback(null, false);
                    } else {
                        console.log("Failure 3")
                        callback(null, false);
                    }

                });
            } else {
                kafka.make_request('validate_res',{resId: user_id}, function(err,results){
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
            }


        })
    )
}

exports.passport = passport;
exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


// exports.authorized = function authorized(request, response, next) {
//     passport.authenticate('jwt', { session: false}, async (error, token) => {
//         console.log("Token is  "+token);
//         // if (error || !token) {
//         //     console.log("Error in token parsing "+error);
//         //     response.status(401).json({ message: 'Unauthorized Message' });
//         // } else {
//         //         console.log('token',token)

//         // }

//         next();
//     })(request, response, next);
// }