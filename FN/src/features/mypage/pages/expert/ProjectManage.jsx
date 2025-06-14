import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../../assets/styles/reset.css";
import sidemenuStyles from "../css/expert/SidemenuExpert.module.css";
import styles from "../css/expert/ProjectManage.module.css";
import Header from "../../../../components/layout/Header";
import Footer from "../../../../components/layout/Footer";
import { useAuth } from "../../../auth/context/AuthContext"; // ✅ 추가
import LogoutButton from "../../../auth/components/LogoutButton";

const ProjectManage = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [projects, setProjects] = useState([]);

  const SPRING_IMAGE_BASE_URL = "http://localhost:8090/img/profile";
  const profileImage = user?.profileImage;
  const isHttp = profileImage?.startsWith("http");
  const isDefault = !profileImage || profileImage === "default.png";

  const profileImageSrc = isHttp
    ? profileImage
    : isDefault
    ? "/img/default.png"
    : `${SPRING_IMAGE_BASE_URL}/${profileImage}`;

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get("/api/mypage/me", {
        withCredentials: true,
      });
      setOpenDropdown(res.data);
      console.log("현재 role:", res.data.role);
    } catch (err) {
      console.error("유저 정보 불러오기 실패:", err);
      setError("로그인이 필요합니다.");
    }
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleSelect = (action, projectId) => {
  if (action === "delete") {
    handleDeleteProject(projectId);
  } else if (action === "edit") {
    navigate(`/project/edit/${projectId}`);
  } else if (action === "end") {
    // TODO: 모집 종료 API 호출
  } else if (action === "start") {
    // TODO: 모집 재개 API 호출
  }

  setOpenDropdown(null);
  };

  const handleConvertToUser = async () => {
    try {
      const res = await axios.put(
        "/api/mypage/convert-to-user",
        {},
        { withCredentials: true }
      );
      await refreshUser();
      await fetchUserInfo();
      navigate("/UserInforead");
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data || "서버 오류";
      alert("전환 실패: " + message);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("정말 이 프로젝트를 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`/api/mypage/projects/${projectId}`, {
        withCredentials: true,
      });
      // 삭제 후 목록 다시 불러오기
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      alert("삭제가 완료되었습니다.");
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const res = await axios.get("/api/mypage/my-projects", {
          withCredentials: true,
        });
        setProjects(res.data);
      } catch (err) {
        console.error("프로젝트 목록 불러오기 실패:", err);
      }
    };

    fetchMyProjects();
  }, []);

  return (
    <>
      <Header />

      <div className={styles.mypage_section}>
        <div className={sidemenuStyles.sidebar_menu}>
          <div className={sidemenuStyles.profile}>
            <img
              src={profileImageSrc}
              alt="프로필 이미지"
              className={sidemenuStyles["profile-img"]}
            />
            <p className={sidemenuStyles.nickname}>
              {user?.nickname || "닉네임"}
            </p>
          </div>

          <button
            className={sidemenuStyles.change}
            onClick={handleConvertToUser}
          >
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>일반으로 전환</span>
          </button>

          <p className={sidemenuStyles.My_Arts}>My Arts</p>
          <ul className={sidemenuStyles.menu}>
            <li className={sidemenuStyles["menu-item"]}>
              <Link to="/FundingManage">펀딩관리</Link>
            </li>
            <li
              className={`${sidemenuStyles["menu-item"]} ${sidemenuStyles.active}`}
            >
              <Link to="/ProjectManage">프로젝트 관리</Link>
              <ul className={sidemenuStyles.submenu}>
                <li className={sidemenuStyles["submenu-item"]}>
                  <Link to="/ProjectManage">전체</Link>
                </li>
                <li className={sidemenuStyles["submenu-item"]}>
                  <Link to="/ProjectManage">모집중</Link>
                </li>
                <li className={sidemenuStyles["submenu-item"]}>
                  <Link to="/ProjectManage">모집 종료</Link>
                </li>
                <li className={sidemenuStyles["submenu-item"]}>
                  <Link to="/ProjectApplicationManage">참여요청</Link>
                </li>
              </ul>
            </li>
            <li className={sidemenuStyles["menu-item"]}>
              <Link to="/Myprojectrequest">내가 신청한 프로젝트</Link>
            </li>
            <li className={sidemenuStyles["menu-item"]}>
              <Link to="/ProfitHistory">수익 관리</Link>
            </li>
            <li className={sidemenuStyles["menu-item"]}>
              <Link to="/ExpertProfile">프로필</Link>
            </li>
            <li className={sidemenuStyles["menu-item"]}>
              <LogoutButton/>
            </li>
          </ul>
        </div>

        <div className={styles.content}>
          <p className={styles.title}>프로젝트 관리</p>

          <div className={styles.projectItem}>
            {projects.length === 0 ? (
              <div className={styles.emptyBox}>
                <p className={styles.emptyMessage}>
                  등록한 프로젝트가 없습니다.
                </p>
              </div>
            ) : (
              projects.map((project, index) => (
                <div className={styles.projectCard} key={project.id}>
                  <div className={styles.projectThumbnail}>
                    <a href="#">
                      <img
                        src={`http://localhost:8090/img/thumbnail/${project.thumbnail}`}
                        alt="썸네일"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "/static/assets/img/default-thumbnail.png";
                        }}
                      />
                    </a>
                  </div>

                  <div className={styles.projectInfo}>
                    <p className={styles.projectId}>#{project.id}</p>
                    <p className={styles.projectTitle}>{project.title}</p>
                    <p className={styles.projectGoal}>
                      모집인원 : {project.capacity}명
                    </p>
                    <p className={styles.projectSupporter}>
                      현재 멤버 : {project.currentMembers}명
                    </p>
                    <div className={styles.status}>
                      <button
                        className={`${styles.statusBtn} ${
                          styles[project.status]
                        }`}
                      >
                        {project.status === "RECRUITING"
                          ? "모집중"
                          : "모집종료"}
                      </button>
                    </div>
                  </div>

                  <div className={styles.editDropdown}>
                    <button
                      className={styles.editButton}
                      onClick={() => toggleDropdown(index)}
                    >
                      서비스 편집
                    </button>

                    {openDropdown === index && (
                      <ul className={styles.dropdownMenu}>
                        {project.status === "RECRUITING" ? (
                          <li onClick={() => handleSelect("end", project.id)}>
                            모집 종료
                          </li>
                        ) : (
                          <li onClick={() => handleSelect("start", project.id)}>
                            모집 진행
                          </li>
                        )}
                        <li onClick={() => handleSelect("edit", project.id)}>
                          편집
                        </li>
                        <li onClick={() => handleSelect("delete", project.id)}>
                          삭제
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles["projectCreateBtn"]}>
            <button onClick={() => navigate("/project/create/info")}>
              프로젝트 만들기
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProjectManage;
