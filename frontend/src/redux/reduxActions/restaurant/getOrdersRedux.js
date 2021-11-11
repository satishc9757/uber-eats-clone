import axios from "axios";
import { SERVER_ENDPOINT } from "../../../components/constants/serverConfigs";
import { ERROR, GET_ORDERS } from "../actionTypes";
import { getResToken } from "../../../components/utils/ControllerUtils";

export const getOrders = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = getResToken();
    console.log("Update Data "+JSON.stringify(data));
    axios.get(SERVER_ENDPOINT+"/res/orders?resId="+ data)
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
