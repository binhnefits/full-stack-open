const listHelper = require("../utils/list_helper")
const blogData = require("./blog_data")

describe("total likes", () => {
  test("given empty list", () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(blogData.listWithOneBlog)
    expect(result).toBe(5)
  })

  test("regular size", () => {
    const result = listHelper.totalLikes(blogData.listWithMultipleBlogs)
    expect(result).toBe(36)
  })
})

describe("favorite blog", () => {
  test("given empty list", () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.favoriteBlog(blogData.listWithOneBlog)
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5
    })
  })

  test("regular size", () => {
    const result = listHelper.favoriteBlog(blogData.listWithMultipleBlogs)

    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })

  test("same number of likes", () => {
    const result = listHelper.favoriteBlog(blogData.listWithSameNumberOfLikes)

    expect(result).toEqual({
      title: "React patterns",
      author: "Michael Chan",
      likes: 5
    })
  })
})

describe("most blog author", () => {
  test("given normal list of blogs", () => {
    const result = listHelper.mostBlogs(blogData.listWithMultipleBlogs)
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 })
  })
})

describe("most liked author", () => {
  test("given normal list of blogs", () => {
    const result = listHelper.mostLikes(blogData.listWithMultipleBlogs)
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 12 })
  })
})
