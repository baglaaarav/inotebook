import React from "react";

function Alert(props) {
  const captiallize = (str) => {
    const lower = str.toLowerCase();
    return str[0].toUpperCase() + lower.slice(1);
  };

  return (
    <div style={{height:'70px'}}>
      {props.alert &&
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{captiallize(props.alert.type)} </strong>:{props.alert.msg}
      </div>}
    </div>
  );
}

export default Alert;