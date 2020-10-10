import React from "react";
import Styles from "./Search.module.scss";
import { useDispatch, useSelector } from "react-redux";

const Search = (props) => {
  const dispatch = useDispatch();
  const searchedValue = useSelector((state) => state.searchedValue); //Gets search value to show current value on text field
  return (
    <div className={Styles.search_container}>
      <label htmlFor="basic-search">Search</label>
      <div className="input-group mb-3">
        <input
          value={searchedValue}
          type="text"
          className="form-control"
          id="basic-search"
          aria-describedby="Search Task"
          placeholder="Search Task"
          onChange={(e) => {
            //Dispatching a SEARCH action to filter the result by search value
            dispatch({
              type: "SEARCH",
              payload: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Search;
