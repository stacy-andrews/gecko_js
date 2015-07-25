"use strict";

var React = require("react");
var DailyEntryActionCreators = require("../actions/DailyEntryActionCreators");

var ReactPropTypes = React.PropTypes;

var Header = React.createClass({

  propTypes: {
    isLoading: ReactPropTypes.object.isRequired,
    onSave: ReactPropTypes.func.isRequired
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
