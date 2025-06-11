import React from 'react';
import { Link } from 'react-router-dom';
import '../../../../../assets/styles/reset.css';
import styles from '../../css/user/question/QuestionRead.module.css';
import Header from "../../../../../components/layout/Header";
import Footer from "../../../../../components/layout/Footer";

const QuestionRead = () => {
  return (
    <>
      <Header />

      <div className={styles["question-write-content"]}>
        <p className={styles["question-write-title"]}>문의 글 정보</p>

        <form className={styles["question-write-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="제목을 입력하세요"
              disabled
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              placeholder="내용을 입력하세요"
              disabled
            ></textarea>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="reply">답변</label>
            <textarea
              id="reply"
              name="reply"
              placeholder="내용을 입력하세요"
              disabled
            ></textarea>
          </div>
        </form>

        <div className={styles["question-write-button"]}>
          <button type="button" onClick={() => window.history.back()}>
            목록 보기
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default QuestionRead;
