import React from 'react'

import { usePolicyContext } from '../Context/PolicyContext'

const ContextTester = () => {
  const  {state, dispatch} = usePolicyContext();

  function handleClick(){
    
    dispatch({type: 'UPDATE_TEST', payload: (2)})
    console.log(state)
  }

  return (
    <div>
      {state && (<div><button onClick={handleClick}>Click</button>
        <h1>{state.test}</h1></div>)}
      
    </div>
  )
}

export default ContextTester