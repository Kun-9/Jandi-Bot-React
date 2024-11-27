import React, {useRef, useState} from "react";

export const Todo = () => {
    const taskName = useRef();
    const taskSub = useRef();

    const [taskList, setTaskList] = useState([]);

    const Add = () => {

        const nameValue = taskName.current.value;
        const subValue = taskSub.current.value;

        const newTask = {name : nameValue, sub : subValue, isComplete : 0}

        setTaskList([...taskList, newTask])
        console.log(taskList)

        taskName.current.value = '';
        taskSub.current.value = '';
    }


    const DeleteTask = (targetIndex) => {
        console.log(targetIndex)
        const updateTask = taskList.filter((_, index) => index !== targetIndex);
        console.log(updateTask)

        setTaskList(updateTask)
    }

    const [isActive, setActive] = useState(false);

    const textCompleteStyle = {
        color: 'gray',
        textDecoration: 'line-through'
    }

    const Check = (targetIndex) => {

        // console.log('index : ' , targetIndex);
        // const target = taskList.filter((_, index) => index === targetIndex);
        // taskList[targetIndex].isComplete = 1

        const updateList = taskList.map((task, index) =>
            index === targetIndex ? {...task, isComplete: !task.isComplete} : task
        );

        setTaskList(updateList)
        // setTaskList(taskList);

        // console.log(taskList[targetIndex]);
    }


    return (
        <div className='main-container'>
            <div className='input-container'>
                <label>제목</label>
                <input type='text' ref={taskName}/>
                <label>설명</label>
                <input type='text' ref={taskSub}/>
                <button onClick={Add}>submit</button>
            </div>

            <div className='taskList'>
                {taskList.map((task, index) => (
                    <div key={index} className='task'>
                        <button onClick={() => DeleteTask(index)}>x</button>
                        <div style={task.isComplete ? textCompleteStyle : null}>{task.name} : {task.sub}</div>
                        <button onClick={() => Check(index)}>v</button>
                    </div>
                ))}
            </div>
        </div>
    )
}