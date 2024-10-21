import { createContext, useContext, useReducer } from "react";


const NotificationContext = createContext();

const initialState = {
  notification: [],
  showing: false
}

function NotificationReducer(state,action){
  let newArr = state.notification;
  switch(action.type){
    case 'ADD_NOTIFICATION':
      console.log("new Not")
      newArr.push(action.payload.message);
      return{...state, notification: newArr}
    case 'POP_NOTIFICATION':
      if(newArr.length >0 ){
        newArr.shift();
        return{...state, notification: newArr}
      }
    default:
      return state;
  }
}

const NotificationContextProvider = (props) => {
  const [state,dispatch] = useReducer(NotificationReducer, initialState);

  return(
    <NotificationContext.Provider value={{state,dispatch}}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = () =>{
  const context = useContext(NotificationContext);
  if(context === undefined){
    throw new Error('useNotificationContext must be used within a UserContextProvider')
  }
  return context;
}

export {NotificationContext, NotificationContextProvider};