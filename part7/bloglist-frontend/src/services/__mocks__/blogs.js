const blogs = [
  {
    title: 'Book',
    author: 'Bob',
    url: 'book.com',
    likes: 322,
    user: {
      username: 'binhp',
      name: 'binh',
      id: '5dfb288e1e29041cc2f537bc',
    },
    id: '5dfb2c6dd549181f2c3fd991',
  },
  {
    title: 'this is a title from frontend ',
    author: 'binh',
    url: 'binh.com',
    likes: 30,
    user: {
      username: 'binhp',
      name: 'binh',
      id: '5dfb288e1e29041cc2f537bc',
    },
    id: '5e06e31927d72d01aaef40a7',
  },
  {
    title: 'another blog',
    author: 'binh pham',
    url: 'google.com',
    likes: 62,
    user: {
      username: 'binhp',
      name: 'binh',
      id: '5dfb288e1e29041cc2f537bc',
    },
    id: '5e06e35427d72d01aaef40a8',
  },
];

const getAll = () => {
  return Promise.resolve(blogs);
};

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

export default { getAll, setToken };
