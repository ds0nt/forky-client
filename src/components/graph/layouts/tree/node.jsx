/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Editor = require('../../index.jsx');

var Node = React.createClass({

	getDefaultProps: function() {
		return {
			selected: false
		};
	},

	clickHandler: function(e) {
		actions.graph.selectNode(this.props.id);
		e.preventDefault();
		e.stopPropagation();
	},

	render: function() {
		var x = Math.ceil(this.props.node.x + (window.innerWidth / 2) - 175);
		var y =	Math.ceil(this.props.node.y + (window.innerHeight / 2) - 44);

		var growth = 1 + Math.log(1 + this.props.node.totalDescendants) / 10;
		// this.props.node.text = growth;

		var transform = ReactStyle({
			transform: 'translate3d('+x+'px, '+y+'px, 0) translate3d(-50%, -50%, 0) scale(' + growth + ', ' + growth + ') ',
			// padding: '10, 2 + ',
			// fontSize: 14 + Math.pow(this.props.node.weight/2, 0.5),
		});


		return (

			<div onClick={this.clickHandler} styles={[
					this.styles.node,
					this.props.node.style == 'soft' ? this.styles.soft : this.styles.hard,
					this.props.node.selectedTree === true ?
						(this.props.del === true ? this.styles.delTree : this.styles.selectedTree) : null,
					this.props.selected ? this.styles.selected : null,
					transform,
				]}>
					{this.props.node.text}
			</div>
		);
	},

	styles: {
		selectedTree: ReactStyle({
			border: '1px solid #2384D1',
		}),
		delTree: ReactStyle({
			border: '1px solid #D12384 !important',
		}),
		node: ReactStyle({
			boxSizing: 'border-box',
			userSelect: 'none',
			position: 'absolute',
			padding: '2px 6px',
			fontSize: 14,
			textAlign: 'center',
			borderRadius: 10,
			minWidth: '1em',
			minHeight: '1em',
			left: 0,
			top: 0,
			margin: 'auto',
			fontFamily: 'Georgia,Baskerville,sans-serif',
			lineHeight: 20,
			background: 'white',
			color: '#222',
			border: '1px solid #666666'
		}),

		soft: ReactStyle({
			boxShadow: '0 1px 1px rgba(100, 100, 100, 0.7)',
		}),

		hard: ReactStyle({
			boxShadow: '0 1px 1px rgba(100, 100, 100, 0.7)',
		}),

		selected: ReactStyle({
			border: '1px solid #2384D1',
		}),
	}
});

module.exports = Node;