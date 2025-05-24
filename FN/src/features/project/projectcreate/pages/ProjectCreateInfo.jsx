import React, { useState, useEffect } from 'react';
import ProjectCreateHeader from '../components/ProjectCreateHeader';
import Sidebar from '../components/SideBar';
import StepNavigation from '../components/StepNav';

// CSS
import '../../../../assets/styles/reset.css';
import './css/ProjecCreatetInfo.css';

const ProjectCreateInfo = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setModalVisible(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  return (
    <>
      <ProjectCreateHeader />

      <div className="layout">
        <Sidebar />

        <main className="content">
          <section>
            <h2>프로젝트 기본 정보</h2>

            <form>
              <label>
                프로젝트명
                <input type="text" name="title" placeholder="예: 2025 예술 콘서트" required />
              </label>

              <label>
                장르 선택
                <select name="genre" required defaultValue="">
                  <option value="" disabled>장르를 선택하세요</option>
                  <option>클래식</option>
                  <option>재즈</option>
                  <option>연극</option>
                </select>
              </label>

              <label>
                모집 인원 수
                <input type="number" name="headcount" placeholder="예: 5" min="1" required />
              </label>

              <label>
                모집 마감일
                <input type="date" name="deadline" required />
              </label>

              <div className="cta-buttons">
                <button type="button" className="btn outline" onClick={handleOpenModal}>
                  임시 저장
                </button>
                
                <StepNavigation />
                
              </div>
            </form>
          </section>
        </main>
      </div>

      {isModalVisible && (
        <div id="save-modal" className="modal">
          <div className="modal-content">
            <p>임시 저장이 완료되었습니다!</p>
            <button id="close-modal" onClick={handleCloseModal}>
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCreateInfo;