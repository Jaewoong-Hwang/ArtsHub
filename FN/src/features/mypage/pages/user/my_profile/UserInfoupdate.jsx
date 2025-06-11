// UserInfoupdate.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../../../assets/styles/reset.css';
import styles from '../../css/user/SidemenuUser.module.css';
import pageStyles from '../../css/user/my_profile/UserInfoupdate.module.css';
import Header from '../../../../../components/layout/Header';
import Footer from '../../../../../components/layout/Footer';
import axiosInstance from '../../../../../services/axiosInstance';
import InterestSelect from '../../../components/InterestSelect'; // ✅ 관심분야 컴포넌트 import

const UserInfoupdate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    phoneNumber: '',
    address: '',
    interests: ['', '', '', ''],
  });

  useEffect(() => {
    axiosInstance.get('/api/user/me', { withCredentials: true })
      .then((res) => {
        const data = res.data;
        setFormData({
          nickname: data.nickname || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          address: data.address || '',
          interests: data.interests || ['', '', '', ''],
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
      await axiosInstance.put('/api/mypage/update', formData, {
        withCredentials: true
      });
      alert('수정 완료!');
      navigate('/UserInforead');
    } catch (err) {
      console.error("수정 실패", err);
      alert("수정 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <Header />
      <div className={pageStyles["mypage_section"]}>
        <div className={styles["sidebarMenu"]}>
          <div className={styles["profile"]}>
            <img src="/static/img/apple.png" alt="프로필 이미지" className={styles["profileImg"]} />
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
                  <img src="/static/img/apple.png" alt="profile-img" />
                </div>
                <button type="button">프로필 변경</button>
              </div>

              <div className={pageStyles["info_list"]}>
                <label htmlFor="nickname">닉네임</label><br />
                <input type="text" id="nickname" value={formData.nickname} onChange={handleChange} /><br />

                <label htmlFor="email">이메일</label><br />
                <input type="text" id="email" value={formData.email} onChange={handleChange} /><br />

                <label htmlFor="phoneNumber">연락처</label><br />
                <input type="text" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} /><br />

                <label htmlFor="address">주소</label><br />
                <input type="text" id="address" value={formData.address} onChange={handleChange} /><br />

                <label>관심분야</label><br />
                <div className={pageStyles["interast"]}>
                  <InterestSelect
                    selectedInterests={formData.interests}
                    onChange={handleInterestChange}
                  />
                </div>

                <div className={pageStyles["okbutton"]}>
                  <button type="submit">완료</button>
                  <button type="button" onClick={() => window.history.back()}>취소</button>
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