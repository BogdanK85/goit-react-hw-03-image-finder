import axios from 'axios';

const MY_API_KEY = '39470196-3c6da46699cb668945b115c94';

const BASE_URL = 'https://pixabay.com/api/';

// export async function fetchNewPictures(serchQuery, page, perPage) {
//   const parameters = {
//     key: MY_API_KEY,
//     q: serchQuery,
//     image_type: 'photo',
//     orientation: 'horisontal',
//     safesearch: true,
//     page: page,
//     per_page: perPage,
//   };

//   const response = await axios.get(BASE_URL, { parameters });
//   return response.data;
// }

export const fetchNewPictures = async (serchQuery, page) => {
  const response = await axios.get(BASE_URL, {
    params: {
      key: MY_API_KEY,
      q: serchQuery,
      image_type: 'photo',
      orientation: 'horisontal',
      safesearch: true,
      page: page,
      per_page: 12,
    },
  });
  return response.data;
};
