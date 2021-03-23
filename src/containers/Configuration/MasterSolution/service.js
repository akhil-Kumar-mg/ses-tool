import api from '../../../api';

const getSolutionOptionList = () => {
    return api.httpGet('/solution_list/')
}

const getSolutions = () => {
    return api.httpGet('/solution/')
}

export {getSolutionOptionList, getSolutions}

