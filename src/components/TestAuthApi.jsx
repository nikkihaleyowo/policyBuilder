import React, { useDebugValue, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const TestAuthApi = () => {
  const [data,setData] = useState(null);
  const {getAccessTokenSilently} = useAuth0();

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const token = await getAccessTokenSilently({
          audience:"https://dev-r738q3fzlrmjbat5.us.auth0.com/api/v2/"
        });
        const response = await fetch('http://localhost:3001/protected', {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = await response.text();
        setData(responseData)
        console.log(responseData)
      }
      catch(error){
        console.log("error: "+error);
      }
    }
    console.log('try')
    fetchData();
  },[])

  return (
    <>
    </>
  )
}

export default TestAuthApi