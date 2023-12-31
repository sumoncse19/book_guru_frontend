import {
  useGetReviewsQuery,
  usePostReviewMutation,
  useSingleBookQuery,
} from "../redux/feature/book/bookApi";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import DeleteConfirmationDialog from "../components/base/DeleteConfirmationDialog";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SingleBook = () => {
  const [openModal, setOpenModal] = useState(false);
  const [review, setReview] = useState("");
  const { id } = useParams();
  const { data: book, isLoading, error } = useSingleBookQuery(id);
  const {
    data: reviews,
    isLoading: reviewLoading,
    error: reviewError,
  } = useGetReviewsQuery(id);
  const [
    postReview,
    { isLoading: postLoading, isError: postError, isSuccess },
  ] = usePostReviewMutation();
  const { user } = useAppSelector((state) => state.user);
  const getYear = (dateString: string) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    return year;
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Review added successfully");
      setReview("");
    }
  }, [isSuccess]);

  const handleSubmitReview = () => {
    if (!user._id) {
      return toast.error("Please login");
    }
    postReview({ userId: user._id, bookId: id, review: review });
  };
  if (isLoading || reviewLoading || postLoading) {
    return <div>Loading...</div>;
  }
  if (error || reviewError || postError) {
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
          {user._id && user._id == book.userId && (
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
      {reviews.length > 0 ? (
        <div className="flex flex-wrap gap-4 my-5">
          {reviews.map((review: any) => {
            return (
              <div
                key={review._id}
                className="flex flex-col justify-center gap-4 border-b border-gray-300 bg-gray-300 p-4"
              >
                <div className="flex justify-center items-center">
                  <img
                    src="https://e7.pngegg.com/pngimages/419/473/png-clipart-computer-icons-user-profile-login-user-heroes-sphere-thumbnail.png"
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <p className="font-semibold">{review.user.name}</p>
                <p>{review.review}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No Reviews Found</p>
      )}

      <textarea
        className="mt-2 p-2 block w-[100%] md:w-[50%] resize-none"
        rows={4}
        cols={40}
        placeholder="Type your review"
        name="review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <button
        id="save-button"
        className="bg-black text-white rounded px-5 py-2 mt-2 mb-5"
        onClick={handleSubmitReview}
      >
        Save
      </button>
      <DeleteConfirmationDialog
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default SingleBook;
