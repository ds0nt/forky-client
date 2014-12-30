
var qwest = require('qwest');

var api = {

	authData: {

	},

	setToken(token) {
		this.authData.access_token = token;
	},

	forgetToken() {
		delete this.authData.access_token;
	},

	handleError(xhr, status, message) {
	    if (status == '401') {
	        actions.authFail();
	        return;
	    } else {
	    	console.log('message', message);
	    }
	},

	logError(error) {

	  	qwest.post('/analytics/error').then((response) => {

	    }).catch((err) => {

	    });
	},

	login(data, fn) {
		return new Promise(function (resolve, reject) {
			fn(api.post('/api/login', data), resolve, reject);
		});
	},
	register(data, fn) {
		return new Promise(function (resolve, reject) {
			fn(api.post('/api/user', data), resolve, reject);
		});
	}
};

_.each(['post', 'get', 'delete', 'put'], (v) => {
    api[v] = function(url, data, options) {
        var _data = typeof data !== 'object' ? {} : data;
        var _options = typeof options !== 'object' ? {} : options;
        var _data = _.extend(_data, api.authData);
        var _options = _.extend(_options, {
            responseType: 'json',
            dataType: 'json',
        });
        return qwest[v](hostPath(url), _data, _options);
    }
});

module.exports = api;