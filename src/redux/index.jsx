import { authActions, authReducers } from "./auth";
import { menuActions, menuReducer } from "./menu";
import { formActions, formReducer } from "./form";
const actions = {
  authActions,
  menuActions,
  formActions,
};

const reducers = {
  authReducers,
  menuReducer,
  formReducer,
};

export { actions, reducers };
