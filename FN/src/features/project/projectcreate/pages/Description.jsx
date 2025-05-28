import React, { useState } from "react";
import ProjectCreateHeader from "../components/ProjectCreateHeader";
import Sidebar from "../components/SideBar";
import StepNavigation from "../components/StepNav";
import useModal from "../hooks/useModal";

import "../../../../assets/styles/reset.css";
import "./css/Description.css";

const ProjectCreateDescription = () => {
  const { isVisible, open, close } = useModal();
  const [thumbnail, setThumbnail] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file)); // 이미지 미리보기용 URL 생성
    }
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
              {/* 썸네일 이미지 업로드 */}
              <label>
                썸네일 이미지 업로드 (선택)
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />
              </label>

              {/* 이미지 미리보기 */}
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
                  placeholder="한 줄로 프로젝트를 소개해주세요. 예: '지역 아이들을 위한 재즈 음악극 제작'"
                  rows="2"
                  required
                />
              </label>

              <label>
                기획 의도 및 배경
                <textarea
                  name="background"
                  placeholder="기획하게 된 계기나 프로젝트의 사회적·예술적 맥락을 설명해주세요."
                  rows="5"
                  required
                />
              </label>

              <label>
                모집 분야 및 역할 설명
                <textarea
                  name="roles"
                  placeholder="모집 중인 전문가 역할과 예상하는 참여 범위를 구체적으로 작성해주세요."
                  rows="5"
                  required
                />
              </label>

              <label>
                예상 일정 및 마일스톤
                <textarea
                  name="schedule"
                  placeholder="예: 6/10~6/25 연습, 7/1 공연, 7/5 결과 리포트 공유"
                  rows="3"
                  required
                />
              </label>

              <label>
                보상 및 제공 사항
                <textarea
                  name="compensation"
                  placeholder="출연료, 교통비 지원, 후원금 분배 계획 등 참여자에게 제공되는 내용을 설명해주세요."
                  rows="3"
                />
              </label>

              <div className="cta-buttons">
                <button type="button" className="btn outline" onClick={open}>
                  임시 저장
                </button>
                <div>
                  <StepNavigation />
                </div>
              </div>
            </form>
          </section>
        </main>
      </div>

      {isVisible && (
        <div id="save-modal" className="modal">
          <div className="modal-content">
            <p>임시 저장이 완료되었습니다!</p>
            <button id="close-modal" onClick={close}>
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCreateDescription;
