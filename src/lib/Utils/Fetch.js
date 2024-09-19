var _token = ""
var _host = "http://localhost:8001"

function setToken(token) {
    _token = token
}

function setHost(host) {
    _host = host
}

var jsonHeader = function () {
    let headers = new Headers()
    headers.append("Content-Type", "application/json;charset=utf-8")
    headers.append("Authorization", _token)
    return headers
}()

function genRequestUrl(url, params) {
    let requestUrl = `${_host}/${url}`
    if (params) {
        requestUrl += "?"
        for (const key in params) {
            requestUrl += `${key}=${params[key]}`
        }
    }
    return requestUrl
}


async function post(url, { headers, body, params }) {
    headers = (headers ?? jsonHeader)
    headers.append("Authorization", _token)
    return await fetch(genRequestUrl(url, params), {
        method: "POST",
        headers,
        body: body instanceof FormData ? body : JSON.stringify(body)
    })
}

async function get(url, { headers, body, params }) {
    headers = (headers ?? jsonHeader)
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
    setToken,
    setHost
}