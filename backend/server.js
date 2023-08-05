const express = require("express");
const dotenv = require("dotenv");
const notes = require("./dummyData/notes");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

//app.use() middleware excutes for all routes
// middleware to parse req body to json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Venkat");
});

app.use("/api/users", userRoutes);

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// app.get("/api/notes/:id", (req, res) => {
//   const note = notes.find((n) => n._id === req.params.id);
//   res.send(note);
// });

// Error Handling middlewares
// define error-handling middleware last, after other app.use() and routes calls
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
