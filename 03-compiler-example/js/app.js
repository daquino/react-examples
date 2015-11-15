var App = React.createClass({displayName: "App",
  render: function() {
    return (
      React.createElement("div", {className: "col-md-4 col-md-offset-4"}, 
        React.createElement("h1", null, "Hello from app.js!")
      )
    );
  }
});

React.render(React.createElement(App, null), document.getElementById('container'));
