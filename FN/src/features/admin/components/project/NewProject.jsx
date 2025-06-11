import { useEffect, useState } from 'react';
import axios from 'axios';

const NewProject = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/admin/project-status')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data || data.monthlyProjectCount === undefined || data.topGenre === undefined) return null;

  return (
    <div className="card-box">
      <div className="card project-total">
        <h3>이번 달 프로젝트 수</h3>
        <p>{data.monthlyProjectCount}</p>
      </div>
      <div className="card project-waiting-approval">
        <h3>가장 많이 등록된 장르</h3>
        <p>{data.topGenre}</p>
      </div>
    </div>
  );
};

export default NewProject;
