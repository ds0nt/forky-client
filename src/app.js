'use strict';

var React = require('react');

window.hostPath = function(path) {
	return '//' + document.location.host + path;
	// return config.apiEndpoint + path;
};
window.socketPath = function() {
	return 'ws://' + document.location.host + '/ws/'
	// return config.socketEndpoint;
};

window._ = require('underscore');

//attach actions to global context
require('./actions.js');

//attach stores to global context
require('./stores.js');


// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

var HomePage = require('./components/index.jsx');

ReactStyle.inject();
HomePage();
