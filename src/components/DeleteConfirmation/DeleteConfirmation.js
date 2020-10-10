import React from "react";
import Styles from "./DeleteConfirmation.module.scss";
import { useDispatch } from "react-redux";

const DeleteConfirmation = (props) => {
  const dispatch = useDispatch();

/**
 * Dispatch 'DELETE_TODO' action to delete the todo
 */
const deleteTodo = () => {
    dispatch({
      type: "DELETE_TODO",
      payload: props.todo,
    });
    props.handleModal(); //callback function to close the Modal after deleting the modal
  };

  return (
    <div>
      <div className={Styles.todoItem}>
        <span className={Styles.todoTitle}>Summary:</span>
        <span>{props?.todo?.title}</span>
      </div>
      <div className={Styles.todoItem}>
        <span className={Styles.todoTitle}>Description:</span>
        <span>{props?.todo?.description}</span>
      </div>
      <div className={Styles.todoItem}>
        <span className={Styles.todoTitle}>Due Date:</span>
        <span>{props?.todo?.dueDate}</span>
      </div>
      <div className={Styles.todoItem}>
        <span className={Styles.todoTitle}>Created On :</span>
        <span>
          {" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(props?.todo?.createdAt)}
        </span>
      </div>
      <div className={Styles.todoItem}>
        <span className={Styles.todoTitle}>Priority:</span>
        <span>{props?.todo?.priority}</span>
      </div>
      <div className={Styles.todoItem}>
        <span className={Styles.todoTitle}>State:</span>
        <span>{props?.todo?.priority === true ? "Pending" : "Completed"}</span>
      </div>
      <hr />
      <div className={Styles.todoActionBtn}>
        <span>Do you want to delete this task?</span>
        <button className="btn btn-danger" onClick={() => props.handleModal()}> 
          No
        </button>
        <button className="btn btn-success" onClick={() => deleteTodo()}>
          Yes{" "}
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
