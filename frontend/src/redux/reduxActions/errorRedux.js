import { ERROR } from "./actionTypes";

const errorAction = (data) => {
    return {
        type: ERROR,
        payload: data
    }
}

export default errorAction;