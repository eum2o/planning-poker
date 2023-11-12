import React, { useState, useEffect } from "react";
import { valueToCardLabel, NO_ESTIMATION } from "../cards";
import "./EstimationSummary.css";

function EstimationSummary({ users }) {
  const [concencus, setConcensus] = useState(null);

  useEffect(() => {
    const allEstimationsSubmitted = users.every(
      (user) => user.estimation !== NO_ESTIMATION
    );

    if (!allEstimationsSubmitted) {
      setConcensus(null);
    } else {
      const estimations = users.map((user) => user.estimation);
      setConcensus(calculateConsensus(estimations));
    }
  }, [users]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div
        className={`poker-card d-flex flex-column align-items-center justify-content-center text-center p-3 position-relative ${
          concencus !== null ? "bg-lightgreen" : "bg-gray"
        } ${concencus === null ? "hidden-value" : ""}`}
      >
        <div className="card-consensus">
        {concencus !== null ? (
            <>Consensus</>
          ) : (
            <>Waiting for<br/>
            estimates</>
          )}
        </div>
        <div className="card-value">
          {concencus !== null ? (
            valueToCardLabel[concencus]?.label
          ) : (
            <>?</>
          )}
        </div>
      </div>
    </div>
  );
}


export function calculateConsensus(estimations) {
  const sum = estimations.reduce((acc, val) => acc + parseInt(val, 10), 0);
  const average = sum / estimations.length;

  const sortedKeys = Object.keys(valueToCardLabel).map(key => parseInt(key, 10)).sort((a, b) => a - b);

  let closestKey = sortedKeys[0];
  let minDifference = Math.abs(average - closestKey);

  for (let key of sortedKeys) {
    const difference = Math.abs(average - key);
    if (difference <= minDifference) {
      minDifference = difference;
      closestKey = key;
    }
  }

  return closestKey;
}



export default EstimationSummary;