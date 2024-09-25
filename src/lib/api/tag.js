import { get } from '../Utils/Fetch';

async function list() {
    return await get('/api/v1/tag/list')
}

export default {
    list
}