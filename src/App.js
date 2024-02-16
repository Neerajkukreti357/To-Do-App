import './App.css';
import React,{useEffect, useState} from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setTitle] = useState('');
  const [newDescription,setDiscription] = useState('');
  const [completedTodos,setComletedTodos] = useState([])

  //adding items to list and also add them to local storage
  const addToDoInList = ()=>{   
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear(); 
    let newTodoItem = {
      title:newTitle,
      description:newDescription,
      addedOn:dd + '/'+mm+'/'+yy
    }

    if(newTodoItem.title !== '' && newTodoItem.description !== ''){
      
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);

    setDiscription('');
    setTitle('');
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
    }
  }

  //it is used for taking data from localstorage and update the useState of todo list.
  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let completedToDos = JSON.parse(localStorage.getItem('completedToDos'));
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(completedToDos){
      setComletedTodos(completedToDos);
    }

  },[])

  //deleteing items from todo list.
  const deleteToDO = (index)=>{
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index,1);
    setTodos(reduceTodo);
    localStorage.setItem('todolist',JSON.stringify(reduceTodo));
  }

  // logic for deleting otems from completed-task-array
  const deleteToDOFromCompletedTask = (index)=>{
    let reduceTodo = [...completedTodos];
    reduceTodo.splice(index,1);
    setComletedTodos(reduceTodo);
    localStorage.setItem('completedToDos',JSON.stringify(reduceTodo));
  };

  //logic for implementing completed task component
  const addToDoToComplete = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear();
    
    let completedOn = dd + "/" + mm + "/"+ yy;
    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn,
    };

    let updateCompletedArray = [...completedTodos];
    updateCompletedArray.push(filteredItem);
    setComletedTodos(updateCompletedArray);
    localStorage.setItem('completedToDos',JSON.stringify(updateCompletedArray));
    deleteToDO(index);
  }

  //edit mode logic for to-do 
  const editMode = (index)=>{
        let tempArray = [...allTodos];
        let editableArray = tempArray.splice(index,1);
        let editObject = editableArray[0];
        setTodos(tempArray);
        localStorage.setItem('todolist',JSON.stringify(tempArray));
        console.log(editObject);
        setTitle(editObject.title);
        setDiscription(editObject.description);
  }

  return (
    <div className="App">
      <h1>T0-D0</h1>

      {/* wrapper for todo items */}
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' placeholder='Enter Title Of Your Task' value={newTitle} onChange={(e)=>{
              setTitle(e.target.value)
              }}></input>
          </div>
          
          {/* input tags */}
          <div className='todo-input-item'>
            <label>Description</label>
            <textarea placeholder='Write Descriptiion Of Your Task' value={newDescription} onChange={(e)=>{
              setDiscription(e.target.value);
                          }}/>
          </div>

          <div className='todo-input-item'>
            <button type='button' className='primaryBtn' onClick={addToDoInList}>ADD</button>
          </div>
        </div>

        {/* button area for task and completed */}
        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={()=>{
            setIsCompleteScreen(false);
          }}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={()=>{
            setIsCompleteScreen(true);
          }}>Completed</button>
        </div>

        {/* main content for todo list */}
        <div className='todo-list'>

          {/*main logic for iterating over to-do array and render component from it  */}
          {isCompleteScreen === false?
            allTodos.length !==0 ?allTodos.map((item,index)=>{
              return(<div className='todo-list-item' key={index}>
              <div className='content'>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>Added on : {item.addedOn}</p>
              </div>
  
              {/* delete button and right button logic */}
            <div>
              <MdDeleteForever className='icon' onClick={()=>{
                deleteToDO(index);
              }}/>
              <FaCheck className='check-icon' onClick={()=>{
                addToDoToComplete(index);
              }}/>
              <CiEdit className='check-icon' onClick={()=>{
                editMode(index);
              }}/>
            </div>
            </div>)
            }):<h1 className='no-task'>No Task</h1>
          :completedTodos.length !==0 ?completedTodos.map((item,index)=>{
            return(<div className='todo-list-item' key={index}>
            <div className='content'>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>Added on : {item.addedOn}</p>
            <p>completed on : {item.completedOn}</p>
            </div>

            {/* delete button and right button logic */}
          <div>
            <MdDeleteForever className='icon' onClick={()=>{
              deleteToDOFromCompletedTask(index);
            }}/>
          </div>
          </div>)
          }):<h1 className='no-task'>No Task</h1>}
          

        </div>
      </div>
    </div>
  );
}

export default App;