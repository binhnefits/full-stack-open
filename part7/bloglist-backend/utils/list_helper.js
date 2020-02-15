const _ = require("lodash")

const totalLikes = blogs => {
  return blogs.reduce((a, c) => a + c.likes, 0)
}

const favoriteBlog = blogs => {
  const mostLikes = Math.max(...blogs.map(blog => blog.likes))
  const mostLikedBlogs = blogs.filter(blog => blog.likes === mostLikes)
  return mostLikedBlogs.length > 0
    ? {
        title: mostLikedBlogs[0].title,
        author: mostLikedBlogs[0].author,
        likes: mostLikedBlogs[0].likes
      }
    : {}
}

const mostBlogs = blogs => {
  const authorBlogCount = _.countBy(blogs, "author")
  const mostBlogCount = _.max(Object.values(authorBlogCount))
  const mostBlogAuthors = Object.keys(authorBlogCount).reduce(
    (arr, key) =>
      authorBlogCount[key] === mostBlogCount
        ? _.concat(arr, [{ author: key, blogs: mostBlogCount }])
        : arr,
    []
  )

  return mostBlogAuthors[0]
}

const mostLikes = blogs => {
  const authorLikeCount = blogs.reduce((obj, blog) => {
    if (obj.hasOwnProperty(blog)) {
      obj[blog.author] = obj[blog.author] + c.likes
    } else {
      obj[blog.author] = blog.likes
    }
    return obj
  }, {})

  const mostLikeCount = _.max(Object.values(authorLikeCount))

  const mostLikedAuthors = Object.keys(authorLikeCount).reduce(
    (arr, key) =>
      authorLikeCount[key] === mostLikeCount
        ? _.concat(arr, [{ author: key, likes: mostLikeCount }])
        : arr,
    []
  )
  return mostLikedAuthors[0]
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
