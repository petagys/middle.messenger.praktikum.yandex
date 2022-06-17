const enum METHODS {
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

interface upperOptions {
    data?: Record<string | number, any>,
    timeout?: number,
    headers?: Record<string, string>
}

interface lowerOptions {
    data?: Record<string | number, unknown> | any,
    headers?: Record<string, string>,
    method: METHODS
}

class HTTPTransport {
    get = (url: string, options: upperOptions = {}) => {
        let getUrl:string = url;
        if (options.data) {
            getUrl += queryStringify(options.data);
        }
        return this._request(getUrl, { ...options, method: METHODS.GET }, options.timeout);
    };

    put = (
        url:string,
        options: upperOptions = {},
    ) => this._request(url, { ...options, method: METHODS.PUT }, options.timeout);

    post = (
        url:string,
        options: upperOptions = {},
    ) => this._request(url, { ...options, method: METHODS.POST }, options.timeout);

    delete = (
        url:string,
        options: upperOptions = {},
    ) => this._request(url, { ...options, method: METHODS.DELETE }, options.timeout);

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    protected _request = (url: string, options: lowerOptions, timeout:number = 5000) => {
        const { data, headers, method } = options;
        return new Promise((resolve, reject) => {
            const xhr:XMLHttpRequest = new XMLHttpRequest();
            xhr.open(method, url);

            if (headers) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onloadend = function () {
                resolve(xhr);
            };
            xhr.timeout = timeout;

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

export default new HTTPTransport();
