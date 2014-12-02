
var ChatMessage = React.createClass({

	other: [],


	render: function() {
		var messages = _.map(this.props.messages, (v, k) => {
			return <span styles={this.chatMessageStyle}>{v}</span>
		});

		var online = this.props.online ? (<span styles={this.online} />) :  (<span styles={this.offline} />);

		return (<div styles={this.chatStyle}>
				<img src={this.props.data.picsrc} styles={this.chatMessageImageStyle} />
				{online}
				<div styles={this.chatObjectStyle}>
					<span styles={this.chatMeta}>{this.props.data.email}</span>
					<time className="time timeago" dateTime={(new Date(this.props.data.timestamp)).toISOString()}></time>
					<span className="time"></span>
				</div>
				<div styles={this.messages}>
					{messages}
				</div>
			</div>);
	},


	chatStyle: ReactStyle({
		maxWidth: 500,
		margin: '12px 0',
		position: 'relative'
	}),

	chatObjectStyle: ReactStyle({
		fontSize: 12,
		marginLeft: 44,
	}),

	chatMessageStyle: ReactStyle({
		fontSize: 13,
		display: 'block',
		opacity: '1',
		whiteSpace: 'pre-wrap',
		wordWrap: 'break-word',
		wordBreak: 'break-all',
		lineHeight:'1.4',
		marginTop: 0,
		paddingLeft: 10,
		marginLeft: -7,
	}),

	chatMessageImageStyle: ReactStyle({
		position: 'absolute',
		left: 0,
		top: 0,
		width: 24,
		height: 24,
		borderRadius: 18,
		boxShadow: '0 2px 2px rgba(0, 0, 0, 0.4);',
	}),

	chatTime: ReactStyle({
		opacity: '0.4'
	}),

	chatFrom: ReactStyle({
		opacity: '0.4'
	}),

	chatMeta: ReactStyle({
		opacity: '0.7',
		fontWeight: '700',
		marginTop: 10,
		lineHeight: 14,
		display: 'inline-block',
		marginBottom: 6,
	}),

	messages: ReactStyle({
		marginTop: 1,
		paddingTop: 4,
		marginBottom: 4,
	}),

	online: ReactStyle({
		display: 'inline-block',
		position: 'absolute',
		background: '#44ab44',
		border: '1px solid #3a9f3a',
		top: 14,
		left: 33,
		height: 7,
		width: 7,
		borderRadius: 3,
	}),

	offline: ReactStyle({
		display: 'inline-block',
		position: 'absolute',
		background: '#cccccc',
		border: '1px solid #9a9a9a',
		top: 14,
		left: 33,
		height: 7,
		width: 7,
		borderRadius: 3,
	}),

});

module.exports = ChatMessage;
