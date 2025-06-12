import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../../services/axiosInstance";

import "../../../../assets/styles/reset.css";
import styles from "./css/ProjectDetail.module.css";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasJoined, setHasJoined] = useState(false); // ✅ 참가 상태

  // ✅ 프로젝트 불러오기
  useEffect(() => {
    axios
      .get(`/api/projects/${slug}`, { withCredentials: true })
      .then((res) => {
        console.log("✅ 응답 데이터", res.data);
        setProject(res.data);
        setHasJoined(res.data.joined); // ✅ 참여 여부 상태 반영
      })
      .catch((err) => {
        console.error("❌ 프로젝트 조회 실패:", err);
        setProject(false);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // ✅ 참가 요청 처리
  const handleJoinProject = async () => {
    try {
      const response = await axios.post(
        `/api/projects/${slug}/join`,
        {},
        { withCredentials: true }
      );
      alert(response.data);

      if (response.data.includes("참여가 완료")) {
        setHasJoined(true);
        // 👉 서버 상태 반영까지 고려하면, currentMembers도 수동 업데이트 가능
        setProject((prev) => ({
          ...prev,
          currentMembers: prev.currentMembers + 1,
        }));

        navigate("/project/participate");
      }
    } catch (err) {
      console.error("❌ 참가 요청 실패:", err);
      if (err.response && err.response.status === 401) {
        alert("로그인이 필요합니다.");
      } else {
        alert("참가 요청 중 오류가 발생했습니다.");
      }
    }
  };

  const handleLeaveProject = async () => {
    try {
      const response = await axios.delete(`/api/projects/${slug}/leave`, {
        withCredentials: true,
      });
      alert(response.data);

      setHasJoined(false);
      setProject((prev) => ({
        ...prev,
        currentMembers: prev.currentMembers - 1,
      }));
      navigate("/project/participate");
    } catch (err) {
      console.error("❌ 참여취소 실패:", err);
      alert("참여 취소 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <p className={styles.loading}>불러오는 중입니다...</p>;
  }

  if (project === false) {
    return <p className={styles.notFound}>해당 프로젝트를 찾을 수 없습니다.</p>;
  }

  const {
    title,
    genre,
    capacity,
    deadline,
    thumbnail,
    description,
    rewards,
    currentMembers,
  } = project;

  const isClosed = currentMembers >= capacity;

  // ✅ 버튼 메시지 상태
  const joinButtonLabel = isClosed
    ? "마감된 프로젝트"
    : hasJoined
    ? "참가 완료됨"
    : "참가하기";

  return (
    <div className={styles.previewWrapper}>
      <h1>프로젝트 상세 보기</h1>

      <section className={styles.previewSection}>
        <h2>{title || "제목 없음"}</h2>
        <p>장르: {genre || "장르 없음"}</p>
        <p>
          모집 인원: {capacity?.toLocaleString()}명 / 현재 참가 인원:{" "}
          {currentMembers?.toLocaleString()}명
        </p>
        <p>모집 마감일: {deadline || "없음"}</p>
      </section>

      <section className={styles.previewSection}>
        <h3>프로젝트 상세 설명</h3>
        {description?.previewUrl && (
          <div className={styles.previewThumbnail}>
            <img src={description.previewUrl} alt="썸네일" />
          </div>
        )}
        <p>
          <strong>개요:</strong> {description?.summary || "없음"}
        </p>
        <p>
          <strong>본문 내용:</strong> {description?.content || "없음"}
        </p>
        <p>
          <strong>기획 배경:</strong> {description?.background || "없음"}
        </p>
        <p>
          <strong>모집 역할:</strong> {description?.roles || "없음"}
        </p>
        <p>
          <strong>일정:</strong> {description?.schedule || "없음"}
        </p>
        <p>
          <strong>보상:</strong> {description?.compensation || "없음"}
        </p>
      </section>

      <section className={styles.previewSection}>
        <h3>리워드</h3>
        {Array.isArray(rewards) && rewards.length > 0 ? (
          rewards.map((reward, index) => (
            <div key={index} className={styles.previewReward}>
              <h4>
                {reward.title || "제목 없음"} - {reward.price?.toLocaleString()}
                원
              </h4>
              <p>{reward.description || "설명이 없습니다."}</p>

              {Array.isArray(reward.options) && reward.options.length > 0 && (
                <ul>
                  {reward.options.map((opt, idx) => (
                    <li key={idx}>
                      <strong>{opt.optionName}</strong>:{" "}
                      {Array.isArray(opt.optionValues)
                        ? opt.optionValues.join(", ")
                        : opt.optionValues || "없음"}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p>등록된 리워드가 없습니다.</p>
        )}
      </section>

      <div className={styles.ctaButtons}>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => navigate(-1)}
        >
          ← 돌아가기
        </button>

        <button
          className={`${styles.btn} ${styles.btnApply}`}
          onClick={hasJoined ? handleLeaveProject : handleJoinProject}
          disabled={isClosed}
        >
          {isClosed
            ? "마감된 프로젝트"
            : hasJoined
            ? "참여 취소하기"
            : "참여하기"}
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
