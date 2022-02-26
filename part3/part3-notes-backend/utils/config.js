require('dotenv').config()

const PORT = 3001
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? 'mongodb+srv://fullstackopen:codingisfun@cluster0.efuee.mongodb.net/blog-app-test?retryWrites=true&w=majority'
  : 'mongodb+srv://fullstackopen:codingisfun@cluster0.efuee.mongodb.net/blog-app-test?retryWrites=true&w=majority'
module.exports = {
  MONGODB_URI,
  PORT
}