// pages/dashboard/index.js
import { useEffect, useState } from "react";
import { getAllTrainees, deleteTrainee } from "../../lib/firestore";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import AdminNavbar from "../../components/AdminNavbar";
import TraineeCard from "../../components/TraineeCard";

export default function Dashboard() {
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        fetchTrainees();
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTrainees = async () => {
    const data = await getAllTrainees();
    setTrainees(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("هل أنت متأكد أنك تريد حذف هذا المتدرب؟")) {
      await deleteTrainee(id);
      fetchTrainees();
    }
  };

  return (
    <div dir="rtl" style={{ padding: "2rem" }}>
      <AdminNavbar />
      <h1 style={{ textAlign: "center" }}>لوحة تحكم المدرب</h1>
      <button
        onClick={() => router.push("/dashboard/add")}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          margin: "1rem auto",
          display: "block",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        إضافة متدرب جديد
      </button>

      {loading ? (
        <p style={{ textAlign: "center" }}>جاري التحميل...</p>
      ) : (
        trainees.map((trainee) => (
          <TraineeCard
            key={trainee.id}
            trainee={trainee}
            onDelete={() => handleDelete(trainee.id)}
          />
        ))
      )}
    </div>
  );
}
