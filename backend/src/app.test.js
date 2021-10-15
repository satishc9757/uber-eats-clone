const assert = require('assert');
const app = require('./index');
const axios = require('axios')



//Testing login for customers
describe('POST customer Login API call', () => {
    const dummyCustomer = {custUsername: "abc@xyz.com", custPassword: "1234"};
    it('should return login successful message', async () => {
        const response = await axios.post('http://localhost:8000/customer/login', dummyCustomer);
        assert.strictEqual(response.data, "Successful Login");
    });
});


//Wrong Url should return 404
describe('Wrong GET customer API call should NOT return data', () => {
    const dummyCustId = 1010;
    it('should NOT return customer data', async () => {
        try{
            const response = await axios.get('http://localhost:8000/customer/'+dummyCustId);
        } catch(err){
           
            assert.strictEqual(err.response.status, 404);
        }
        
    });
});


//Customer by id
describe('GET customer API call should return only single user', () => {
    const dummyCustId = 1010;
    it('should return only single customer data', async () => {
            const response = await axios.get('http://localhost:8000/customer/id/'+dummyCustId);
            
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.length, 1);
    });
});


//Validate Customer by id with Dummy customer
describe('GET customer API call should return the correct dummy user data', () => {
    const dummyCustId = 1010;
    dummyCust = {
          custId: 1010,
          custFirstName: 'Satish',
          custLastName: 'Choudhary',
          custEmail: 'admin@abc.com'
         
    }
    it('should return correct customer data', async () => {
            const response = await axios.get('http://localhost:8000/customer/id/'+dummyCustId);
            
            
            assert.strictEqual(response.status, 200);
            assert.strictEqual(response.data.length, 1);

            responseCust = response.data[0];
            assert.strictEqual(responseCust.custId, dummyCust.custId);
            assert.strictEqual(responseCust.custFirstName, dummyCust.custFirstName);
            assert.strictEqual(responseCust.custLastName, dummyCust.custLastName);
            assert.strictEqual(responseCust.custEmail, dummyCust.custEmail);
    });
});


//Testing Server side validations
describe('Restaurant registration should not work for invalid input fields', () => {
    const dummyCustId = 1010;
    dummyRestaurant = {
        resName: "Dummy Restaurant",
        resEmail: "res@gmail", //invalid email
        resPassword: "1234",
        resStreet: "1st Street",
        resCity: "San Jose%^&$^%^", //invalid city
        resState: "CA",
        resZipcode: "95144",
        resCountry: "US",
        resDeliveryType:"Delivery"
    }
    it('should NOT register restaurant', async () => {
         try{
            const response = await axios.post('http://localhost:8000/res/register', dummyRestaurant);
           
        } catch(err){
            console.log(err.response.data)
            assert.strictEqual(err.response.status, 400);
            assert.strictEqual(err.response.data.errors.length, 2);
            assert.strictEqual(err.response.data.errors[0].msg, "Invalid City name.");
            assert.strictEqual(err.response.data.errors[1].msg, "Invalid email address!");
        }
            
            
    
            
    });
});




