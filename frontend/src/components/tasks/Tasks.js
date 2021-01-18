import moment from "moment";
import React, { Component } from "react";
import Base from "../../Base";
import { getUsers } from "../users/apicalls";
import { createTask, getTasks, removeTask, updateTask } from "./apicalls";
import TaskForm from "./TaskForm";

class Tasks extends Component {
  state = {
    formType: "new",
    users: [],
    tasks: [],
    activeTask: {
      taskName: "",
      dueDate: moment().format("YYYY-MM-DD"),
      assignedTo: "",
      completed: false,
    },
    filter: {
      by: "",
      value: "",
    },
  };

  initialState = { ...this.state };

  async componentDidMount() {
    const users = await getUsers();
    const tasks = await getTasks();
    this.setState({ users: users.data, tasks: tasks.data });
  }

  handleChange = (e) => {
    const value =
      e.target.name === "completed" ? e.target.checked : e.target.value;

    this.setState((prevState) => {
      return {
        ...prevState,
        activeTask: {
          ...prevState.activeTask,
          [e.target.name]: value,
        },
      };
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const { _id, taskName, assignedTo, dueDate, completed } = {
      ...this.state.activeTask,
    };

    const data = { taskName, assignedTo, dueDate, completed };

    if (this.state.formType === "new") {
      try {
        const response = await createTask(data);
        

        this.setState((prevState) => {
          return {
            ...this.initialState,
            users: prevState.users,
            tasks: [...prevState.tasks, response.data],
          };
        });
        alert("Task created successfully!");
      } catch (error) {
        alert("Error while creating task!");
      }
    } else {
      try {
        const response = await updateTask(_id, data);
        const tasks = [...this.state.tasks];
        const index = tasks.findIndex((task) => {
          return task._id === response.data._id;
        });
        tasks[index] = { ...response.data };
        this.setState((prevState) => {
          return {
            ...this.initialState,
            users: prevState.users,
            tasks,
          };
        });
        alert("Task updated successfully!");
      } catch (error) {
        alert("Error while updating task!");
      }
    }
  };

  getUserById = (id) => {
    const index = this.state.users.findIndex((user) => user._id === id);
    return { ...this.state.users[index] };
  };

  removeTask = async (id) => {
    try {
      const response = await removeTask(id);

      const tasks = [...this.state.tasks];
      const updatedTasks = tasks.filter(
        (task) => task._id !== response.data._id
      );
      this.setState({ tasks: [...updatedTasks] });
      alert("Task removed successfully!");
    } catch (error) {
      alert("Error while removing task!");
    }
  };

  updateTaskStatus = async (e, id, completed, index) => {
    const response = await updateTask(id, { completed: !completed });

    const tasks = [...this.state.tasks];
    tasks[index] = { ...response.data };
    this.setState({ tasks });
  };

  resetForm = () => {
    this.setState((prevState) => {
      return {
        ...this.initialState,
        users: prevState.users,
        tasks: prevState.tasks,
      };
    });
  };

  render() {
    const { filter } = this.state;
    let taskList = [];

    switch (filter.by) {
      case "search":
        taskList = this.state.tasks.filter((task) =>
          task.taskName.toLowerCase().includes(filter.value.toLowerCase())
        );
        break;
      case "pending/completed":
        if (filter.value === "pending") {
          taskList = this.state.tasks.filter((task) => !task.completed);
        } else if (filter.value === "completed") {
          taskList = this.state.tasks.filter((task) => task.completed);
        } else {
          taskList = [...this.state.tasks];
        }
        break;
      case "date":
        taskList = this.state.tasks.filter(
          (task) => moment(task.dueDate).format("YYYY-MM-DD") === filter.value
        );
        break;
      default:
        taskList = [...this.state.tasks];
        break;
    }

    return (
      <Base>
        <div className="ui segment">
          <TaskForm
            type={this.state.formType}
            users={this.state.users}
            task={this.state.activeTask}
            handleChange={this.handleChange}
            onSubmit={this.onSubmit}
            resetForm={this.resetForm}
          />
        </div>
        <div className="ui segment">
          <h1>Task List</h1>
          <div className="ui equal width form">
            <label>Filter:</label>
            <div className="fields">
              <div className="field">
                <input
                  type="text"
                  className="filter"
                  onChange={(e) => {
                    this.setState({
                      filter: { by: "search", value: e.target.value },
                    });
                  }}
                  placeholder="Search by task name"
                />
              </div>
              <div className="field">
                <select
                  className="filter"
                  onChange={(e) => {
                    this.setState({
                      filter: {
                        by: "pending/completed",
                        value: e.target.value,
                      },
                    });
                  }}
                >
                  <option value="">Pending / Completed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="field">
                <input
                  className="filter"
                  type="date"
                  onChange={(e) => {
                    this.setState({
                      filter: { by: "date", value: e.target.value },
                    });
                  }}
                />
              </div>
              <button
                className="ui button"
                onClick={() => {
                  document.querySelectorAll(".filter").forEach((filter) => {
                    filter.value = "";
                  });
                  this.setState({ filter: { by: "", value: "" } });
                }}
              >
                Clear
              </button>
            </div>
          </div>
          <table className="ui celled table center aligned">
            <thead>
              <tr>
                <th>Task name</th>
                <th>Assigned to</th>
                <th>Due date</th>
                <th>Completed</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {taskList.length ? (
                taskList.map((task, index) => {
                  const user = this.getUserById(task.assignedTo);
                  return (
                    <tr key={index}>
                      <td data-label="TaskName">{task.taskName}</td>
                      <td data-label="User">{`${user.firstname} ${user.lastname}`}</td>
                      <td data-label="Due date">
                        {moment(task.dueDate).format("DD/MM/YYYY")}
                      </td>
                      <td data-label="Completed">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={(e) =>
                            this.updateTaskStatus(
                              e,
                              task._id,
                              task.completed,
                              index
                            )
                          }
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            this.setState({
                              formType: "edit",
                              activeTask: task,
                            });
                          }}
                          className="ui compact icon yellow button"
                        >
                          <i className="edit icon"></i>
                        </button>
                      </td>
                      <td>
                        <button
                          className="ui compact icon red button"
                          onClick={this.removeTask.bind(this, task._id)}
                        >
                          <i className="trash icon"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>
                    <h5>No tasks</h5>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Base>
    );
  }
}

export default Tasks;
