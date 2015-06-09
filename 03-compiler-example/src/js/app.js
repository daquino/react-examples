var App = React.createClass({
  render: function() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <h1>Hello from app.js!</h1>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('container'));
