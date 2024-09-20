import { get } from '$lib/Utils/Fetch.js';

let essay = {
    list: async () => {
       return await get('api/v1/essay/list')
    }
}


export { essay }
