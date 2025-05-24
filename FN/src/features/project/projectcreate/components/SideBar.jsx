// src/features/project/projectcreate/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

//css
import '../../../../assets/styles/reset.css';
import '../components/css/sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop(); // 현재 경로의 마지막 segment

  const menuItems = [
    { path: 'info', label: '프로젝트 정보' },
    { path: 'description', label: '상세 내용' },
    { path: 'reward', label: '리워드' },
    { path: 'policy', label: '환불 정책' },
  ];

  return (
    <aside className="sidebar">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={currentPage === item.path ? 'active' : ''}
          >
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;