var App = React.createClass({displayName: "App",

  render: function() {
    return (
        React.createElement("h1", null, "Hello world!")
    );
  }

});

React.render(React.createElement(App, null), document.getElementById('container'));
