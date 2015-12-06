"use strict";

var React = require("react");
var ReactPropTypes = React.PropTypes;
var Modal = require("simple-react-modal");

var FoodMenu = React.createClass({
  getInitialState: function() {
    return {
      show: false
    };
  },

  render: function() {
    var iosHack = { "cursor": "pointer" };

    return (
      <div className="btn-group">
        <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="glyphicon glyphicon-menu-hamburger" />
        </button>
        <Modal.default show={this.state.show} containerStyle={{ width: "600px" }} closeOnOuterClick={true} onClose={this.closeAttributes}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Modal title</h4>
            </div>
            <div className="modal-body">
              <p>One fine body&hellip;</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </Modal.default>
        <ul className="dropdown-menu">
          <li>
            <a className="glyphicon glyphicon-fire" style={iosHack} onClick={this.convertClicked} />
          </li>
          <li>
            <a className="glyphicon glyphicon-list-alt" style={iosHack} onClick={this.attributesClicked} />
          </li>
          <li role="separator" className="divider"></li>
          <li >
            <a className="glyphicon glyphicon-remove" style={iosHack} onClick={this.removeClicked} />
          </li>
        </ul>
      </div>
    );
  },

  closeAttributes: function() {
    this.setState({show: false});
  },

  attributesClicked: function() {
    this.setState({show: true});
  },

  foodTypeAheadOptionSelected: function(food) {
    this.processChange(function(a) {
      a.unitEnergy = food.unitEnergy;
      a.description = food.description;
    });
  },

  convertClicked: function() {
    var energy = this.refs.unitEnergy.props.value;

    this.processChange(function(a) {
      a.unitEnergy = energy * 4.184;
    });
  }
});

module.exports = FoodMenu;
