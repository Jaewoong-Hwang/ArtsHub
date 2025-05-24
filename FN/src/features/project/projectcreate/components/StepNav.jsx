// src/features/project/projectcreate/components/StepNavigation.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// CSS
import '../../../../assets/styles/reset.css';
import '../components/css/stepNav.css';

const StepNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const stepOrder = ['info', 'description', 'reward', 'policy'];
  const currentPage = location.pathname.split('/').pop(); // 예: 'info'
  const currentIndex = stepOrder.indexOf(currentPage);

  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= stepOrder.length - 1;

  const handlePrev = () => {
    if (!isFirst) {
      navigate(`/project/create/${stepOrder[currentIndex - 1]}`);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      navigate(`/project/create/${stepOrder[currentIndex + 1]}`);
    } else {
      // TODO: 제출 로직 필요시 이곳에서 처리
      alert('폼을 제출합니다. (제출 로직은 별도로 구현하세요)');
    }
  };

  return (
    <div className="step-navigation">
      {!isFirst && (
        <button
          id="prev-step"
          className="step-btn outline"
          onClick={handlePrev}
        >
          이전 단계
        </button>
      )}

      <button
        id="next-step"
        className="step-btn primary"
        onClick={handleNext}
      >
        {isLast ? '제출하기' : '다음 단계'}
      </button>
    </div>
  );
};

export default StepNavigation;