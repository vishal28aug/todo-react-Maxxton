import React, { useState } from "react";
import styles from "./TaskList.module.scss";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import { useDispatch, useSelector } from "react-redux";

const TaskList = (props) => {
  //Redux calls
  let todos = useSelector((state) => state.todoList); //Gets List of Todo
  const groupBy = useSelector((state) => state.groupBy); //Gets Groupby Option
  const searchedValue = useSelector((state) => state.searchedValue); //Gets Search input Value
  let filteredList = useSelector((state) => state.filteredData); //Gets Search Results

  const dispatch = useDispatch();

  //Local States
  const [sortBySummary, setSortBySummary] = useState(); //sort by summary state
  const [sortByPriotiy, setSortByPriority] = useState(); //sort by Priortiy state
  const [sortByCreatedOn, setSortByCreatedOn] = useState(); //sort by Created On state
  const [sortByDueDate, setSortByDueDate] = useState(); //sort by Due Date state
  const [isOpenFormModal, setIsOpenFormModal] = useState(false); //To open and close the Form Modal
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false); // To open and close the delete modal
  const [selectedTodo, setSelectedTodo] = useState(false); //To show the selected todo in Modal
  const [readOnly, setReadOnly] = useState(false); //to disable the form field

  //Filters the list on basis of selected Tab ('Pending','Completed','All')
  if (props.selectedTab === "Pending") {
    searchedValue
      ? (filteredList = filteredList.filter(
          (todo) => todo.currentState === false
        ))
      : (todos = todos.filter((todo) => todo.currentState === false));
  } else if (props.selectedTab === "Completed") {
    searchedValue
      ? (filteredList = filteredList.filter(
          (todo) => todo.currentState === true
        ))
      : (todos = todos.filter((todo) => todo.currentState === true));
  }

  /**
   * Converts priority number value to a text value to show the priorty  (2 = 'Low'...).
   * @param {*} priotiy
   * @returns
   */
  const renderPriority = (priotiy) => {
    switch (priotiy) {
      case "1": {
        return "None";
      }
      case "2": {
        return "Low";
      }
      case "3": {
        return "Medium";
      }
      case "4": {
        return "High";
      }
      default:
        return;
    }
  };

  /**
   * Sets the local sorting state and dispatch an action to sort the list on basis of local sort state.
   * @param {*} type
   * @returns
   */
  const sortList = (type) => {
    switch (type) {
      case "SORT_BY_SUMMARY": {
        setSortBySummary(!sortBySummary);
        dispatch({
          type: type,
          payload: { isAsscending: sortBySummary },
        });
        break;
      }
      case "SORT_BY_PRIORITY": {
        setSortByPriority(!sortByPriotiy);
        dispatch({
          type: type,
          payload: { isAsscending: sortByPriotiy },
        });
        break;
      }
      case "SORT_BY_CREATEDAT": {
        setSortByCreatedOn(!sortByCreatedOn);
        dispatch({
          type: type,
          payload: { isAsscending: sortByCreatedOn },
        });
        break;
      }

      case "SORT_BY_DUE_DATE": {
        setSortByDueDate(!sortByDueDate);
        dispatch({
          type: type,
          payload: { isAsscending: sortByDueDate },
        });
        break;
      }
      default:
        return;
    }
  };

  /**
   * Opens and close the 'Add Todo' , 'Edit Todo', 'Reac Todo' modal
   */
  const handleFormModal = () => {
    setIsOpenFormModal(!isOpenFormModal);
  };

  /**
   * Opens and close the 'Delete Todo' modal
   */
  const handleDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  /**
   *Sets the selected Todo state to use its value in the Modal
   * @param {*} todo
   */
  const getSelectedTodo = (todo) => {
    setSelectedTodo(todo);
  };

  //Sets the state to open the Modal in Read only state
  const handleReadOnly = (isReadOnly) => {
    setReadOnly(isReadOnly);
  };

  /**
   * Dispatch 'CHANGE_TODO_STATE' action to mark the todo as complete and pending
   * @param {*} todo
   * @param {*} event
   */
  const changeTodoState = (todo, event) => {
    event.stopPropagation();
    dispatch({
      type: "CHANGE_TODO_STATE",
      payload: todo.id,
    });
  };

  /**
   * Creates a group of Array of todo List on basis of selected group by option
   * @returns
   */
  const createGroupBy = () => {
    let todoList = searchedValue ? filteredList : todos;
    let groupByTodo = todoList.reduce((total, current) => {
      total[current[groupBy]] = total[current[groupBy]] || [];
      total[current[groupBy]].push(current);
      return total;
    }, Object.create(null));

    //setting priority as a text value insted of a number
    if (groupBy === "priority") {
      Object.keys(groupByTodo).forEach((x) => {
        groupByTodo[renderPriority(x)] = groupByTodo[x];
        delete groupByTodo[x];
      });
    } //Assigining 'Pending' and 'Completed' to the todo state instead of boolean
    else if (groupBy === "currentState") {
      Object.keys(groupByTodo).forEach((x) => {
        let state = x !== "true" ? "Pending" : "Completed";
        groupByTodo[state] = groupByTodo[x];
        delete groupByTodo[x];
      });
    }
    return groupByTodo;
  };

  /**
   * Render the Group by List
   * @returns
   */
  const renderGroupByList = () => {
    let groupedTodo = createGroupBy();
    return (
      <>
        {Object.keys(groupedTodo).map((groupName) => (
          <tbody key={groupName}>
            <tr>
              <td colSpan="5" className={styles.groupBy}>
                {" "}
                {groupName}
              </td>
            </tr>
            {groupedTodo[groupName].map((todo) => (
              <tr
                className={todo.currentState ? styles.textStrike : null}
                key={todo.id}
                onClick={() => {
                  handleFormModal();
                  getSelectedTodo(todo);
                  handleReadOnly(true);
                }}
              >
                <td>{todo.title}</td>
                <td>{renderPriority(todo.priority)}</td>
                <td>{todo.createdAt}</td>
                <td>{todo.dueDate}</td>
                <td className={styles.center}>
                  <span
                    className={styles.icon}
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleFormModal();
                      getSelectedTodo(todo);
                      handleReadOnly(false);
                    }}
                  >
                    <i className="fa fa-edit icon"></i>
                  </span>
                  {!todo.currentState ? (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={(event) => changeTodoState(todo, event)}
                    >
                      Done
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={(event) => changeTodoState(todo, event)}
                    >
                      Re-Open
                    </button>
                  )}
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteModal();
                      getSelectedTodo(todo);
                    }}
                    className={styles.icon}
                    style={{ backgroundColor: "red" }}
                  >
                    <i className="fa fa-trash"></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </>
    );
  };

  /**
   * Render the list simple List
   * @returns
   */
  const renderList = () => {
    const todoList = searchedValue ? filteredList : todos;
    return (
      <tbody>
        {todoList.map((todo) => (
          <tr
            className={todo.currentState ? styles.textStrike : null}
            key={todo.id}
            onClick={() => {
              handleFormModal();
              getSelectedTodo(todo);
              handleReadOnly(true);
            }}
          >
            <td>{todo.title}</td>
            <td>{renderPriority(todo.priority)}</td>
            <td>{todo.createdAt}</td>
            <td>{todo.dueDate}</td>
            <td className={styles.center}>
              <span
                className={styles.icon}
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={(event) => {
                  event.stopPropagation();
                  handleFormModal();
                  getSelectedTodo(todo);
                  handleReadOnly(false);
                }}
              >
                <i className="fa fa-edit icon"></i>
              </span>
              {!todo.currentState ? (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={(event) => changeTodoState(todo, event)}
                >
                  Done
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={(event) => changeTodoState(todo, event)}
                >
                  Re-Open
                </button>
              )}
              <span
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteModal();
                  getSelectedTodo(todo);
                }}
                className={styles.icon}
                style={{ backgroundColor: "red" }}
              >
                <i className="fa fa-trash"></i>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div style={{overflowX:'auto'}}>
      <table>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>
              <div className={styles.tableHeader}>
                <span className={styles.title}>Summary</span>
                <span
                  onClick={() => sortList("SORT_BY_SUMMARY")}
                  className={styles.icon}
                >
                  <i className="fa fa-sort"></i>
                </span>
              </div>
            </th>
            <th style={{ width: "10%" }}>
              <div className={styles.tableHeader}>
                <span className={styles.title}>Priority</span>
                <span
                  onClick={() => sortList("SORT_BY_PRIORITY")}
                  className={styles.icon}
                >
                  <i className="fa fa-sort"></i>
                </span>
              </div>
            </th>
            <th style={{ width: "15%" }}>
              <div className={styles.tableHeader}>
                <span className={styles.title}> Created On</span>
                <span
                  onClick={() => sortList("SORT_BY_CREATEDAT")}
                  className={styles.icon}
                >
                  <i className="fa fa-sort"></i>
                </span>
              </div>
            </th>
            <th style={{ width: "15%" }}>
              <div className={styles.tableHeader}>
                <span className={styles.title}>Due By</span>
                <span
                  onClick={() => sortList("SORT_BY_DUE_DATE")}
                  className={styles.icon}
                >
                  <i className="fa fa-sort"></i>
                </span>
              </div>
            </th>
            <th style={{ width: "20%" }}>
              <div className={styles.tableHeader}>
                <span className={styles.title}>Actions</span>
              </div>
            </th>
          </tr>
        </thead>
        {groupBy !== "none" ? renderGroupByList() : renderList()}
      </table>
      {/* opens a modal if 'isOpenFormModal' is set and we have 'selected Todo' */}
      {isOpenFormModal && selectedTodo ? (
        <Modal
          content={
            <Form
              isReadOnly={readOnly}
              selectedTodo={selectedTodo}
              handleModal={handleFormModal}
            ></Form>
          }
          handleModal={handleFormModal}
          title={readOnly ? "Todo" : "Edit Todo"}
        />
      ) : null}
      {/* opens a modal if 'isOpenDeleteModal' is set and we have 'selected Todo' */}
      {isOpenDeleteModal && selectedTodo ? (
        <Modal
          content={
            <DeleteConfirmation
              todo={selectedTodo}
              handleModal={handleDeleteModal}
            ></DeleteConfirmation>
          }
          handleModal={handleDeleteModal}
          title={"Delete Todo"}
        />
      ) : null}
    </div>
  );
};

export default TaskList;
