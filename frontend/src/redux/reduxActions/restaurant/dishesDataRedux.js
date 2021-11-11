import axios from "axios";
import { SERVER_ENDPOINT } from "../../../components/constants/serverConfigs";
import { ERROR, GET_DISH_DATA } from "../actionTypes";
import { getResToken } from "../../../components/utils/ControllerUtils";

export const getDishesData = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = getResToken();
    console.log("Update Data "+JSON.stringify(data));
    axios.get(SERVER_ENDPOINT+"/res/getDishByRes/"+ data)
        .then(response => {
            console.log("Response from getDishByRes request ", response);
            dispatch({
                type: GET_DISH_DATA,
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
