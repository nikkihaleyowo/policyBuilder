import React, { useEffect } from 'react'
import { useUserContext } from '../Context/UserContext'

import { useNavigate } from 'react-router-dom'

import { formatLocation, formatDate} from '../utils/utils'

const CompanyInfo = () => {
  //const [state,dispatch] = useUserContext();
  const {dispatch,state} = useUserContext();
  const navigate = useNavigate()

  useEffect(() => {
    // Do something when the context's state.data changes
    console.log('State data has changed:', state.companyData);
  }, [state]);

  return (
    <div className="w-[95%] bg-neutral-200 m-auto h-screen overflow-y-scroll">
      <h1 className="text-4xl font-bold m-auto text-center underline">Company Information</h1>
      <div className="flow-root">
        <div className="ml-10 float-left">
          <p className="text-2xl pt-10">{state.companyData.name==='' ? "[Unknown Name]" : state.companyData.name}</p>
          <p className="text-2xl pt-4">{state.companyData.address==='' ? "[Unknown Location]" : formatLocation(state.companyData)}
          </p>
          <button className="border-1 border-neutral-950 rounded-md  px-1 mt-2 font-bold bg-neutral-300 mb-2 hover:bg-slate-300" onClick={() => {navigate('/editCompany')}}>Edit Info</button>
        </div>
        <div className="text-2xl mt-10 float-right mr-[20%]">
          <h2 className="underline">Current Plan:</h2>
        </div>
      </div>
      <div className="my-table-container">
        <h1 className="text-3xl text-center mb-4">History:</h1>
        <div className="w-[100%]">
          <table className="table-auto border-collapse border-gray-200 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-2 text-xs font-semibold text-gray-800 w-1/3">Title</th> {/* Set width (optional) */}
                <th className="px-6 py-2 text-xs font-semibold text-gray-800 w-1/3">Modification</th> {/* Set width (optional) */}
                <th className="px-6 py-2 text-xs font-semibold text-gray-800 w-1/3">Date</th> {/* Set width (optional) */}
              </tr>
            </thead>
            <tbody>
              {state.historyData.map((en, index) => (
                
                <tr className={index%2===0 ? 'bg-neutral-300' : ''}>
                  <td className="px-6 py-1 text-sm text-gray-500">{en.title}</td>
                  <td className="px-6 py-1 text-sm text-gray-500">{en.modification}</td>
                  <td className="px-6 py-1 text-sm text-gray-500">{formatDate(en.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CompanyInfo