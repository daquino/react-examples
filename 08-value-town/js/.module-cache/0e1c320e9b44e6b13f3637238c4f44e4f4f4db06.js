var Card = React.createClass({displayName: "Card",
  render: function() {
    var cardClass = this.props.selected ? 'selected' : '';
    return (
        React.createElement("img", {className: cardClass, src: this.props.card, alt: "Hearthstone Card"})
    );
  }
});
