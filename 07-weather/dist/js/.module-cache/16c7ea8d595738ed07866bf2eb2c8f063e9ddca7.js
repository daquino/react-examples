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
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
      data: {
        q: location+', TN',
        units: 'imperial',
        cnt: 7
      },
      success: function (response) {
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
      }.bind(this),
      error: function(jqXHR, exception) {
        this.setState({
          forecast: [],
          selectedIndex: -1,
          forecastFound: false,
          forecastAttempted: true,
          forecastLoading: false
          });
      }.bind(this)
    });
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
          React.createElement("h1", {className: "text-center"}, "7-Day Forecast Example"), 
          React.createElement("div", {id: "locationForm", className: "row"}, 
            React.createElement(LocationForm, React.__spread({},  locationFormProps))
          ), 
          React.createElement(Forecast, {forecastItems: this.state.forecast, selectedIndex: this.state.selectedIndex, updateSelectedIndex: this.updateSelectedIndex})
        )
    );
  }
});


var LocationForm = React.createClass({displayName: "LocationForm",
  retrieveForecast: function(e) {
    e.preventDefault();
    var location = React.findDOMNode(this.refs.location).value;
    if(location.length > 3) {
      this.props.retrieveForecast(React.findDOMNode(this.refs.location).value);
    }
  },
  render: function() {
    var locationGroupClass = "form-group";
    var locationFeedback;
    if(this.props.forecastAttempted) {
      if(this.props.forecastFound) {
        locationGroupClass += " has-feedback has-success";
        locationFeedback = React.createElement("span", {className: "glyphicon glyphicon-ok form-control-feedback", "aria-hidden": "true"})
      }
      else {
        locationGroupClass += " has-feedback has-error";
        locationFeedback = React.createElement("span", {className: "glyphicon glyphicon-remove form-control-feedback", "aria-hidden": "true"})
      }
    }
    else if(this.props.forecastLoading) {
      locationGroupClass += " has-feedback";
      locationFeedback = React.createElement("i", {className: "glyphicon glyphicon-refresh glyphicon-refresh-animate form-control-feedback", "aria-hidden": "true"})
    }
    return (
      React.createElement("div", {className: "col-lg-8 col-md-offset-2"}, 
      React.createElement("form", {className: "form-inline", onSubmit: this.retrieveForecast}, 
        React.createElement("div", {className: locationGroupClass}, 
          React.createElement("label", {className: "sr-only", htmlFor: "location"}, "Location"), 
          React.createElement("div", {className: "input-group"}, 
            React.createElement("input", {autoComplete: "off", ref: "location", type: "text", id: "location", className: "form-control", placeholder: "Nashville"}), 
            locationFeedback
          )
        ), 
        React.createElement("button", {type: "submit", className: "btn btn-info forecast-button"}, "Get Forecast")
      )
      )
    );
  }
});


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


var ForecastItem = React.createClass({displayName: "ForecastItem",
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
      React.createElement("div", {className: forecastItemClass, onClick: this.handleClick}, 
        React.createElement("p", {className: "text-center"}, day), 
        React.createElement("p", {className: "text-center"}, month, "/", dayOfMonth), 
        React.createElement("p", {className: "text-center"}, this.props.forecastItem.low, "°    ", this.props.forecastItem.hi, "°"), 
        React.createElement("img", {src: icon, className: "img-responsive center-block", alt: ""}), 
        React.createElement("p", {className: "text-center"}, this.props.forecastItem.description)
      )
    );
  }
});


React.render(React.createElement(WeatherApp, null), document.body);
