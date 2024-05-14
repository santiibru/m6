import React, {useEffect, useState } from "react";
import {Button, Container, Form } from "react-bootstrap";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./styles.css";
const NewBlogPost = props => {
  const [text, setText] = useState({
    title: "",
    cover: "",
    category: "",
    content: "",
  });
  useEffect(() => {
  }, []);
    const createBlogPost = async (e) => {
      
      try {
        let response = await fetch(
          "blog", {
          method: "POST",
          body: JSON.stringify(text),
          headers: {
            "Content-type": "application/json"
          },
        }
        )
        if (response.ok) {
          alert("BlogPost created successfully")
          setText({
            title: "",
            cover: "",
            category: "",
            content: "",
          })
        } else {
          throw new Error("error")
        }
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <Container className="new-blog-container">
      <Form onSubmit={createBlogPost} className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control size="lg" placeholder="Title" value={text.title}
            onChange={(e) => setText({ ...text, title: e.target.value, })}/>
          <Form.Label>Cover</Form.Label>
          <Form.Control size="lg" placeholder="Image" value={text.cover}
            onChange={(e) => setText({ ...text, cover: e.target.value, })}/>
          
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select" value={text.category}
            onChange={(e) => setText({ ...text, category: e.target.value, })}>
            <option>News</option>
            <option>Races</option>
            <option>Opinion</option>
            <option>Features</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>

          <Form.Control value={text.content}
            onChange={(e) => setText({ ...text, content: e.target.value, })} className="new-blog-content" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Send
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
