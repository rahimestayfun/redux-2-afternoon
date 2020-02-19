import axios from 'axios';

const initialState={
    purchases: [],
    budgetLimit: null,
    loading: false
  }

  const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA';
  const ADD_PURCHASE = 'ADD_PURCHASE';
  const REMOVE_PURCHASE = 'REMOVE_PURCHASE';


  export default function reducer (state=initialState,action){
      switch(action.type){
    // IN ORDER TO KEEP VALUES PREVIOUSLY STORED ON STATE, WE SPREAD THE CURRENT STATE OBJECT
    // INTO THE RETURNED OBJECT AND UPDATE ONLY THE VALUES IN STATE WE WANT TO CHANGE
        case REQUEST_BUDGET_DATA+'_PENDING':
        return{
            ...state,
            loading:true
        }
        case REQUEST_BUDGET_DATA+'_FULFILLED':
        return{
            ...state,
            ...action.payload,
            loading:false
        }
        case ADD_PURCHASE+'_PENDING':
        return{
                ...state,
                loading:true
        }
        case ADD_PURCHASE+'_FULFILLED':
        return{
                ...state,
                purchases: action.payload,
                loading:false
        }
        case REMOVE_PURCHASE+'_PENDING':
        return{
                ...state,
                loading:true
        }
        case REMOVE_PURCHASE+'_FULFILLED':
        return{
                ...state,
                purchases: action.payload,
                loading:false
        }
          default: return state
      }
  }
// SET UP AN ACTION CREATOR THAT RETURNS AN ACTION OBJECT WITH A TYPE AND PAYLOAD PROPERTY
//action creator
export function requestBudgetData(){
    let data = axios.get('/api/budget-data').then(res=>res.data)
    return{
        type:REQUEST_BUDGET_DATA,
        payload: data
    }
}

export function addPurchase(price,description,category){
    let data = axios.post('/api/budget-data/purchase',{description,price,category}).then(res=>res.data)
    return{
        type:ADD_PURCHASE,
        payload:data
    }
}
export function removePurchase(id){
    let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res=>res.data);
    return{
        type:REMOVE_PURCHASE,
        payload:data
    }
}

