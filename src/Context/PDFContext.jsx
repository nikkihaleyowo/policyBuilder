import { createContext, useContext, useReducer } from "react";

const PDFContext = createContext();

const initialState =  {
  preview: false
}

function PDFReducer(state,action){
  switch(action.type){
    case 'UPDATE_PREVIEW':
      state.preview = action.payload.preview;
    return{...state}
    default:
      return state;
  }
}

const PDFContextProvider = (props) => {
  const [state, dispatch] = useReducer(PDFReducer, initialState);

  return(
    <PDFContext.Provider value={{state,dispatch}}>
      {props.children}
    </PDFContext.Provider>
  )
}

export const usePDFContext = () => {
  const context = useContext(PDFContext);
  if(context === undefined){
    throw new Error('usePDFContext must be used within a PDFContextProvider')
  }
  return context;
}

export {PDFContext, PDFContextProvider};