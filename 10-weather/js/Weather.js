var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var WeatherApp = React.createClass({displayName: "WeatherApp",
  retrieveForecast: function(location) {
    this.setState({
      forecast: [],
      selectedIndex: -1,
      forecastFound: false,
      forecastAttempted: false,
      forecastLoading:true
      });
    $.get('http://api.openweathermap.org/data/2.5/forecast/daily',
      {
        q: location,
        units: 'imperial',
        cnt: 7,
        APPID: 'f4187c3abe32987c26b770b411d374e7'
      }
    ).done(this.processForecastSuccessResponse)
     .fail(this.processForecastFailure)
     .always(this.processForecastResponse);
  },
  processForecastSuccessResponse: function (response) {
    var forecast;
    var forecastFound;
    if(response.cod == "200") {
      forecast = response.list.map(function(item, index) {
        var timestamp = new Date(item.dt*1000);
        return {
          date: timestamp,
          hi: Math.round(item.temp.max),
          low: Math.round(item.temp.min),
          icon: item.weather[0].icon,
          description: item.weather[0].main
        };
      });
      forecastFound = true;
    }
    else {
      forecast = [];
      forecastFound = false;
    }
    this.setState({
      forecast: []
    });
    this.setState({
      forecast: forecast,
      selectedIndex: -1,
      forecastFound: forecastFound,
      forecastAttempted: true,
      forecastLoading: false
      });
  },
  processForecastError: function(xhr, status, error) {
    this.setState({
      forecast: [],
      selectedIndex: -1,
      forecastFound: false,
      forecastAttempted: true,
      forecastLoading: false
      });
  },
  processForecastResponse: function(xhr, status, error) {
    if(status == 'error') {
      this.processForecastError(xhr, status, error);
    }
  },
  updateSelectedIndex: function(index) {
    if(this.state.selectedIndex != index) {
      this.setState({selectedIndex: index});
    }
    else {
      this.setState({selectedIndex: -1});
    }
  },
  getInitialState: function() {
    return {
      forecast: [],
      selectedIndex: -1,
      forecastFound: false,
      forecastAttempted: false
    };
  },
  render: function() {
    var locationFormProps = {
      retrieveForecast: this.retrieveForecast,
      forecastAttempted: this.state.forecastAttempted,
      forecastFound: this.state.forecastFound,
      forecastLoading: this.state.forecastLoading
    }
    return (
        React.createElement("div", {className: "container text-center"},
          React.createElement("h1", {className: "text-center"}, "ReactJS Forecast Example"),
          React.createElement("div", {id: "locationForm", className: "row"},
            React.createElement(LocationForm, React.__spread({},  locationFormProps))
          ),
          React.createElement(Forecast, {forecastItems: this.state.forecast, selectedIndex: this.state.selectedIndex, updateSelectedIndex: this.updateSelectedIndex})
        )
    );
  }
});

React.render(React.createElement(WeatherApp, null), document.body);
