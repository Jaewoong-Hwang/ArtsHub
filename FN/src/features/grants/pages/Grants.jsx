// src/pages/grants/Grants.jsx
import React, { useEffect, useState } from "react";
import axios from "../../../services/axiosInstance";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";

import "../../../assets/styles/reset.css";
import styles from "./css/grants.module.css";

const Grants = () => {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/grants") // 백엔드 연동
      .then((res) => {
        console.log("✅ 공모사업 데이터:", res.data);
        setGrants(res.data);
      })
      .catch((err) => {
        console.error("❌ 공모사업 불러오기 실패:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <div className={styles.grantsPage}>
        <h2 className={styles.grantsTitle}>🎯 Arts Funding Opportunities</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.grantList}>
            {grants.map((grant, index) => (
              <div key={index} className={styles.grantCard}>
                <div className={styles.grantTitle}>{grant.title}</div>
                <div className={styles.grantPeriod}>{grant.period}</div>
                <a
                  href={grant.detailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.grantLink}
                >
                  View Details →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Grants;
