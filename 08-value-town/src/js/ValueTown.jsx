var ValueTown = React.createClass({
  render: function() {
    var valueCards = this.props.cards.map(function(item) {
      return (
        <Card selected={true} card={item} />
      )
    });
    return (
      <div className="col-lg-4">
        <h1>Value Town</h1>
        {valueCards}
      </div>
    );
  }

});
