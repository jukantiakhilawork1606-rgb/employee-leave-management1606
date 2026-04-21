import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './RecentLeaveReq.css';

const RecentLeaveRequest = () => {
  const [leaves, setLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 4; // you can change this

  useEffect(() => {
    axios.get("http://localhost:8083/api/leaves")
      .then((response) => {
        setLeaves(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaves:", error);
      });
  }, []);

  // Filter logic
  const filteredLeaves = leaves.filter((leave) =>
    leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentLeaves = filteredLeaves.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredLeaves.length / rowsPerPage);

  return (
    <div>
      <section className="card">
        <div style={{ }} className="card1-header">
        <h2 className="card1-title">Recent Leave Requests</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by employee name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page when searching
          }}
          style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
        />
           </div>
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {currentLeaves.length > 0 ? (
              currentLeaves.map((leave, index) => (
                <tr key={index}>
                  <td>{leave.employeeName}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.fromDate}</td>
                  <td>{leave.toDate}</td>
                  <td>{leave.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ marginTop: "10px" }}>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                margin: "2px",
                padding: "5px 10px",
                background: currentPage === i + 1 ? "#007bff" : "#eee",
                color: currentPage === i + 1 ? "#fff" : "#000",
                border: "none",
                cursor: "pointer"
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecentLeaveRequest;