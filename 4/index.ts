//util
import { delay } from "./util/delay.util";
import { retry } from "./util/retry.util";

const retryLimit: number = 5;

const fetchData = (url: string, timeoutMs = 5000): Promise<any> => {
    return Promise.race([retry(fetch, this, [url], retryLimit), delay(timeoutMs)]).then((res) => {
        if (res instanceof Error) throw res;
        return res;
    });
};

fetchData("https://github.com/");
