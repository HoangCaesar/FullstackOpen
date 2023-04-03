const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v4: uuidv4 } = require('uuid');
const { GraphQLError } = require('graphql');
const mongoose = require('mongoose');
require('dotenv').config();
const { Author, Book, User } = require('./models');
const jwt = require('jsonwebtoken');

// MongoDB
mongoose.set('strictQuery', false);
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

/*
  you can remove the placeholder query once your first own has been implemented 
*/

// GQL
const typeDefs = `

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
    
    type Token {
        value: String!
    }

    type Author {
        name: String! 
        id: ID! 
        born: Int
        bookCount: Int
    }

    type Book {
        title: String! 
        published: Int! 
        author: Author!
        id: ID!
        genres: [String!]!   
    }

    type Query {
        authorCount: Int!
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook (
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ) : Book!
        
        editAuthor(
            name: String!
            setBornTo: Int!
        ) : Author

        createUser(
            username: String!
            password: String!
            favoriteGenre: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }
`;

const resolvers = {
    Query: {
        authorCount: async () => {
            const authors = await Author.find({});
            return authors.length;
        },
        bookCount: async () => {
            const books = await Book.find({});
            return books.length;
        },
        allBooks: async (root, args) => {
            try {
                const books = await Book.find({}).populate('author');
                if (args.author && args.genre) {
                    const relatedBooks = Author.findOne({ name: args.author }).then((author) => {
                        return Book.find({ author: author._id, genres: args.genre }).populate(
                            'author'
                        );
                    });
                    return relatedBooks;
                } else if (args.author || args.genre) {
                    const relatedBooks = args.author
                        ? Author.findOne({ name: args.author }).then((author) => {
                              return Book.find({ author: author._id }).populate('author');
                          })
                        : Book.find({ genres: args.genre }).populate('author');

                    return relatedBooks;
                }
                return books;
            } catch (error) {
                throw new GraphQLError('Find all books failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error,
                    },
                });
            }
        },
        allAuthors: async () => {
            try {
                const authors = await Author.find({});
                return authors;
            } catch (error) {
                throw new GraphQLError('Find all authors failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error,
                    },
                });
            }
        },
        me: (root, args, context) => {
            return context.currentUser;
        },
    },
    Mutation: {
        addBook: async (_root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new Error('not authenticated');
            }

            try {
                const author = await Author.findOne({ name: args.author });

                if (!author) {
                    const author = {
                        name: args.author,
                        id: uuidv4(),
                        born: !!args.born ? args.born : null,
                        bookCount: 1,
                    };
                    const newAuthor = new Author(author);
                    await newAuthor.save();
                }
                author.bookCount = author.bookCount + 1;
                author.save();
                const book = { ...args, author, id: uuidv4() };
                const newBook = new Book(book);
                await newBook.save()

                return book;
            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error,
                    },
                });
            }
        },
        editAuthor: async (_root, args, context) => {
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new Error('not authenticated');
            }

            try {
                const author = await Author.findOne({ name: args.name });

                if (!author) {
                    return null;
                }

                const newAuthor = await Author.findOneAndUpdate(
                    { name: args.name },
                    {
                        $set: { born: args.setBornTo },
                    }
                );

                return newAuthor;
            } catch (error) {
                throw new GraphQLError('Edit Author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error,
                    },
                });
            }
        },
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                password: args.password,
                favoriteGenre: args.favoriteGenre,
                id: uuidv4(),
            });
            try {
                return await user.save();
            } catch (error) {
                throw new GraphQLError('Error saving user', {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.name,
                    error,
                });
            }
        },
        login: async (root, args) => {
            try {
                const user = await User.findOne({ username: args.username });

                if (!user || args.password !== user.password) {
                    throw new GraphQLError('Wrong credentials', {
                        code: 'BAD_USER_INPUT',
                    });
                }

                const userForToken = {
                    username: user.username,
                    id: user._id,
                };

                return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
            } catch (error) {
                throw new GraphQLError(error, {
                    code: 'GRAPHQL_VALIDATION_FAILED',
                });
            }
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
        try {
            const auth = req ? req.headers.authorization : null;
            if (!!auth) {
                const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
                const currentUser = await User.findById(decodedToken.id);
                return { currentUser };
            }
        } catch (error) {
            throw new GraphQLError(error.message, {
                code: 'BAD_USER_INPUT',
            });
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
