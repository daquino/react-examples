var Selection = React.createClass({
  addCurrentValueCard: function() {
    this.props.addValueCard(this.props.card);
  },
  addCurrentScrubCard: function() {
    this.props.addScrubCard(this.props.card);
  },
  render: function() {
    return (
      <div className="col-lg-4">
        <div className="row">
          <Card selected={false} card={this.props.card} />
        </div>
        <div className="row">
          <button className="btn btn-success" onClick={this.addCurrentValueCard}>Value Town</button>
          &nbsp;
          <button className="btn btn-danger" onClick={this.addCurrentScrubCard}>Scrub Town</button>
        </div>
      </div>
    );
  }

});
