const enum Methods {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

function queryStringify(data: Record<string | number, any>): string {
    const allKeys: string[] | number[] = Object.keys(data);
    if (!allKeys.length) {
        return '';
    }
    let result = '?';
    allKeys.forEach((key, i) => {
        result += `${key}=${data[key].toString()}${i !== allKeys.length - 1 ? '&' : ''}`;
    });
    return result;
}

export interface UpperOptions {
    data?: Record<string | number, any>,
    timeout?: number,
    headers?: Record<string, string>
}

class HTTPTransport {
    get = (url: string, data: Record<string, unknown> = {}) => {
        let getUrl:string = url;
        if (data) {
            getUrl += queryStringify(data);
        }
        return this._request(getUrl, Methods.GET, data);
    };

    put = (
        url:string,
        data: Record<string, unknown> | FormData,
        options: Record<string, Record<string, string>> = {},
    ) => this._request(url, Methods.PUT, data, options);

    post = (
        url: string,
        data: Record<string, unknown> = {},
    ) => this._request(url, Methods.POST, data);

    delete = (
        url: string,
        data: Record<string, unknown> = {},
    ) => this._request(url, Methods.DELETE, data);

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    _request = (
        url: string,
        method: Methods,
        data: Record<string, unknown> | FormData,
        options:Record<string, Record<string, string>> = {},
        timeout:number = 50000,
    ) => {
        const { headers } = options;
        return new Promise((resolve, reject) => {
            const xhr:XMLHttpRequest = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.open(method, `${process.env.API_ENDPOINT}/${url}`);

            if (headers) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onloadend = function () {
                if (xhr.response === 'OK') {
                    return resolve(xhr.response);
                }
                return resolve(JSON.parse(xhr.response));
            };
            xhr.timeout = timeout;

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === Methods.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}

export default new HTTPTransport();
