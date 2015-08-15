"use strict";

var React = require("react");

var ReactPropTypes = React.PropTypes;
var navigator = require("../libs/navigator");

var Header = React.createClass({

  propTypes: {
    isLoading: ReactPropTypes.bool.isRequired,
    onSave: ReactPropTypes.func.isRequired,
    params: ReactPropTypes.object.isRequired,
    energy: ReactPropTypes.number.isRequired
  },

  render: function() {
    var loading = <span />;
    var nav = navigator(this.props.params);

    if(this.props.isLoading) {
      loading = <span><img src="/images/loading-cylon.svg" /></span>;
    }

    return (
      <div className="panel panel-default">
        <div className="panel-body">

          <div className="btn-toolbar pull-left">
            <div className="btn-group">
            <a className="btn btn-info" href={nav.previousUrl()}>
              <span className="glyphicon glyphicon-chevron-left"></span>
            </a>
            <a className="btn btn-info" href={nav.nextUrl()}>
              <span className="glyphicon glyphicon-chevron-right"></span>
            </a>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.onClickSave}>
              {loading}
              <span>Save</span>
            </button>
          </div>
          <div className="pull-right">
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
