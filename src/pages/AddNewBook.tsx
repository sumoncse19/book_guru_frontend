import axios from "axios";
import { useState } from "react";

const AddNewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [image, setImage] = useState("");

  const handleAddBook = () => {
    const data = {
      title,
      author,
      genre,
      publicationDate,
      image,
    };
    console.log(data);

    axios.post("http://localhost:5000/book", data).then((res) => {
      if (res.data) {
        setTitle("");
        setAuthor("");
        setGenre("");
        setPublicationDate("");
        setImage("");
      }
    });
  };
  return (
    <div className="p-24 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-7">Add New Book</h1>
      <div className=" p-3 w-[50%]">
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium" htmlFor="title">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write the book title"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%]"
            type="text"
            name="title"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="author">
            Author
          </label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Write the author name"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%]"
            type="text"
            name="author"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="genre">
            Genre
          </label>
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Write the genre "
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%]"
            type="text"
            name="genre"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="publication">
            Publication
          </label>
          <input
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
            placeholder="Write the publication date"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%]"
            type="text"
            name="publication"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="image">
            Image
          </label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Provide img host link"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%]"
            type="text"
            name="image"
            id=""
          />
        </div>
      </div>
      <button
        onClick={handleAddBook}
        className="ml-[420px] bg-green-500 px-12 rounded-md text-white font-semibold py-2"
      >
        Save
      </button>
    </div>
  );
};

export default AddNewBook;
