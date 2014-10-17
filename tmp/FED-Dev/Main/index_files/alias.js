(function () {
    function alias(obj, namespace) {
        /// <summary>Utility function for exporting objects to the global scope using a namespace.</summary>
        /// <param name="obj" optional="false" type="Object">
        ///     The object to be exported.
        /// </param>
        /// <param name="namespace" optional="false" type="String">
        ///     A string representing the namespaced object (e.g. 'corp.acme.util.myObject')
        /// </param>

        if (!obj) { return; }

        if (namespace && typeof namespace === 'string') {
            var ctx = window,
                nsSegments = namespace.split('.'),
                i;

            // advance until the second to last level
            for (i = 0; i < nsSegments.length - 1; i = i + 1) {
                ctx[nsSegments[i]] = ctx[nsSegments[i]] || {};
                ctx = ctx[nsSegments[i]];
            }

            // throw an error if the alias is already used
            if (ctx[nsSegments[i]] && ctx[nsSegments[i]] !== 'undefined') {
                throw new Error('payza.util.alias(): ' + namespace + ' namespace segment is already used');
            }

            // last level, add reference to object
            ctx[nsSegments[i]] = obj;
        }
    }

    // make it available
    alias(alias, 'payza.util.alias');
}());