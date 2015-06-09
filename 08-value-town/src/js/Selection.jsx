var Selection = React.createClass({
  addCurrentValueCard: function() {
    this.props.addValueCard(this.props.card);
  },
  addCurrentBadCard: function() {
    this.props.addBadCard(this.props.card);
  },
  render: function() {
    return (
      <div className="col-lg-4">
        <div className="row">
          <Card selected={false} card={this.props.card} />
        </div>
        <div className="row">
          <button className="btn btn-success" onClick={this.addCurrentValueCard}>Value</button>
          &nbsp;
          <button className="btn btn-danger" onClick={this.addCurrentBadCard}>Bad</button>
        </div>
      </div>
    );
  }

});
