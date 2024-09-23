import { get, put } from '../Utils/Fetch';
async function list(params) {
    return await get('/api/v1/essay/list', { params })
}
async function info(id) {
    return await get(`/api/v1/essay/${id}`)
}
async function hide(id) {
    return await put(`/api/v1/essay/hide/${id}`)
}

export default {
    list,
    info,
    hide
}

