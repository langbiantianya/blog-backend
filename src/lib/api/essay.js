import { get } from '../Utils/Fetch';

let essay = {
    list: async () => {
       return await get('api/v1/essay/list')
    }
}


export default  essay
