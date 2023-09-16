import axios from 'axios';

const MY_API_KEY = { 39470196-3c6da46699cb668945b115c94 };
const BASE_URL = 'https://pixabay.com/api/';

export const fetchNewPictures = async (serchQuery, page, perPage) => {
    const parameters = {
        key: BASE_URL,
        q: serchQuery,
        image_type: 'photo',
        orientation: 'horisontal',
        safesearch: true,
        page: page,
        per_page: perPage,
    }

    const response = await axios.get(BASE_URL, { parameters });
    return response.data;
};