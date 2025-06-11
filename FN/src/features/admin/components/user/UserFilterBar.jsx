const UserFilterBar = () => {
    return (
        <div className="filter-bar">
            <input type="text" placeholder="이름 또는 이메일 검색" />
            <select>
                <option>전체 상태</option>
                <option>승인 대기</option>
                <option>휴면</option>
                <option>활동 중</option>
                <option>탈퇴</option>
            </select>
            <select>
                <option>전체 권한</option>
                <option>회원</option>
                <option>전문가</option>
                <option>관리자</option>
            </select>
            <button className="action-btn search">검색</button>
        </div>
    );
};

export default UserFilterBar;