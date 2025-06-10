// src/hooks/useSubmitProject.js
import { useNavigate } from "react-router-dom";

// 🔧 슬러그 생성 유틸 (중복 방지용)
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

const useSubmitProject = () => {
  const navigate = useNavigate();

  const submitProject = () => {
    try {
      const info = JSON.parse(localStorage.getItem("projectInfo"));
      const description = JSON.parse(
        localStorage.getItem("project_description")
      );
      const rewards = JSON.parse(localStorage.getItem("projectRewards"));

      if (!info || !description) {
        alert("저장된 프로젝트 정보가 없습니다.");
        return;
      }

      const slug = generateSlug(info.title);
      const projectId = `${slug}-${Date.now()}`;

      const stored =
        JSON.parse(localStorage.getItem("submittedProjects")) || [];

      const newProject = {
        id: projectId,
        title: info.title,
        genre: info.genre,
        capacity: info.capacity,
        deadline: info.deadline,
        thumbnail: description.previewUrl,
        descriptionSummary: description.summary, // ✅ 카드에서 바로 쓰기 쉽게
        description, // ✅ full description은 여전히 유지
        rewards,
        views: 0,
        createdAt: new Date().toISOString(),
      };

      // ✅ 저장
      localStorage.setItem(
        "submittedProjects",
        JSON.stringify([...stored, newProject])
      );

      // ✅ 임시 저장 제거
      localStorage.removeItem("projectInfo");
      localStorage.removeItem("project_description");
      localStorage.removeItem("projectRewards");

      // ✅ 상세 페이지 이동
      navigate(`/project/${projectId}`);

      // 🔁 [💡 백엔드 연동용 코드]
      /*
      fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      })
        .then((res) => res.json())
        .then((savedProject) => {
          navigate(`/project/${savedProject.id}`);
        })
        .catch((err) => {
          console.error("🚨 등록 오류:", err);
          alert("등록 실패");
        });
      */
    } catch (error) {
      console.error("🚨 등록 중 예외 발생:", error);
      alert("등록 중 문제가 발생했습니다.");
    }
  };

  return { submitProject };
};

export default useSubmitProject;
