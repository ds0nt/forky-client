/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Reflux = require('reflux');

var Login = require('./component/morph/login.jsx');
var Register = require('./component/morph/register.jsx');

var MorphButton = require('./component/tween-button.jsx');
var MorphForm = require('./component/morph-form.jsx');
var Morph = require('./component/morph.jsx');


var Landing = React.createClass({
    mixins: [Reflux.connect(api.auth, 'appdata'), Navigation],

	getInitialState() {
		return {
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

	toggleDonate() {
		this.refs.donate.toggle();
	},

	render() {

		var slogan1 = "Collaborative Concept Mapping";

		return (
			<div styles={this.styles.landingContainer}>

					<MorphButton background="#a15451" style={{float: 'right', margin: 10, borderRadius: 20, height: 40, width: 100}} ref='donate' text='Support Forky' onClick={this.toggleDonate}>
						<Morph styles={this.styles.donate} onClose={this.toggleDonate}>
							<h2 styles={this.styles.donateh2}>{"Support Forky"}</h2>
							<form styles={this.styles.donateform} action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
								<input type="hidden" name="cmd" value="_s-xclick" />
								<input type="hidden" name="hosted_button_id" value="VAYRWAXEMBHB2" />
								<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
								<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
							</form>
						</Morph>
					</MorphButton>
				<div styles={this.styles.landing}>
					<h1 styles={this.styles.title}>Forky</h1>

					<span styles={this.styles.slogan}>
						{slogan1}
					</span>

					<div styles={this.styles.morphButton}>
						<Login />
					</div>

					<div styles={this.styles.morphButton}>
						<Register />
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

		slogan: ReactStyle({
			letterSpacing: '1px',
			fontSize: '125%',
			display: 'block',
			margin: '0px -40px 65px -40px',
			textAlign: 'center',
			lineHeight: '0.2em',
		}),
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