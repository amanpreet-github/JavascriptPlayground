import BaseApiService from '../../../services/BaseApiService'

const fetchHomeData = () => {
    const url = '/home';
    // return BaseApiService.get(url);
    return {
        "location": "Bangalore",
        "pinCode": 110020,
        "state": "Karnataka"
    }
}

export const Api = {
    fetchHomeData
}