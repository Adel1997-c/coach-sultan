// pages/trainee/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { getAllTrainees } from "../../lib/firestore";
import { verifyPassword } from "../../lib/hash";

export default function TraineeLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const trainees = await getAllTrainees();
    const found = trainees.find((t) => t.username === username);

    if (!found) {
      alert("اسم المستخدم غير موجود");
      return;
    }

    const match = await verifyPassword(password, found.password);

    if (!match) {
      alert("كلمة المرور غير صحيحة");
      return;
    }

    // Save trainee ID locally
    localStorage.setItem("traineeId", found.id);
    router.push("/trainee/profile");
  };

  return (
    <div dir="rtl" style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>دخول المتدرب</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "1rem" }}>
          <label>اسم المستخدم</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          دخول
        </button>
      </form>
    </div>
  );
}
