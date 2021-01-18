import React, { Component } from "react";
import moment from "moment";

class TaskForm extends Component {
  render() {
    const {
      users,
      type,
      handleChange,
      onSubmit,
      resetForm,
      task: { taskName, assignedTo, dueDate, completed },
    } = this.props;
    return (
      <form onSubmit={onSubmit} className="ui equal width form">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>{type === "new" ? "New Task" : "Update Task"}</h1>
          <button class="ui labeled icon button" onClick={resetForm} type="button">
            <i class="sync icon"></i>
            Reset form
          </button>
        </div>
        <div className="field">
          <label>Task Name</label>
          <input
            type="text"
            name="taskName"
            value={taskName}
            onChange={handleChange}
          />
        </div>
        <div className="fields">
          <div className="field">
            <label>Assigned to</label>
            <select name="assignedTo" onChange={handleChange}>
              <option value="">Select user</option>
              {users.map((user) => (
                <option
                  selected={assignedTo === user._id}
                  key={user._id}
                  value={user._id}
                >{`${user.firstname} ${user.lastname}`}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Due date</label>
            <input
              type="date"
              name="dueDate"
              value={moment(dueDate).format("YYYY-MM-DD")}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label>Status</label>
          <div className="ui checkbox">
            <input
              id="completed"
              name="completed"
              type="checkbox"
              tabIndex="0"
              checked={completed}
              onChange={handleChange}
            />
            <label htmlFor="completed">Completed</label>
          </div>
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default TaskForm;
