import React from "react";
import styles from "./App.module.scss";
import Tabs from "./components/tabs/Tabs";
import GroupBy from "./components/GroupBy/GroupBy";
import Serach from "./components/search/Search";
import AddTaskButton from "./components/AddTaskButton/AddTaskButton";

const App = () => {
  return (
    <div className={styles.container}>
      <header>ToDo App </header>
      <div className={styles.actions}>
        <GroupBy></GroupBy>
        <Serach></Serach>
      </div>
      <Tabs></Tabs>
      <AddTaskButton></AddTaskButton>
    </div>
  );
};

export default App;
