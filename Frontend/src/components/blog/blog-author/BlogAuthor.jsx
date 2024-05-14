import React, {useEffect, useState, createContext} from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const authorContext = createContext();
const BlogAuthor = () => {
  const [author, setAuthor] = useState([]);
  
  useEffect(() => {
  
    const getAuthors = async () => {
      try { 
        let response = await fetch("/authors")
        console.log(response)
        if (response.ok) {
          let authors = await response.json()
          setAuthor(authors)
        } else {
          console.log("error")
        }

      } catch (error){
        console.log(error)      
      }
      
    }
    getAuthors();
  }, [])

  return (
    <Row>

        <Col 
         
          xs={"auto"} 
          className="pe-0" 
          >
          <Image className="blog-author" src={author.avatar} roundedCircle />
          <div>di</div>
          <h6>{author.name}</h6>
        </Col>

   
    </Row>
  );
};

export default BlogAuthor;
