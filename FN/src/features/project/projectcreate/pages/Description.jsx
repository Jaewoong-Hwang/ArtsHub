import React, { useState, useEffect } from "react";
import ProjectCreateHeader from "../components/ProjectCreateHeader";
import Sidebar from "../components/SideBar";
import StepNavigation from "../components/StepNav";
import { useStepModal } from "../components/StepModalContext";

import "../../../../assets/styles/reset.css";
import "./css/Description.css";

const ProjectCreateDescription = () => {
  const { open } = useStepModal(); // ✅ useStepModal로 변경
  const [previewUrl, setPreviewUrl] = useState(null);

  const [formData, setFormData] = useState({
    summary: "",
    background: "",
    roles: "",
    schedule: "",
    compensation: "",
    previewUrl: null,
  });

  useEffect(() => {
    const saved = localStorage.getItem("project_description");
    if (saved) {
      const data = JSON.parse(saved);
      console.log("✅ 불러온 상세 설명:", data);
      setFormData(data);
      if (data.previewUrl) setPreviewUrl(data.previewUrl);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setFormData((prev) => ({ ...prev, previewUrl: base64 }));
      setPreviewUrl(base64);
    }
  };

  const handleTempSave = () => {
    localStorage.setItem("project_description", JSON.stringify(formData));
    console.log("✅ 저장된 상세 설명:", formData);
  };

  const handleTempSaveWithModal = () => {
    handleTempSave();
    open("saved"); // ✅ 모달 열기
  };

  return (
    <>
      <ProjectCreateHeader />
      <div className="layout">
        <Sidebar />
        <main className="content">
          <section>
            <h2>프로젝트 상세 내용</h2>
            <form>
              <label>
                썸네일 이미지 업로드 (선택)
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />
              </label>

              {previewUrl && (
                <div className="thumbnail-preview">
                  <img
                    src={previewUrl}
                    alt="썸네일 미리보기"
                    style={{ maxWidth: "200px", marginTop: "1rem" }}
                  />
                </div>
              )}

              <label>
                프로젝트 개요
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows="2"
                  placeholder="예: 2030 세대를 위한 재즈 콘서트 프로젝트입니다."
                  required
                />
              </label>

              <label>
                기획 배경
                <textarea
                  name="background"
                  value={formData.background}
                  onChange={handleChange}
                  rows="4"
                  placeholder="예: MZ세대를 위한 공연 콘텐츠의 부재를 느껴 본 프로젝트를 기획하게 되었습니다. 이번 프로젝트는 지역 아티스트들과 협업하여 새로운 창작 경험을 제공합니다."
                />
              </label>

              <label>
                모집 역할
                <textarea
                  name="roles"
                  value={formData.roles}
                  onChange={handleChange}
                  rows="4"
                  placeholder={`예: 
                  - 피아니스트 1명 (즉흥 연주 가능자 우대)
                  - 무대 연출 담당 1명
                  - 영상 촬영/편집 인력 1명 (촬영 장비 보유자 우대)
                  `}
                />
              </label>

              <label>
                일정
                <textarea
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  rows="3"
                   placeholder={`예: 
                    - 리허설: 2025년 6월 15일
                    - 공연: 2025년 6월 29일
                    - 회의 및 준비: 주 1회 온라인 회의
                    `}
                />
              </label>

              <label>
                보상
                <textarea
                  name="compensation"
                  value={formData.compensation}
                  onChange={handleChange}
                  rows="3"
                   placeholder={`예: 
                  - 공연 수익 분배: 출연자 1/N 배분
                  - 교통비 실비 지원
                  - 영상 촬영본 제공
                  `}
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
                <div>
                <StepNavigation onBeforeNext={handleTempSave} />
                </div>
              </div>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default ProjectCreateDescription;
