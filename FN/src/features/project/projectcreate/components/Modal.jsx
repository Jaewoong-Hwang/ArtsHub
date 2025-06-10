import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/modal.module.css";

const Modal = ({ type, onClose }) => {
  const navigate = useNavigate();

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
            try {
              // 1. 로컬스토리지에서 데이터 불러오기
              const info = JSON.parse(localStorage.getItem("projectInfo"));
              const description = JSON.parse(localStorage.getItem("project_description"));
              const rewards = JSON.parse(localStorage.getItem("projectRewards"));

              const requestBody = { info, description, rewards };

              console.log("📦 백엔드 전송 데이터 준비:", requestBody);

              // 2. 백엔드 API 호출 (지금은 주석 처리)
              /*
              fetch("/api/projects", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
              })
                .then((res) => {
                  if (!res.ok) throw new Error("등록 실패");
                  return res.json();
                })
                .then((data) => {
                  console.log("✅ 등록 성공:", data);
                })
                .catch((err) => {
                  console.error("🚨 등록 오류:", err);
                  alert("등록 중 문제가 발생했습니다.");
                });
              */

              // 3. 로컬스토리지 초기화
              localStorage.removeItem("projectInfo");
              localStorage.removeItem("project_description");
              localStorage.removeItem("projectRewards");

              // 4. 참여 프로젝트 페이지로 이동
              handleNavigate("/project/participate");
            } catch (error) {
              console.error("🚨 처리 중 오류 발생:", error);
              alert("프로젝트 등록 중 문제가 발생했습니다.");
            }
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
