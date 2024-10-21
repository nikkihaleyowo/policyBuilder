import React from 'react'
import { usePolicyContext } from '../Context/PolicyContext';
import { usePDFContext } from '../Context/PDFContext';
import { useAuth0 } from '@auth0/auth0-react';
import Editor from '../components/Editor';
import PDFFile from '../components/PDFFile';
import { PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from "@react-pdf/renderer"
import LayerDropDown from '../components/LayerDropDown';
import { useUserContext } from '../Context/UserContext';

const EditorPage = () => {

  const buttonStyle = "bg-color-neutral-400 border-purple-200"
  const {state, dispatch} = usePolicyContext();
  const {state:PDFState, dispatch:PDFDispatch} = usePDFContext();
  const {state:userState} = useUserContext();
  function closeViewer(){
    PDFDispatch({
      type: "UPDATE_PREVIEW",
      payload: { preview: false } 
    });
  }

  const {
    isLoading,
    error,
    isAuthenticated,
    user
  } = useAuth0();

  return (
    <>
    <div className="flex flex-row">
      {state && (
        <>
        
          <div className=" border-neutral-900 border-opacity-80 backdrop-filter backdrop-blur-sm w-[80%] m-auto relative z-0 h-screen overflow-y-auto ...">
          
          
            <Editor />
            {
              PDFState&&(
              PDFState.preview&&(
                <div className="m-auto absolute top-0 left-0 right-0 bottom-0 z-15">  
                  <div className="items-center justify-center text-center border-3 rounded-md border-neutral-900
                  backdrop-filter backdrop-blur-lg">
                    <div className="ml-auto ">
                      <button className="mr-10 text-neutral-900 outline-1 rounded m-2 bg-slate-100 hover:bg-slate-400 active:bg-slate-600 active:outline px-2 mt-4"
                      onClick={closeViewer}>Close</button>
                      <PDFDownloadLink document={<PDFFile state={state.data} userState={userState}/>} fileName="FORM">
                        {({loading}) => (loading ? <button className={buttonStyle}>loading document...</button> : <button className=" text-neutral-900 outline-1 rounded m-2 bg-slate-100 hover:bg-slate-400 active:bg-slate-600 active:outline ">Download</button>)}
                      </PDFDownloadLink>
                    </div>
                    <PDFViewer className="w-full h-screen">
                    <PDFFile state={state.data} userState={userState}/>
                    </PDFViewer>
                  </div>
                </div>
              ))
            }
          </div>
        </>
      )}
    </div>
    <LayerDropDown />
    </>
  )
}

export default EditorPage