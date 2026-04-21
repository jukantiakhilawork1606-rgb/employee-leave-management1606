import React, { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import axios from "axios";

import Aslider from "./Aside";
import EmployeeLeavereq from "./RecentLeaveRequest";
import DateTime from "./DateTime";
const MainPage = () => {
    const [now, setNow] = useState(new Date());
    const [leaves, setLeaves] = useState([]);

    // ⏱️ Update date every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    // 📡 Fetch leaves from backend
    const fetchLeaves = () => {
        axios
            .get("http://localhost:8083/api/leaves")
            .then((res) => {
                console.log("Fetched leaves:", res.data);
                setLeaves(res.data);
            })
            .catch((err) => {
                console.error("Error fetching leaves:", err);
            });
    };

    // 🚀 Call API on page load
    useEffect(() => {
        fetchLeaves();
    }, []);

    const quarter = Math.ceil((now.getMonth() + 1) / 3);

    // 📊 Stats calculation
    const totalRequests = leaves.length;
    const approved = leaves.filter((l) => l.status === "Approved").length;
    const pending = leaves.filter((l) => l.status === "Pending").length;
    const rejected = leaves.filter((l) => l.status === "Rejected").length;

    return (
        <div className="app">
            {/* Background Glow */}
            <div className="glow-top-left" />
            <div className="glow-bottom-right" />

            {/* SIDEBAR */}
            <Aslider />

            {/* MAIN */}
            <main className="main">
                {/* TOPBAR */}
                <header className="topbar">
                     <DateTime/>
                    <div>
                       
                        <div className="actions">
                            <div className="actions_buttons">
                                <Link to="/LeaveApply">
                                    <button className="btn primary">➕ Apply Leave</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 📊 STATS */}
                <section className="stats">
                    <div className="stat-card">
                        Total Requests <span>{totalRequests}</span>
                    </div>

                    <div className="stat-card">
                        Approved <span>{approved}</span>
                    </div>

                    <div className="stat-card">
                        Pending <span>{pending}</span>
                    </div>

                    <div className="stat-card">
                        Rejected <span>{rejected}</span>
                    </div>
                </section>

                {/* 📋 TABLE COMPONENT */}
                <EmployeeLeavereq leaves={leaves} />

                {/* RIGHT CARDS */}
                {/* <div className="grid">
                    <section className="card">
                        <h2>Leave Balance</h2>
                        <p>Casual Leave: 9</p>
                        <p>Sick Leave: 8</p>
                        <p>Earned Leave: 8</p>
                        <p>Optional Holiday: 2</p>
                    </section>

                    <section className="card">
                        <h2>Quick Apply</h2>

                        <select className="input">
                            <option>Casual Leave</option>
                            <option>Sick Leave</option>
                            <option>Earned Leave</option>
                        </select>

                        <input className="input" type="date" />
                        <input className="input" type="date" />

                        <textarea className="input" placeholder="Reason..." />

                        <button className="btn primary full">
                            Submit Request
                        </button>
                    </section>
                </div> */}
            </main>
        </div>
    );
};

export default MainPage;