import sendRequest from './send-request';

const BASE_URL = '/api/expenses';

export function fetchExpenses(category = '') {
  const url = category ? `${BASE_URL}?category=${encodeURIComponent(category)}` : BASE_URL;
  return sendRequest(url);
}

export function addExpense(expenseData) {
  return sendRequest(BASE_URL, 'POST', expenseData)
}

export function deleteExpense(expenseId) {
  return sendRequest(`${BASE_URL}/${expenseId}`, 'DELETE');
}

export function updateExpense(expenseId, updateData) {
  return sendRequest(`${BASE_URL}/${expenseId}`, 'PUT', updateData);
}
