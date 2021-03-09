import api from '../../../api';

const get = () => {
    return api.get('/category/')
}

const save = (data) => {
    return api.post('/category/', data)
}

export {get, save}

