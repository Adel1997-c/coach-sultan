// /components/BackButton.js
'use client'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      style={{ margin: '1rem 0', direction: 'rtl' }}
    >
      ← رجوع
    </button>
  )
}
