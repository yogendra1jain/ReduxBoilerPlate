import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/app';
import reducers from './reducers';
import {BrowserRouter,Route} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
     primary1Color: cyan500,
    primary2Color: cyan500,
    primary3Color: cyan500,
  }
});



const createStoreWithMiddleware = applyMiddleware()(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <MuiThemeProvider muiTheme = {getMuiTheme(muiTheme)}>
    <BrowserRouter>
    <div>
    <Route path="/app"  component={App}/>
    </div>
    </BrowserRouter>
      </MuiThemeProvider>
	</Provider>
  , document.querySelector('.container'));
