import { Route, Routes } from "react-router-dom";

import  Home  from "../routes/Home.js";
import  About  from "../routes/About.js";
import  Login  from "../routes/Login.js";
import  Profile  from "../routes/Profile.js";
import NotMatch from "routes/NotMatch.js";

const TodoApp = () => {
    return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="about" element={<About/> } />
        <Route path="login" element={<Login/> } />
        <Route path="profile" element={<Profile/>} />
        <Route path="*" element={<NotMatch/>} />
      </Routes>
    );
  };
  export default TodoApp;
  