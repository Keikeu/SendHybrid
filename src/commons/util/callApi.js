// import React from "react";
// import database from "./database.json";

// function callApi(url, method = "get", data) {
//   if (!url || method !== "get") return {};
//   return database[url];
// }

import axios from "axios";

// const requestApi = async (url, method, data = {}, options = {}) => {
//   let response;

//   const isServer = typeof window === 'undefined';
//   const isGet = ['get', 'GET'].includes(method);

//   const headers = {};
//   if (!isGet) {
//     headers['x-csrf-token'] = getGlobal('csrfToken') || '';
//   }
//   if (isServer) {
//     headers.Cookie = getCookie();
//     headers.host = getGlobal('host');
//     headers['x-forwarded-host'] = getGlobal('host');
//     if (getGlobal('remote-ip')) {
//       headers['x-forwarded-for'] = getGlobal('remote-ip');
//     }
//     if (getGlobal('kb-secret')) {
//       headers['x-stonlykb-secret'] = getGlobal('kb-secret');
//     }
//   }

//   try {
//     const config = {
//       url,
//       method,
//       data,
//       timeout: 60000,
//       headers,
//       params: isGet ? data : {},
//       ...options,
//     };

//     response = await axios(config);

//     return { data: response.data.content };
//   } catch (error) {
//     if (error.response) {
//       response = {
//         error: error.response.data.content,
//         status: error.response.status,
//         headers: error.response.headers,
//       };
//     } else {
//       response = error;
//     }

//     throw response;
//   }
// };

const callApi = async (url, method = "get", data = {}, headers) => {
  try {
    const config = {
      url: `https://hack-yeah-backend-wixa-tech.herokuapp.com/${url}`,
      method,
      data,
      headers,
    };
    // return Axios.post('/api/documents', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
    const response = await axios(config);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default callApi;
