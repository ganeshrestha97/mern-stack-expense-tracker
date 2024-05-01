import * as expensesAPI from './expenses-api';

export async function getAll(userId) {
  return expensesAPI.getAll(userId);
}

export async function create(expenseData) {
  return expensesAPI.create(expenseData);
}
