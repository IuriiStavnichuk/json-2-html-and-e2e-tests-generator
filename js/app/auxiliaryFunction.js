window.l= function () {
    try {
        return console.log.apply(console, arguments);
    } catch (_error) { }
};

