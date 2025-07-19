import React, { useEffect, useState } from "react";
import { useStepModal } from "../components/StepModalContext";
import StepNavigation from "../components/StepNav";
import ProjectCreateHeader from "../components/ProjectCreateHeader";
import Sidebar from "../components/SideBar";

import "../../../../assets/styles/reset.css";
import styles from "./css/ProjecCreatetInfo.module.css";
import axiosInstance from "../../../../services/axiosInstance";
import ThumbnailUploader from "../components/ThumbnailUploader";

const ProjectCreateInfo = () => {
  const { open } = useStepModal();

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    capacity: "",
    deadline: "",
    thumbnail: "",
    descriptionSummary: "요약 설명",
  });

  // 로컬 스토리지에서 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("projectInfo");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  // input 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 썸네일 업로드 시 파일명 formData에 반영
  const handleThumbnailUpload = (fileName) => {
    setFormData((prev) => ({ ...prev, thumbnail: fileName }));
  };

  // 임시 저장
  const handleTempSave = () => {
    localStorage.setItem("projectInfo", JSON.stringify(formData));
    console.log("✅ 저장된 데이터:", formData);
  };

  const handleTempSaveWithModal = () => {
    handleTempSave();
    open("saved");
  };

  return (
    <>
      <ProjectCreateHeader />
      <div className={styles.layout}>
        <Sidebar />

        <div className={styles.content}>
          <h2 className={styles.heading}>프로젝트 기본 정보</h2>

          <form>
            <label className={styles.label}>썸네일 이미지 업로드</label>
            <ThumbnailUploader onUpload={handleThumbnailUpload} />
            {formData.thumbnail && (
              <p style={{ fontSize: "14px", marginTop: "6px", marginBottom: "30px" }}>
                서버 저장 파일명: <strong>{formData.thumbnail}</strong>
              </p>
            )}

            <label className={styles.label}>
              프로젝트명
              <input
                type="text"
                name="title"
                placeholder="예: 2025 예술 콘서트"
                required
                value={formData.title}
                onChange={handleChange}
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              장르 선택
              <select
                name="genre"
                required
                value={formData.genre}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="" disabled>
                  장르를 선택하세요
                </option>
                <option>클래식</option>
                <option>재즈</option>
                <option>연극</option>
                <option>무용</option>
                <option>퓨전</option>
                <option>인디</option>
                <option>오페라</option>
                <option>퍼포먼스</option>
                <option>어린이</option>
                <option>국악</option>
                <option>밴드</option>
              </select>
            </label>

            <label className={styles.label}>
              모집 인원 수
              <input
                type="number"
                name="capacity"
                placeholder="예: 5"
                min="1"
                required
                value={formData.capacity}
                onChange={handleChange}
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              모집 마감일
              <input
                type="date"
                name="deadline"
                required
                value={formData.deadline}
                onChange={handleChange}
                className={styles.input}
              />
            </label>

            <div className={styles.ctaButtons}>
              <button
                type="button"
                className={styles.btnOutline}
                onClick={handleTempSaveWithModal}
              >
                임시 저장
              </button>
              <div>
                <StepNavigation onBeforeNext={handleTempSave} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProjectCreateInfo;
