import BaseApiService from '../../../services/BaseApiService'

function fetchHomeData() {
    const url = '/home';
    return BaseApiService.get(url);
}

export const Api = {
    fetchHomeData
}