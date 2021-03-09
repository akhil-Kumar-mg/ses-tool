import api from '../../../api';

const getCategories = () => {
    return api.get('/category')
}

export {getCategories}

