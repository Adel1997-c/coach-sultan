// /pages/admin.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard') // 🔁 REDIRECT to Dashboard
    } catch (err) {
      setError('فشل تسجيل الدخول، تحقق من البيانات')
    }
  }

  return (
    <div style={{ direction: 'rtl', padding: '2rem' }}>
      <h1>تسجيل دخول المشرف</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">دخول</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
