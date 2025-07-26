// pages/trainee/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

export default function TraineeLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/trainee/dashboard');
    } catch (err) {
      setError('⚠️ Incorrect email or password');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'right', direction: 'rtl' }}>
      <h1>تسجيل دخول المتدرب</h1>
      <p>🔐 هذه الصفحة مخصصة للدخول إلى النظام.</p>

      <form onSubmit={handleLogin}>
        <div style={{ marginTop: '20px' }}>
          <label>البريد الإلكتروني:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <label>كلمة المرور:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <button
          type="submit"
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          دخول
        </button>
      </form>
    </div>
  );
}
