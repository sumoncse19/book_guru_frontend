import { useNavigate } from "react-router-dom";
import { BookInterface } from "../types/bookType";

const BookCard = ({ book }: { book: BookInterface }) => {
  const navigate = useNavigate();
  return (
    <div className="border border-black flex items-center">
      <div
        onClick={() => navigate(`/book/${book?._id}`)}
        className="w-[200px] h-[300px] flex items-center  p-2 cursor-pointer"
      >
        <img className="w-[100%]" src={book?.image} alt="" />
      </div>
      <div className="p-3">
        <div className="flex flex-col">
          <h1>{book?.title}</h1>
          <span>Autor: {book?.author}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
