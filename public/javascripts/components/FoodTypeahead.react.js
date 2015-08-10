"use strict";

var React = require("react");
var ReactPropTypes = React.PropTypes;

var SearchBox = React.createClass({
  propTypes: {
    value: ReactPropTypes.string.isRequired,
    onChange: ReactPropTypes.func.isRequired,
    onOptionSelected: ReactPropTypes.func.isRequired
  },

  componentDidMount: function(){
    var foodCatalogue = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      //prefetch: "../data/films/post_1960.json",
      remote: {
        url: "api/foods?q=%QUERY",
        wildcard: "%QUERY"
      }
    });

    var element = this.getDOMNode();
    $(element).typeahead({
      minLength: 1,
      highlight: true,
      classNames: {
        menu: "dropdown-menu"
      }
    },
    {
      name: "foods",
      display: "description",
      source: foodCatalogue
    });
    var that = this;

    $(element).on("typeahead:selected", function(jquery, option){
      that.props.onOptionSelected(option);
    });
  },

  componentWillUnmount: function(){
    var element = this.getDOMNode();
    $(element).typeahead("destroy");
  },

  render: function(){
    return (
      <input type="search" value={this.props.value} name="search" ref="input" className="form-control" onChange={this.props.onChange} placeholder="Food" />
    );
  }
});

module.exports = SearchBox;
