var React = require('react');
var Panel = require('../components/base/Panel.jsx');
var NotFoundPage = React.createClass({
    render: function() {
        return (
        <Panel title="Oops!">
           The requested page could not be found.
        </Panel>
        );
    }
});

module.exports = NotFoundPage;