import React, { useState } from "react";
import Styles from "./AddTaskButton.module.scss";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";

const AddTaskButton = () => {
  const [isOpenModal, setIsOpenModal] = useState(false); //To open and close the Add Todo Modal

  /**
   * Sets the modal state to Open and Close the Modal
   */
  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return isOpenModal ? (
    <Modal
      content={<Form handleModal={handleModal}></Form>}
      handleModal={handleModal}
      title={"Add Todo"}
    />
  ) : (
    <div
      className={Styles.addBtn}
      onClick={() => handleModal()}
      data-toggle="modal"
      data-target="#exampleModal"
    >
      <i className="fa fa-plus-circle"></i>
    </div>
  );
};

export default AddTaskButton;
