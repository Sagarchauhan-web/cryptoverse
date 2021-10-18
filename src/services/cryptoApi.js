import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "d051baed3cmsh44885bd01998b38p1f6455jsn32b0622dec16",
};

const baseUrl = "https://coinranking1.p.rapidapi.com/stats";

const createRequest = (url) => ({ url, cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseUrl: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});
