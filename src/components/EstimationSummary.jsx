import React, { useState, useEffect } from "react";
import { valueToCardLabel, NO_ESTIMATION } from "../cards";
import "./EstimationSummary.css";

function EstimationSummary({ users }) {
  const [mostFrequentEstimation, setMostFrequentEstimation] = useState(null);

  useEffect(() => {
    const allEstimationsSubmitted = users.every(
      (user) => user.estimation !== NO_ESTIMATION
    );

    if (!allEstimationsSubmitted) {
      setMostFrequentEstimation(null);
    } else {
      const estimations = users.map((user) => user.estimation);
      const mostFrequent = getMostFrequentEstimation(estimations);
      setMostFrequentEstimation(mostFrequent);
    }
  }, [users]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div
        className={`rounded-circle border border-gray d-flex flex-column align-items-center justify-content-center text-center p-3 position-relative ${
          mostFrequentEstimation !== null ? "bg-lightgreen" : "bg-gray"
        }`}
      >
        <div className="position-absolute top-0 start-50 translate-middle-x bg-white px-2 rounded-pill">
          Consensus
        </div>
        <div>
          {mostFrequentEstimation !== null ? (
            valueToCardLabel[mostFrequentEstimation]
          ) : (
            <i>(waiting for estimates)</i>
          )}
        </div>
      </div>
    </div>
  );
}

function getMostFrequentEstimation(estimations) {
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
