var rt = module.exports = {
	on(token) {
			//TODO extract and encapsulate stream logic somewhere else
			//use global app init actions to trigger creation
			this.off();
			var ws = createWebSocket(token);

			window.sjsConnection = new sharejs.Connection(ws);
			sjsConnection.on('stopped', actions.socket.stopped);
			sjsConnection.on('disconnected', actions.socket.disconnected);
			sjsConnection.on('connected', actions.socket.connected);
			sjsConnection.on('connecting', actions.socket.connecting);
			// sjsConnection.debug = true;

		},

		off() {
			if (typeof sjsConnection !== 'undefined') {
				sjsConnection.disconnect();
			}
		},
};



// Exponential Backoff Socket Reconnecting.

var attempts = 0;

actions.socket.connecting.listen(function () {
	if (attempts === 0) {
		actions.alerts.create('Connecting...');
	}

})

actions.socket.connected.listen(function () {
	attempts = 1;
	actions.alerts.create('Connected.');
})

actions.socket.disconnected.listen(function () {
	actions.alerts.create('Connection Lost...', function (cb) {
		reconnectWebSocket(cb);
	});
})

var tokenWS = false
function createWebSocket(token) {
        tokenWS = token
	if (typeof token === 'string') {
		var socket = new WebSocket(socketPath() + token);
	} else {
		var socket = new WebSocket(socketPath());
	}

	//sharejs will unbind these
	socket.onopen = () => {}
	socket.onclose = () => {
		reconnectWebSocket();
	}

	return socket;
}

function reconnectWebSocket(done) {

	var generateInteval = () => {
		return Math.min(30, attempts) * 1000;
	}

	setTimeout(() => {
		console.log('Teh Binds...');
		attempts++;
		var socket = createWebSocket(tokenWS);
		sjsConnection.bindToSocket(socket);
		done();
	}, generateInteval());
}
