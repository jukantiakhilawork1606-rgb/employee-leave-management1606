import React, { useState } from "react";
import LeaveApply from "./LeaveApply";
import Approvals from "./Approvals";

const LeaveDashboard = () => {
  const [leaves, setLeaves] = useState([]);

  // function passed to LeaveApply
  const addLeave = (newLeave) => {
    setLeaves((prev) => [...prev, newLeave]);
  };

  return (
    <div>
      <LeaveApply addLeave={addLeave} />

      <Approvals
        leaves={leaves}
        setLeaves={setLeaves}
      />
    </div>
  );
};

export default LeaveDashboard;