import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";


const BlogList = props => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getBlogs = async () => {
      try {
        let response = await fetch("/blog")
        console.log(response)
        if (response.ok) {
          let blogs = await response.json()
          setBlogs(blogs)
        } else {
          console.log("error")
        } 
  
      } catch (error) {
        console.log(error)
        }
    }
    getBlogs();
  }, []
  )
  return (
    <Row>
      {blogs.map((blog, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={blog.title} {...blog} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
