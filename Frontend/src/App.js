import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import LoginForm from "./views/login/loginForm";
import SignUpForm from "./views/login/signupForm";
import AuthProvider from "./views/login/AuthProvider";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={< LoginForm />} />
          <Route path="/register" element={< SignUpForm />} />
            <Route path="/home" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </AuthProvider>
    </Router>
  );
}

export default App;
