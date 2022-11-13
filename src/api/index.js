/**
 * 이미지 슬라이드 API
 */
import axios from "axios";

export const fetchImageList = () => {
    //return axios.get('//localhost:5000/api/images').then(response => response.data);
    return fetch('//localhost:5000/api/images').then((response) => response.json());
};