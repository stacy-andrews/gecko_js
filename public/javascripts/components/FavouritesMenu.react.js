"use strict";

var React = require("react");

var ReactPropTypes = React.PropTypes;
var DailyEntryActionCreators = require("../actions/DailyEntryActionCreators");

var Header = React.createClass({

  propTypes: {
    onClick: ReactPropTypes.func.isRequired
  },

  render: function() {
    var iosHack = { "cursor": "pointer" };

    return (
      <div className="btn-group">
        <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="glyphicon glyphicon-menu-hamburger" />
        </button>
        <ul className="dropdown-menu">
          <li>
            <a onClick={this.breakfastClicked} style={iosHack}>Breakfast</a>
          </li>
          <li>
            <a onClick={this.lunchClicked} style={iosHack}>Lunch</a>
          </li>
          <li>
            <a onClick={this.dinnerClicked} style={iosHack}>Dinner</a>
          </li>
        </ul>
      </div>
    );
  },

  breakfastClicked: function() {
    DailyEntryActionCreators.favourites("breakfast");
  },

  lunchClicked: function() {
    DailyEntryActionCreators.favourites("lunch");
  },

  dinnerClicked: function() {
    DailyEntryActionCreators.favourites("dinner");
  }

});

module.exports = Header;
