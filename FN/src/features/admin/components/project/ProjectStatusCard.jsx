import { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectStatusCard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/api/admin/project-status')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!data) return null;

    return (
        <>
            <div className="card-box">
                <div className="card project-total">
                    <h3>전체 프로젝트</h3>
                    <p>{data.total}</p>
                </div>
            </div>
            <div className="card-box">
                <div className="card project-waiting-approval">
                    <h3>승인대기</h3>
                    <p>{data.planned}</p>
                </div>
                <div className="card project-total">
                    <h3>진행중</h3>
                    <p>{data.inProgress}</p>
                </div>
            </div>
            <div className="card-box">
                <div className="card project-waiting-approval">
                    <h3>종료됨</h3>
                    <p>{data.completed}</p>
                </div>
                <div className="card project-total">
                    <h3>반려됨</h3>
                    <p>{data.rejected}</p>
                </div>
            </div>
        </>
    );
};

export default ProjectStatusCard;
