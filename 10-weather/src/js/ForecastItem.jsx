var ForecastItem = React.createClass({
  handleClick: function() {
    var index = this.props.forecastItem.date.getDay();
    var day = daysOfWeek[index];
    this.props.updateSelectedIndex(this.props.index);
  },
  render: function() {
    var icon = "http://openweathermap.org/img/w/" + this.props.forecastItem.icon +".png";
    var index = this.props.forecastItem.date.getDay();
    var day = daysOfWeek[index];
    var month = this.props.forecastItem.date.getMonth()+1;
    var dayOfMonth = this.props.forecastItem.date.getDate()
    var forecastItemClass = "col-lg-1 col-centered forecast-item";
    if(this.props.selected) {
      forecastItemClass += " forecast-item-selected"
    }
    return (
      <div className={forecastItemClass} onClick={this.handleClick}>
        <p className="text-center">{day}</p>
        <p className="text-center">{month}/{dayOfMonth}</p>
        <p className="text-center">{this.props.forecastItem.low}&deg;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.forecastItem.hi}&deg;</p>
        <img src={icon} className="img-responsive center-block" alt=""/>
        <p className="text-center">{this.props.forecastItem.description}</p>
      </div>
    );
  }
});
