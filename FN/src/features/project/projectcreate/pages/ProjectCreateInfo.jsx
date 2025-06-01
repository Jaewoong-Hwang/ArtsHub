import React, { useEffect, useState } from 'react';
import { useStepModal } from '../components/StepModalContext';
import StepNavigation from '../components/StepNav';
import ProjectCreateLayout from '../layouts/ProjectCreateLayout';

import '../../../../assets/styles/reset.css';
import './css/ProjecCreatetInfo.css';

const ProjectCreateInfo = () => {
  const { open } = useStepModal();

  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    headcount: '',
    deadline: '',
  });

  // ✅ 저장된 데이터 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('projectInfo');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  // ✅ 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ 저장 함수
  const handleTempSave = () => {
    localStorage.setItem('projectInfo', JSON.stringify(formData));
    console.log('✅ 저장된 데이터:', formData);
  };

  // ✅ 임시 저장 후 모달 열기
  const handleTempSaveWithModal = () => {
    handleTempSave();
    open('saved'); // 모달 타입 명시 가능
  };

  return (
    <ProjectCreateLayout>
      <h2>프로젝트 기본 정보</h2>

      <form>
        <label>
          프로젝트명
          <input
            type="text"
            name="title"
            placeholder="예: 2025 예술 콘서트"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label>
          장르 선택
          <select
            name="genre"
            required
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="" disabled>
              장르를 선택하세요
            </option>
            <option>클래식</option>
            <option>재즈</option>
            <option>연극</option>
          </select>
        </label>

        <label>
          모집 인원 수
          <input
            type="number"
            name="headcount"
            placeholder="예: 5"
            min="1"
            required
            value={formData.headcount}
            onChange={handleChange}
          />
        </label>

        <label>
          모집 마감일
          <input
            type="date"
            name="deadline"
            required
            value={formData.deadline}
            onChange={handleChange}
          />
        </label>

        <div className="cta-buttons">
          <button
            type="button"
            className="btn outline"
            onClick={handleTempSaveWithModal}
          >
            임시 저장
          </button>

          <StepNavigation onBeforeNext={handleTempSave} />
        </div>
      </form>
    </ProjectCreateLayout>
  );
};

export default ProjectCreateInfo;