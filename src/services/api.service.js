import axios from "axios";

export default class ApiService {

    doApiRequest(method, url, body) {
        return new Promise((resolve, reject) => {
            let axiosRequest = {
                method: method,
                url: url,
                responseType: "json",
                data: body,
            };
            axios(axiosRequest).then(function (response) {
                if (response.data) {
                    resolve(response.data);
                } else {
                    resolve({});
                }
            }).catch(function (err) {
                if (err.response && err.response.data) {
                    reject(err.response.data);
                } else {
                    reject({});
                }
            });
        });
    }
}
