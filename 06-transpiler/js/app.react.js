var App = React.createClass({
  updateName: function() {
    var value = React.findDOMNode(this.refs.name).value;
    this.setState({name: value});
  },
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <h1>Hello {this.state.name}!</h1>
        <input type="text" onChange={this.updateName} ref="name" />
      </div>
    );
  }
});

React.render(<App />, document.getElementById('container'));
