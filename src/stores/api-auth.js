var Reflux = require('reflux');
var api = require('../api/api.js');
var rt = require('../api/rt.js');

var auth = Reflux.createStore({
	appdata: {
		user: null,
		token: {
			id: null
		}
	},

	init() {

		//Remembered Auth Token + AppData
		var stored = this.storedData();
		if (stored) {
			this.setAppdata(stored);
		} else {
			// rt.on();
		}

	},

	getDefaultData() {
		return this.appdata;
	},

	validate(data) {
		return data != null && _.isObject(data.user) && _.isObject(data.token) &&
			typeof data.token.id == 'string';
	},

	storedData() {
		var appdata = localStorage.getItem('appdata');

		if (!appdata) {
			return false;
		}

		appdata = JSON.parse(appdata);
		if (!this.validate(appdata)) {
			return false;
		}

		return appdata;
	},


	setAppdata(data) {
		this.appdata = data;
		localStorage.setItem('appdata', JSON.stringify(this.appdata));

		rt.on(data.token.id);
		api.setToken(data.token.id);

		this.trigger(this.appdata);
	},

	isLoggedin() {
		return this.validate(this.appdata);
	},


	//Call Server
	//TODO move login/register/logout
	login(data) {
		return api.login(data, (http, resolve, reject) => {
			http.then((res) => {
				this.setAppdata(res);
				resolve(res);
			}).catch(function (message) {
				reject(this.status);
			});
		});
	},

	register(data) {
		return api.register(data, (http, resolve, reject) => {
			http.then((res) => {
				if (res.inserted == 1) {
					resolve(data);
				} else {
					reject("duplicate");
				}
			}).catch(function (message) {
				reject(this.status);
			});
		});
	},

	logout() {
		localStorage.removeItem('appdata');

		api.forgetToken();

		this.appdata = {
			user: null,
			token: {
				id: null
			}
		};

		rt.off();

		this.trigger(this.appdata);
	},

	isHelpSeen() {
		if (typeof this.appdata.user.first_login === 'undefined')
			return true;

		return this.appdata.user.first_login == false;
	},

	setHelpSeen() {
		api.post('/api/user/setHelpSeen').then((res) => {
			console.log('res', res);
			this.appdata.user.first_login = false;
			localStorage.setItem('appdata', JSON.stringify(this.appdata));
		}).catch(function (message) {
			handleApiError(this, this.status, message);
		});
	},
});

module.exports = auth;
