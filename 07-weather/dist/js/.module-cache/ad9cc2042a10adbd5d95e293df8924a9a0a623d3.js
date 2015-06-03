var WeatherApp = React.createClass({displayName: "WeatherApp",
  retrieveForecast: function(location) {
    console.log('Looking up forecast for ' + location);
  },
  render: function() {
    return (
        React.createElement("div", null, 
          React.createElement(LocationForm, {retrieveForecast: this.retrieveForecast}), 
          React.createElement(Forecast, null)
        )
    );
  }

});

var LocationForm = React.createClass({displayName: "LocationForm",
  retrieveForecast: function() {
    this.props.retrieveForecast(React.findDOMNode(this.refs.location).value);
  },
  render: function() {
    return (
      React.createElement("form", {className: "form-inline"}, 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", {htmlFor: "location"}, "Location"), 
          React.createElement("input", {ref: "location", type: "text", id: "location", className: "form-control", placeholder: "Nashville, TN"})
        ), 
        React.createElement("button", {className: "btn btn-default", onClick: this.retrieveForecast}, "Retrieve Forecast")
      )

    );
  }

});

React.render(React.createElement(WeatherApp, null), document.body, callback);
