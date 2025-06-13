import React, { useEffect, useState } from "react";
import axios from "../../../services/axiosInstance";
import Header from "../../../components/layout/Header";
import Footer from "../../../components/layout/Footer";
import SearchBar from "../../../components/common/SearchBar";
import GrantCard from "../components/GrantCard";

import "../../../assets/styles/reset.css";
import styles from "./css/grants.module.css";

const ITEMS_PER_PAGE = 9;
const PAGES_PER_GROUP = 5;

const Grants = () => {
  const [grants, setGrants] = useState([]);
  const [filteredGrants, setFilteredGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("/api/grants")
      .then((res) => {
        setGrants(res.data);
        setFilteredGrants(res.data);
      })
      .catch((err) => {
        console.error("❌ 공모사업 불러오기 실패:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔍 검색 처리
  const handleSearch = (keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    const filtered = grants.filter((grant) => {
      const inTitle = grant.title?.toLowerCase().includes(lowerKeyword);
      const inBadges = grant.badges?.some((b) =>
        b.toLowerCase().includes(lowerKeyword)
      );
      return inTitle || inBadges;
    });

    setFilteredGrants(filtered);
    setCurrentPage(1); // 검색 시 1페이지로 초기화
  };

  // 🔢 현재 페이지 데이터 계산
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentItems = filteredGrants.slice(startIdx, endIdx);

  // 📊 페이지 그룹 계산
  const totalPages = Math.ceil(filteredGrants.length / ITEMS_PER_PAGE);
  const currentGroup = Math.ceil(currentPage / PAGES_PER_GROUP);
  const groupStart = (currentGroup - 1) * PAGES_PER_GROUP + 1;
  const groupEnd = Math.min(groupStart + PAGES_PER_GROUP - 1, totalPages);

  return (
    <>
      <Header />
      <div className={styles.grantsPage}>
        <h2 className={styles.grantsTitle}>공모사업</h2>

        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className={styles.grantList}>
              {currentItems.length > 0 ? (
                currentItems.map((grant, index) => (
                  <GrantCard key={index} grant={grant} />
                ))
              ) : (
                <p className={styles.emptyText}>검색 결과가 없습니다.</p>
              )}
            </div>

            {/* ✅ 페이지네이션 */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                {groupStart > 1 && (
                  <button
                    onClick={() => setCurrentPage(groupStart - 1)}
                    className={styles.pageButton}
                  >
                    ◀
                  </button>
                )}

                {Array.from({ length: groupEnd - groupStart + 1 }, (_, idx) => {
                  const page = groupStart + idx;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`${styles.pageButton} ${
                        currentPage === page ? styles.activePage : ""
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {groupEnd < totalPages && (
                  <button
                    onClick={() => setCurrentPage(groupEnd + 1)}
                    className={styles.pageButton}
                  >
                    ▶
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Grants;
