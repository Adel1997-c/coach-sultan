// /pages/trainee/index.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth, db } from '../../firebase/config'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

export default function TraineeDashboard() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collection(db, 'trainees'), where('email', '==', user.email))
        const snapshot = await getDocs(q)
        if (!snapshot.empty) {
          setUserData(snapshot.docs[0].data())
        }
        setLoading(false)
      } else {
        router.push('/logins')
      }
    })

    return () => unsubscribe()
  }, [])

  if (loading) return <p>جاري التحميل...</p>
  if (!userData) return <p>لا توجد بيانات</p>

  return (
    <div style={{ direction: 'rtl', padding: '2rem' }}>
      <h1>مرحباً، {userData.name}</h1>
      <p><strong>الهدف:</strong> {userData.goal}</p>
      <p><strong>الوزن:</strong> {userData.weight} كجم</p>
      <p><strong>الطول:</strong> {userData.height} سم</p>
      <p><strong>نوع العمل:</strong> {userData.jobType === 'office' ? 'مكتبي' : 'ميداني'}</p>
      <p><strong>مدة الاشتراك:</strong> {userData.duration} شهر</p>

      <h3>ملاحظات المدرب:</h3>
      <p>{userData.notes}</p>

      <h3>جدول التمارين الأسبوعي:</h3>
      <p>{userData.schedule}</p>

      {userData.imageUrl && (
        <>
          <h3>صور التمارين:</h3>
          <img src={userData.imageUrl} alt="Exercise" width="300" />
        </>
      )}

      {userData.videoUrl && (
        <>
          <h3>فيديو التمارين:</h3>
          <video width="300" controls>
            <source src={userData.videoUrl} type="video/mp4" />
          </video>
        </>
      )}
    </div>
  )
}
