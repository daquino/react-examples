var LocationForm = React.createClass({displayName: "LocationForm",
  retrieveForecast: function(e) {
    e.preventDefault();
    var location = React.findDOMNode(this.refs.location).value;
    if(location.length > 3) {
      this.props.retrieveForecast(React.findDOMNode(this.refs.location).value);
    }
  },
  buildLocationGroupClass: function() {
    var locationGroupClass = "form-group";
    if(this.props.forecastAttempted) {
      if(this.props.forecastFound) {
        locationGroupClass += " has-feedback has-success";
      }
      else {
        locationGroupClass += " has-feedback has-error";
      }
    }
    else if(this.props.forecastLoading) {
      locationGroupClass += " has-feedback";
    }
    return locationGroupClass;
  },
  buildLocationFeedback: function() {
    var locationFeedback;
    if(this.props.forecastAttempted) {
      if(this.props.forecastFound) {
        locationFeedback = React.createElement("span", {className: "glyphicon glyphicon-ok form-control-feedback", "aria-hidden": "true"})
      }
      else {
        locationFeedback = React.createElement("span", {className: "glyphicon glyphicon-remove form-control-feedback", "aria-hidden": "true"})
      }
    }
    else if(this.props.forecastLoading) {
      locationFeedback = React.createElement("span", {className: "glyphicon glyphicon-refresh glyphicon-rotate form-control-feedback", "aria-hidden": "true"})
    }
    return locationFeedback;
  },
  render: function() {
    var locationGroupClass = this.buildLocationGroupClass();
    var locationFeedback = this.buildLocationFeedback();
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
