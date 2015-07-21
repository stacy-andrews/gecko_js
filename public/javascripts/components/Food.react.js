"use strict";

var React = require("react");
var ReactPropTypes = React.PropTypes;

var Food = React.createClass({

  propTypes: {
    onRemove: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="row">
        <div className="form-group col-sm-2">
          <input className="form-control" type="time" />
        </div>
        <div className="form-group col-sm-2">
          <input className="form-control" type="text" placeholder="food" />
        </div>
        <div className="form-group col-sm-2">
          <div className="form-group has-feedback">
            <input className="form-control" type="text" placeholder="energy" />
            <span className="glyphicon glyphicon-fire form-control-feedback"></span>
          </div>
        </div>
        <div className="form-group col-sm-2">
          <input className="form-control" type="text" placeholder="quantity" />
        </div>
        <div className="form-group col-sm-1">
          0
        </div>
        <div className="form-group col-sm-1">
          <button type="button" className="btn btn-danger form-control" onClick={this.removeClicked}><span className="glyphicon glyphicon-remove"></span></button>
        </div>
        <div className="form-group col-sm-1">
          <button type="button" className="btn btn-info form-control"><span className="glyphicon glyphicon-list-alt"></span></button>
        </div>
      </div>
    );
  },

  removeClicked: function() {
    this.props.onRemove(this.props.value);
  }
});

module.exports = Food;