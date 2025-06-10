import { Route } from 'react-router-dom';
import ProjectMain from './ProjectMain';
import ProjectCreateInfo from './projectcreate/pages/ProjectCreateInfo';
import ProjectCreateDescription from './projectcreate/pages/Description';
import ProjectCreateReward from './projectcreate/pages/Reward';
import ProjectParticipateMain from './projectparticipate/pages/ProjectParticipateMain';
import ProjectPreview from './projectcreate/pages/ProjectPreview';
import ProjectDetail from './projectcreate/pages/ProjectDetail';

export const ProjectRoutes = () => [
  <Route key="main" path="projectmain" element={<ProjectMain />} />,
  <Route key="info" path="project/create/info" element={<ProjectCreateInfo />} />,
  <Route key="description" path="project/create/description" element={<ProjectCreateDescription />} />,
  <Route key="reward" path="project/create/reward" element={<ProjectCreateReward />} />,
  <Route key="Participate" path="project/participate" element={<ProjectParticipateMain />} />,
  <Route key="Preview" path="project/preview" element={<ProjectPreview />} />,
  <Route key="Detail" path="project/:slug" element={<ProjectDetail />} />,   // ✅ 수정됨!
];
