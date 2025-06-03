import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStepModal } from "../components/StepModalContext";
import styles from "../components/css/stepNav.module.css";

const StepNavigation = ({ onBeforeNext }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { open } = useStepModal();

  const stepOrder = ["info", "description", "reward"];
  const currentPage = location.pathname.split("/").pop();
  const currentIndex = stepOrder.indexOf(currentPage);

  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= stepOrder.length - 1;

  const handlePrev = () => {
    if (!isFirst) {
      navigate(`/project/create/${stepOrder[currentIndex - 1]}`);
    }
  };

  const handleNext = async () => {
    if (onBeforeNext) await onBeforeNext();
    if (!isLast) {
      navigate(`/project/create/${stepOrder[currentIndex + 1]}`);
    } else {
      open("submit");
    }
  };

  return (
    <div className={styles.navigation}>
      {!isFirst && (
        <button className={`${styles.stepBtn} ${styles.outline}`} onClick={handlePrev}>
          이전 단계
        </button>
      )}
      <button className={`${styles.stepBtn} ${styles.primary}`} onClick={handleNext}>
        {isLast ? "제출하기" : "다음 단계"}
      </button>
    </div>
  );
};

export default StepNavigation;
