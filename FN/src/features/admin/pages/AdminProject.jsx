import SideNav from '../components/common/SideNav';
import TopNav from '../components/common/TopNav';
import ProjectStatusCard from '../components/project/ProjectStatusCard';
import SettlementCard from '../components/project/SettlementCard';
import NewProject from '../components/project/NewProject';
import ProjectCharts from '../components/project/ProjectChart';
import '../styles/admin.css';
import '../styles/admin_project.css';

const AdminProject = () => {
    return (
        <div className="container">
            <SideNav />
            <section>
                <TopNav />
                <div className="project-content">
                    <div className="top-content">
                        <div className="left-panel">
                            <h2>프로젝트 상태</h2>
                            <ProjectStatusCard />
                        </div>
                        <div className="right-panel">
                            <h2>정산 관리</h2>
                            <SettlementCard />
                            <h2>신규 프로젝트</h2>
                            <NewProject />
                        </div>
                    </div>
                    <h2>카테고리 분석</h2>
                    <ProjectCharts />
                </div>
            </section>
        </div>
    );
};
export default AdminProject;