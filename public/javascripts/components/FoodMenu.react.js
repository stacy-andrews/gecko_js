"use strict";

var React = require("react");
var ReactPropTypes = React.PropTypes;

var FoodMenu = React.createClass({
  propTypes: {
    onAttributesSelected: ReactPropTypes.func.isRequired,
    onRemove: ReactPropTypes.func.isRequired
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
            <a className="glyphicon glyphicon-fire" style={iosHack} onClick={this.convertClicked} />
          </li>
          <li>
            <a className="glyphicon glyphicon-list-alt" style={iosHack} onClick={this.props.onAttributesSelected} />
          </li>
          <li role="separator" className="divider"></li>
          <li >
            <a className="glyphicon glyphicon-remove" style={iosHack} onClick={this.props.onRemove} />
          </li>
        </ul>
      </div>
    );
  },

  attributesClicked: function() {
    this.setState({show: true});
  },

  convertClicked: function() {
    var energy = this.refs.unitEnergy.props.value;

    this.processChange(function(a) {
      a.unitEnergy = energy * 4.184;
    });
  }
});

module.exports = FoodMenu;
