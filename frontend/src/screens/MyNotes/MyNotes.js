import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import "./MyNotes.css";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const userLogin = useSelector((state) => state.userLogin);
  const noteCreate = useSelector((state) => state.noteCreate);
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const noteDelete = useSelector((state) => state.noteDelete);

  const { loading, notes, error } = noteList;
  const { userInfo } = userLogin;
  const { success: createSuccess } = noteCreate;
  const { success: updateSuccess } = noteUpdate;
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = noteDelete;

  console.log("notes", notes);
  const history = useHistory();
  useEffect(() => {
    console.log("useEffect running");
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    createSuccess,
    updateSuccess,
    deleteSuccess,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome back ${userInfo.name}, here are your notes...`}>
      <Link to="/createnote">
        <Button size="lg">Create New Note</Button>
      </Link>
      <p className="m-2 display-5">
        To view the note, please click on the <strong>title</strong>.
      </p>
      {loading && <LoadingSpinner />}
      {deleteLoading && <LoadingSpinner />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {deleteError && <ErrorMessage>{deleteError}</ErrorMessage>}
      {notes &&
        notes
          .reverse()
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
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
                      <Button href={`/note/${note._id}`} className="mx-2">
                        Edit
                      </Button>
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
                          <cite title="Source Title">
                            {note.createdAt.substring(0, 10)}
                          </cite>
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
