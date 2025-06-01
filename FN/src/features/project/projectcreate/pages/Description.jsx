import React, { useState, useEffect } from "react";
import ProjectCreateHeader from "../components/ProjectCreateHeader";
import Sidebar from "../components/SideBar";
import StepNavigation from "../components/StepNav";
import useModal from "../hooks/useModal";

import "../../../../assets/styles/reset.css";
import "./css/Description.css";

const ProjectCreateDescription = () => {
  const { isVisible, open, close } = useModal();
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
      console.log("✅ 불러온 상세 설명:", data); // ✅ 확인용 로그
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
    console.log("✅ 저장된 상세 설명:", formData); // ✅ 확인용 로그
    open();
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
                  placeholder="한 줄로 소개해주세요."
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
                />
              </label>

              <label>
                모집 역할
                <textarea
                  name="roles"
                  value={formData.roles}
                  onChange={handleChange}
                  rows="4"
                />
              </label>

              <label>
                일정
                <textarea
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  rows="3"
                />
              </label>

              <label>
                보상
                <textarea
                  name="compensation"
                  value={formData.compensation}
                  onChange={handleChange}
                  rows="3"
                />
              </label>

              <div className="cta-buttons">
                <button
                  type="button"
                  className="btn outline"
                  onClick={handleTempSave}
                >
                  임시 저장
                </button>
                <StepNavigation onBeforeNext={handleTempSave} />
              </div>
            </form>
          </section>
        </main>
      </div>

      {isVisible && (
        <div className="modal" id="save-modal">
          <div className="modal-content">
            <p>임시 저장이 완료되었습니다!</p>
            <button onClick={close}>확인</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCreateDescription;
