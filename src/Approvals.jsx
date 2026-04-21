import React, { useEffect } from "react";
import "./Approvals.css";
import axios from "axios";
import Aside from "./Aside";
import { useNavigate } from "react-router-dom";

const Approvals = ({ leaves, setLeaves }) => {

    const navigate = useNavigate();

    // ✅ Fetch + filter removed items from localStorage
    useEffect(() => {
        axios.get("http://localhost:8083/api/leaves")
            .then(res => {
                const removed = JSON.parse(localStorage.getItem("removedLeaves")) || [];

                const filteredLeaves = res.data.filter(
                    (leave) => !removed.includes(leave.id)
                );

                setLeaves(filteredLeaves);
            })
            .catch(err => {
                console.log("Error fetching leaves:", err);
            });
    }, [setLeaves]);

    // ✅ Approve / Reject (also removes from UI + localStorage)
    const updateStatus = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:8083/api/leaves/${id}`,
                { status }
            );

            // store in localStorage
            const removed = JSON.parse(localStorage.getItem("removedLeaves")) || [];
            const updatedRemoved = [...removed, id];
            localStorage.setItem("removedLeaves", JSON.stringify(updatedRemoved));

            // remove from UI
            setLeaves((prev) =>
                prev.filter((leave) => leave.id !== id)
            );

        } catch (error) {
            console.log("Error updating status:", error);
        }
    };

    // ✅ Remove only from UI using X button
    const removeFromUI = (id) => {
        const removed = JSON.parse(localStorage.getItem("removedLeaves")) || [];

        const updatedRemoved = [...removed, id];
        localStorage.setItem("removedLeaves", JSON.stringify(updatedRemoved));

        setLeaves((prev) =>
            prev.filter((leave) => leave.id !== id)
        );
    };

    return (
        <div>
            <div className="approvals-container">

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                        onClick={() => navigate("/")}
                        className="go-back-btn"
                    >
                        ⬅ Go Back
                    </button>

                    <h2>Leave Approvals</h2>
                </div>

                {leaves.length === 0 ? (
                    <p className="empty-text">No leave requests</p>
                ) : (
                    <div className="leave-grid">
                        {leaves.map((leave) => (
                            <div className="leave-card" key={leave.id}>

                                {/* ❌ X Button */}
                                <button
                                    className="close-btn"
                                    onClick={() => removeFromUI(leave.id)}
                                >
                                    ✖
                                </button>

                                <p><b>Name:</b> {leave.employeeName}</p>
                                <p><b>Type:</b> {leave.leaveType}</p>
                                <p><b>Reason:</b> {leave.reason}</p>

                                <p>
                                    <b>Status:</b>{" "}
                                    <span className={`status ${leave.status}`}>
                                        {leave.status}
                                    </span>
                                </p>

                                <div className="button-group">
                                    <button
                                        className="approve-btn"
                                        onClick={() => updateStatus(leave.id, "Approved")}
                                    >
                                        Approve
                                    </button>

                                    <button
                                        className="reject-btn"
                                        onClick={() => updateStatus(leave.id, "Rejected")}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Approvals;