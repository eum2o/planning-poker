import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { ESTIMATIONS_URL, USERS_URL } from "./constants";

function ResetArea() {
  const handleResetEstimations = async () => {
    // send a DELETE request to the API and handle errors
    try {
      await axios.delete(ESTIMATIONS_URL);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetUsers = async () => {
    try {
      await axios.delete(`${USERS_URL}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-between">
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleResetEstimations}
      >
        Reset All Estimations
      </button>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={handleResetUsers}
      >
        💀
      </button>
    </div>
  );

  
}

ResetArea.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ResetArea;
