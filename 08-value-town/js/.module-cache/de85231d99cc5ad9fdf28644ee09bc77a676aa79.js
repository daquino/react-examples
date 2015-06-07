var ScrubTown = React.createClass({displayName: "ScrubTown",
  render: function() {
    var scrubCards = this.props.cards.map(function(item) {
      return (
        React.createElement(Card, {selected: true, card: item})
      )
    });
    return (
      React.createElement("div", {className: "col-lg-4"}, 
        React.createElement("h1", null, "Scrub Town"), 
        scrubCards
      )
    );
  }
});
