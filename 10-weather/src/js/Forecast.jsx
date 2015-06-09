var Forecast = React.createClass({
  render: function() {
    var forecastItems = this.props.forecastItems.map(function(forecastItem, index) {
      var selected = this.props.selectedIndex == index;
      return <ForecastItem key={index} index={index} forecastItem={forecastItem} selected={selected} updateSelectedIndex={this.props.updateSelectedIndex}/>
    }.bind(this));
    return (
      <div className="row row-centered forecast">
        <ReactCSSTransitionGroup transitionName="example">
          {forecastItems}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});
