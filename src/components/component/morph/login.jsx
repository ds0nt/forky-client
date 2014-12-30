

var MorphButton = require('../tween-button.jsx');
var MorphForm = require('../morph-form.jsx');
var Morph = require('../morph.jsx');

var Login = React.createClass({

	getInitialState() {		
		return {
			loading: false
		};
	},

	onToggle() {
		this.refs.button.toggle();
	},

	onSubmit(data) {
		api.auth.login(data).then(function(res) {

		}).catch((e) => {
			this.refs.form.onError("Bad email or password!")
		});
	},

	render() {

		var form = {
			inputs: [
				{id: 'email', label: 'Email', type: 'email'},
				{id: 'password', label: 'Password', type: 'password'},
			],
			buttons: [
				{id: 'create-btn', text:'Login', loading: this.state.loading},
			]
		};

		return (
			<MorphButton ref='button' text='Login' onClick={this.onToggle}>
				<MorphForm
					ref='form'
					title='Login'
					form={form}
					onSubmit={this.onSubmit}
					onClose={this.onToggle} />
			</MorphButton>
		);
	}
});

module.exports = Login;