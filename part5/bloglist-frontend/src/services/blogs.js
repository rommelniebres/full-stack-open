import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)

  return response.data
}

const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const updateBlog = async updateObject => {
  const config = {
    headers: { Authorization: token },
  }
  
  const url = `${baseUrl}/${updateObject.id}`
  const response = await axios.put(url, updateObject, config)

  return response.data
}

const deleteBlog = async deleteObject => {
  const config = {
    headers: { Authorization: token },
  }
  
  const url = `${baseUrl}/${deleteObject.id}`
  const response = await axios.delete(url, config)

  return response.data
}

export default { getAll , setToken, createBlog , updateBlog, deleteBlog}