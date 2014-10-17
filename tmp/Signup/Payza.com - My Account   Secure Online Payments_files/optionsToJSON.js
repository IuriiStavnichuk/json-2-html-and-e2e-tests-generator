(function () {
    function optionsToJSON(options) {
        /// <summary>Turns a string representing plugin options into a JSON object (serialized).</summary>
        /// <param name="options" type="String" optional="true">
        ///     A set of plugin options.
        /// </param>
        /// <returns type="String">
        ///     The serialized JSON object (an empty one if no options specified).
        /// </returns>

        var options_arr,
            i,
            tuple,
            output;

        if (options && options !== undefined) {
            // remove whatever quotes were used
            options = options.replace(/['"]/g, '');

            options_arr = options.split(',');

            for (i = 0; i < options_arr.length; i = i + 1) {
                tuple = options_arr[i].split(':');

                // add proper JSON quoting (e.g. "key":"value") and remove extra spaces between quotes;
                // if no colon is present, assume it's a flag-like option and use 'yes' by default
                options_arr[i] = '"' + $.trim(tuple[0]) + '":';
                if (tuple.length > 1) {
                    tuple[1] = $.trim(tuple[1]);

                    switch (tuple[1]) {
                        case 'true':
                        case 'false':
                            options_arr[i] += tuple[1];
                            break;
                        default:
                            options_arr[i] += '"' + tuple[1] + '"';
                            break;
                    }
                } else {
                    options_arr[i] += 'true';
                }
            }

            output = '{' + options_arr.join(',') + '}';
        } else {
            output = '{}';
        }

        return output;
    }

    // make it available
    payza.util.alias(optionsToJSON, 'payza.util.optionsToJSON');
}());