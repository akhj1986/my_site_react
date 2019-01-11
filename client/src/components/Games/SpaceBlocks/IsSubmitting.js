import React from "react";

const IsSubmitting = props => {
  return <div>{props.submitting ? <h1>Submitting score...</h1> : null}</div>;
};

export default IsSubmitting;
