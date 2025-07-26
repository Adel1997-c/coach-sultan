// pages/dashboard/add.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { addTrainee } from "../../lib/firestore";
import { hashPassword } from "../../lib/hash";
import AdminNavbar from "../../components/AdminNavbar";

export default function AddTrainee() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    weight: "",
    height: "",
    age: "",
    dailyRoutine: "",
    jobType: "مكتبية",
    subscriptionDuration: "",
    trainingGoal: "زيادة الوزن",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hashedPassword = await hashPassword(formData.password);

    const traineeData = {
      ...formData,
      password: hashedPassword,
    };

    await addTrainee(traineeData);
    alert("تمت إضافة المتدرب بنجاح");
    router.push("/dashboard");
  };

  return (
    <div dir="rtl" style={{ padding: "2rem" }}>
      <AdminNavbar />
      <h1 style={{ textAlign: "center" }}>إضافة متدرب جديد</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
        {[
          { label: "الاسم الكامل", name: "name" },
          { label: "اسم المستخدم", name: "username" },
          { label: "كلمة المرور", name: "password", type: "password" },
          { label: "الوزن (كجم)", name: "weight", type: "number" },
          { label: "الطول (سم)", name: "height", type: "number" },
          { label: "العمر", name: "age", type: "number" },
          { label: "الروتين اليومي", name: "dailyRoutine" },
          { label: "مدة الاشتراك", name: "subscriptionDuration", type: "text" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} style={{ marginBottom: "1rem" }}>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
            />
          </div>
        ))}

        <div style={{ marginBottom: "1rem" }}>
          <label>نوع الوظيفة</label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          >
            <option value="مكتبية">مكتبية</option>
            <option value="ميدانية">ميدانية</option>
          </select>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>هدف التدريب</label>
          <select
            name="trainingGoal"
            value={formData.trainingGoal}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
          >
            <option value="زيادة الوزن">زيادة الوزن</option>
            <option value="تضخيم">تضخيم</option>
            <option value="تخسيس">تخسيس</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          حفظ المتدرب
        </button>
      </form>
    </div>
  );
}
