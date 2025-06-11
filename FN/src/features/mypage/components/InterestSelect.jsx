// InterestSelect.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../services/axiosInstance';

const InterestSelect = ({ selectedInterests, onChange }) => {
  const [allInterests, setAllInterests] = useState([]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await axiosInstance.get('/api/interests');
        setAllInterests(res.data);
      } catch (err) {
        console.error('관심분야 목록 불러오기 실패:', err);
      }
    };
    fetchInterests();
  }, []);

  const handleSelect = (e, index) => {
    const updated = [...selectedInterests];
    updated[index] = e.target.value;
    onChange(updated);
  };

  return (
    <div>
      {[0, 1, 2, 3].map((i) => (
        <select key={i} value={selectedInterests[i] || ''} onChange={(e) => handleSelect(e, i)}>
          <option value="">선택</option>
          {allInterests.map((interest) => (
            <option key={interest.interestId} value={interest.name}>
              {interest.name}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default InterestSelect;
