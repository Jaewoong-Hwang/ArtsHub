import { useNavigate } from "react-router-dom";
import axios from "../../../../services/axiosInstance";

const useSubmitProject = () => {
  const navigate = useNavigate();

  const submitProject = async () => {
    try {
      const info = JSON.parse(localStorage.getItem("projectInfo"));
      const description = JSON.parse(
        localStorage.getItem("project_description")
      );
      const rewards = JSON.parse(localStorage.getItem("projectRewards"));

      // ✅ 기본 정보 유효성 검사
      if (!info || !description) {
        alert("저장된 프로젝트 정보가 없습니다.");
        return;
      }

      // ✅ 제목 유효성 검사
      if (!info?.title?.trim()) {
        alert("프로젝트 제목이 없습니다. 기본 정보부터 작성해주세요.");
        return;
      }

      // ✅ 정원(capacity) 유효성 검사
      const parsedCapacity = parseInt(info.capacity, 10);
      if (isNaN(parsedCapacity) || parsedCapacity < 1) {
        alert("프로젝트 정원은 1명 이상이어야 합니다.");
        return;
      }

      // ✅ 서버 DTO에 맞춘 구조로 requestBody 생성
      const requestBody = {
        title: info.title.trim(),
        genre: info.genre ?? "",
        capacity: parsedCapacity,
        deadline: info.deadline ?? "",
        thumbnail:
          typeof info.thumbnail === "string"
            ? info.thumbnail
            : "https://example.com/default-thumbnail.jpg",

        descriptionSummary: description?.summary ?? "",

        description: {
          summary: description?.summary ?? "",
          content: description?.content || "기본 설명입니다",
          previewUrl:
            description?.previewUrl || "https://example.com/preview.jpg",

          background: description?.background ?? "",
          roles: description?.roles ?? "",
          schedule: description?.schedule ?? "",
          compensation: description?.compensation ?? "",
        },

        rewards: Array.isArray(rewards)
          ? rewards.map((r) => ({
              title: r.title ?? "",
              price: parseInt(r.price, 10) || 0,
              description: r.description ?? "",
              options: Array.isArray(r.options)
                ? r.options.map((opt) => ({
                    optionName: opt.optionName || "",
                    optionValues:
                      typeof opt.optionValues === "string"
                        ? opt.optionValues.split(",").map((v) => v.trim())
                        : opt.optionValues || [],
                  }))
                : [],
            }))
          : [],
      };

      console.log("🚀 최종 전송 데이터:", JSON.stringify(requestBody, null, 2));

      // ✅ 서버에 POST 요청
      const res = await axios.post("/api/projects", requestBody);

      // ✅ 등록 성공 시 슬러그 기반 상세 페이지로 이동
      navigate(`/project/${res.data.slug}`);

      // ✅ 로컬스토리지 정리
      localStorage.removeItem("projectInfo");
      localStorage.removeItem("project_description");
      localStorage.removeItem("projectRewards");
    } catch (error) {
      console.error(
        "❌ 서버 응답 오류:",
        error.response?.data || error.message
      );
      alert("프로젝트 등록에 실패했습니다.");
    }
  };

  return { submitProject };
};

export default useSubmitProject;