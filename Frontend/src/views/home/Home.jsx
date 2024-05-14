import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = props => {
  return (
    <Container fluid="sm">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="blog-main-title mb-3">F1 News</h1>
        <Button as={Link} to="/new" className="blog-navbar-add-button bg-dark" size="lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
          New BlogPost
        </Button>
      </div>
      <BlogList />
    </Container>
  );
};

export default Home;
