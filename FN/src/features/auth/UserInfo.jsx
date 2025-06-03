import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserInfo() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 서버에 인증된 사용자 정보 요청 (accessToken은 쿠키로 자동 전송됨)
    axios.get('/api/user/me', { withCredentials: true })
      .then(res => {
        setMessage(res.data); // "인증된 사용자: testuser"
      })
      .catch(err => {
        setMessage('인증 실패 또는 로그인 필요');
        console.error(err);
      });
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>내 정보 확인</h3>
      <p>{message}</p>
    </div>
  );
}

export default UserInfo;
