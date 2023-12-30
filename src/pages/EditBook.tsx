import { useNavigate, useParams } from "react-router-dom";
import {
  useEditBookMutation,
  useSingleBookQuery,
} from "../redux/feature/book/bookApi";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const EditBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, error } = useSingleBookQuery(id);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [editBook, { isLoading: editLoading, isError: editError, isSuccess }] =
    useEditBookMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (book.data.publicationDate) {
        setStartDate(
          new Date(`${book.data.publicationDate}-01-01T00:00:02.000Z`)
        );
      }
      setTitle(book.data.title);
      setAuthor(book.data.author);
      setGenre(book.data.genre);
      setImage(book.data.image);
    }

    if (isSuccess) {
      toast.dismiss();
      toast.success("Edit book successful");
      navigate("/all-books");
    }
  }, [isLoading, isSuccess]);

  const handleAddBook = () => {
    editBook({
      _id: book.data._id,
      title,
      author,
      genre,
      publicationDate: startDate,
      image,
    });
  };
  if (isLoading || editLoading) {
    return (
      <div className="w-full h-[70vh] flex flex-col justify-center items-center">
        Loading...
      </div>
    );
  }
  if (error || editError) {
    return <div>Error</div>;
  }
  return (
    <div className="p-4 md:p-8 lg:p-24 flex flex-col items-center w-full md:w-[50%] mx-auto bg-slate-800 text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-7">Edit Book</h1>
      <div className="md:p-3 w-full">
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium" htmlFor="title">
            Title
          </label>
          <input
            defaultValue={book.data.title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write the book title"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
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
            defaultValue={book.data.author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Write the author name"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
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
            defaultValue={book.data.genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Write the genre "
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="text"
            name="genre"
            id=""
          />
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium" htmlFor="publication">
            Publication
          </label>
          <div className="w-[70%] border border-blue-500 bg-white text-black rounded-md outline-none">
            <DatePicker
              selected={startDate}
              //   value={getYear(book.data.publicationDate)}
              onChange={(date) => setStartDate(date)}
              // renderYearContent={renderYearContent}
              className="!w-full px-3 py-2 !outline-none border-none text-black rounded-md"
              showYearPicker
              dateFormat="yyyy"
            />
          </div>
        </div>
        <div className="flex justify-between items-center my-2">
          <label className="text-xl font-medium " htmlFor="image">
            Image
          </label>
          <input
            defaultValue={book.data.image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Provide img host link"
            className="border border-blue-500 rounded-md outline-none px-3 py-2 w-[70%] text-black"
            type="text"
            name="image"
            id=""
          />
        </div>
      </div>
      <button
        onClick={handleAddBook}
        className="bg-green-500 px-12 rounded-md text-white font-semibold py-2"
      >
        Save
      </button>
    </div>
  );
};

export default EditBook;
