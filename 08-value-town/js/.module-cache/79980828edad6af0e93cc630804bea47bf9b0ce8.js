var App = React.createClass({displayName: "App",
  getInitialState: function() {
    return {
      cards: [],
      value_cards: [],
      scrub_cards: [],
    };
  },
  componentDidMount: function() {
    $.get('http://localhost:3333/AllSets.json')
      .done(this.addCards);
  },
  addCards: function(data) {
    var cards = data['Basic'].map(function(card) {
      return 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/' + card.id + '.png';
    });
    for(card in cards) {
      console.log(card);
    }
    this.setState({cards: cards});
  },
  addValueCard: function(card) {
    var updated_value_cards = this.state.value_cards.concat([card]);
    this.setState({value_cards: updated_value_cards});
  },
  addScrubCard: function(card) {
    var updated_scrub_cards = this.state.scrub_cards.concat([card]);
    this.setState({scrub_cards: updated_scrub_cards});
  },
  render: function() {
    return (
      React.createElement("div", {className: "main"}, "\\", 
        React.createElement("h1", null, "Value or Scrub?"), 
        React.createElement("div", {className: "container"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement(ValueTown, {cards: this.state.value_cards}), 
            React.createElement(Selection, {card: this.state.currentCard, addValueCard: this.addValueCard, addScrubCard: this.addScrubCard}), 
            React.createElement(ScrubTown, {cards: this.state.scrub_cards})
          )
        )
      )
    );
  }
});

React.render(React.createElement(App, null), document.body);
