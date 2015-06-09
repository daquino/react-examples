var CardSelections = React.createClass({displayName: "CardSelections",
  render: function() {
    var cards = this.props.cards.map(function(item) {
      return (
        React.createElement(Card, {selected: true, card: item})
      )
    });
    return (
      React.createElement("div", {className: "col-lg-4"}, 
        React.createElement("h1", null, this.props.title), 
        cards
      )
    );
  }
});
