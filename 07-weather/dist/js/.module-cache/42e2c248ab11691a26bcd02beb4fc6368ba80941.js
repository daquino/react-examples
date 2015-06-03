var WeatherApp = React.createClass({displayName: "WeatherApp",
  retrieveForecast: function(location) {
    console.log('Looking up forecast for ' + location);
    this.setState(
      {
        isLoadingForecast: true,
        location: location
      }
    );
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/forecast/daily',
      data: {
        q: location+', TN',
        units: 'imperial',
        cnt: 7
      },
      success: function (resp) {
        console.log(resp);
        this.setState({isLoadingForecast: false});
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      isLoadingForecast: false
    };
  },
  render: function() {
    var formStyle = {
      marginTop: "20px"
    };
    return (
        React.createElement("div", {className: "container"}, 
          React.createElement("div", {className: "row", style: formStyle}, 
            React.createElement(LocationForm, {retrieveForecast: this.retrieveForecast})
          ), 
          React.createElement("br", null), 
          React.createElement("div", {className: "row"}, 
            React.createElement(Forecast, null)
          )
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
        React.createElement("button", {className: "btn btn-default", onClick: this.retrieveForecast}, "Retrieve Forecast")
      )
      )

    );
  }

});

var Forecast = React.createClass({displayName: "Forecast",
  render: function() {
    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("h1", null, "Forecast!")
      )
    );
  }

});

React.render(React.createElement(WeatherApp, null), document.getElementById('content'));
