import React from "react";
import styles from "./Tabs.module.scss";
import TaskList from "../TaskList/TaskList";

const Tabs = (props) => {
  return (
    <div>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <div
            className="nav-item nav-link active"
            id="nav-All-tab"
            data-toggle="tab"
            href="#nav-All"
            role="tab"
            aria-controls="nav-All"
            aria-selected="true"
          >
            All
          </div>
          <a
            className="nav-item nav-link"
            id="nav-Pending-tab"
            data-toggle="tab"
            href="#nav-Pending"
            role="tab"
            aria-controls="nav-Pending"
            aria-selected="false"
          >
            Pending
          </a>
          <a
            className="nav-item nav-link"
            id="nav-Completed-tab"
            data-toggle="tab"
            href="#nav-Completed"
            role="tab"
            aria-controls="nav-Completed"
            aria-selected="false"
          >
            Completed
          </a>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-All"
          role="tabpanel"
          aria-labelledby="nav-All-tab"
        >
          <TaskList selectedTab="All"></TaskList>
        </div>
        <div
          className="tab-pane fade"
          id="nav-Pending"
          role="tabpanel"
          aria-labelledby="nav-Pending-tab"
        >
          <TaskList selectedTab="Pending"></TaskList>
        </div>
        <div
          className="tab-pane fade"
          id="nav-Completed"
          role="tabpanel"
          aria-labelledby="nav-Completed-tab"
        >
          <TaskList selectedTab="Completed"></TaskList>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
