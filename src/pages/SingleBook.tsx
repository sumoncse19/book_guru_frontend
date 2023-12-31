import { useSingleBookQuery } from "../redux/feature/book/bookApi";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { useState } from "react";
import DeleteConfirmationDialog from "../components/base/DeleteConfirmationDialog";

const SingleBook = () => {
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const { data: book, isLoading, error } = useSingleBookQuery(id);
  const { user } = useAppSelector((state) => state.user);
  const getYear = (dateString: string) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    return year;
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={book?.data?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.data?.title}</h1>
          <p className="text-xl">Author: {book?.data?.author}</p>
          <p className="text-xl">Genre: {book?.data?.genre}</p>
          <p className="text-xl">
            Publication Date: {getYear(book?.data?.publicationDate)}
          </p>
          {user.email && (
            <div className="flex gap-4">
              <Link
                to={`/edit-book/${id}`}
                className="bg-green-400 px-3 py-2 rounded-lg"
              >
                Edit Book
              </Link>
              <button
                onClick={() => setOpenModal(true)}
                className="bg-red-500 px-3 py-2 rounded-lg"
              >
                Delete Book
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <ProductReview id={id!} /> */}
      <DeleteConfirmationDialog
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
export default SingleBook;
