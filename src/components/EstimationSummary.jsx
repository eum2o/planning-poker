import React, { useState, useEffect } from "react";
import { valueToCardLabel, NO_ESTIMATION } from "../cards";
import "./EstimationSummary.css";

function EstimationSummary({ users }) {
  const [consensus, setConsensus] = useState(null);

  useEffect(() => {
    const allEstimationsSubmitted = users.every(
      (user) => user.estimation !== NO_ESTIMATION
    );

    if (!allEstimationsSubmitted) {
      setConsensus(null);
    } else {
      const estimations = users.map((user) => user.estimation);
      const consensus = calculcateConsensus(estimations);
      setConsensus(consensus);
    }
  }, [users]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div
        className={`poker-card d-flex flex-column align-items-center justify-content-center text-center p-3 position-relative ${
          consensus !== null ? "bg-lightgreen" : "bg-gray"
        } ${consensus === null ? "hidden-value" : ""}`}
      >
        <div className="card-consensus">
        {consensus !== null ? (
            <>Consensus</>
          ) : (
            <>Waiting for<br/>
            estimates</>
          )}
        </div>
        <div className="card-value">
          {consensus !== null ? (
            valueToCardLabel[consensus]?.label
          ) : (
            <>?</>
          )}
        </div>
      </div>
    </div>
  );
}

function calculcateConsensus(estimations) {
  const counts = estimations.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(counts));
  const mostFrequentEstimations = Object.entries(counts)
    .filter(([_estimation, count]) => count === maxCount)
    .map(([estimation, _count]) => estimation);

  return Math.max(...mostFrequentEstimations);
}

export default EstimationSummary;
