import React, { useEffect, useState, Component } from 'react';
import './Table.css';
import Loader from '../components/loader';
import Modal from '../components/modal';
import API from '../api';



function Table() {
  const [loading, setLoading] = useState(true);
  const [infoTasks, setInfoTasks] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    async function getTasks() {
      const newInfoTasks = await API.getTasks();
      setInfoTasks(newInfoTasks);
      setLoading(false)
    }
    getTasks()
  });

  function dragStartHandler(e, task) {
    setCurrentTask(task)
  }
  function dragEndHandler(e) {

  }

  function dragOverHandler(e) {
    e.preventDefault()
  }
  function dropHandler(e, task) {
    e.preventDefault();
    const dropTask = infoTasks.map(info => {
      if (info.id === task.id) {
        return {
          ...info, priority: currentTask.priority,
        }
        // return {
        //   ...info, id: currentTask.id, task: currentTask.task,
        //   name: currentTask.name, manager: currentTask.manager, date: currentTask.date,
        //   priority: currentTask.priority,
        // }
      }
      if (info.id === currentTask.id) {
        return {
          ...info, priority: task.priority,
        }
        // return {
        //   ...info, id: task.id, task: task.task,
        //   name: task.name, manager: task.manager, date: task.date, priority: task.priority,
        // }
      }
      return info
    })
    setInfoTasks(dropTask)
  }

  //Sort All Time
  const sortTasks = (a, b) => {
    if (a.priority > b.priority) {
      return 1
    } else {
      return -1
    }
  };
  // sort onClick
  function sortingByPriority() {
    const sortedTasks = infoTasks.sort(sortTasks);
    setInfoTasks([...sortedTasks])
  }
  if (loading) {
    return <Loader />
  }

  // function modal(e) {
  //   if (modal)
  //     return <Modal />
  // }
  // const tableId = document.getElementById('table__id');
  // function clickTask(e) {
  //   const tableId = document.getElementById('table__id');
  //   tableId.addEventListener('onDoubleClick', e => {
  //     let target = e.target;
  //     console.log(target);
  //     // if (target.tagName !== 'TD') return;
  //   });
  // };

  // СlickTask extends Component {
  //   clickTask = e => {
  //     const { firstHandler, secondHandler } = this.props;
  //     firstHandler(e){
  //       return setModalActive(true);
  //     };
  //     secondHander(e){
  //       return console.log(e.target);
  //     };
  //   }
  // };






  return (
    <div>
      <table id='Table__Task' className="Table__Task">
        <thead className="Table__Task-Head">
          <tr className="Table__Task-th">
            <th>Id</th>
            <th>Task</th>
            <th>Name</th>
            <th>Manager</th>
            <th>Date</th>
            <th style={{ cursor: 'pointer' }} onClick={sortingByPriority}>Priority</th>
          </tr>
        </thead>
        <tbody >
          {infoTasks.sort(sortTasks).map(task =>
            <tr
              onDragStart={e => dragStartHandler(e, task)}
              onDragLeave={e => dragEndHandler(e)}
              onDragEnd={e => dragEndHandler(e)}
              onDragOver={e => dragOverHandler(e)}
              onDrop={e => dropHandler(e, task)}
              draggable={true}
              // onDoubleClick={() => setModalActive(true)}
              onDoubleClick={(e) => console.log(e.target)}
              id='table__id'
              className="Table__Task-td" key={task.id} >
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
      <Modal active={modalActive} setActive={setModalActive}>sssss</Modal>
    </div >

  );
}

export default Table
