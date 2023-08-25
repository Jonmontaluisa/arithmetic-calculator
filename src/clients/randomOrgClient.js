import axios from 'axios';
import { randomOrgUrl, defaultValuesRandomUrl } from '../constants';

const generateRandomString = () => {
  const {
    num, min, max, columns, base,
  } = defaultValuesRandomUrl;
  const url = `${randomOrgUrl}/integers/?num=${num}&min=${min}&max=${max}&col=${columns}&base=${base}&format=plain&rnd=new`;

  return axios.get(url)
    .then((res) => res.data);
};

export default { generateRandomString };
