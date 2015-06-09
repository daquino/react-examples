var cardTypes = ['Minion', 'Spell', 'Weapon', 'Enchantment'];

var App = React.createClass({displayName: "App",
  getInitialState: function() {
    return {
      cards: [],
      value_cards: [],
      bad_cards: [],
    };
  },
  componentDidMount: function() {
    $.get('http://localhost:3333/AllSets.json')
      .done(this.addCards);
  },
  addCards: function(data) {
    var filteredData = data['Basic'].filter(this.validateCard);
    var cards = filteredData.map(function(card) {
      return 'http://wow.zamimg.com/images/hearthstone/cards/enus/original/' + card.id + '.png';
    });
    this.setState({cards: cards, cardIndex: 0});
  },
  validateCard: function(card) {
    return card.collectible && cardTypes.indexOf(card.type) !== -1;
  },
  addValueCard: function(card) {
    var updated_value_cards = this.state.value_cards.concat([card]);
    var updatedCardIndex = this.state.cardIndex+1;
    this.setState({value_cards: updated_value_cards, cardIndex: updatedCardIndex});
  },
  addBadCard: function(card) {
    var updated_bad_cards = this.state.bad_cards.concat([card]);
    var updatedCardIndex = this.state.cardIndex+1;
    this.setState({bad_cards: updated_bad_cards, cardIndex: updatedCardIndex});
  },
  render: function() {
    var currentCard = this.state.cards[this.state.cardIndex];
    return (
      React.createElement("div", {className: "main"}, 
        React.createElement("h1", null, "Value or Bad?"), 
        React.createElement("div", {className: "container"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement(CardSelections, {title: "Value Town", cards: this.state.value_cards}), 
            React.createElement(Selection, {card: currentCard, 
              addValueCard: this.addValueCard, 
              addBadCard: this.addBadCard}), 
            React.createElement(CardSelections, {title: "Badville", cards: this.state.bad_cards})
          )
        )
      )
    );
  }
});

React.render(React.createElement(App, null), document.body);
