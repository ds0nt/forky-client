

var MorphButton = require('../tween-button.jsx');
var MorphForm = require('../morph-form.jsx');
var Morph = require('../morph.jsx');

var Register = React.createClass({

	getInitialState() {		
		return {
			loading: false
		};
	},

	onToggle() {
		this.refs.button.toggle();
	},

	onSubmit(data) {
		if (data.password != data.password2) {
			this.refs.form.onError("Password Mismatch");
			return;
		}

		api.auth.register(data).then(function(res) {
			api.auth.login(data);
		}).catch((e) => {
			console.log(e);
			if (e == "duplicate") {
				this.refs.form.onError("Email is already registered");
			} else {
				this.refs.form.onError("There was an error registering");
			}
		});
	},

	render() {
		var form = {
			inputs: [
				{id: 'email', label: 'Email', type: 'email'},
				{id: 'password', label: 'Password', type: 'password'},
				{id: 'password2', label: 'Confirm Password', type: 'password'},
			],
			buttons: [
				{id: 'create-btn', text:'Register', loading: this.state.loading},
			]
		};
		return (
			<MorphButton ref='button' text='Register' onClick={this.onToggle}>
				<MorphForm
					ref='form'
					title='Register'
					form={form}
					onSubmit={this.onSubmit}
					onClose={this.onToggle} />
			</MorphButton>
		);
	}
});

module.exports = Register;