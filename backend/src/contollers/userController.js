var con = require('../database/mysqlConnection');

exports.register_user = function (req, res) {
    //validate user details
    
    const data = req.body;
    if(isCustEmailAlreadyRegistered(data.cust_email)){
        res.status(400).send(JSON.stringify({message: "Customer already exists!"}));
    } else {
        console.log(data);
        let sql = "INSERT INTO customers (cust_first_name, cust_last_name, cust_email, cust_password) VALUES (?, ?, ?, SHA1(?))";
        con.query(sql, [data.cust_first_name, data.cust_last_name, data.cust_email, data.cust_password], (err, result) => {
            if(err) {
                console.error("register_user : "+err);
                res.status(500).send(JSON.stringify({message: "Something went wrong!", err}));
            } else {
                console.log(result);
                res.send(JSON.stringify({message: "User Registeration done!"}));
            }
            
        });
    }
    
};

isCustEmailAlreadyRegistered = (cust_email) => {
    let sql = "SELECT COUNT(*) as count FROM customers WHERE cust_email = ?";
    let res = false;
    con.query(sql, cust_email, (err, result) => {
        if(err) {
            console.error("isCustEmailAlreadyRegistered : "+err);
            res =  false;
        } else {
            console.log("Customer" + result[0].count);
            res = result[0].count == 0 ? false : true;
            console.log("res 1 : "+res);
        }
        
    });
    console.log("res 2 : "+res);
    return res;
}

exports.login_user = function (req, res) {
    console.log("Here ");
    const data = req.body;
    
    
    if(!isCustEmailAlreadyRegistered(data.username)){
        res.status(400).send(JSON.stringify({message: "Customer account does not exist."}));
    } else {
        console.log(data);
        let sql = "SELECT COUNT(*) as count FROM customers WHERE cust_email = ? and cust_password = SHA1(?)";
        con.query(sql, [data.username, data.password], (err, result) => {
            if(err) {
                console.error("login_user : "+err);
                res.status(500).send(JSON.stringify({message: "Something went wrong!", err}));
            } else {
                console.log(result);
                if(result[0].count == 0){
                    res.status(400).send(JSON.stringify({message: "Invalid login credentials."}));
                } {
                    res.send(JSON.stringify({message: "Login success."})); 
                }
                
            }
            
        });
    }
};