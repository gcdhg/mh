//error
import RetryError from "../errors/retry.error";
//interface
import { MayBePromise } from "../interface/type";

/**
 *
 * @param fn {Funtion}
 * @param context {context} контекст вызова функции
 * @param args {any[]} аргументы функции
 * @param attempt {number}
 * @returns
 */
export const retry = <T>(
    fn: (...args: any[]) => MayBePromise<T>,
    context,
    args: any[],
    attempt: number = 1
): Promise<T | RetryError> | RetryError => {
    if (attempt <= 0) return new RetryError();

    return Promise.resolve()
        .then(() => fn.apply(context, args))
        .catch((err) => retry(fn, context, args, attempt - 1));
};
