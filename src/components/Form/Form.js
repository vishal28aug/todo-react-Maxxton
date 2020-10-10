import React, { useState, useEffect } from "react";
import Styles from "./Form.module.scss";
import { useDispatch, useSelector } from "react-redux";

const Form = (props) => {
  const todoListLength = useSelector((state) => state.todoList.length); //Gets todoList length to genrate a unqiue id
  const [summary, setSummary] = useState(); //To get todo summart(title)
  const [description, setDescription] = useState(); // To get todo description
  const [dueDate, setDueDate] = useState(); //To get todo due Date
  const [priority, setPriority] = useState(); // To get todo priority

  // Sets the default value to all field if modal is opened in Edit or Read mode
  useEffect(() => {
    setSummary(props?.selectedTodo?.title || "");
    setDescription(props?.selectedTodo?.description || "");
    setDueDate(props?.selectedTodo?.dueDate || "");
    setPriority(props?.selectedTodo?.priority || "");
  }, [props]);

  const dispatch = useDispatch();

  /**
   * Setting the field value in local state using the id of fields
   * @param {*} event
   * @returns
   */
  const handleChange = (event) => {
    switch (event.target.id) {
      case "summary": {
        setSummary(event.target.value);
        break;
      }
      case "description": {
        setDescription(event.target.value);
        break;
      }
      case "dueDate": {
        setDueDate(event.target.value);
        break;
      }
      case "priority": {
        setPriority(event.target.value);
        break;
      }
      default:
        return;
    }
  };

  /**
   * creates a object of todo to send the todo data in payload
   * Dispatch 'UPDATE_TODO' and 'ADD_TODO' on basis of props value
   * @param {*} event
   */
  const saveTodo = (event) => {
    let todo = {
      id: props?.selectedTodo?.id || todoListLength + 1,
      title: summary,
      description: description,
      createdAt: props?.selectedTodo?.createdAt || Date.now(), //Current Date and Time
      dueDate: dueDate,
      priority: priority,
      currentState: props?.selectedTodo?.currentState || false, //Pending
    };
    props.selectedTodo
      ? dispatch({
          type: "UPDATE_TODO",
          payload: todo,
        })
      : dispatch({
          type: "ADD_TODO",
          payload: todo,
        });
    event.preventDefault();
    props.handleModal(); //Closing Modal
  };

  return (
    <div className={Styles.formContainer}>
      <form onSubmit={(event) => saveTodo(event)}>
        <label htmlFor="summary">Summary</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="summary"
            aria-describedby="summary"
            placeholder="summary"
            onChange={handleChange}
            value={summary}
            required
            readOnly={props.isReadOnly}
          />
        </div>
        <label htmlFor="Description">Description</label>
        <textarea
          className="form-control"
          aria-label="With textarea"
          placeholder="Description"
          id="description"
          onChange={handleChange}
          value={description}
          required
          readOnly={props.isReadOnly}
        ></textarea>
        <div className={Styles.inlineInput}>
          <div className={Styles.inlineItems}>
            <label htmlFor="dueDate">Due Date</label>
            <div className="input-group mb-3">
              <input
                type="date"
                className="form-control"
                id="dueDate"
                aria-describedby="Date"
                placeholder="Date"
                onChange={handleChange}
                value={dueDate}
                required
                readOnly={props.isReadOnly}
              />
            </div>
          </div>
          <div className={Styles.inlineItems}>
            <label htmlFor="priority">Priority</label>
            <select
              className="custom-select"
              id="priority"
              onChange={handleChange}
              defaultValue={priority}
              disabled={props.isReadOnly}
            >
              <option value="1">None</option>
              <option value="2">Low</option>
              <option value="3">Medium</option>
              <option value="4">High</option>
            </select>
          </div>
        </div>
        <div className={Styles.modalBtn}>
          <button
            type="button"
            data-dismiss="modal"
            className="btn btn-secondary"
            onClick={() => props.handleModal()}
          >
            Cancel
          </button>
          {!props.isReadOnly ? (
            <button type="submit" className="btn btn-success">
              Save
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default Form;
