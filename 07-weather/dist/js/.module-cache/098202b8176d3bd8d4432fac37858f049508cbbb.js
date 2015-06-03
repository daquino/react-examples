var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var WeatherApp = React.createClass({displayName: "WeatherApp",
  retrieveForecast: function(location) {
    console.log('Looking up forecast for ' + location);
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
      data: {
        q: location+', TN',
        units: 'imperial',
        cnt: 7
      },
      success: function (resp) {
        console.log(resp);
        var forecast = resp.list.map(function(item, index) {
          var timestamp = new Date(item.dt*1000);
          return {
            date: timestamp,
            hi: item.temp.max,
            low: item.temp.min,
            icon: item.weather[0].icon,
            description: item.weather[0].main
          };
        });
        console.log(forecast);
        this.setState({forecast: forecast});
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      forecast: []
    };
  },
  render: function() {
    var pushTopStyle = {
      marginTop: "40px"
    };
    return (
        React.createElement("div", {className: "container text-center"}, 
          React.createElement("h1", {className: "text-center", style: pushTopStyle}, "7-Day Forecast Example"), 
          React.createElement("div", {className: "row", style: pushTopStyle}, 
            React.createElement(LocationForm, {retrieveForecast: this.retrieveForecast})
          ), 
          React.createElement(Forecast, {pushTopStyle: pushTopStyle, forecastItems: this.state.forecast})
        )
    );
  }
});


var LocationForm = React.createClass({displayName: "LocationForm",
  retrieveForecast: function(e) {
    e.preventDefault();
    this.props.retrieveForecast(React.findDOMNode(this.refs.location).value);
  },
  render: function() {
    return (
      React.createElement("div", {className: "col-md-8 col-md-offset-2"}, 
      React.createElement("form", {className: "form-inline"}, 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("div", {className: "input-group"}, 
            React.createElement("label", {className: "sr-only", htmlFor: "location"}, "Location"), 
            React.createElement("input", {ref: "location", type: "text", id: "location", className: "form-control", placeholder: "Nashville"}), 
            React.createElement("div", {className: "input-group-addon"}, "TN")
          )
        ), 
        " ", 
        React.createElement("button", {className: "btn btn-default", onClick: this.retrieveForecast}, "Retrieve Forecast")
      )
      )
    );
  }
});


var Forecast = React.createClass({displayName: "Forecast",
  getInitialState: function() {
    return {
      selectedIndex: -1
    };
  },
  updateSelectedIndex: function(index) {
    if(this.state.selectedIndex != index) {
      this.setState({selectedIndex: index});
    }
    else {
      this.setState({selectedIndex: -1});
    }
  },
  render: function() {
    var forecastItems = this.props.forecastItems.map(function(forecastItem, index) {
      var selected = this.state.selectedIndex == index;
      return React.createElement(ForecastItem, {key: index, index: index, forecastItem: forecastItem, selected: selected, updateSelectedIndex: this.updateSelectedIndex})
    }.bind(this));
    return (
      React.createElement("div", {className: "row row-centered", style: this.props.pushTopStyle}, 
        forecastItems
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
    var style = this.props.selected ? {
      background: "#FDE152",
      borderRadius: "10px"
    } : null;
    return (
      React.createElement("div", {className: "col-md-1 col-centered", style: style, onClick: this.handleClick}, 
        React.createElement("p", {className: "text-center"}, day), 
        React.createElement("p", {className: "text-center"}, month, "/", dayOfMonth), 
        React.createElement("img", {src: icon, className: "img-responsive center-block", alt: ""}), 
        React.createElement("p", {className: "text-center"}, this.props.forecastItem.description), 
        React.createElement("p", {className: "text-center"}, this.props.forecastItem.low, "/", this.props.forecastItem.hi)
      )
    );
  }
});


React.render(React.createElement(WeatherApp, null), document.body);
