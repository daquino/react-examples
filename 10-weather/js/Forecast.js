var Forecast = React.createClass({displayName: "Forecast",
  render: function() {
    var forecastItems = this.props.forecastItems.map(function(forecastItem, index) {
      var selected = this.props.selectedIndex == index;
      return React.createElement(ForecastItem, {key: index, index: index, forecastItem: forecastItem, selected: selected, updateSelectedIndex: this.props.updateSelectedIndex})
    }.bind(this));
    return (
      React.createElement("div", {className: "row row-centered forecast"}, 
        React.createElement(ReactCSSTransitionGroup, {transitionName: "example"}, 
          forecastItems
        )
      )
    );
  }
});
