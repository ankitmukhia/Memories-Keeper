import { combineReducers } from "@reduxjs/toolkit";

import posts from "./PostsReducers";
import auth from "./authReducer";

export default combineReducers({
    posts, 
    auth
});

