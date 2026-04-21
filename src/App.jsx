import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPages from "./MainPage";
import LeaveApply from "./LeaveApply";
import Approvals from "./Approvals";
import RecentLeaveRequest from "./RecentLeaveRequest";
import Login from "./Login";

function App() {
  const [leaves, setLeaves] = useState([]);

  const addLeave = (newLeave) => {
    setLeaves((prev) => [...prev, newLeave]);
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* DASHBOARD */}
        <Route
          path="/"
          element={<MainPages leaves={leaves} />}
        />

        {/* APPLY LEAVE */}
        <Route
          path="/LeaveApply"
          element={<LeaveApply addLeave={addLeave} />}
        />
        <Route
          path="/Approvals"
          element={<Approvals leaves={leaves} setLeaves={setLeaves} />}
        />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;