/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Reflux = require('reflux');


var MorphButton = require('./component/tween-button.jsx');
var MorphForm = require('./component/morph-form.jsx');
var Morph = require('./component/morph.jsx');


var Landing = React.createClass({
    mixins: [Reflux.connect(api.auth, 'appdata'), Navigation],

	getInitialState() {
		return {
			loginLoading: false,
			registerLoading: false,
			appdata: null,
			donate: false,
		};
	},

	componentWillUpdate: function(nextProps, nextState) {
		if (nextState.appdata.user && typeof nextState.appdata.user === 'object') {
			this.transitionTo('/app/graphs');
		}
	},

	onEnter() {
		this.props.onEnter()
	},

	toggleLogin() {
		this.refs.login.toggle();
	},

	toggleRegister() {
		this.refs.register.toggle();
	},

	submitLogin(data) {
		api.auth.login(data);
	},

	submitRegister(data) {
		api.auth.register(data);
	},

	toggleDonate() {
		this.refs.donate.toggle();
	},

	render() {
		var loginForm = {
			inputs: [
				{id: 'email', label: 'Email', type: 'email'},
				{id: 'password', label: 'Password', type: 'password'},
			],
			buttons: [
				{id: 'create-btn', text:'Login', loading: this.state.loginLoading},
			]
		};
		var registerForm = {
			inputs: [
				{id: 'email', label: 'Email', type: 'email'},
				{id: 'password', label: 'Password', type: 'password'},
				{id: 'password2', label: 'Confirm Password', type: 'password'},
			],
			buttons: [
				{id: 'create-btn', text:'Register', loading: this.state.registerLoading},
			]
		};

		return (
			<div styles={this.styles.landingContainer}>

					<MorphButton background="#a15451" style={{float: 'right', margin: 10, borderRadius: 20, height: 40, width: 100}} ref='donate' text='donate' onClick={this.toggleDonate}>
						<Morph styles={this.styles.donate} onClose={this.toggleDonate}>
							<h2 styles={this.styles.donateh2}>{"Donate! <3"}</h2>
							<form styles={this.styles.donateform} action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
								<input type="hidden" name="cmd" value="_s-xclick" />
								<input type="hidden" name="hosted_button_id" value="VAYRWAXEMBHB2" />
								<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
								<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
							</form>
						</Morph>
					</MorphButton>
				<div styles={this.styles.landing}>
					<span styles={this.styles.company}>21cdawn</span>
					<h1 styles={this.styles.title}>MetaMind</h1>
					<span style={{letterSpacing: 0.7, textIndent: '2em', display: 'block', margin: '0px -40px 40px -40px', textAlign: 'left', lineHeight: '1.5em'}}>{"MetaMind is a platform for real-time collaborative brainstorming and mind mapping. Mind maps are perfect to edit as a team, share with others, and to get your idea across."}</span>
					<div styles={this.styles.morphButton}>
						<MorphButton ref='login' text='Login' onClick={this.toggleLogin}>
							<MorphForm
								title='Login'
								form={loginForm}
								onSubmit={this.submitLogin}
								onClose={this.toggleLogin} />
						</MorphButton>
					</div>
					<div styles={this.styles.morphButton}>
						<MorphButton ref='register' text='Register' onClick={this.toggleRegister}>
							<MorphForm
								title='Register'
								form={registerForm}
								onSubmit={this.submitRegister}
								onClose={this.toggleRegister} />
						</MorphButton>
					</div>
				</div>
			</div>
		);
	},

		
	paypal_active() {
		return this.state.donate == false ? null : ReactStyle({
			visibility: 'visible'
		});
	},

	styles: {

		donateMorph: ReactStyle({
			textAlign: 'center',
			margin: '40px 0 10px 0',
			display: 'block',
		}),

		donateBtn: ReactStyle({
			color: 'white',
			width: 100,
		}),

		donate: ReactStyle({
            padding: '10px 30px 30px 30px',
			color: 'white',
			margin: 'auto',
            textAlign: 'center',
		}),
		donateh2: ReactStyle({
            margin: 0,
            padding: '0.4em 0 0.3em',
            textAlign: 'center',
            fontWeight: '300',
            fontSize: '3.5em',
		}),

		donateform: ReactStyle({
            padding: '10px',
            width: 300,
            lineHeight: '1.7em',
		}),

		landing: ReactStyle({
			position: 'absolute',
			top: '-18em',
			left: 0,
			right: 0,
			bottom: 0,
			height: '10em',
			width: 300,
			textAlign: 'center',
			margin: 'auto',
		}),

		company: ReactStyle({
			fontFamily: 'Lato,Calibri,Arial,sans-serif',
			display: 'block',
			fontWeight: '700',
			textTransform: 'uppercase',
			letterSpacing: '0.5em',
			textAlign: 'center',
			padding: '0 0 0.6em 0',
		}),

		title: ReactStyle({
			letterSpacing: '0.1em',
			margin: '0 0 1em 0',
			fontSize: '2.125em',
			fontWeight: '400',
			textAlign: 'center',
			lineHeight: '1',
		}),

		morphButton: ReactStyle({
			textAlign: 'center',
			margin: '3px 0 10px 0',
			display: 'block',
		}),

		landingContainer: ReactStyle({
			position: 'relative',
			width: '100vw',
			height: '100vh',
		}),

	},
});


module.exports = Landing;