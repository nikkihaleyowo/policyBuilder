import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor
} from "@dnd-kit/core"
import{
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"
import SortableItem from './SortableItem.jsx';

import { usePolicyContext } from '../Context/PolicyContext'
import { useEffect, useState } from 'react';

function Editor() {
  const  {state, dispatch} = usePolicyContext();
  const [title,setTitle] = useState('');
  const [editTitle,setEditTitle] = useState(false);

  useEffect(() =>{
    setTitle(state.data.title)
  },[])

  useEffect(() =>{
    setTitle(state.data.title)
  },[state.data.title])

  useEffect(() => {
    // Do something when the context's state.data changes
    console.log('State data has changed:', state.data.data);
  }, [state.data.data]);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5, 
      delay: 200,  
    }
  });

  function createSub(){
    dispatch({
      type: "ADD_SUB"
    });
  }

  function saveTitle(){
    dispatch({
      type: "EDIT_TITLE",
      payload: title
    });
    setEditTitle(false)
  }

  return (
    <>
    {console.log("state")}
    {console.log(state)}
    {state &&(
    (<DndContext
      sensors={[pointerSensor]}
      collisionDetection={closestCenter}
      onDragEnd={HandleDragEnd}
      autoScroll={{ layoutShiftCompensation: false, enable: false }}
    >
      <Container className='p-3 w-[100%] items-center text-center  bg-opacity-30'>
        <div className="ml-[2%]">
        
        <h3 className='font-bold text-neutral-100 text-pretty hover:underline tracking-wider text-2xl mb-4 bg-slate-800 py-4 rounded-md -z-10 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] w-[97%]'>
          {
            editTitle ? 
            (<>
            <textarea
            className="w-full text-center border-b-2 border-neutral-700 mb-3 h-12 break-words bg-transparent mt-2 ..."
            value={title}
            onChange={(event) =>setTitle(event.target.value)}
          />
          <button className="" onClick={saveTitle}>Save</button>
          </>) :
            <p className="" onDoubleClick={() => setEditTitle(true)}>{title+":"}</p>
          }
        </h3>
        </div>
        <SortableContext
          items={state.data.ids}
          strategy={verticalListSortingStrategy}
        >
          {/* use the useSortable hook*/
          //console.log(state.data)
          }
          {state.data.data.map((sub, index) => <SortableItem key={sub.subTitle} id={sub.subTitle} distance={1} sub={sub} index={index}/>)}
          </SortableContext>
        <div className="text-white text-3xl ml-[97%] mt-2 h-6 flex items-center justify-center pb-1.5" onMouseDown={createSub}>+</div> 
      </Container>
      
    </DndContext>))}
    </>
  )

  function HandleDragEnd(event){
    //console.log("draged and called")
    const {active, over} = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if(active.id !== over.id){
      dispatch({
        type: "UPDATE_POLICY",
        payload: { active: active.id, over: over.id } 
      });
      console.log("---------")
      console.log(state)

    }
  }
}

export default Editor
