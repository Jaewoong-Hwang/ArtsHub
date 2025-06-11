import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/users')
            .then((res) => {
                setUsers(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.error('회원 목록을 불러오지 못했습니다.', err);
            });
    }, []);

    const formatDate = (dateString) => {
        return dateString?.split('T')[0] || '-';
    };

    const translateRole = (role) => {
        switch (role) {
            case 'USER': return '일반';
            case 'EXPERT': return '전문가';
            case 'ADMIN': return '관리자';
            default: return role;
        }
    };

    const translateStatus = (user) => {
        if (user.hasPendingApproval) return '승인 대기';
        return '활동 중';
    };

    return (
        <div className="user-all-information">
            <table className="user-table">
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '20%' }} />
                </colgroup>
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>권한</th>
                        <th>상태</th>
                        <th>가입일</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="user-information">
                            <td><input type="checkbox" /></td>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{translateRole(user.role)}</td>
                            <td>{translateStatus(user)}</td>
                            <td>{formatDate(user.joinedAt)}</td>
                            <td className="table-btn">
                                <button className="action-btn approve">승인</button>
                                <button className="action-btn suspend">정지</button>
                                <button className="action-btn delete">삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
