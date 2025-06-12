import React, { useState, useRef } from "react";
import axios from "axios";
import styles from "./css/ThumbnailUploader.module.css";

const ThumbnailUploader = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/file/upload/thumbnail", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      const fileName = res.data.fileName;
      setPreview(URL.createObjectURL(file));
      onUpload(fileName);
    } catch (err) {
      alert("썸네일 업로드 실패");
      console.error(err);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.previewBox} onClick={triggerFileSelect}>
        {preview ? (
          <img src={preview} alt="미리보기" className={styles.image} />
        ) : (
          <div className={styles.placeholder}>썸네일 미리보기</div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className={styles.hiddenInput}
      />

      <button type="button" className={styles.uploadBtn} onClick={triggerFileSelect}>
         이미지 선택
      </button>
    </div>
  );
};

export default ThumbnailUploader;
