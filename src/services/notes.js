import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKENDURL 

const getAll = () =>{
  const result = axios.get(baseUrl)
  const nonExistant = {
    id:1100,
    content:'this note not exist',
    important:true
  }
  return result.then(response=> response.data.concat(nonExistant))
}


const create = newObject =>{
  const request=  axios.post(baseUrl,newObject)
  return request.then(response => response.data)
}

const update = (id,newObject) => {
  // console.log(id)
  const request =  axios.put(`${baseUrl}/${id}`,newObject)
  // console.log(id)
  return request.then(response=> response.data)
}

export default {
  getAll,create,update
}