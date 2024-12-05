import axios from "axios";
import { useState } from "react";

export const useAxios = () => {
  // export const useAxios = () => {
  // let baseUrl = "http://localhost:3001/products";

  const url = "http://localhost:3001/products";

  const api = axios.create({
    baseURL: url,
  });

  api.interceptors.request.use(
    (config) =>
      new Promise((resolve) => setTimeout(() => resolve(config), 1200))
  );

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

  const get = (endpoint) => handleRequest(api.get, endpoint);

  const remove = (endpoint, id) =>
    handleRequest(api.delete, `${endpoint}/${id}`);

  const put = (endpoint, id, data) =>
    handleRequest(api.put, `${endpoint}/${id}`, data);

  const post = (endpoint, data) => handleRequest(api.post, endpoint, data);

  const getById = (id) => handleRequest(api.get, `/${id}`);

  const getPaginate = () =>
    handleRequest(api.get, `/?_page=${page}&_per_page=${perPage}`);

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
