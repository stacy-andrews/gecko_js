"use strict";

var React = require("react");
var DailyEntryActionCreators = require("../actions/DailyEntryActionCreators");

var ReactPropTypes = React.PropTypes;

var Header = React.createClass({

  propTypes: {
    isLoading: ReactPropTypes.object.isRequired
  },

  componentDidMount: function() {
    DailyEntryActionCreators.load();
  },

  render: function() {
    var loading = <span />;

    if(this.props.isLoading) {
      loading = <span><img src="/images/loading-cylon.svg" /></span>;
    }

    return (
      <div>
        <div style={{float: "left"}}>
          <a className="btn btn-info">
            <span className="glyphicon glyphicon-chevron-left"></span>
          </a>
          <a className="btn btn-info">
            <span className="glyphicon glyphicon-chevron-right"></span>
          </a>
        </div>
        <button type="button" className="btn btn-primary" onClick={this.onClickSave}>
          {loading}
          <span>Save</span>
        </button>
        <button type="button" className="btn btn-danger" style={{float: "right"}}>
          <span className="glyphicon glyphicon-remove"></span>
        </button>
      </div>
    );
  },

  onClickSave: function() {
    DailyEntryActionCreators.save();
  }

});

module.exports = Header;
