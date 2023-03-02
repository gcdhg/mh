//error
import TimeOutError from "../errors/timeout.error";

/**
 * @param timeoutMs {number}
 * @returns {TimeOutError}
 */
export const delay = (timeoutMs: number): Promise<TimeOutError> =>
    new Promise((resolve) => setTimeout(() => resolve(new TimeOutError()), timeoutMs));
