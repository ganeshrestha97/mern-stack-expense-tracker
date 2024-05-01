import sendRequest from './send-request';

const BASE_URL = '/api/profiles';

export async function getProfile(userId) {
  return sendRequest(`${BASE_URL}/${userId}`);
}