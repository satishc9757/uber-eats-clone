const assert = require('assert');
const app = require('./index');
const axios = require('axios')


//JWT authorization check
describe('GET customer API without JWT Token in the header should not return data', () => {
    const dummyCustId = "619188ae347e94197f808f90";
    it('should fail at JWT authorization', async () => {
            try{
                const response = await axios.get('http://localhost:8000/customer/id/'+dummyCustId);

            } catch(err){
                console.log("Error in customer by id: ", err);
                assert.strictEqual(response.status, 200);
                assert.strictEqual(response.data, "Unauthorized");
            }

    });
});

//Testing login for customers
describe('POST customer Login API call', () => {
    setToken();

    const dummyCustomer = {custUsername: "dummy@test.com", custPassword: "1234"};
    it('should return login successful message', async () => {
        const response = await axios.post('http://localhost:8000/customer/login', dummyCustomer);
        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.split(" ")[0], "JWT");
    });
});


//Wrong Url should return 404
describe('Wrong GET customer API call should NOT return data', () => {
    setToken();

    const dummyCustId = "619188ae347e94197f808f90";
    it('should NOT return customer data', async () => {
        try{
            const response = await axios.get('http://localhost:8000/customer/'+dummyCustId);
        } catch(err){

            assert.strictEqual(err.response.status, 404);
        }

    });
});


//Validate Customer by id with Dummy customer
describe('GET customer API call should return the correct dummy user data', () => {
    setToken();

    const dummyCustId = "619188ae347e94197f808f90";
    dummyCust = {
          custId: "619188ae347e94197f808f90",
          custFirstName: 'Dummy',
          custLastName: 'Test',
          custEmail: 'dummy@test.com'

    }
    it('should return correct customer data', async () => {
            const response = await axios.get('http://localhost:8000/customer/id/'+dummyCustId);

            assert.strictEqual(response.status, 200);

            responseCust = response.data;
            assert.strictEqual(responseCust.custId, dummyCust.custId);
            assert.strictEqual(responseCust.custFirstName, dummyCust.custFirstName);
            assert.strictEqual(responseCust.custLastName, dummyCust.custLastName);
            assert.strictEqual(responseCust.custEmail, dummyCust.custEmail);

    });
});


//Testing Server side validations
describe('Restaurant registration should not work for invalid input fields', () => {
    setToken();

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


function setToken(){
    axios.defaults.headers.common['authorization'] = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTcyNjNjNzQxZTg1OTMyM2QyZDU2MGYiLCJ1c2VybmFtZSI6ImFkbWluQG1vbmdvZGIxLmNvbSIsInVzZXJUeXBlIjoiY3VzdG9tZXIiLCJpYXQiOjE2MzY5MjI0OTMsImV4cCI6MTYzNzkzMDQ5M30.reAPmZ37voIgWLTDYxMiHnWKenANw96HMdffd7kVFI8";
}