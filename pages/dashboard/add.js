// pages/dashboard/add.js
"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddTraineePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
    jobType: "",
    duration: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "trainees"), form);
      alert("Trainee added successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding trainee: ", error);
      alert("Error creating trainee");
    }
  };

  return (
    <div style={{ padding: "20px", direction: "rtl", textAlign: "right" }}>
      <h1>➕ إضافة متدرب جديد</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
        <label>الاسم:</label>
        <input name="name" value={form.name} onChange={handleChange} required /><br />

        <label>البريد الإلكتروني:</label>
        <input name="email" value={form.email} onChange={handleChange} required /><br />

        <label>كلمة المرور:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required /><br />

        <label>العمر:</label>
        <input name="age" value={form.age} onChange={handleChange} /><br />

        <label>الوزن:</label>
        <input name="weight" value={form.weight} onChange={handleChange} /><br />

        <label>الطول:</label>
        <input name="height" value={form.height} onChange={handleChange} /><br />

        <label>الهدف:</label>
        <select name="goal" value={form.goal} onChange={handleChange}>
          <option value="">اختر الهدف</option>
          <option value="gain">زيادة الوزن</option>
          <option value="lose">انقاص الوزن</option>
          <option value="bulk">ضخامة</option>
        </select><br />

        <label>نوع العمل:</label>
        <select name="jobType" value={form.jobType} onChange={handleChange}>
          <option value="">اختر</option>
          <option value="office">مكتبي</option>
          <option value="field">ميداني</option>
        </select><br />

        <label>مدة الاشتراك (بالأيام):</label>
        <input name="duration" value={form.duration} onChange={handleChange} /><br /><br />

        <button type="submit">إضافة المتدرب</button>
      </form>
    </div>
  );
}
