// /components/VideoPlayer.js
export default function VideoPlayer({ src }) {
  if (!src) return null

  return (
    <div style={{ direction: 'rtl', margin: '1rem 0' }}>
      <h4>فيديو التمارين</h4>
      <video controls width="300">
        <source src={src} type="video/mp4" />
        متصفحك لا يدعم تشغيل الفيديو.
      </video>
    </div>
  )
}
