var CardSelections = React.createClass({
  render: function() {
    var cards = this.props.cards.map(function(item) {
      return (
        <Card selected={true} card={item} />
      )
    });
    return (
      <div className="col-lg-4">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
});
