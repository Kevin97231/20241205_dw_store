import axios from "axios";
import { useState } from "react";

export const useAxios = (baseUrl = "http://localhost:3001/products") => {
  // export const useAxios = () => {
  // let baseUrl = "http://localhost:3001/products";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  const handleRequest = async (requestFunction, ...args) => {
    setLoading(true);
    try {
      const response = await requestFunction(...args);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  };

  const get = (endpoint) =>
    handleRequest(axios.get, endpoint ? `${baseUrl}/${endpoint}` : baseUrl);

  const remove = (id) => handleRequest(axios.delete, `${baseUrl}/${id}`);

  const put = (id, data) => handleRequest(axios.put, `${baseUrl}/${id}`, data);

  const post = (data) => handleRequest(axios.post, baseUrl, data);

  const getById = (id) => handleRequest(axios.get, `${baseUrl}/${id}`);

  const getPaginate = () =>
    handleRequest(axios.get, `${baseUrl}/?_page=${page}&_per_page=${perPage}`);

  return {
    get,
    remove,
    put,
    post,
    getById,
    loading,
    error,
    page,
    perPage,
    setPerPage,
    setPage,
    getPaginate,
  };
};
