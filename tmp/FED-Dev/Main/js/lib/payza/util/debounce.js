(function () {
    function debounce(func, threshold, execAsap) {
        /// <summary>Fires exactly one function call for a function that may be called several times during a specified period of time.
        ///     <para>(debouncing means to coalesce several temporally close events into one event)</para>
        ///     <para>Credit: John Hann - http://unscriptable.com/2009/03/20/debouncing-javascript-methods </para>
        /// </summary>
        /// <param name="func" optional="false" type="Function">
        ///     The function to be executed.
        /// </param>
        /// <param name="threshold" optional="true" type="Number" integer="true">
        ///     If function calls are temporally closer than this, debouncing will happen (defaults to 100ms).
        /// </param>
        /// <param name="execAsap" optional="true" type="Boolean">
        ///     Execute function once at start.
        /// </param>
        /// <returns type="Function">
        ///     The debouncing function (arguments to this will be passed on to the called function).
        /// </returns>

        var timeout;

        return function debounced() {

            var obj = this, args = arguments;

            function delayed() {
                if (!execAsap) {
                    func.apply(obj, args);
                }
                timeout = null;
            }

            if (timeout) {
                clearTimeout(timeout);
            } else if (execAsap) {
                func.apply(obj, args);
            }

            timeout = setTimeout(delayed, threshold || 100);
        };
    }

    // make it available
    payza.util.alias(debounce, 'payza.util.debounce');
}());