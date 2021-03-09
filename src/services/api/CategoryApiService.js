import BaseApiService from '../BaseApiService';

const getCategories = () => {
    return BaseApiService.get('/category')
}

export {getCategories}

