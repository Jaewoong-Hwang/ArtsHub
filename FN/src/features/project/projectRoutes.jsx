import { Route } from 'react-router-dom';
import ProjectMain from './ProjectMain';
import ProjectCreateInfo from './projectcreate/pages/ProjectCreateInfo';
import ProjectCreateDescription from './projectcreate/pages/Description';
import ProjectCreateReward from './projectcreate/pages/Reward';
// import ProjectCreatePolicy from './projectcreate/pages/ProjectCreatePolicy';

export const ProjectRoutes = () => [
  <Route key="main" path="projectmain" element={<ProjectMain />} />,
  <Route key="info" path="project/create/info" element={<ProjectCreateInfo />} />,
  <Route key="description" path="project/create/description" element={<ProjectCreateDescription />} />,
  <Route key="reward" path="project/create/reward" element={<ProjectCreateReward />} />,
//   <Route key="policy" path="create/policy" element={<ProjectCreatePolicy />} />,
];