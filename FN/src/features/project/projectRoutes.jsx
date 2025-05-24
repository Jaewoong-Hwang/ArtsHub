import { Route } from 'react-router-dom';
import ProjectMain from './ProjectMain';
import ProjectCreateInfo from './projectcreate/pages/ProjectCreateInfo';
// import ProjectCreateDescription from './projectcreate/pages/ProjectCreateDescription';
// import ProjectCreateReward from './projectcreate/pages/ProjectCreateReward';
// import ProjectCreatePolicy from './projectcreate/pages/ProjectCreatePolicy';

export const ProjectRoutes = () => [
  <Route key="main" path="projectmain" element={<ProjectMain />} />,
  <Route key="info" path="create/info" element={<ProjectCreateInfo />} />,
//   <Route key="description" path="create/description" element={<ProjectCreateDescription />} />,
//   <Route key="reward" path="create/reward" element={<ProjectCreateReward />} />,
//   <Route key="policy" path="create/policy" element={<ProjectCreatePolicy />} />,
];