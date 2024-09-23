let _token = ""
let _host = ""

function setToken(token) {
    _token = token
}

function setHost(host) {
    _host = host
}

let jsonHeader = new Headers({ "Content-Type": "application/json;charset=utf-8" })

function genRequestUrl(url, params) {
    let requestUrl = `${_host}${url}`
    if (params) {
        requestUrl += "?"
        for (const key in params) {
            requestUrl += `${key}=${params[key]}&`
        }
    }
    return requestUrl
}

/**
 * 
 * @param { string } url 
 * @param { {headers:Headers, body:FormData | any, params:any} } 
 * @returns {Promise<Response>}
 */
async function post(url, { headers = jsonHeader, body, params } = { headers: jsonHeader }) {
    headers.append("Authorization", _token)
    if (body instanceof FormData) {
        headers.delete("Content-Type")
    }
    return await fetch(genRequestUrl(url, params), {
        method: "POST",
        headers,
        body: body instanceof FormData ? body : JSON.stringify(body)
    })
}

/**
 * 
 * @param { string } url 
 * @param { {headers:Headers, body:FormData | any, params:any} } 
 * @returns {Promise<Response>}
 */
async function put(url, { headers = jsonHeader, body, params } = { headers: jsonHeader }) {
    headers.append("Authorization", _token)
    if (body instanceof FormData) {
        headers.delete("Content-Type")
    }
    return await fetch(genRequestUrl(url, params), {
        method: "PUT",
        headers,
        body: body instanceof FormData ? body : JSON.stringify(body)
    })
}

/**
 * 
 * @param { string } url 
 * @param { {headers:Headers, body:FormData | any, params:any} } 
 * @returns {Promise<Response>}
 */
async function get(url, { headers = new Headers(), body, params } = { headers: new Headers() }) {
    headers.append("Authorization", _token)
    return await fetch(genRequestUrl(url, params), {
        method: "GET",
        headers,
        body: body instanceof FormData ? body : null
    })
}

export {
    post,
    get,
    put,
    setToken,
    setHost
}