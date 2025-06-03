import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserInfo() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // 컴포넌트가 마운트될 때 서버로 사용자 정보 요청
  useEffect(() => {
    axios.get('/api/user/me', {
      withCredentials: true // 쿠키에 저장된 accessToken 포함
    })
    .then(response => {
      setUsername(response.data); // 성공 시 사용자 이름 설정
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        setError('로그인이 필요합니다.');
      } else {
        setError('사용자 정보를 가져오지 못했습니다.');
      }
    });
  }, []);

  return (
    <div className="container mt-5">
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div>
          <h4>인증된 사용자 정보</h4>
          <p>{username}</p>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
