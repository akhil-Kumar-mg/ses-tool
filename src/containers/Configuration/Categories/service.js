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

export {getCategories, saveCategory, deleteCategory}

