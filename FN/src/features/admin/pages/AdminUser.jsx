import React from 'react';
import SideNav from '../components/common/SideNav';
import TopNav from '../components/common/TopNav';
import UserFilterBar from '../components/user/UserFilterBar';
import UserTable from '../components/user/UserTable';
import UserChart from '../components/user/UserChart';
import '../styles/admin.css';
import '../styles/admin_user.css';

const AdminUser = () => {
    return (
        <div className="container">
            <SideNav />
            <section>
                <TopNav />
                <div className="main-content">
                    <h2>회원 관리</h2>
                    <div className="user-manage">
                        <UserFilterBar />
                        <UserTable />
                    </div>

                    <h2>회원 통계</h2>
                    <UserChart />
                </div>
            </section>
        </div>
    );
};

export default AdminUser;
