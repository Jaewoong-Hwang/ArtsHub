import { useEffect, useState } from 'react';
import axios from 'axios';

const SettlementCardGroup = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/api/admin/project-status')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!data) return null;

    return (
        <div className="card-box">
            <div className="card project-waiting-approval">
                <h3>정산 대기</h3>
                <p>{data.pendingSettlement}</p>
            </div>
            <div className="card project-total">
                <h3>정산 완료</h3>
                <p>{data.settled}</p>
            </div>
        </div>
    );
};

export default SettlementCardGroup;
