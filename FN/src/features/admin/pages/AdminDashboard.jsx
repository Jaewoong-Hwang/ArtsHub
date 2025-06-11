import { useEffect, useState } from 'react';
import axios from 'axios';
import SideNav from '../components/common/SideNav';
import TopNav from '../components/common/TopNav';
import DashboardCardSection from '../components/dashboard/DashboardCardSection';
import '../styles/admin.css';
import '../styles/admin_dashboard.css';

const AdminDashboard = () => {
    const [fundingData, setFundingData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [userData, setUserData] = useState([]);


    // funding 데이터 로드
    useEffect(() => {
        axios.get('/api/admin/dashboard')
            .then((res) => {
                console.log("응답 데이터:", res.data);

                const funding = res.data.funding || [];
                const formattedFunding = funding.map(item => ({
                    ...item,
                    value: `₩${item.value.toLocaleString()}`
                }));

                const project = res.data.project || [];
                const user = res.data.user || [];

                setFundingData(formattedFunding);
                setProjectData(project);
                setUserData(user);
            })
            .catch((err) => {
                console.error("대시보드 데이터 로드 실패:", err);
            });
    }, []);

    return (
        <div className="container">
            <SideNav />
            <section>
                <TopNav />
                <div className="dashboard-content">
                    <DashboardCardSection title="펀딩" cards={fundingData} />
                    <DashboardCardSection title="프로젝트" cards={projectData} />
                    <DashboardCardSection title="회원" cards={userData} />
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
