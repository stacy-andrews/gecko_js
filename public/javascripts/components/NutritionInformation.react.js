"use strict";

var React = require("react");
var ReactPropTypes = React.PropTypes;
var Modal = require("simple-react-modal");

var FoodMenu = React.createClass({
  propTypes: {
    value: ReactPropTypes.object.isRequired,
    onChange: ReactPropTypes.func.isRequired,
    show: ReactPropTypes.bool.isRequired,
    onClose: ReactPropTypes.func.isRequired
  },

  render: function() {
    var nutritionInfo = this.props.value;

    return (
      <Modal.default show={this.props.show} containerStyle={{ width: "600px" }} closeOnOuterClick={true} onClose={this.closeAttributes}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">Nutrition Information</h4>
          </div>
          <div className="modal-body">
            <div className="form-horizontal">
              <div className="form-group">
                <label className="control-label col-sm-2">Carbohydrate</label>
                <div className="col-sm-10">
                  <input className="form-control" type="text" placeholder="carbohydrate" ref="carbohydrate" value={nutritionInfo.carbohydrate} onChange={this.carbohydrateChanged} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2">Fat</label>
                <div className="col-sm-10">
                  <input className="form-control" type="text" placeholder="fat" ref="fat" value={nutritionInfo.fat} onChange={this.fatChanged} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-sm-2">Protein</label>
                <div className="col-sm-10">
                  <input className="form-control" type="text" placeholder="protein" ref="protein" value={nutritionInfo.protein} onChange={this.proteinChanged} />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={this.closeAttributes}>Ok</button>
          </div>
        </div>
      </Modal.default>
    );
  },

  fatChanged: function(event) {
    this.processChange(function(a) {
      a.fat = event.target.value;
    });
  },

  proteinChanged: function(event) {
    this.processChange(function(a) {
      a.protein = event.target.value;
    });
  },

  carbohydrateChanged: function(event) {
    this.processChange(function(a) {
      a.carbohydrate = event.target.value;
    });
  },

  closeAttributes: function() {
    this.props.onClose();
  },

  getValue: function(refName) {
    return this.refs[refName].props.value;
  },

  getChangeValue: function(override) {
    var value = {
      fat: this.getValue("fat"),
      carbohydrate: this.getValue("carbohydrate"),
      protein: this.getValue("protein")
    };

    override(value);

    return value;
  },

  processChange: function(override) {
    var value = this.getChangeValue(override);

    this.props.onChange(value);
  },
});

module.exports = FoodMenu;
