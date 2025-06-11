import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../../../assets/styles/reset.css';
import styles from '../../css/user/question/QuestionWrite.module.css';

const QuestionWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    console.log('제출된 데이터:', { title, content });
    alert('문의가 등록되었습니다.');
    // window.location.href = '/pages/buyer/question/question-list.html';
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <>
      <div id="header"></div>

      <div className={styles["question-write-content"]}>
        <p className={styles["question-write-title"]}>문의 글 쓰기</p>

        <form
          className={styles["question-write-form"]}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={styles["form-group"]}>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              rows="8"
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className={styles["form-button-group"]}>
            <button type="button" onClick={handleSubmit}>
              등록
            </button>
            <button type="button" onClick={handleCancel}>
              취소
            </button>
          </div>
        </form>
      </div>

      <div id="footer"></div>
    </>
  );
};

export default QuestionWrite;
