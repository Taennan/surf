
/**
 * Static storage for delaying functions
 */
export default
class Debounce {

    /**
     * Spaces the execution of callbacks by specified time
     * @param  {Function} func - The callback to run
     * @param  {Number?} [time=0] Time in seconds to delay between each callback
     * @return {Function}
     */
    static spread(func, time=0) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args)
            }, time * 1000);
        }
    }

    /**
     * Stops execution of other functions for specified time after first function has fired
     * @param  {Function} func - The callback to run
     * @param  {Number?} [time=0] Time in seconds to start accepting new callbacks
     * @return {Function}
     */
    static block(func: Function, time=0) {
        let timer;
        return (...args) => {
            if (!timer) func.apply(this, args);

            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
            }, time * 1000)
        }
    }

}
