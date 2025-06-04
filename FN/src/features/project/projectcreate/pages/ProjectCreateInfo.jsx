import React, { useEffect, useState } from "react";
import { useStepModal } from "../components/StepModalContext";
import StepNavigation from "../components/StepNav";
import ProjectCreateHeader from "../components/ProjectCreateHeader";
import Sidebar from "../components/SideBar";

import "../../../../assets/styles/reset.css";
import styles from "./css/ProjecCreatetInfo.module.css";

const ProjectCreateInfo = () => {
  const { open } = useStepModal();

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    headcount: "",
    deadline: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("projectInfo");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
