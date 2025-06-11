import React from "react";
import { useNavigate } from "react-router-dom";
import useSubmitProject from "../hooks/useSubmitProject";
import styles from "./css/modal.module.css";

const Modal = ({ type, onClose }) => {
  const navigate = useNavigate();
  const { submitProject } = useSubmitProject();

  const handleNavigate = (path) => {
    onClose();       // 모달 닫기
    navigate(path);  // 페이지 이동
  };

  const modalContent = {
    submit: {
      title: "프로젝트 제출 완료!",
      message: "🎉 프로젝트가 성공적으로 제출되었습니다.",
      buttons: [
        {
          label: "프로젝트 미리보기",
          style: "outline",
          action: () => handleNavigate("/project/preview"),
        },
        {
          label: "최종 등록하기",
          style: "primary",
          action: () => {
            onClose(); // ✅ 모달 먼저 닫고
            submitProject(navigate); // ✅ 프로젝트 등록
          },
        },
      ],
    },
    saved: {
      title: null,
      message: "임시 저장이 완료되었습니다!",
      buttons: [
        {
          label: "확인",
          style: "primary",
          action: onClose,
        },
      ],
    },
  };

  const content = modalContent[type];
  if (!content) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {content.title && <h2>{content.title}</h2>}
        <p>{content.message}</p>
        <div className={styles.modalButtons}>
          {content.buttons.map((btn, idx) => (
            <button
              key={idx}
              className={`${styles.modalBtn} ${styles[btn.style]}`}
              onClick={btn.action}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
