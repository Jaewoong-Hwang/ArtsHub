import { useState } from "react";

const useRewardForm = () => {
  const [currentReward, setCurrentReward] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // ✅ 새 리워드 작성 시작
  const startNewReward = () => {
    setCurrentReward({
      title: "",
      price: 0,
      description: "",
      options: [],
    });
    setIsAdding(true);
  };

  // ✅ 기존 리워드 수정
  const editReward = (reward) => {
    setCurrentReward(reward);
    setIsAdding(true);
  };

  // ✅ 작성 취소
  const cancelEditing = () => {
    setCurrentReward(null);
    setIsAdding(false);
  };

  // ✅ 필드 업데이트 (title, price, description)
  const updateField = (field, value) => {
    setCurrentReward((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ 옵션 추가
  const addOption = () => {
    setCurrentReward((prev) => ({
      ...prev,
      options: [...(prev.options || []), { optionName: "", optionValues: [] }],
    }));
  };

  // ✅ 옵션 수정
  const updateOption = (index, field, value) => {
    const newOptions = [...currentReward.options];
    newOptions[index][field] =
      field === "optionValues"
        ? value.split(",").map((v) => v.trim()) // 문자열 → 배열
        : value;

    setCurrentReward((prev) => ({ ...prev, options: newOptions }));
  };

  // ✅ 옵션 삭제
  const removeOption = (index) => {
    const newOptions = [...currentReward.options];
    newOptions.splice(index, 1);
    setCurrentReward((prev) => ({ ...prev, options: newOptions }));
  };

  return {
    currentReward,
    isAdding,
    startNewReward,
    editReward,
    cancelEditing,
    updateField,
    addOption,
    updateOption,
    removeOption,
    setCurrentReward,
  };
};

export default useRewardForm;
