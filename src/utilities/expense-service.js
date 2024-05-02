import sendRequest from './send-request';

const BASE_URL = '/api/expenses';

export function fetchExpenses() {
  return sendRequest(BASE_URL);
}

export function addExpense(expenseData) {
  return sendRequest(BASE_URL, 'POST', expenseData)
    .then(response => {
      if (!response.ok) {
        // This will catch any HTTP status code that is not in the range 200-299.
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      return data; // Make sure to return the data for further processing in React components
    })
    .catch(error => {
      console.error('Error:', error);
      throw error; // Re-throw the error if you want to handle it in the React component as well
    });
}

export function deleteExpense(expenseId) {
  return sendRequest(`${BASE_URL}/${expenseId}`, 'DELETE');
}

export function updateExpense(expenseId, updateData) {
  return sendRequest(`${BASE_URL}/${expenseId}`, 'PUT', updateData);
}
