/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var ModalInput = React.createClass({
    getInputDOM: function() {
        return this.refs.input.getDOMNode();
    },
    render: function() {
        return (
            <p>
                <label>{this.props.label}</label>
                <input ref='input' autocomplete='off' type={this.props.type} id={this.props.id} style={{backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=);'}} />
            </p>
        );
    }
});

var ModalButton = React.createClass({
    getDefaultProps: function() {
        return {
            loading: false
        };
    },
    render: function() {
        var type = this.props.onClick ? 'button' : 'submit';

        if (this.props.loading) {
            this.props.className = 'loading';
        }

        return (
            <p>
                { this.transferPropsTo(<button type={type}>{this.props.text}</button>) }
            </p>
        );
    }
});

var MorphForm = React.createClass({

    getInitialState: function() {
        return {
            error: false
        }
    },

    onSubmit: function(ev) {
        ev.preventDefault();

        this.setState({error: false});

        var data = {};
        this.props.form.inputs.map(function(v) {
            data[v.id] = this.refs[v.id].getInputDOM().value;
        }.bind(this));

        this.props.onSubmit(data);
    },

    onError: function(error) {
        this.setState({error: error});
    },

    render: function() {
        var inputs = this.props.form.inputs.map(function(v) {
            return <ModalInput key={'modalinput' + v.id} ref={v.id} label={v.label} type={v.type} id={v.id}/>
        });

        var buttons = this.props.form.buttons.map(function(v) {
            return <ModalButton key={'modalbutton' + v.id} text={v.text} id={v.id} onClick={v.onClick} loading={v.loading} />;
        });

        var error = this.state.error;
        var errorStyles = [this.styles.errors];
        if (error) {
            errorStyles.push(this.styles.errorShowing)
        }

        return (
            <div className='content-style-form' styles={this.styles.morphForm}>
                <span className='icon icon-close' onClick={this.props.onClose}>Close the dialog</span>
                <h2>{this.props.title}</h2>
                <form action='' ref='form' id='loginform' onSubmit={this.onSubmit}>
                    <p styles={errorStyles}>{error}</p>
                    {inputs}
                    {buttons}
                </form>
            </div>);
    },

    styles: {
        errors: ReactStyle({
            height: "0",
            overflow: "hidden",
            margin: "0 0 5px 0",
            fontSize: "1.2em !important",
            fontWeight: "bold",
            color: "#FFA748",
            transition: "height 0.2s 0.3s",
        }),
        errorShowing: ReactStyle({
            height: "1.5em",
        }),
    	morphForm: ReactStyle({
    		width: 400,
    		margin: 0,
    	}),
    },
});

module.exports = MorphForm;