// /pages/index.js
import Link from 'next/link'

export default function Home() {
  return (
    <div style={{
      direction: 'rtl',
      padding: '2rem',
      textAlign: 'center',
      fontWeight: 'bold'
    }}>
      <h1>مرحباً بك في منصة كابتن سلطان</h1>
      <p>منصة تدريبية لإدارة المتدربين وتتبع الأداء</p>
      <Link href="/logins">
        <button style={{ marginTop: '1rem' }}>دخول المتدرب</button>
      </Link>
    </div>
  )
}
