import sendRequest from './send-request';

const BASE_URL = '/api/subCategories';

export function fetchSubCategories() {
  return sendRequest(BASE_URL);
}