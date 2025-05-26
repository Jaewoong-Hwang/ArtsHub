// src/features/project/projectcreate/components/StepNavigation.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useModal from '../hooks/useModal';

// CSS
import '../../../../assets/styles/reset.css';
import '../components/css/stepNav.css';

const StepNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isVisible, modalType, open, close } = useModal();

  const stepOrder = ['info', 'description', 'reward'];
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
      open('submit'); // ✅ 모달 열기 (제출 완료)
    }
  };

  return (
    <>
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

      {/* ✅ 모달 렌더링 */}
      {isVisible && modalType === 'submit' && (
        <div className="modal">
          <div className="modal-content">
            <h2> 프로젝트 제출 완료!</h2>
            <p>프로젝트가 성공적으로 등록되었습니다.</p>
            <div className="modal-buttons">
              <button className="btn primary" onClick={() => navigate('/mypage/projects')}>
                내 프로젝트 보기
              </button>
              <button className="btn outline" onClick={() => navigate('/')}>
                홈으로
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StepNavigation;
