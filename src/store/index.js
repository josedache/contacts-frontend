import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const logger = store => nextMiddlewareDispatch => action => {
  console.log("[Action]: ", action);
  const result = nextMiddlewareDispatch(action);
  console.log("[new state]: ", store.getState());
  return result;
};

const store = createStore(reducer, applyMiddleware(/* logger, */ thunk));

export default store;
