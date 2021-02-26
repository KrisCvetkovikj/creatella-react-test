import http from '../http-common';

const getRandomAd = (adId) => {
  return http.get(`/ads?_r=${adId}`, {responseType: 'arraybuffer'})
}

export default { getRandomAd };
