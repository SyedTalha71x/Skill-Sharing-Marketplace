/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/page";
import Home from "./pages/home/page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SkillsPage from "./partials/skills/page";
import Footer from "./components/footer/page";
import Login from "./authentication/login/page";
import Register from "./authentication/register/page";
import { useLocation } from "react-router-dom";
import ViewPlans from "./partials/plans/viewplans/page";
import SkillPlan from "./partials/plans/skillplan/page";
import CloudPlan from "./partials/plans/cloudplan/page";
import Blog from "./partials/blogs/page";
import DetailBlogs from "./partials/blogs/detailblogs/page";
import CloudGuru from "./partials/cloudguru/page";
import Courses from "./partials/courses/page";
import Course from "./routes/course/page";

function App() {
  const location = useLocation();
  const hideFooterPaths = ["login", "register"];
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/viewplans" element={<ViewPlans />} />
        <Route path="/skillsplan" element={<SkillPlan />} />
        <Route path="/cloudplan" element={<CloudPlan />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/moreblogs" element={<DetailBlogs />} />
        <Route path="/cloudguru" element={<CloudGuru />} />
        <Route path="/courses" element={<Courses />} />

        {/* Dynamic Routes  */}
        <Route path="/course/:slug" element={<Course />} />
      </Routes>
      {location.pathname !== hideFooterPaths && <Footer />}
    </>
  );
}

export default App;
