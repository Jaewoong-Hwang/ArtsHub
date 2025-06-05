import React from 'react';
import {Link} from 'react-router-dom';
import '../../css/user.css';
import '../../css/sidemenu_user.css';

const QuestionRead = () => {
  return (
    <>
      <div id="header"></div>

      <div className="question-write-content">
        <p className="question-write-title">문의 글 정보</p>

        <form className="question-write-form">
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="제목을 입력하세요"
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              placeholder="내용을 입력하세요"
              disabled
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="reply">답변</label>
            <textarea
              id="reply"
              name="reply"
              placeholder="내용을 입력하세요"
              disabled
            ></textarea>
          </div>
        </form>

        <div className="question-write-button">
          <button type="button" onClick={() => window.history.back()}>
            목록 보기
          </button>
        </div>
      </div>

      <div id="footer"></div>
    </>
  );
};

export default QuestionRead;
