// /pages/adminProfile.js
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export default function AdminProfile() {
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)
  const [savedMessage, setSavedMessage] = useState('')

  const profileDocRef = doc(db, 'settings', 'adminProfile')

  useEffect(() => {
    const fetchProfile = async () => {
      const snapshot = await getDoc(profileDocRef)
      if (snapshot.exists()) {
        setBio(snapshot.data().bio || '')
      }
      setLoading(false)
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    await setDoc(profileDocRef, { bio })
    setSavedMessage('✅ تم الحفظ بنجاح')
  }

  if (loading) return <p>جاري التحميل...</p>

  return (
    <div style={{ direction: 'rtl', padding: '2rem' }}>
      <h2>الملف الشخصي للمدرب</h2>
      <textarea
        rows="10"
        cols="50"
        placeholder="اكتب نبذة عنك أو رسالتك..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        style={{ width: '100%' }}
      />
      <br />
      <button onClick={handleSave}>💾 حفظ</button>
      {savedMessage && <p>{savedMessage}</p>}
    </div>
  )
}
