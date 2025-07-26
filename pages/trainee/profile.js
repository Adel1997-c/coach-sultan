// pages/trainee/profile.js
import { useEffect, useState } from "react";
import { getTraineeById } from "../../lib/firestore";
import { useRouter } from "next/router";

export default function TraineeProfile() {
  const [trainee, setTrainee] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("traineeId");

    if (!id) {
      router.push("/trainee/login");
      return;
    }

    getTraineeById(id).then((data) => {
      if (!data) {
        alert("لم يتم العثور على بيانات المتدرب");
        router.push("/trainee/login");
      } else {
        setTrainee(data);
      }
    });
  }, []);

  if (!trainee) return <p style={{ textAlign: "center" }}>جاري تحميل البيانات...</p>;

  return (
    <div dir="rtl" style={{ maxWidth: "500px", margin: "auto", padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>بيانات المتدرب</h2>
      <p><strong>الاسم:</strong> {trainee.name}</p>
      <p><strong>الوزن:</strong> {trainee.weight} كجم</p>
      <p><strong>الطول:</strong> {trainee.height} سم</p>
      <p><strong>العمر:</strong> {trainee.age}</p>
      <p><strong>الهدف:</strong> {trainee.trainingGoal}</p>
      <p><strong>الروتين اليومي:</strong> {trainee.dailyRoutine}</p>
      <p><strong>نوع الوظيفة:</strong> {trainee.jobType}</p>
      <p><strong>مدة الاشتراك:</strong> {trainee.subscriptionDuration}</p>
    </div>
  );
}
