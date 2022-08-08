import { authActions, authReducers } from "./auth";
import { menuActions, menuReducer } from "./menu";
import { formActions, formReducer } from "./form";
import { restaurantActions, restaurantReducers } from "./restaurant";
import { orderReducer, orderActions } from "./realtime";

const actions = {
  authActions,
  menuActions,
  formActions,
  restaurantActions,
  orderActions
};

const reducers = {
  authReducers,
  menuReducer,
  formReducer,
  restaurantReducers,
  orderReducer
};

export { actions, reducers };
