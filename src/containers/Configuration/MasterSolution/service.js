import api from '../../../api';

const getSolutionOptionList = () => {
    return api.httpGet('/solution_list/')
}

export {getSolutionOptionList}

