import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import {connect} from 'react-redux';
import {requestUserData} from '../../ducks/userReducer';
import {requestBudgetData,addPurchase,removePurchase} from '../../ducks/budgetReducer';



class Budget extends Component {
  componentDidMount(){
    this.props.requestUserData();
    // WHEN THE COMPONENT MOUNTS, THE ACTION CREATOR IS INVOKED, THE REDUCER FUNCTION FIRES, 
    //AND STATE IS UPDATED ACCORDINGLY IN THE REDUX STORE
    this.props.requestBudgetData();
  }

  render() {
    const {loading,purchases,budgetLimit}= this.props.budget;
    const {firstName,lastName}= this.props.user;
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName}/>
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase addPurchase={this.props.addPurchase} />
              <DisplayPurchases purchases={purchases} removePurchase={this.props.removePurchase}/>
            </div>
            <div className='chart-container'>
              <Chart1  purchases={purchases} budgetLimit={budgetLimit}/>
              <Chart2  purchases={purchases}/>
            </div>
          </div>
        </div>
      </Background>
    )
  }
}
// THIS FUNCTION TAKES IN THE REDUX STORE STATE AND MAPS THE BUDGET REDUCER INFO 
// FROM THE REDUX STORE TO A BUDGET KEY ON THIS COMPONENT'S PROPS OBJECT

//All redux store state values managed by the budgetReducer are now on this.props.budget of the props object of your Budget component,
const mapStateToProps = state=>{
  return{
    budget:state.budget,
    user:state.user
  }
}

// THE CONNECT METHOD TAKES IN THE mapStateToProps FUNCTION AND CONNECTS THIS COMPONENT TO THE REDUX STORE
export default connect(mapStateToProps,{requestUserData,requestBudgetData,addPurchase,removePurchase})(Budget);

//an object that takes in all of the action creators from your reducers and provides access to these actions in this.props