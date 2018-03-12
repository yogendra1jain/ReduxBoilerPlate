import { combineReducers } from 'redux';
var formReducer = require('redux-form').reducer;

const rootReducer = combineReducers({
    form: formReducer
});

export default rootReducer;
