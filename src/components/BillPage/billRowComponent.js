import React,{Component} from 'react';
import { Field} from 'redux-form';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
const renderField = (props) =>


{ 
const { input, label, type, meta: { touched, error } } =props
return(
  <div>
      <TextField 
        hintText={label}
    	floatingLabelText={label}
    	errorText={touched && error}
    	{...input}/>
  </div>
)
}
  

export default  class billRowComponent extends Component

{
constructor(props)
{
	super(props);
}
digitnormalizer = (value,previousValue,wholeArray,previousArray,index)=>
 {
 	
 	if (!value) {
 	this.props.autofill(`members[${index}].ammount`,null);
    return value
  }
    const onlyNums = value.replace(/[^\d]/g, '');
    let totalammount=null;
 	if(wholeArray.members[index].quantity&&wholeArray.members[index].rate)
 	{
 		totalammount = wholeArray.members[index].quantity.replace(/[^\d]/g, '')*wholeArray.members[index].rate.replace(/[^\d]/g, '')
 	}
    this.props.autofill(`members[${index}].ammount`,totalammount);
    return onlyNums
 } 


render()
{
const { fields, meta: { error } } = this.props;

	return(
		<div >
			<div>
    			
      				
    <Card >
    {fields.map((rows, index) => (
      <div key={index} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <Field
          name={`${rows}.particulars`}
          type="text"
          component={renderField}
          label='Particular'
        />
        <Field
          name={`${rows}.quantity`}
          type="text"
          component={renderField}
          label='Quantity'
          normalize = {(a,b,c,d)=>{return this.digitnormalizer(a,b,c,d,index)}}
        />
        <Field
          name={`${rows}.rate`}
          type="text"
          component={renderField}
          label='Rate'
          normalize = {(a,b,c,d)=>{return this.digitnormalizer(a,b,c,d,index)}}
        />
        <Field
          name={`${rows}.ammount`}
          type="text"
          component={renderField}
          label='Amount'
        />
        <i className="material-icons" style={{cursor:'pointer',color:"red"}} onClick={() => fields.remove(index)}>clear</i>
      </div>
    ))}
    <div style={{float:'right',color:'green',cursor:'pointer'}}  onClick={() => fields.push()}>
     <i  className="material-icons" >add</i><span style={{position:'relative',top:'-6px'}}>Add More</span>
    			</div>
    </Card>
    
    {error && <li className="error">{error}</li>}
  </div>
		</div>
		)
}
}

