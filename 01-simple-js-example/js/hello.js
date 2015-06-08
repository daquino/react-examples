var HelloMessage = React.createClass({displayName: "HelloMessage",
  render: function() {
    return React.createElement("h1", null, "Hello ", this.props.name);
  }
});

React.render(React.createElement(HelloMessage, {name: "John"}), document.body);
