import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, ...rest }) => {
  return (
    <button className={styles.myBtn} {...rest}>
      {text}
    </button>
  );
};

export default Button;
