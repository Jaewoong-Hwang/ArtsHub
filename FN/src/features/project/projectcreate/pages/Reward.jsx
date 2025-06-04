import React, { useEffect, useState } from "react";
import ProjectCreateHeader from "../components/ProjectCreateHeader";
import Sidebar from "../components/SideBar";
import StepNavigation from "../components/StepNav";
import useRewardForm from "../hooks/useRewardForm";
import { useStepModal } from "../components/StepModalContext";

import RewardForm from "../components/RewardForm";
import RewardCard from "../components/RewardCard";

import "../../../../assets/styles/reset.css";
import styles from "./css/Reward.module.css";

const ProjectCreateReward = () => {
  const [rewards, setRewards] = useState([]);
  const { open } = useStepModal();

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

  useEffect(() => {
    const saved = localStorage.getItem("projectRewards");
    if (saved) {
      const loaded = JSON.parse(saved);
      console.log("✅ 불러온 리워드:", loaded);
      setRewards(loaded);
    }
  }, []);

  const handleSave = () => {
    const updated = rewards.filter((r) => r.id !== currentReward.id);
    const newRewards = [...updated, currentReward];
    setRewards(newRewards);
    localStorage.setItem("projectRewards", JSON.stringify(newRewards));
    console.log("✅ 저장된 리워드:", newRewards);
    cancelEditing();
  };

  const handleTempSave = () => {
    localStorage.setItem("projectRewards", JSON.stringify(rewards));
    console.log("✅ 임시 저장된 리워드:", rewards);
    open("saved");
  };

  const handleDelete = (id) => {
    const updated = rewards.filter((reward) => reward.id !== id);
    setRewards(updated);
    localStorage.setItem("projectRewards", JSON.stringify(updated));
  };

  return (
    <>
      <ProjectCreateHeader />
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.content}>
          <section>
            <h2 className={styles.heading}>리워드 설정</h2>

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
              <button
                className={styles.btnRewardCreate}
                onClick={startNewReward}
              >
                + 리워드 추가하기
              </button>
            )}

            <div className={styles.ctaButtons}>
              <button
                type="button"
                className={styles.btnOutline}
                onClick={handleTempSave}
              >
                임시 저장
              </button>
              <div>
                <StepNavigation />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default ProjectCreateReward;
