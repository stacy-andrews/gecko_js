var React = require("react");

var ReactPropTypes = React.PropTypes;

var Measurements = React.createClass({

  propTypes: {
    value: ReactPropTypes.object.isRequired,
    onChange: ReactPropTypes.func.isRequired
  },

  render: function() {
    var measurements = this.props.value;

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="form-group">
            <label>Chest</label>
            <input className="form-control" type="text" placeholder="chest" ref="chest" value={measurements.chest} onChange={this.chestChanged} />
          </div>
          <div className="form-group">
            <label>Stomach</label>
            <input className="form-control" type="text" placeholder="stomach" ref="stomach" value={measurements.stomach} onChange={this.stomachChanged} />
          </div>
          <div className="form-group">
            <label>Thigh</label>
            <input className="form-control" type="text" placeholder="thigh" ref="thigh" value={measurements.thigh} onChange={this.thighChanged} />
          </div>
        </div>
      </div>
    );
  },

  chestChanged: function(event) {
    this.processChange(function(a) {
      a.chest = event.target.value;
    });
  },

  stomachChanged: function(event) {
    this.processChange(function(a) {
      a.stomach = event.target.value;
    });
  },

  thighChanged: function(event) {
    this.processChange(function(a) {
      a.thigh = event.target.value;
    });
  },

  getValue: function(refName) {
    return this.refs[refName].value;
  },

  getChangeValue: function(override) {
    var value = {
      thigh: this.getValue("thigh"),
      chest: this.getValue("chest"),
      stomach: this.getValue("stomach")
    };

    override(value);

    return value;
  },

  processChange: function(override) {
    var value = this.getChangeValue(override);

    this.props.onChange(value);
  }

});

module.exports = Measurements;
