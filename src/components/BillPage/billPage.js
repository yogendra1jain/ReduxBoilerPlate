import React,{Component} from 'react';
import { Field, FieldArray, reduxForm,formValueSelector } from 'redux-form';
import BillRowComponent from './billRowComponent.js';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import axios from 'axios';
 
class BillPage extends Component
{
	constructor(props)
	{
		super(props);
	}
	submithandler(values)
	{
		debugger;
		let data = {};
		data.customerName="first customer";
		data.CustomerId = "212121345445ee";
		data.items = values.members;
		data.grandAmmount=this.props.grandAmmount;
		data.totalQuantity=this.props.totalQuantity;
		console.log(data,"data")
		axios.post(' https://k4v8i7cb2f.execute-api.ap-south-1.amazonaws.com/dev/create-bill-data',data).
		then((response)=>
		{
			console.log(response);
			alert("data saved succesfully")
		})
	}
	render()
	{
		console.log(this.props,"props")

		const { handleSubmit, pristine, reset, submitting } = this.props
		return(
			<div style={{marginLeft:'16px', marginRight:'16px'}}>
			 <form onSubmit={handleSubmit((values)=>{this.submithandler(values)})}>

      <FieldArray name="members" component={BillRowComponent} autofill={this.props.autofill}/>
      <div style={{display:'flex',justifyContent:'center',marginTop:'50px',fontSize:'20px'}}>
      {this.props.totalQuantity?<span >Total Quantity-{this.props.totalQuantity}</span>:null}
      {this.props.grandAmmount?<span style={{marginLeft:'10px'}}>Grand Ammount-{this.props.grandAmmount}</span>:null}
      </div>

      <div style={{display:'flex',justifyContent:'center',marginTop:'50px'}}>
        
         <RaisedButton   type="submit" label="submit" primary={true} disabled={submitting} />
         <RaisedButton  style={{marginLeft:'20px'}} label="Clear Values" primary={true} disabled={pristine || submitting} onClick={reset} />
      
      </div>
      
    </form>
			</div>
			)
	}
}



const BillForm = reduxForm({
  form: 'BillForm',
  initialValues :{members:[{}]}
  // a unique identifier for this form
})(BillPage)

const selector = formValueSelector('BillForm');
function mapStateToProps(state)
{
	let members  = selector(state,'members');
	let totalQuantity=0;
	let grandAmmount=0;
	if(members)
	members.forEach(function(member){

	 if(member&&member.quantity)
	 	totalQuantity=parseFloat(member.quantity)+totalQuantity;
	 if(member&&member.ammount)
	 	grandAmmount = grandAmmount+parseFloat(member.ammount)
	})
console.log(totalQuantity,grandAmmount,"state")
  return {totalQuantity,grandAmmount}
}
const SelectingFormValuesForm = connect(mapStateToProps,{})(BillForm)

export default SelectingFormValuesForm