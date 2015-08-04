"use strict";

var React = require("react");
var DailyEntryActionCreators = require("../actions/DailyEntryActionCreators");
var moment = require("moment");

var ReactPropTypes = React.PropTypes;

var Header = React.createClass({

  propTypes: {
    isLoading: ReactPropTypes.bool.isRequired,
    onSave: ReactPropTypes.func.isRequired,
    params: ReactPropTypes.object.isRequired,
    energy: ReactPropTypes.string.isRequired
  },

  render: function() {
    var loading = <span />;

    if(this.props.isLoading) {
      loading = <span><img src="/images/loading-cylon.svg" /></span>;
    }

    return (
      <div className="panel panel-default">
        <div className="panel-body">

          <div className="btn-toolbar">
            <div className="btn-group">
            <button className="btn btn-info">
              <span className="glyphicon glyphicon-chevron-left"></span>
            </button>
            <button className="btn btn-info">
              <span className="glyphicon glyphicon-chevron-right"></span>
            </button>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.onClickSave}>
              {loading}
              <span>Save</span>
            </button>
            <button type="button" className="btn btn-danger">
              <span className="glyphicon glyphicon-remove"></span>
            </button>
            {this.props.energy}
          </div>
        </div>
      </div>
    );
  },

  onClickSave: function() {
    this.props.onSave();
  }

});

module.exports = Header;
