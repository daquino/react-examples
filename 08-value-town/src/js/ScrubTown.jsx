var ScrubTown = React.createClass({
  render: function() {
    var scrubCards = this.props.cards.map(function(item) {
      return (
        <Card selected={true} card={item} />
      )
    });
    return (
      <div className="col-lg-4">
        <h1>Scrub Town</h1>
        {scrubCards}
      </div>
    );
  }
});
