import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../../../assets/styles/reset.css";
import styles from "../../css/user/SidemenuUser.module.css";
import pageStyles from "../../css/user/my_profile/UserInfoupdate.module.css";
import Header from "../../../../../components/layout/Header";
import Footer from "../../../../../components/layout/Footer";
import axiosInstance from "../../../../../services/axiosInstance";
import InterestSelect from "../../../components/InterestSelect";
import { useAuth } from "../../../../auth/context/AuthContext";

const UserInfoupdate = () => {
  const navigate = useNavigate();
  const { user, setUser, refreshUser } = useAuth();

  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    phoneNumber: "",
    address: "",
    interests: ["", "", "", ""],
    profileImage: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/api/mypage/me", { withCredentials: true })
      .then((res) => {
        const data = res.data;
        setFormData({
          nickname: data.nickname || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          interests: data.interests || ["", "", "", ""],
          profileImage: data.profileImage || "",
        });
      })
      .catch((err) => {
        console.error("유저 정보 불러오기 실패", err);
      });
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleInterestChange = (newInterests) => {
    setFormData((prev) => ({ ...prev, interests: newInterests }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let uploadedFileName = formData.profileImage;

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);

        const res = await axiosInstance.post(
          "/api/file/upload/profile",
          uploadData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        uploadedFileName = res.data.fileName;
        await refreshUser(); // 백엔드에서 새로 가져오기
        setUser((prev) => ({
          ...prev,
          profileImage: uploadedFileName, 
        }));
      }

      await axiosInstance.put("/api/mypage/update", {
        nickname: formData.nickname,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        profileImage: uploadedFileName,
      });

      await axiosInstance.put(
        "/api/mypage/update-interests",
        formData.interests
      );


      navigate("/UserInforead");
    } catch (err) {
      console.error("수정 실패", err);
      alert("수정 실패: " + (err.response?.data?.message || err.message));
    }
  };

  const SPRING_IMAGE_BASE_URL = "http://localhost:8090/img/profile";

  const isHttpUrl = formData.profileImage?.startsWith("http");
  const isDefault =
    !formData.profileImage || formData.profileImage === "default.png";

  const sideProfileImageSrc = isHttpUrl
    ? formData.profileImage
    : isDefault
    ? "/img/default.png"
    : `${SPRING_IMAGE_BASE_URL}/${formData.profileImage}`;

  const mainProfileImageSrc = previewUrl
    ? previewUrl
    : isHttpUrl
    ? formData.profileImage
    : isDefault
    ? "/img/default.png"
    : `${SPRING_IMAGE_BASE_URL}/${formData.profileImage}`;

  return (
    <>
      <Header />
      <div className={pageStyles["mypage_section"]}>
        <div className={styles["sidebarMenu"]}>
          <div className={styles["profile"]}>
            <img src={sideProfileImageSrc} alt="프로필" />
            <p className={styles["nickname"]}>{formData.nickname}</p>
          </div>

          <Link to="/FundingManage" className={styles["change"]}>
            <span className="material-symbols-outlined">swap_horiz</span>
            <span>전문가로 전환</span>
          </Link>

          <p className={styles["myArts"]}>My Arts</p>
          <ul className={styles["menu"]}>
            <li className={`${styles["menuItem"]} ${styles["menuItemActive"]}`}>
              <Link to="/UserInforead">내정보</Link>
            </li>
            <li className={styles["menuItem"]}>
              <Link to="/MyFundingSupport">후원 관리</Link>
            </li>
            <li className={styles["menuItem"]}>
              <Link to="/QuestionList">문의</Link>
            </li>
            <li className={styles["menuItem"]}>
              <Link to="/logout">로그아웃</Link>
            </li>
          </ul>
        </div>

        <div className={pageStyles["content"]}>
          <p className={pageStyles["title"]}>내정보</p>
          <div className={pageStyles["content_item"]}>
            <form onSubmit={handleSubmit}>
              <div className={pageStyles["profile_img"]}>
                <div className={pageStyles["profile_img_show"]}>
                  <img src={mainProfileImageSrc} alt="프로필" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                >
                  프로필 변경
                </button>
              </div>

              <div className={pageStyles["info_list"]}>
                <label htmlFor="nickname">닉네임</label>
                <input
                  type="text"
                  id="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                />

                <label htmlFor="email">이메일</label>
                <input type="text" id="email" value={formData.email} disabled />

                <label htmlFor="phoneNumber">연락처</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />

                <label htmlFor="address">주소</label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                />

                <label>관심분야</label>
                <div className={pageStyles["interast"]}>
                  <InterestSelect
                    selectedInterests={formData.interests}
                    onChange={handleInterestChange}
                  />
                </div>

                <div className={pageStyles["okbutton"]}>
                  <button type="submit">완료</button>
                  <button type="button" onClick={() => window.history.back()}>
                    취소
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserInfoupdate;
