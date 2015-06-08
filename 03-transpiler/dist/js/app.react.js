var App = React.createClass({displayName: "App",
  updateName: function() {
    var value = React.findDOMNode(this.refs.name).value;
    this.setState({name: value});
  },
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      React.createElement("div", {className: "col-md-4 col-md-offset-4"}, 
        React.createElement("h1", null, "Hello ", this.state.name, "!"), 
        React.createElement("input", {type: "text", onChange: this.updateName, ref: "name"})
      )
    );
  }
});

React.render(React.createElement(App, null), document.getElementById('container'));
