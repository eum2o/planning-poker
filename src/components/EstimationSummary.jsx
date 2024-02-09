import React, { useState, useEffect } from "react";
import { NO_ESTIMATION } from "../model/cardSpecs";
import { CARDS} from "../model/cards";
import "./EstimationSummary.css";
import { computeMedian} from "../util/consensusCalculation"

function EstimationSummary({ users }) {
  const [concencus, setConcensus] = useState(null);

  useEffect(() => {
    const allEstimationsSubmitted = users.every(
      (user) => user.estimation !== NO_ESTIMATION
    );

    const userEstimations = users.map((user) => parseInt(user.estimation));
    let computeConsensus = allEstimationsSubmitted && userEstimations.length;

    if (computeConsensus) {
      setConcensus(computeMedian(userEstimations));
    } else {
      setConcensus(null)
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
            computeConsensusLabel(concencus)
          ) : (
            <>?</>
          )}
        </div>
      </div>
    </div>
  );
}

function computeConsensusLabel(consensus) {
  const label = CARDS[consensus].label;
  if (label) {
    return label;
  }
  return consensus;
}

export default EstimationSummary;

