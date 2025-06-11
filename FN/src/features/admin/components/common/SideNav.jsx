const SideNav = () => (
    <div className="side-nav">
        <div className="nav-logo">ADMIN</div>
        <div className="side-menu">
            <button className="menu-button" onClick={() => (window.location.href = '/admin')}>대시보드</button>
            <button className="menu-button" onClick={() => (window.location.href = '/admin/project')}>프로젝트 관리</button>
            <button className="menu-button" onClick={() => (window.location.href = '/admin/funding')}>펀딩 관리</button>
            <button className="menu-button" onClick={() => (window.location.href = '/admin/user')}>회원 관리</button>
        </div>
    </div>
);

export default SideNav;