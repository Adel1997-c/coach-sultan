// pages/admin/login.js
"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded admin credentials
    const adminEmail = "admin@coach.com";
    const adminPassword = "admin1234";

    if (email === adminEmail && password === adminPassword) {
      router.push("/dashboard"); // redirect to admin dashboard
    } else {
      setError("Wrong credentials. Try again.");
    }
  };

  return (
    <div style={{ direction: "rtl", textAlign: "center", marginTop: "50px" }}>
      <h1>تسجيل دخول المدرب</h1>
      <p>🔐 هذه الصفحة مخصصة للمدرب فقط</p>

      <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
        <div>
          <label>البريد الإلكتروني:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>كلمة المرور:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">دخول</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
