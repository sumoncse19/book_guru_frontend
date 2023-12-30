import { useNavigate } from "react-router-dom";
import { BookInterface } from "../types/bookType";
import { useState } from "react";

const BookCard = ({ book }: { book: BookInterface }) => {
  const navigate = useNavigate();
  const [hoverItemId, setHoverItemId] = useState("");
  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex justify-center items-center w-full border rounded-lg h-full">
        <div
          className="bg-white rounded-lg w-full h-full hover:bg-gray-200 shadow-md flex flex-col md:flex-row grow card text-grey-darkest cursor-pointer"
          onClick={() => navigate(`/book/${book._id}`)}
          onMouseEnter={() => setHoverItemId(book._id)}
          onMouseLeave={() => setHoverItemId("")}
        >
          <img
            className="w-full md:w-1/2 h-[400px] md:h-full rounded-l-lg flex flex-col grow"
            src={book?.image}
            alt="Room Image"
          />
          <div className="w-full flex flex-col">
            <div className="p-4 pb-0 flex-1">
              <h3 className=" mb-4 text-2xl font-bold text-grey-darkest">
                {book?.title}
              </h3>
              <div className="text-lg flex items-center mb-2">
                Autor: {book?.author}
              </div>
              <div className="text-lg flex items-center mb-2">
                Genre: {book.genre}
              </div>
            </div>

            <div
              className={` px-3 py-2 flex items-center justify-between transition hover:bg-gray-400 ${
                hoverItemId === book._id ? "bg-gray-400" : "bg-gray-200"
              }`}
              onClick={() => navigate(`/book/${book._id}`)}
            >
              Details
            </div>
          </div>
        </div>
      </div>

      {/* <div
        className="border border-black flex items-center cursor-pointer"
        onClick={() => navigate(`/book/${book._id}`)}
      >
        <div className="w-[200px] h-[300px] flex items-center p-2">
          <img className="w-[100%]" src={book?.image} alt="" />
        </div>
        <div className="p-3">
          <div className="flex flex-col">
            <h1>{book?.title}</h1>
            <span>Autor: {book?.author}</span>
            <span>Genre: {book.genre}</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default BookCard;
