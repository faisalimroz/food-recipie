import { instance as axiosInstance } from './axiosInstance.js';

export const axiosBaseQuery = ({ baseUrl = '' } = { baseUrl: '' }) => async ({
  url,
  method,
  data,
  params,
  contentType
}) => {
  try {
    const result = await axiosInstance({
      url: baseUrl + url,
      method,
      data,
      params,
      headers: {
        "Content-Type": contentType || "application/json",
      },
    });
    console.log(result);
    return { data: result.data }; // Return the successful response data
  } catch (axiosError) {
    const err = axiosError;
    console.log(err);
    return {
      // Return error object for error responses
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};
