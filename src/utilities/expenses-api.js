import sendRequest from './send-request';

const BASE_URL = '/api/expenses';

export async function getAll(userId) {
  return sendRequest(`${BASE_URL}?user=${userId}`);
}

export async function create(expenseData) {
  return sendRequest(BASE_URL, 'POST', expenseData);
}