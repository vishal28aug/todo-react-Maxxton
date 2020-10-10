import React from "react";
import styles from "./GroupBy.module.scss";
import { useDispatch } from "react-redux";

const GroupBy = (props) => {
  const dispatch = useDispatch();

  /**
   * Dispatch action to set the group by on every change
   * @param {*} groupBy
   */
  const setGroupBy = (groupBy) => {
    dispatch({
      type: "SET_GROUP_BY",
      payload: groupBy,
    });
  };

  return (
    <div className={styles.group_cotainer}>
      <label htmlFor="group-by">Group By</label>

      <select
        onChange={(event) => setGroupBy(event.target.value)}
        className="custom-select"
        id="inputGroupSelect01"
        defaultValue="None"
      >
        <option value="none">None</option>
        <option value="createdAt">Created On</option>
        <option value="currentState">Pending On</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupBy;
