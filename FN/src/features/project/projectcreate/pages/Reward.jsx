// src/features/project/projectcreate/pages/ProjectCreateReward.jsx

import React, { useState } from 'react';
import ProjectCreateHeader from '../components/ProjectCreateHeader';
import Sidebar from '../components/SideBar';
import StepNavigation from '../components/StepNav';
import useRewardForm from '../hooks/useRewardForm';

import '../../../../assets/styles/reset.css';
import './css/ProjecCreatetInfo.css';
import './css/Reward.css';

const ProjectCreateReward = () => {
  const [rewards, setRewards] = useState([]);

  // ✅ 커스텀 훅 사용
  const {
    currentReward,
    isAdding,
    startNewReward,
    editReward,
    cancelEditing,
    updateField,
    addOption,
    updateOption,
    removeOption,
  } = useRewardForm();

  const handleSave = () => {
    const updated = rewards.filter((r) => r.id !== currentReward.id);
    setRewards([...updated, currentReward]);
    cancelEditing(); // 저장 후 초기화
  };

  const handleDelete = (id) => {
    const updated = rewards.filter((reward) => reward.id !== id);
    setRewards(updated);
  };

  return (
    <>
      <ProjectCreateHeader />
      <div className="layout">
        <Sidebar />
        <main className="content">
          <section>
            <h2>리워드 설정</h2>

            {isAdding && currentReward && (
              <div className="reward-box">
                <label>금액
                  <input
                    type="number"
                    value={currentReward.amount}
                    onChange={(e) => updateField('amount', e.target.value)}
                  />
                </label>

                <label>리워드명
                  <input
                    type="text"
                    value={currentReward.title}
                    onChange={(e) => updateField('title', e.target.value)}
                  />
                </label>

                <label>리워드 설명
                  <textarea
                    rows="3"
                    value={currentReward.description}
                    onChange={(e) => updateField('description', e.target.value)}
                  />
                </label>

                <label>구성 방식
                  <select
                    value={currentReward.type}
                    onChange={(e) => updateField('type', e.target.value)}
                  >
                    <option value="single">단일 구성</option>
                    <option value="set">세트 구성</option>
                  </select>
                </label>

                {currentReward.type === 'set' && (
                  <div className="option-section">
                    <h4>옵션 구성</h4>
                    {currentReward.options.map((opt, index) => (
                      <div key={index} className="option-box">
                        <label>옵션명
                          <input
                            type="text"
                            value={opt.optionName}
                            onChange={(e) => updateOption(index, 'optionName', e.target.value)}
                          />
                        </label>
                        <label>옵션값 (쉼표로 구분)
                          <input
                            type="text"
                            value={opt.optionValues}
                            onChange={(e) => updateOption(index, 'optionValues', e.target.value)}
                          />
                        </label>
                        <button type="button" className="btn remove" onClick={() => removeOption(index)}>삭제</button>
                      </div>
                    ))}
                    <button type="button" className="btn outline small" onClick={addOption}>+ 옵션 추가하기</button>
                  </div>
                )}

                <label>배송 요금
                  <input
                    type="number"
                    value={currentReward.shippingFee}
                    onChange={(e) => updateField('shippingFee', e.target.value)}
                  />
                </label>

                <div className="cta-buttons">
                  <button type="button" className="btn outline" onClick={handleSave}>저장</button>
                </div>
              </div>
            )}

            {rewards.map((reward) => (
              <div key={reward.id} className="reward-card">
                <h4>{reward.title} ({reward.amount}원)</h4>
                <p>{reward.description}</p>
                <p>구성: {reward.type === 'set' ? '세트 구성' : '단일 구성'}</p>

                {reward.type === 'set' && reward.options.length > 0 && (
                  <div className="reward-options">
                    <strong>옵션 구성:</strong>
                    <ul>
                      {reward.options.map((opt, i) => (
                        <li key={i}>{opt.optionName}: {opt.optionValues}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <p>배송비: {reward.shippingFee}원</p>

                <div className="reward-actions">
                  <button className="btn outline small" onClick={() => editReward(reward)}>수정</button>
                  <button className="btn remove" onClick={() => handleDelete(reward.id)}>삭제</button>
                </div>
              </div>
            ))}

            {!isAdding && (
              <button className="btn-reward-create" onClick={startNewReward}>+ 리워드 추가하기</button>
            )}

            <div className="cta-button">
              <StepNavigation />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ProjectCreateReward;
