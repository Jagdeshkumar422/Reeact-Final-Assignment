import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EmailVerified, Login, Signup, UserStatus, AdminLogin,ForgetPassword } from './component';
import { UserHome, CreatePosts, Profile, UserDetail1 } from './pages';
import AdminHome from './pages/AdminPages/AdminHome';
import { PostDetail, ApprovedPosts, PaddingPosts, RejectPosts, ApprovedUsers, PaddingUsers, RejectUsers, UserDetail } from './pages/AdminPages';
import { BlogHome, WebDevelopment, AppDevelopment, Wordpress, Freelancing, BlogDetails,About } from './pages/BlogPages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/userHome' element={<UserHome /> }/>
          <Route path='/signUp' element={<Signup/>}/>
          <Route path='/email-verification' element={<EmailVerified/>}/>
          <Route path='/forget_Password' element={<ForgetPassword/>}/>
          <Route path='/user_Status' element={<UserStatus/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/adminLogin' element={<AdminLogin/>}/>
          <Route path='/adminDashboad' element={<AdminHome/>}/>
          <Route path='/postDetails/:id' element={<PostDetail/>}/>
          <Route path='/userDetails/:id' element={<UserDetail/>}/>
          <Route path='/blogDetails/:id' element={<BlogDetails/>}/>
          <Route path='/userDetail/:id' element={<UserDetail1/>}/>
          <Route path='/approvedPosts' element={<ApprovedPosts/>}/>
          <Route path='/pendingPosts' element={<PaddingPosts/>}/>
          <Route path='/rejectPosts' element={<RejectPosts/>}/>
          <Route path='/approvedUsers' element={<ApprovedUsers/>}/>
          <Route path='/pendingUsers' element={<PaddingUsers/>}/>
          <Route path='/rejectUsers' element={<RejectUsers/>}/>
          <Route path='/' element={<BlogHome/>}/>
          <Route path='/web_development' element={<WebDevelopment/>}/>
          <Route path='/app_development' element={<AppDevelopment/>}/>
          <Route path='/wordpress' element={<Wordpress/>}/>
          <Route path='/freelancing' element={<Freelancing/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/createPost' element={<CreatePosts/>}/>
          <Route path='/profile' element={<Profile/>}/>

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
