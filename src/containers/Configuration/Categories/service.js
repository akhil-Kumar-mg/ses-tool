import api from '../../../api';

const getCategories = () => {
    return api.httpGet('/category/')
}

const saveCategory = (data) => {
    return api.httpPost('/category/', data)
}

const deleteCategory = (id) => {
    return api.httpDelete(`/category/${id}/`)
}

const editCategory = (data) => {
    return api.httpPut(`/category/${data.id}/`, data)
}

const getSubCategories = (id) => {
    return api.httpGet(`/category/${id}`)
}

export {getCategories, saveCategory, deleteCategory, editCategory, getSubCategories}

