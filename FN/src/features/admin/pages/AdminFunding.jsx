import SideNav from '../components/common/SideNav';
import TopNav from '../components/common/TopNav';
import FundingCard from '../components/funding/FundingCard';
import FundingCharts from '../components/funding/FundingCharts';
import '../styles/admin.css';
import '../styles/admin_funding.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AdminFunding = () => {
    const [fundingData, setFundingData] = useState([]);
    const [settlementData, setSettlementData] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/dashboard')
            .then((res) => {
                const funding = res.data.funding || [];
                const formatted = funding.map(item => ({
                    ...item,
                    value: `₩${item.value.toLocaleString()}`
                }));
                setFundingData(formatted);
                setSettlementData(res.data.settlement || []);
            })
            .catch((err) => {
                console.error("펀딩 데이터 로드 실패:", err);
            });
    }, []);

    return (
        <div className="container">
            <SideNav />
            <section>
                <TopNav />
                <div className="main-content">
                    <h2>펀딩 현황</h2>
                    <FundingCard data={fundingData} />
                    <h2>통계 분석</h2>
                    <FundingCharts />
                </div>
            </section>
        </div>
    );
};

export default AdminFunding;