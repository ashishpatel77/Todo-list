import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import "./todo.css";

function TodoList() {
  var myArr = [];
  const [task, setTask] = useState();
  const [taslList, setTaskList] = useState([]);
  const [editIndex, setEditIndex] = useState(0);
  const [btnValue, setBtnValue] = useState(true);
  let tempTask;

  const handelChange = (e) => {
    setTask(e.target.value);
    console.log("tempTask", tempTask);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTask = () => {
    if (task === "") {
      alert("Plase Enter Task");
    } else {
      myArr = [...taslList];
      myArr.push(task);
      setTaskList(myArr);
      setTask("");
      axios
        .post("https://63a0976024d74f9fe83cae61.mockapi.io/addtask", {
          taskName: task,
        })
        .then((res) => {
          fetchData();
        })
        .catch((err) => console.log(err));
    }
  };
  const deleteTask = (index, id) => {
    axios
      .delete("https://63a0976024d74f9fe83cae61.mockapi.io/addtask/" + id)
      .then((res) => {
        fetchData();
      })
      .catch((err) => console.log("data delet err", err));
  };
  const edit = (val, ind) => {
    setEditIndex(ind);
    setBtnValue(false);
    setTask(val);
  };

  const updateTask = (e) => {
    if (task === "") {
      alert("Please Enter Task");
    } else {
      axios
        .put(
          "https://63a0976024d74f9fe83cae61.mockapi.io/addtask/" + editIndex,
          {
            taskName: task,
          }
        )
        .then((res) => {
          fetchData();
          setBtnValue(true);
          setTask("");
        })
        .catch((err) => console.log("data delet err", err));
    }
  };

  const fetchData = () => {
    axios
      .get("https://63a0976024d74f9fe83cae61.mockapi.io/addtask")
      .then((res) => {
        console.log("get data", res.data);
        setTaskList(res.data);
      })
      .catch((err) => console.log("data err", err));
  };

  return (
    <div>
      <h1>Task List Form</h1>
      <div className="div-container">
        <input
          type="text"
          className="todo-input"
          value={task}
          name="task"
          onChange={(e) => handelChange(e)}
        />
        {btnValue ? (
          <button className="div-button" onClick={addTask}>
            Add Task
          </button>
        ) : (
          <button className="div-button" onClick={updateTask}>
            Update Task
          </button>
        )}
      </div>
      <ol>
        {taslList.map((val, ind) => {
          return (
            val && (
              <div className="todo-list">
                <li key={ind}>{val.taskName}</li>
                <div>
                  <button onClick={() => deleteTask(ind, val.uid)}>
                    delete
                  </button>
                  <button
                    onClick={() => edit(val.taskName, val.uid)}
                    style={{ marginLeft: "20px" }}
                  >
                    edit
                  </button>
                </div>
              </div>
            )
          );
        })}
      </ol>
    </div>
  );
}

export default TodoList;
