import axios from "axios";
import { SERVER_ENDPOINT } from "../../../components/constants/serverConfigs";
import { ERROR, UPDATE_DISH_DATA } from "../actionTypes";
import { getResToken } from "../../../components/utils/ControllerUtils";

export const dishUpdate = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = getResToken();
    console.log("Update Data "+JSON.stringify(data));
    axios.put(SERVER_ENDPOINT+"/res/dish", data)
        .then(response => {
            console.log("Response from res update request ", response);
            dispatch({
                type: UPDATE_DISH_DATA,
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
