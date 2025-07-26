// /pages/dashboard/index.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/config'

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push('/admin') // 🔒 Not logged in → back to login
    })
    return () => unsubscribe()
  }, [])

  return (
    <div style={{ direction: 'rtl', padding: '2rem' }}>
      <h1>لوحة التحكم</h1>
      <p>مرحباً أيها الكابتن 👋</p>
    </div>
  )
}
