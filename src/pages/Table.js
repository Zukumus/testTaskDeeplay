import React, { useEffect, useState, } from 'react';
import './Table.css';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import API from '../api';

function Table() {
  const [loading, setLoading] = useState(true);
  const [infoTasks, setInfoTasks] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [clickTaskInfo, setClickTaskInfo] = useState(null);


  useEffect(() => {
    async function getTasks() {
      const newInfoTasks = await API.getTasks();
      setInfoTasks(newInfoTasks);
      setLoading(false);

    }
    getTasks();
  }, []);

  function dragStartHandler(e, task) {
    setCurrentTask(task);
  };

  function dragOverHandler(e) {
    e.preventDefault();
  };

  function dropHandler(e, task) {
    e.preventDefault();
    console.log(infoTasks);
    setInfoTasks(infoTasks.map(info => {
      if (info.id === task.id) {
        return {
          ...info, priority: currentTask.priority
        };
      };
      if (info.id === currentTask.id) {
        return {
          ...info, priority: task.priority,
        };
      };
      return info
    })
    );
  };

  // sort field in console, field off
  const sortParametr = (field) => {
    const sortParametr = infoTasks.sort((a, b) => { return a[field] > b[field] ? +1 : -1 }
    );
    console.log(sortParametr);
    // setInfoTasks([...sortParametr]);
  };

  // sortPriority
  const sortTasksPriority = (a, b) => { return a.priority > b.priority ? +1 : -1 };


  // viewTaskInfo
  const viewTaskInfo = (clickTask) => {
    setClickTaskInfo(clickTask);
  };


  if (loading) {
    return <Loader />
  };
  // if (setClickTaskInfo) {
  //   return < />
  // }

  return (
    <div>
      <table id='Table__Task' className="Table__Task">
        <thead className="Table__Task-Head">
          <tr className="Table__Task-th">
            <th style={{ cursor: 'pointer' }} onClick={() => sortParametr('id')}>Id</th>
            <th style={{ cursor: 'pointer' }} onClick={() => sortParametr('task')}>Task</th>
            <th style={{ cursor: 'pointer' }} onClick={() => sortParametr('name')}>Name</th>
            <th style={{ cursor: 'pointer' }} onClick={() => sortParametr('Manager')}>Manager</th>
            <th style={{ cursor: 'pointer' }} onClick={() => sortParametr('date')}>Date</th>
            <th style={{ cursor: 'pointer' }} onClick={() => sortParametr('priority')}>Priority</th>
          </tr>
        </thead>
        <tbody >
          {infoTasks.sort(sortTasksPriority).map(task =>
            <tr
              onDragStart={e => dragStartHandler(e, task)}
              onDragOver={e => dragOverHandler(e)}
              onDrop={e => dropHandler(e, task)}
              draggable={true}
              onDoubleClick={() => setModalActive(true)}
              onClick={() => viewTaskInfo(task)}
              id='table__id'
              className="Table__Task-td" key={task.id}
            >
              <td>{task.id}</td>
              <td>{task.task}</td>
              <td>{task.name}</td>
              <td>{task.manager}</td>
              <td>{task.date}</td>
              <td>{task.priority}</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* {if(clickTaskInfo){
        return{

      }
      }} */}
      <Modal active={modalActive} setActive={setModalActive} children={clickTaskInfo}>
        {/* {console.log(clickTaskInfo.id)} */}
        {clickTaskInfo}
      </Modal>

    </div >

  );
};

export default Table


{/* {clickTaskInfo.map(task =>
          <table>
            <td>{task.id}</td>
            <td>{task.task}</td>
            <td>{task.name}</td>
            <td>{task.manager}</td>
            <td>{task.date}</td>
            <td>{task.priority}</td>
          </table>
        )} */}

{/* {clickTaskInfo.map(task =>
          <table>
            <td>{clickTaskInfo.id}</td>
            <td>{clickTaskInfo.task}</td>
            <td>{clickTaskInfo.name}</td>
            <td>{clickTaskInfo.manager}</td>
            <td>{clickTaskInfo.date}</td>
            <td>{clickTaskInfo.priority}</td>
          </table>
        )} */}