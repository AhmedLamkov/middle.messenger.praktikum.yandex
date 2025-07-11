const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data: Record<string, any>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

interface Options {
  headers?: Record<string, string>,
  data?: Record<string, any>,
  timeout?: number;
}

interface RequestOptions extends Options {
  method: string;
}

export class HTTPTransport {
  get(url: string | URL, options: Options = {}) {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  }

  post(url: string | URL, options: Options = {}) {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  }

  put(url: string | URL, options: Options = {}) {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  delete(url: string | URL, options: Options = {}) {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  request(url: string | URL, options: RequestOptions, timeout = 5000) {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        throw new Error('No method');
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
