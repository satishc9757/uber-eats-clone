
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport_res = require("passport");
var { secret } = require("./config");
var kafka = require('../kafka/client');

// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport_res.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            console.log("auth called "+JSON.stringify(jwt_payload));
            const user_id = jwt_payload._id;

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

        })
    )
}

exports.passport_res = passport_res;
exports.auth = auth;
exports.checkAuth = passport_res.authenticate("jwt", { session: false });
