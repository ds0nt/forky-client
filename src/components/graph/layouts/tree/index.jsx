
/**
 * @jsx React.DOM
 */

var React = require('react');
var TreeSpread = require('./treespread.jsx');
var Node = require('./node.jsx');
var Edge = require('./edge.jsx');

var Tree = React.createClass({
	getInitialState: function() {
		return {
			nodes: [],
			edges: [],
			framewidth: 0,
			frameheight: 0,
			selected: false,
			del: false,
		};
	},

	componentDidMount: function() {
		var $frame = $(this.refs.nodeFrame.getDOMNode());

		$frame.panzoom({
			$set: $('#edgePanFrameG, #nodePanFrame')
		});

		this.setState({
			framewidth: $frame.width(),
			frameheight: $frame.height()
		});

		window.addEventListener('resize', this.resize, false);
	},

	componentWillReceiveProps: function(nextProps) {
		var nodes = this.state.nodes;

		if (_.isObject(nextProps.graph)) {
 			if (nextProps.graph.edges.length == (_.size(nextProps.graph.nodes) - 1)) {
				nodes = TreeSpread.run(nextProps.graph);
			}
		}

		if (typeof nextProps.selected !== 'undefined') {
			if (this.props.selected) {
				rt.graph.walkChildren(this.props.selected, (id, k, children, path) => {
					nodes[id].selectedTree = false;
				});
			}
			if (nextProps.selected) {
				rt.graph.walkChildren(nextProps.selected, (id, k, children, path) => {
					nodes[id].selectedTree = true;
				});
			}
		}
		this.setState({
			nodes: nodes
		});
	},

	handleClick: function(e) {
		e.preventDefault();
		e.stopPropagation();
		actions.graph.deselectNode();
	},

	resize: function(ev) {
		var $frame = $(this.refs.nodeFrame.getDOMNode())
		this.setState({
			framewidth: $frame.width(),
			frameheight: $frame.height()
		});
	},

	render: function() {
		//todo fix all the rerendering on resize, clicking shit
		//todo optimize node modifies to not recalc EVERYthing



    	var nodes = _.map(this.state.nodes, (v, k) => {
    		return <Node
	    		key={'node' + k}
	    		node={v}
	    		id={k}
	    		del={this.props.del}
	    		selected={this.props.selected == k} />;
    	});

    	if (typeof this.state.nodes['root'] !== 'undefined') {
			document.title = this.state.nodes['root'].text;
    	}

    	var edges = _.map(this.props.graph.edges, (v, k) => {
    		return (<Edge key={v.a + 'treeedge' + v.b}
		    			x1={this.state.nodes[v.a].x}
		    			y1={this.state.nodes[v.a].y}
		    			x2={this.state.nodes[v.b].x}
		    			y2={this.state.nodes[v.b].y} />);
    	});

		return (
			<div styles={this.styles.nodeFrame} ref="nodeFrame" onClick={this.handleClick}>
        		<div id="nodePanFrame" styles={this.styles.nodePanFrame}>
	        		{nodes}
		     	</div>
	        	<svg ref="edgePanFrame" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
	     			version="1.2" baseProfile="tiny" width="100%" height="100%" x="0px" y="0px" viewBox={"0 0 " + this.state.framewidth + " " + this.state.frameheight}>
	     			<g id="edgePanFrameG" width="100%" height="100%">
	     			{edges}
	     			</g>
	     		</svg>
        	</div>
		);
	},

	styles: {
		nodeFrame: ReactStyle({
			position: 'fixed',
			left: 265,
			top: 0,
			bottom: 0,
			right: 0,
		}),
		nodePanFrame: ReactStyle({
			 zIndex: '10',
		}),
		edgePanFrame: ReactStyle({
			 zIndex: '5',
		}),
	}
});

module.exports = Tree;