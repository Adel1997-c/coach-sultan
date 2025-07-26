// /components/AdminNavbar.js
import Link from 'next/link'

export default function AdminNavbar() {
  return (
    <nav style={{
      direction: 'rtl',
      background: '#222',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 'bold'
    }}>
      <div>كابتن سلطان</div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/dashboard">اللوحة</Link>
        <Link href="/dashboard/add">إضافة متدرب</Link>
        <Link href="/adminProfile">الملف الشخصي</Link>
      </div>
    </nav>
  )
}
