const dummy = () => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    let highestLikes = 0;
    return blogs.reduce((x, blog) => {
        if (blog.likes > highestLikes) {
            highestLikes = blog.likes;
            return x = { ...blog };
        }
        return x;
    }, {});
};

const mostBlogs = (blogs) => {
    let mostBlog = 0;

    const authors = blogs.length > 0 && blogs.reduce((x, blog) => {
        if (!x.includes(blog.author)) {
            return x = [...x, blog.author];
        }
        return x;
    }, []);

    return authors.reduce((x, author) => {
        const num = blogs.reduce((y, blog) => {
            if (blog.author === author) {
                return y + 1;
            }
            return y;
        }, 0);
        if (num > mostBlog) {
            mostBlog = num;
            return x = { author, blogs: num };
        }
        return x;
    }, {});
};

const mostLikes = (blogs) => {
    let highestLikes = 0;
    return blogs.reduce((x, blog) => {
        if (blog.likes > highestLikes) {
            highestLikes = blog.likes;
            const author = blog.author;
            return x = { author, highestLikes };
        }
        return x;
    }, {});
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};