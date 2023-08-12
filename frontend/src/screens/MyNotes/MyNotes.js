import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./MyNotes.css";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const fetchNotes = async () => {
    const response = await axios.get("/api/notes");
    setNotes(response.data);
  };
  console.log("notes", notes);

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      //
    }
  };
  return (
    <MainScreen title="Welcome back Venkat, here are your notes...">
      <Link>
        <Button size="lg">Create New Note</Button>
      </Link>
      <p className="m-2 display-5">Click on the below notes to view</p>
      {notes.map((note) => (
        <Accordion key={note._id}>
          <Accordion.Item eventKey="0">
            <Card className="m-1">
              <Card.Header className="d-flex">
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    curson: "pointer",
                    alignSelf: "center",
                    fontWeight: "bold",
                  }}
                >
                  <Accordion.Header
                    as={Card.Text}
                    eventKey="0"
                    variant="link"
                    className="note-title"
                  >
                    {note.title}
                  </Accordion.Header>
                </span>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Body eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge bg="success" className="text-white">
                      Category - {note.category}
                    </Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title="Source Title">{"Source Title"}</cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion.Item>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
