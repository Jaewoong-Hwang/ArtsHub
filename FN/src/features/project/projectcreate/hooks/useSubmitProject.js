import { useNavigate } from "react-router-dom";
import axios from "../../../../services/axiosInstance";

const useSubmitProject = () => {
  const navigate = useNavigate();

  const submitProject = async () => {
    try {
      const info = JSON.parse(localStorage.getItem("projectInfo"));
      const description = JSON.parse(localStorage.getItem("project_description"));
      const rewards = JSON.parse(localStorage.getItem("projectRewards"));

      if (!info || !description) {
        alert("저장된 프로젝트 정보가 없습니다.");
        return;
      }

      // ✅ 서버 DTO에 맞춘 구조
      const requestBody = {
        title: info.title,
        genre: info.genre,
        capacity: info.capacity,
        deadline: info.deadline,
        thumbnail: info.thumbnail, // previewUrl이 아닌 info.thumbnail 사용
        descriptionSummary: info.descriptionSummary,
        description: {
          summary: description.summary,
          content: description.content,
          previewUrl: description.previewUrl,
        },
        rewards: rewards.map((r) => ({
          title: r.title,
          price: r.price,
          options: r.options,
        })),
      };

      // ✅ 서버에 POST 요청
      const res = await axios.post("/api/projects", requestBody);

      // ✅ 등록 성공 시 슬러그 기반 상세 페이지로 이동
      navigate(`/project/${res.data.slug}`);

      // ✅ 로컬스토리지 정리
      localStorage.removeItem("projectInfo");
      localStorage.removeItem("project_description");
      localStorage.removeItem("projectRewards");
    } catch (error) {
      console.error("🚨 등록 중 오류:", error);
      alert("프로젝트 등록에 실패했습니다.");
    }
  };

  return { submitProject };
};

export default useSubmitProject;
