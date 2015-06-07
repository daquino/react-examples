var Selection = React.createClass({displayName: "Selection",
  addCurrentValueCard: function() {
    this.props.addValueCard(this.props.card);
  },
  addCurrentScrubCard: function() {
    this.props.addScrubCard(this.props.card);
  },
  render: function() {
    return (
      React.createElement("div", {className: "col-lg-4"}, 
        React.createElement("div", {className: "row"}, 
          React.createElement(Card, {selected: false, card: this.props.card})
        ), 
        React.createElement("div", {className: "row"}, 
          React.createElement("button", {className: "btn btn-success", onClick: this.addCurrentValueCard}, "Value Town"), 
          "*nbsp;", 
          React.createElement("button", {className: "btn btn-danger", onClick: this.addCurrentScrubCard}, "Scrub Town")
        )
      )
    );
  }

});
