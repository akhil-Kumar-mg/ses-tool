import api from '../../../api';


const getPricings = () => {
    return api.httpGet('/pricing/')
}

export {getPricings}

