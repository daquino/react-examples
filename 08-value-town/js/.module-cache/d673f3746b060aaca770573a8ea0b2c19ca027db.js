var ValueTown = React.createClass({displayName: "ValueTown",
  render: function() {
    var valueCards = this.props.cards.map(function(item) {
      React.createElement(Card, {selected: true, card: item})
    });
    console.log('Prop cards = ' + this.props.cards);
    return (
      React.createElement("div", {className: "col-lg-4"}, 
        React.createElement("h1", null, "Value Town"), 
        valueCards
      )
    );
  }

});
