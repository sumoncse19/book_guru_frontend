import { useGetBooksQuery } from "../redux/feature/book/bookApi";
import { BookInterface } from "../types/bookType";
import BookCard from "../components/BookCard";
import { useEffect, useState } from "react";

const Home = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const [allBooks, setAllBooks] = useState<BookInterface[]>([]);

  useEffect(() => {
    if (data?.data) {
      const reversedAndSliced = [...data.data].reverse().slice(0, 10);
      setAllBooks(reversedAndSliced);
    }
  }, [data, isLoading]);

  return (
    <div>
      <h2 className="text-center text-3xl font-bold">Our latest book</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20 px-4 md:px-8 lg:px-10">
        {allBooks?.length > 0 &&
          allBooks.map((book: BookInterface) => (
            <BookCard key={book?._id} book={book} />
          ))}
      </div>
    </div>
  );
};

export default Home;
