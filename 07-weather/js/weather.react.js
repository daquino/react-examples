var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var WeatherApp = React.createClass({
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
        q: location+', TN',
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
        <div className="container text-center">
          <h1 className="text-center">ReactJS Forecast Example</h1>
          <div id="locationForm" className="row">
            <LocationForm {...locationFormProps} />
          </div>
          <Forecast forecastItems={this.state.forecast} selectedIndex={this.state.selectedIndex} updateSelectedIndex={this.updateSelectedIndex}/>
        </div>
    );
  }
});


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


React.render(<WeatherApp />, document.body);
