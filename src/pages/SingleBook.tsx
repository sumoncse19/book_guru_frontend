import { useSingleBookQuery } from "../redux/feature/book/bookApi";
import { useParams } from "react-router-dom";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, error } = useSingleBookQuery(id);

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
            Publication Date: {book?.data?.publicationDate}
          </p>
          {/* <ul className="space-y-1 text-lg">
            {product?.features?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button>Add to cart</Button> */}
        </div>
      </div>
      {/* <ProductReview id={id!} /> */}
    </>
  );
};
export default SingleBook;
