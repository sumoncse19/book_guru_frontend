export interface BookInterface {
  _id: string;
  title: string;
  publicationDate: string;
  author: string;
  genre: string;
  image: string;
}

export interface ReviewInterface {
  _id: string;
  userId: string;
  bookId: string;
  review: string;
  user: {
    _id: string;
    name: string;
    email: string;
    password: string;
    authKey: number;
  };
}