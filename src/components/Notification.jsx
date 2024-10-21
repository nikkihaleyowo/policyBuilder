import React, { useState, useEffect, useDebugValue } from 'react';
import { motion } from 'framer-motion';
import { useNotificationContext } from '../Context/NotificationContext';

const Notification = () => {

  const {state, dispatch} = useNotificationContext();
  const [isOpen,setIsOpen] = useState(false)

  function showNotification(){
    setIsOpen(true);

    setTimeout(()=>{
      setIsOpen(false)
      setTimeout(()=>{
        dispatch({
          type: "POP_NOTIFICATION"
        });
        console.log("Old: "+state.notification.length)
        if(state.notification.length-1>0){
          showNotification();
        }
      },500)
    },3000)
  }

  useEffect(()=>{
    console.log("new: "+state.notification.length)
    if(!isOpen){
      if(state.notification.length>0)
        showNotification();
    }
  },[state])

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.8,y: -10 },
    visible: { opacity: 1, scale: 1, y:10},
  };

  return (
    <div className='relative z-20'>
      <motion.div
        initial="hidden"
        animate={isOpen ? 'visible' : 'hidden'}
        variants={dropdownVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute top-full w-48 bg-white rounded-md shadow-md border border-gray-200 ml-[10%]"
      >
        <ul className="p-2">
          <li className="py-1">{state.notification[0]}</li>
        </ul>
      </motion.div>
    </div>
  )
}

export default Notification