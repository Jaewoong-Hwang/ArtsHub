import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../components/css/sidebar.module.css'; // ✅ CSS 모듈 import
import '../../../../assets/styles/reset.css';

const Sidebar = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const currentStep = pathParts[3]; // /project/create/[info|description|...]

  const menuItems = [
    { path: '/project/create/info', step: 'info', label: '프로젝트 정보' },
    { path: '/project/create/description', step: 'description', label: '상세 내용' },
    { path: '/project/create/reward', step: 'reward', label: '리워드' },
  ];

  return (
    <aside className={styles.sidebar}>
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.step}
            className={currentStep === item.step ? styles.active : ''}
          >
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
