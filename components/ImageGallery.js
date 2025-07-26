// /components/ImageGallery.js
export default function ImageGallery({ src }) {
  if (!src) return null

  return (
    <div style={{ direction: 'rtl', margin: '1rem 0' }}>
      <h4>صور التمارين</h4>
      <img src={src} alt="Exercise" width="300" />
    </div>
  )
}
