import axios from "axios";
import { SERVER_ENDPOINT } from "../../../components/constants/serverConfigs";
import { ERROR, UPDATE_PROFILE } from "../actionTypes";
import { getCustToken } from "../../../components/utils/ControllerUtils";

export const custUpdate = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = getCustToken();
    //console.log("Token : "+getCustToken());
    axios.defaults.withCredentials = true;
    console.log("Update Data "+JSON.stringify(data));
    axios.put(SERVER_ENDPOINT+"/customer/update", data)
        .then(response => {
            console.log("Response from customer update request ", response);
            dispatch({
                type: UPDATE_PROFILE,
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
