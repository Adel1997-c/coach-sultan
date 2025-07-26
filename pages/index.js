'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleTraineeLogin = () => {
    router.push('/trainee/login');
  };

  return (
    <main style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>مرحباً بك في منصة كابتن سلطان</h1>
      <p>منصة تدريبية لإدارة المتدربين وتتبع الأداء</p>
      <button onClick={handleTraineeLogin}>دخول المتدرب</button>
    </main>
  );
}
