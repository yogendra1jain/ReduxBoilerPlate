import React, { Component } from 'react';
import {connect} from 'react-redux';
import BillPage from './BillPage/billPage.js'
 class App extends Component {
  render() {
  	console.log(this.props)
    return (
      <div>
      <BillPage/>
      </div>
    );
  }
}
function mapStateToProps(state){
return {}
}
export default connect(mapStateToProps,{})(App)
