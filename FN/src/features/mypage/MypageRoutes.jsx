import { Route } from 'react-router-dom';
import UserInforead from './pages/user/my_profile/UserInforead';
import UserInfoUpdate from './pages/user/my_profile/UserInfoupdate';
import MyFundingSupport from './pages/user/order/MyFundingSupport';
import SupportDetailread from './pages/user/order/SupportDetailread';
import SupportDetailupdate from './pages/user/order/SupportDetailupdate';
import QuestionList from './pages/user/question/QuestionList';
import QuestionRead from './pages/user/question/QuestionRead';
import QuestionWrite from './pages/user/question/QuestionWrite';
import FundingManage from './pages/expert/FundingManage';
import ProjectManage from './pages/expert/ProjectManage';
import ProjectApplicationManage from './pages/expert/ProjectApplicationManage';
import Myprojectrequest from './pages/expert/Myprojectrequest';
import ExpertProfile from './pages/expert/ExpertProfile';
import ExpertProfileDetail from './pages/expert/ExpertProfileDetail';
import ProfitHistory from './pages/expert/ProfitHistory';


export const MypageRoutes = () => (
  <>
    {/* 유저_유저정보 */}
    <Route path="/UserInforead" element={<UserInforead />} />
    <Route path="/UserInfoUpdate" element={<UserInfoUpdate />} />
    {/* 유저_후원정보 */}
    <Route path="/MyFundingSupport" element={<MyFundingSupport />} />
    <Route path="/SupportDetailread" element={<SupportDetailread />} />
    <Route path="/SupportDetailupdate" element={<SupportDetailupdate />} />
    {/* 유저_문의정보 */}
    <Route path="/QuestionList" element={<QuestionList />} />
    <Route path="/QuestionRead" element={<QuestionRead />} />
    <Route path="/QuestionWrite" element={<QuestionWrite />} />
    {/* 전문가_펀딩관리 */}
    <Route path="/FundingManage" element={<FundingManage />} />
    {/* 전문가_프로젝트관리 */}
    <Route path="/ProjectManage" element={<ProjectManage />} />
    {/* 전문가_신청요청관리 */}
    <Route path="/ProjectApplicationManage" element={<ProjectApplicationManage />} />
    {/* 전문가_내가신청한프로젝트 */}
    <Route path="/Myprojectrequest" element={<Myprojectrequest />} />
    {/* 전문가_프로필 */}
    <Route path="/ExpertProfile" element={<ExpertProfile />} />
    {/* 전문가_프로필상세 */}
    <Route path="/ExpertProfileDetail" element={<ExpertProfileDetail />} />
    {/* 전문가_수익관리 */}
    <Route path="/ProfitHistory" element={<ProfitHistory />} />
  </>
);