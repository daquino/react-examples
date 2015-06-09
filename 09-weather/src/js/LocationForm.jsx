var LocationForm = React.createClass({
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
        locationFeedback = <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
      }
      else {
        locationFeedback = <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
      }
    }
    else if(this.props.forecastLoading) {
      locationFeedback = <span className="glyphicon glyphicon-refresh glyphicon-rotate form-control-feedback" aria-hidden="true"></span>
    }
    return locationFeedback;
  },
  render: function() {
    var locationGroupClass = this.buildLocationGroupClass();
    var locationFeedback = this.buildLocationFeedback();
    return (
      <div className="col-lg-8 col-md-offset-2">
      <form className="form-inline" onSubmit={this.retrieveForecast}>
        <div className={locationGroupClass}>
          <label className="sr-only" htmlFor="location">Location</label>
          <div className="input-group">
            <input autoComplete="off" ref="location" type="text" id="location" className="form-control" placeholder="Nashville"/>
            {locationFeedback}
          </div>
        </div>
        <button type="submit" className="btn btn-info forecast-button">Get Forecast</button>
      </form>
      </div>
    );
  }
});
