import React, {createContext, useContext, useReducer, useEffect} from "react";

import { PolicyList } from "../utils/policyData";

const PolicyContext = createContext();


const intialState = {data:{...PolicyList[2]}, userPol: false};

function moveElement(array, fromIndex, toIndex) {
  const element = array.splice(fromIndex, 1)[0]; // Remove the element from the original position
  array.splice(toIndex, 0, element); // Insert the element at the new position
  return array;
}

function policyReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_POLICY':
      let newArr = [...state.data.data]; // Create a copy of the array

      /*const activeIndex = newArr.indexOf(action.payload.active);
      const overIndex = newArr.indexOf(action.payload.over);*/
      const activeIndex = newArr.findIndex(obj => obj.subTitle === action.payload.active)
      const overIndex = newArr.findIndex(obj => obj.subTitle ===action.payload.over)

      newArr = moveElement(newArr,activeIndex,overIndex)

      let idArr = [...state.data.ids];

      idArr = moveElement(idArr,activeIndex,overIndex);

      const newData = {...state.data, data: newArr, ids: idArr}

      return { ...state, data:newData}; // Correct syntax for updating nested property
    
    case 'UPDATE_TEXT':{
      if(action.payload.highIndex!==-1){
        let newArr = [...state.data.data];
        let newText = action.payload.text
        newArr[action.payload.subIndex].data[action.payload.highIndex].data=newText;
        newArr[action.payload.subIndex].data[action.payload.highIndex].type=action.payload.type;
        const newData = {...state.data, data:newArr}
        return{...state, data: newData}
      }else{
        //let newText = state.data[action.payload.subIndex].data[action.payload.highIndex].
        console.log("fucl")
      }
      
    }
    case 'ADD_TEXT':{
      let newArr = [...state.data.data];
      newArr[action.payload.index].data.push({
        type:"p", data:[""]
      })
      const newData = {...state.data, data: newArr}
      return{...state, data: newData}
    }
    case 'ADD_POLICY':
      const hasIndex = PolicyList.findIndex(pol => pol.title === action.payload.policy)
      if(hasIndex>-1){
        console.log("add pol")
        const newArr = PolicyList[hasIndex]
        return{data:{...newArr}, userPol:false}
      }
      
      return{...state}
    case 'SET_POLICY':
      console.log("set pol: "+action.payload)
      return{...action.payload.data, userPol:true}
    case 'CREATE_POLICY':
      console.log("set pol: "+action.payload)
      return{...action.payload.data, userPol:false}
    case 'REMOVE_POLICY':
      const removeIndex = state.data.data.findIndex(pol => pol.subTitle === action.payload.policy)
      console.log(removeIndex)
      state.data.data.splice(removeIndex,1);
      state.data.ids.splice(removeIndex,1);
      return{...state}
    case 'EDIT_SUBTITLE':
      state.data.data[action.payload.index].subTitle = action.payload.subTitle;
      console.log(action.payload.subTitle)
      state.data.ids[action.payload.index]=action.payload.subTitle;
      return{...state}  
    case 'ADD_SUB':
      let num = -1;
      let str = "[category]";
      let index = state.data.data.findIndex(pol => pol.subTitle === str)
      while(index!==-1){
        num++;
        index = state.data.data.findIndex(pol => pol.subTitle === `[category${num}]`)
      }
      if(num!==-1)
        str = `[category${num}]`

      state.data.data.push({
        subTitle: str,
        data:[]
      })
      state.data.ids.push(str)
      return{...state}
    case "EDIT_TITLE":
      const nData = state.data;
      nData.title = action.payload;
      return {...state, data: nData }
    default:
      return state;
  }
}

const PolicyContextProvider = (props) => {
    const [state, dispatch] = useReducer(policyReducer, intialState);

    useEffect(() => {
      console.log('Context state updated:', state);
    }, [state]);

    return (
        <PolicyContext.Provider value={{state, dispatch}}>
            {props.children}
        </PolicyContext.Provider>
    )
}

export const usePolicyContext = () => {
    const context = useContext(PolicyContext);
    if (context === undefined) {
      throw new Error('usePolicyContext must be used within a PolicyContextProvider');
    }
    return context;
};

export { PolicyContext, PolicyContextProvider }; 