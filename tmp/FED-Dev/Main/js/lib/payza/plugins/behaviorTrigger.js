(function ($) {
    $.fn.behaviorTrigger = function () {
        /// <summary>
        ///     Triggers behaviors specified using the data-behavior attributes.
        /// </summary>

        return this.each(function () {
            var $element = $(this),
                i,
                temp,
                data = $element.attr('data-behavior') || $element.attr('data-behaviour'),
                plugins = data && data !== undefined ? data.split(';') : [],
                plugin_name,
                plugin_options,
                optionsToJSON = payza.util.optionsToJSON;

            // go through the list of plugins and turn their options into JSON,
            // then replace their string representation with an object having the
            // 'name' and 'options' attributes
            for (i = 0; i < plugins.length; i = i + 1) {
                temp = plugins[i].split('(');
                plugin_name = $.trim(temp[0]);
                // temp[1] holds the options string; if it exists drop the trailing paranthesis
                // and return the string; if not, return the empty string
                plugin_options = temp[1] && temp[1] !== undefined ? (temp[1].split(')'))[0] : '';

                plugins[i] = {
                    name: plugin_name,
                    options: $.parseJSON(optionsToJSON(plugin_options))
                };
            }

            for (i = 0; i < plugins.length; i = i + 1) {
                $.fn[plugins[i].name].call($element, plugins[i].options);
            }
        });
    };
}(jQuery));