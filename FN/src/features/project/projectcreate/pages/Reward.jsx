import React, { useEffect, useState } from "react";
import ProjectCreateHeader from "../components/ProjectCreateHeader";
import Sidebar from "../components/SideBar";
import StepNavigation from "../components/StepNav";
import useRewardForm from "../hooks/useRewardForm";
import { useStepModal } from "../components/StepModalContext";

import RewardForm from "../components/RewardForm";
import RewardCard from "../components/RewardCard";

import "../../../../assets/styles/reset.css";
import "./css/ProjecCreatetInfo.css";
import "./css/Reward.css";

const ProjectCreateReward = () => {
  const [rewards, setRewards] = useState([]);
  const { open } = useStepModal(); // ✅ 모달 훅 변경

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

  // ✅ 저장된 리워드 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("projectRewards");
    if (saved) {
      const loaded = JSON.parse(saved);
      console.log("✅ 불러온 리워드:", loaded);
      setRewards(loaded);
    }
  }, []);

  // ✅ 리워드 저장
  const handleSave = () => {
    const updated = rewards.filter((r) => r.id !== currentReward.id);
    const newRewards = [...updated, currentReward];
    setRewards(newRewards);
    localStorage.setItem("projectRewards", JSON.stringify(newRewards));
    console.log("✅ 저장된 리워드:", newRewards);
    cancelEditing();
  };

  // ✅ 임시 저장
  const handleTempSave = () => {
    localStorage.setItem("projectRewards", JSON.stringify(rewards));
    console.log("✅ 임시 저장된 리워드:", rewards);
    open("saved"); // ✅ 모달 호출
  };

  // ✅ 리워드 삭제
  const handleDelete = (id) => {
    const updated = rewards.filter((reward) => reward.id !== id);
    setRewards(updated);
    localStorage.setItem("projectRewards", JSON.stringify(updated));
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
              <RewardForm
                reward={currentReward}
                updateField={updateField}
                addOption={addOption}
                updateOption={updateOption}
                removeOption={removeOption}
                onSave={handleSave}
                onCancel={cancelEditing}
              />
            )}

            {rewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                onEdit={editReward}
                onDelete={handleDelete}
              />
            ))}

            {!isAdding && (
              <button className="btn-reward-create" onClick={startNewReward}>
                + 리워드 추가하기
              </button>
            )}

            <div className="cta-buttons">
              <button
                type="button"
                className="btn outline"
                onClick={handleTempSave}
              >
                임시 저장
              </button>
              <StepNavigation />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ProjectCreateReward;