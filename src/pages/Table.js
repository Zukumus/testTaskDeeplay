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
    setInfoTasks([...sortedTasks]);
  };

  if (loading) {
    return <Loader />
  };

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
              onDragOver={e => dragOverHandler(e)}
              onDrop={e => dropHandler(e, task)}
              draggable={true}
              onDoubleClick={() => setModalActive(true)}
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
      <Modal active={modalActive} setActive={setModalActive}>{ }</Modal>
    </div >

  );
};

export default Table
