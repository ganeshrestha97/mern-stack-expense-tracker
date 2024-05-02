import sendRequest from './send-request';

const BASE_URL = '/api/subcategories';

export function fetchSubCategories() {
  return sendRequest(BASE_URL);
}

export function addSubCategory(subCategoryData) {
  return sendRequest(BASE_URL, 'POST', subCategoryData);
}

export function deleteSubCategory(subCategoryId) {
  return sendRequest(`${BASE_URL}/${subCategoryId}`, 'DELETE');
}

export function updateSubCategory(subCategoryId, updateData) {
  return sendRequest(`${BASE_URL}/${subCategoryId}`, 'PUT', updateData);
}