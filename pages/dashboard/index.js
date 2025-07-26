import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/config'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push('/admin') // 🔒 Not logged in → redirect
    })
    return () => unsubscribe()
  }, [])

  return (
    <div style={{ direction: 'rtl', padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>لوحة التحكم</h1>
      <p style={{ marginBottom: '2rem' }}>مرحباً أيها الكابتن 👋</p>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/dashboard/add">
          <button style={{ padding: '1rem', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem' }}>
            ➕ إضافة متدرب
          </button>
        </Link>
        <Link href="/dashboard/trainees">
          <button style={{ padding: '1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem' }}>
            👀 عرض المتدربين
          </button>
        </Link>
        <Link href="/dashboard/profile">
          <button style={{ padding: '1rem', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem' }}>
            📝 تعديل الملف الشخصي
          </button>
        </Link>
      </div>

      {/* Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: '#f8f8f8', padding: '1rem', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>📊 إحصائيات الأسبوع</h2>
          <p>3 متدربين جدد</p>
          <p>12 جلسة تدريبية</p>
        </div>

        <div style={{ background: '#f8f8f8', padding: '1rem', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>🕒 النشاطات الأخيرة</h2>
          <ul style={{ listStyle: 'disc', paddingRight: '1rem' }}>
            <li>أضفت متدرب جديد</li>
            <li>عدّلت ملفك الشخصي</li>
            <li>حمّلت فيديو جديد</li>
          </ul>
        </div>

        <div style={{ background: '#f8f8f8', padding: '1rem', borderRadius: '8px' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>📁 الوسائط المرفوعة</h2>
          <p>15 صورة</p>
          <p>7 فيديوهات</p>
        </div>
      </div>
    </div>
  )
}
