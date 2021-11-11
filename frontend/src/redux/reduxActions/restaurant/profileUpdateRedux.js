import axios from "axios";
import { SERVER_ENDPOINT } from "../../../components/constants/serverConfigs";
import { ERROR, UPDATE_PROFILE } from "../actionTypes";
import { getResToken } from "../../../components/utils/ControllerUtils";

export const resUpdate = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = getResToken();
    console.log("Update Data "+JSON.stringify(data));
    axios.put(SERVER_ENDPOINT+"/res/update", data)
        .then(response => {
            console.log("Response from res update request ", response);
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
