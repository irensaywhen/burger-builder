import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-da262.firebaseio.com/',
});

export default instance;
