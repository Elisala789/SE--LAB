import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TotalStats.module.css";


const TotalStats = () => {
  const navigate = useNavigate();
  const [labs, setLabs] = useState([]);
  const [allocatedSeats, setAllocatedSeats] = useState([]);


  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/labs");
        const data = await response.json();

        // Extracting all occupied seats from all labs
        const occupiedSeats = data
          .flatMap(lab => lab.seats) // Get all seats from each lab
          .filter(seat => seat.assignedUser !== null) // Filter only occupied seats
          .map(seat => ({
            id: seat.id,
            seatNumber: seat.seatNumber,
            labName: data.find(lab => lab.seats.some(s => s.id === seat.id))?.name || "Unknown Lab",
            studentName: seat.assignedUser.name,
            email: seat.assignedUser.email
          }));

        setLabs(data);
        setAllocatedSeats(occupiedSeats);

      } catch (error) {
        console.error("Error fetching labs:", error);
      }
    };

    fetchLabs();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Lab Seat Allocations</h1>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ← Back to Dashboard
        </button>
      </div>

      <div className={styles.statsSummary}>
        <div className={styles.statCard}>
          <h3>Total Labs</h3>
          <p>{labs.length}</p>
        </div>

        <div className={styles.statCard}>
          <h3>Total Seats</h3>
          <p>{labs.reduce((total, lab) => total + lab.seats.length, 0)}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Occupied Seats</h3>
          <p>{allocatedSeats.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Utilization</h3>
          <p>{Math.round((allocatedSeats.length / (labs.reduce((total, lab) => total + lab.seats.length, 0) || 1)) * 100)}%</p>
        </div>
      </div>

      <h2>Allocated Seats ({allocatedSeats.length})</h2>
      <br/>
      <div className={styles.tableContainer}>
        <table className={styles.statsTable}>
          <thead>
            <tr>
              <th>Lab Name</th>
              <th>Seat Number</th>
              <th>Student Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {allocatedSeats.length > 0 ? (
              allocatedSeats.map(seat => (
                <tr key={seat.id}>
                  <td>{seat.labName}</td>
                  <td>{seat.seatNumber}</td>
                  <td>{seat.studentName}</td>
                  <td>{seat.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={styles.noData}>No seats allocated yet.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalStats;
