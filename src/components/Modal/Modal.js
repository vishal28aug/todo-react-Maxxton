import React from "react";
import Styles from "./Modal.module.scss";

const Modal = (props) => {
  return (
    <div id="popup" className={Styles.overlay}>
      <div className={Styles.popup}>
        <h2>{props.title}</h2>
        <div className={Styles.close} onClick={() => props.handleModal()}>
          &times;
        </div>
        <hr />
        <div className={Styles.content}>{props.content}</div>
      </div>
    </div>
  );
};

export default Modal;
