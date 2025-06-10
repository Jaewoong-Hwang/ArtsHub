// src/features/project/layouts/ProjectCreateLayout.jsx
import React from "react";
import { StepModalProvider } from "../components/StepModalContext";
import ProjectCreateHeader from "../components/ProjectCreateHeader";
import Sidebar from "../components/SideBar";

import "../../../../assets/styles/reset.css";
import "../pages/css/ProjecCreatetInfo.module.css"; // 공통 CSS 있으면 추가

const ProjectCreateLayout = ({ children }) => (
  <StepModalProvider>
    <ProjectCreateHeader />
    <div className="layout">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  </StepModalProvider>
);

export default ProjectCreateLayout;