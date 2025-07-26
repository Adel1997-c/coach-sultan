export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>👋 أهلاً بك في كوتش سلطان</h1>
      <p>اختر تسجيل الدخول:</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/login">📋 دخول المدرب</a><br />
        <a href="/trainee/login">💪 دخول المتدرب</a>
      </div>
    </div>
  );
}
