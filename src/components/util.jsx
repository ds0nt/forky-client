var React = require('react');
var Reflux = require('reflux');
var tweenState = require('react-tween-state');

var BackDrop = React.createClass({
	mixins: [Reflux.ListenerMixin, tweenState.Mixin],

	getInitialState() {
		return {
			visible: 'hidden',
			opacity: 0,
		};
	},

	componentDidMount() {

		this.listenTo(actions.backdrop.open, () => {
			this.setState({
				visible: 'visible'
			});

			this.tweenState('opacity', {
		      easing: tweenState.easingTypes.easeInOutQuad,
		      duration: 400,
		      endValue: 1,
		    });

		});

		this.listenTo(actions.backdrop.close, (duration) => {
			this.tweenState('opacity', {
		      easing: tweenState.easingTypes.easeInOutQuad,
		      duration: duration ? duration: 500,
		      endValue: 0,
		      onEnd: () => {
				this.setState({
					visible: 'hidden'
				});
		      }
		    });
		});

	},

	render() {
		return <div styles={this.styles.backdrop} style={{visibility: this.state.visible, opacity: this.getTweeningValue('opacity')}}/>
	},

	styles: {
		backdrop: ReactStyle({
			position: 'absolute',
			zIndex: '999',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			background: 'rgba(0, 0, 0, 0.5)',
			transform: 'translate3d(0,0,0)',
		}),
	},
});


var Alerts = React.createClass({
	mixins: [Reflux.ListenerMixin],

	getInitialState() {
		return {
				alerts: []
			}
	},

	componentDidMount() {

		this.listenTo(actions.alerts.create, (value, kill) => {

			var alerts = this.state.alerts;
			alerts.push(value);

			kill = kill || _.partial(setTimeout, _, 5000);

			kill(() => {
				this.setState({
					alerts: _.without(this.state.alerts, value)
				});
			});

			this.setState({
				alerts: alerts
			});

		});

	},

	render() {
		var alerts = _.map(this.state.alerts, (v) => {
			return <li>{v}</li>
		});

		return (<ul styles={this.styles.alerts}>{alerts}</ul>);
	},

	styles: {
		alerts: ReactStyle({
			textAlign: 'center',
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			margin: 'auto',
			width: '500px',
		}),
	}
});

var Util = React.createClass({
	render() {
		return <div>
			<Alerts />
			<BackDrop />
		</div>
	},

});

module.exports = Util;
