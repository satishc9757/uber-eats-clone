import axios from "axios";
import { SERVER_ENDPOINT } from "../../../components/constants/serverConfigs";
import { ERROR, GET_ORDERS } from "../actionTypes";
import { getCustToken } from "../../../components/utils/ControllerUtils";

export const getOrders = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = getCustToken();
    axios.get(SERVER_ENDPOINT+"/customer/orders?custId="+data)
        .then(response => {
            console.log("Response from getOrders request ", response);
            dispatch({
                type: GET_ORDERS,
                payload: response.data
            });
        })
        .catch(err => {
            console.log("Error from update request ", err);
            dispatch({
                type:ERROR,
                payload: err
            });
        });
}
