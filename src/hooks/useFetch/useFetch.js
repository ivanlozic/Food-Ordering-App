import { useState, useEffect } from 'react'
import { axiosInstance } from '../../config/axios'


const useFetch = (url) => {
  const [data, setData] = useState(null)

  const fetchData = () => {
    axiosInstance
      .get(url)
      .then((res) => {
        const response = res.data
        setData(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return [data, setData]
}

export default useFetch
