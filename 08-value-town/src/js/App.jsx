var cardTypes = ['Minion', 'Spell', 'Weapon', 'Enchantment'];

var App = React.createClass({
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
  addScrubCard: function(card) {
    var updated_scrub_cards = this.state.scrub_cards.concat([card]);
    var updatedCardIndex = this.state.cardIndex+1;
    this.setState({scrub_cards: updated_scrub_cards, cardIndex: updatedCardIndex});
  },
  render: function() {
    var currentCard = this.state.cards[this.state.cardIndex];
    return (
      <div className="main">\
        <h1>Value or Scrub?</h1>
        <div className="container">
          <div className="row">
            <CardSelections title="Value Town" cards={this.state.value_cards}/>
            <Selection card={currentCard}
              addValueCard={this.addValueCard}
              addScrubCard={this.addScrubCard}/>
            <CardSelections title="Scrub Town" cards={this.state.scrub_cards}/>
          </div>
        </div>
      </div>
    );
  }
});

React.render(<App />, document.body);
