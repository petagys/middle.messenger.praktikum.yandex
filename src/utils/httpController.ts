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

interface UpperOptions {
    data?: Record<string | number, any>,
    timeout?: number,
    headers?: Record<string, string>
}

interface LowerOptions {
    data?: Record<string | number, unknown> | any,
    headers?: Record<string, string>,
    method: Methods
}

class HTTPTransport {
    get = (url: string, options: UpperOptions = {}) => {
        let getUrl:string = url;
        if (options.data) {
            getUrl += queryStringify(options.data);
        }
        return this._request(getUrl, { ...options, method: Methods.GET }, options.timeout);
    };

    put = (
        url:string,
        options: UpperOptions = {},
    ) => this._request(url, { ...options, method: Methods.PUT }, options.timeout);

    post = (
        url:string,
        options: UpperOptions = {},
    ) => this._request(url, { ...options, method: Methods.POST }, options.timeout);

    delete = (
        url:string,
        options: UpperOptions = {},
    ) => this._request(url, { ...options, method: Methods.DELETE }, options.timeout);

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    protected _request = (url: string, options: LowerOptions, timeout:number = 5000) => {
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

            if (method === Methods.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

export default new HTTPTransport();
