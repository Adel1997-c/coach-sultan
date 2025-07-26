// /pages/dashboard/add.js
import { useState } from 'react'
import { db, storage } from '../../firebase/config'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function AddTrainee() {
  const [formData, setFormData] = useState({
    name: '', age: '', weight: '', height: '',
    goal: '', jobType: '', duration: '1', notes: '',
    schedule: ''
  })
  const [image, setImage] = useState(null)
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let imageUrl = ''
      let videoUrl = ''

      if (image) {
        const imgRef = ref(storage, `images/${Date.now()}_${image.name}`)
        await uploadBytes(imgRef, image)
        imageUrl = await getDownloadURL(imgRef)
      }

      if (video) {
        const vidRef = ref(storage, `videos/${Date.now()}_${video.name}`)
        await uploadBytes(vidRef, video)
        videoUrl = await getDownloadURL(vidRef)
      }

      await addDoc(collection(db, 'trainees'), {
        ...formData,
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        createdAt: Timestamp.now(),
        imageUrl,
        videoUrl
      })

      setMessage('✅ تم إضافة المتدرب بنجاح')
      setFormData({ name: '', age: '', weight: '', height: '', goal: '', jobType: '', duration: '1', notes: '', schedule: '' })
      setImage(null)
      setVideo(null)
    } catch (err) {
      console.error(err)
      setMessage('❌ حدث خطأ أثناء الإضافة')
    }
    setLoading(false)
  }

  return (
    <div style={{ direction: 'rtl', padding: '2rem' }}>
      <h2>إضافة متدرب جديد</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="الاسم" value={formData.name} onChange={handleChange} required /><br />
        <input name="age" placeholder="العمر" value={formData.age} onChange={handleChange} /><br />
        <input name="weight" placeholder="الوزن" value={formData.weight} onChange={handleChange} /><br />
        <input name="height" placeholder="الطول" value={formData.height} onChange={handleChange} /><br />
        
        <select name="goal" value={formData.goal} onChange={handleChange}>
          <option value="">الهدف</option>
          <option value="gain">زيادة وزن</option>
          <option value="bulk">ضخامة</option>
          <option value="cut">تنشيف</option>
        </select><br />

        <select name="jobType" value={formData.jobType} onChange={handleChange}>
          <option value="">نوع العمل</option>
          <option value="office">مكتبي</option>
          <option value="field">ميداني</option>
        </select><br />

        <select name="duration" value={formData.duration} onChange={handleChange}>
          {[1, 2, 3, 4, 5].map(m => (
            <option key={m} value={m}>{m} شهر</option>
          ))}
        </select><br />

        <textarea name="notes" placeholder="ملاحظات المدرب" value={formData.notes} onChange={handleChange}></textarea><br />
        <textarea name="schedule" placeholder="جدول التمرين الأسبوعي" value={formData.schedule} onChange={handleChange}></textarea><br />

        <label>رفع صورة التمارين:</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} /><br />

        <label>رفع فيديو التمارين:</label>
        <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} /><br />

        <button type="submit" disabled={loading}>{loading ? 'جاري الإضافة...' : 'إضافة'}</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}
