import React from "react";

export default function TraineeCard({ trainee, onDelete }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h3>{trainee.name}</h3>
      <p>الوزن: {trainee.weight} كجم</p>
      <p>الطول: {trainee.height} سم</p>
      <p>العمر: {trainee.age} سنة</p>
      <p>الروتين اليومي: {trainee.dailyRoutine}</p>
      <p>الوظيفة: {trainee.jobType}</p>
      <p>المدة: {trainee.subscriptionDuration} شهر</p>
      <p>الهدف: {trainee.goal}</p>
      <button
        onClick={onDelete}
        style={{
          backgroundColor: "#e74c3c",
          color: "white",
          padding: "5px 10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        حذف
      </button>
    </div>
  );
}
