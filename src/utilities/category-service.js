import sendRequest from './send-request';

const BASE_URL = '/api/categories';

export function fetchCategories() {
    return sendRequest(BASE_URL);
}

export function addCategory(categoryData) {
    return sendRequest(BASE_URL, 'POST', categoryData);
}

export function deleteCategory(categoryId) {
    return sendRequest(`${BASE_URL}/${categoryId}`, 'DELETE');
}

export function updateCategory(categoryId, updateData) {
    return sendRequest(`${BASE_URL}/${categoryId}`, 'PUT', updateData);
}
