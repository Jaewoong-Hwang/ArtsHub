import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosInstance';

function UserInfo() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axiosInstance.get('/api/user/me')
      .then(res => {
        console.log(" 응답 구조:", res.data);
        // 문자열이면 그대로, 객체면 .message 처리
        setMessage(typeof res.data === 'string' ? res.data : res.data.message);
      })
      .catch(err => {
        setMessage('인증 실패 또는 로그인 필요');
        console.error('❌ 인증 실패:', err);
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
