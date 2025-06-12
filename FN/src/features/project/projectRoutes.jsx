import { Route } from 'react-router-dom';
import ProjectMain from './ProjectMain';
import ProjectCreateInfo from './projectcreate/pages/ProjectCreateInfo';
import ProjectCreateDescription from './projectcreate/pages/Description';
import ProjectCreateReward from './projectcreate/pages/Reward';
import ProjectParticipateMain from './projectparticipate/pages/ProjectParticipateMain';
import ProjectPreview from './projectcreate/pages/ProjectPreview';
import ProjectDetail from './projectcreate/pages/ProjectDetail';

// 전문가 권한 보호 컴포넌트
import ExpertRoute from '../../components/rootes/ExpertRoute';



export const ProjectRoutes = () => [
  <Route key="main" path="projectmain" element={<ProjectMain />} />,
  <Route key="info" path="project/create/info" element={<ExpertRoute><ProjectCreateInfo /></ExpertRoute>} />,
  <Route key="description" path="project/create/description" element={<ExpertRoute><ProjectCreateDescription /></ExpertRoute>} />,
  <Route key="reward" path="project/create/reward" element={<ExpertRoute><ProjectCreateReward /></ExpertRoute>} />,
  <Route key="Participate" path="project/participate" element={<ProjectParticipateMain />} />,
  <Route key="Preview" path="project/preview" element={<ExpertRoute><ProjectPreview /></ExpertRoute>} />,
  <Route key="Detail" path="project/:slug" element={<ProjectDetail />} />,   // ✅ 수정됨!
];
