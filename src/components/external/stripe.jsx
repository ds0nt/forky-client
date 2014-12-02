
var ReactScriptLoaderMixin = require('../../mixins/react-script-loader.js').ReactScriptLoaderMixin;

var StripeButton = React.createClass({
    mixins: [ReactScriptLoaderMixin],

    getScriptURL: function() {
        return 'https://checkout.stripe.com/checkout.js';
    },

    statics: {
        stripeHandler: null,
        scriptDidError: false,
    },

    // Indicates if the user has clicked on the button before the
    // the script has loaded.
    hasPendingClick: false,

    onScriptLoaded: function() {
        // Initialize the Stripe handler on the first onScriptLoaded call.
        // This handler is shared by all StripeButtons on the page.
        if (!StripeButton.stripeHandler) {
            StripeButton.stripeHandler = StripeCheckout.configure({
                key: config.stripe_key,
                image: config.logo_image,
                token: function(token) {
                        // Use the token to create the charge with a server-side script.
                }
            });
            if (this.hasPendingClick) {
                this.showStripeDialog();
            }
        }
    },

    showLoadingDialog: function() {
        // show a loading dialog
    },

    hideLoadingDialog: function() {
        // hide the loading dialog
    },

    showStripeDialog: function() {
        this.hideLoadingDialog();
        StripeButton.stripeHandler.open({
                name: 'MetaMind',
                description: 'Donate!',
                amount: 500
            });
    },

    onScriptError: function() {
        this.hideLoadingDialog();
        StripeButton.scriptDidError = true;
    },

    onClick: function() {
        if (StripeButton.scriptDidError) {
            console.log('failed to load script');
        } else if (StripeButton.stripeHandler) {
            this.showStripeDialog();
        } else {
            this.showLoadingDialog();
            this.hasPendingClick = true;
        }
    },

    render: function() {
        return (
            <button onClick={this.onClick}>Place order</button>
        );
    }
});

module.exports = StripeButton;