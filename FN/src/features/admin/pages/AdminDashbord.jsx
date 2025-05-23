import AdminDashboard from './pages/AdminDashboard';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>👑 관리자 대시보드</h1>
      <p>이곳은 관리자 전용 페이지입니다.</p>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>📊 통계</h2>
        <ul>
          <li>총 회원 수: 123명</li>
          <li>총 프로젝트 수: 45건</li>
          <li>오늘 접속 수: 67회</li>
        </ul>
      </section>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>📝 할 일</h2>
        <ol>
          <li>신규 프로젝트 승인 대기</li>
          <li>신고 처리 요청 2건</li>
          <li>후원 정산 검토</li>
        </ol>
      </section>
    </div>
  );
};

export default AdminDashboard;
