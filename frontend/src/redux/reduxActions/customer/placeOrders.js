import axios from "axios";
import { SERVER_ENDPOINT } from "../../../components/constants/serverConfigs";
import { ERROR, PLACE_ORDER } from "../actionTypes";
import { getCustToken } from "../../../components/utils/ControllerUtils";


export const placeOrder = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = getCustToken();
    axios.post(SERVER_ENDPOINT+"/customer/order/create", data)
        .then(response => {
            console.log("Response from customer register request ", response);
            dispatch({
                type: PLACE_ORDER,
                payload: response.data
            });
        })
        .catch(err => {
            console.log("Error from register request ", err);
            dispatch({
                type:ERROR,
                payload: err
            });
        });
}
