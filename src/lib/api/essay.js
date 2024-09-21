import { get } from '../Utils/Fetch';

let essay = {
    list: async (params) => {
        return await get('api/v1/essay/list', { params })
    }
}


export default essay
