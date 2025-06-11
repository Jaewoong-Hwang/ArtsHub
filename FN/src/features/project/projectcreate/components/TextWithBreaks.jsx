import React from "react";
import "./css/TextWithBreaks.css";

const TextWithBreaks = ({ label, text }) => (
  <div className="text-block">
    <p><strong>{label}:</strong></p>
    {text
      ? text.split('\n').map((line, i) => <p key={i}>{line}</p>)
      : <p>작성된 내용 없음</p>}
  </div>
);

export default TextWithBreaks;