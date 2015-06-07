var Card = React.createClass({
  render: function() {
    var cardClass = this.props.selected ? 'selected' : '';
    console.log('Source = ' + this.props.card);
    return (
        <img className={cardClass} src={this.props.card} alt="Hearthstone Card" />
    );
  }
});
