import { combineReducers } from "redux";
import userReducers from "./reducer";

const rootReducers = combineReducers({
  data: userReducers,
});

export default rootReducers;
