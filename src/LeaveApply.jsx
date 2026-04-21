import React, { useState } from "react";
import "./LeaveApply.css";
import Aside from "./Aside";

const LeaveApply = ({ addLeave }) => {
  const [formData, setFormData] = useState({
    employeeName: "",
    leaveType: "Casual Leave",
    fromDate: "",
    toDate: "",
    reason: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLeave = {
      employeeName: formData.employeeName,
      leaveType: formData.leaveType,
      fromDate: formData.fromDate,
      toDate: formData.toDate,
      reason: formData.reason,
      days: 2,
      status: "Pending"
    };
    console.log("Submitting leave:");
    try {
      const response = await fetch("http://localhost:8083/api/leaves/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newLeave)
      });

      if (!response.ok) {
        throw new Error("Failed to submit leave");
      }
      console.log("Submitted leave:");
      const data = await response.json();
      console.log("Saved response:", data);

      alert("Leave submitted successfully!");

      // optional: update UI
      addLeave(data);

      // reset form
      setFormData({
        employeeName: "",
        leaveType: "Casual Leave",
        fromDate: "",
        toDate: "",
        reason: ""
      });

    } catch (error) {
      console.log("Sub leave:", error);
      console.error("Error:", error);
      alert("Something went wrong!");
    }

  };

  return (
    <div>
      {/* <Aside /> */}

      <div className="apply-container">
        <div className="apply-card">

          <h2 style={{
            color: "orangered",
            fontSize: "38px",
            fontWeight: "bolder",
            fontFamily: "monospace"
          }}>
            Apply Leave
          </h2>

          <form onSubmit={handleSubmit} className="apply-form">

            <input
              type="text"
              name="employeeName"
              placeholder="Employee Name"
              value={formData.employeeName}
              onChange={handleChange}
              required
            />

            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
            >
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Earned Leave</option>
            </select>

            <div className="date-row">
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name="reason"
              placeholder="Reason for leave..."
              value={formData.reason}
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-btn">
              Submit Request
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveApply;