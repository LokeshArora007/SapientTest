/** @jsx React.createElement */
import React from "react";
import PropTypes from "prop-types";
import Dispatcher from "../../Dispatcher";

class FilterSetCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: []
    };
  }

  componentDidMount() {
    this.setState({
      filters: this.initFilters(false)
    });
  }

  initFilters(value) {
    console.log(this.props.filters);
    return this.props.filters.map(function(item) {
      var newItem = {};
      newItem.isChecked = value;
      newItem.label = item;
      return newItem;
    });
  }

  handleChange(index) {
    var filters = this.state.filters;
    filters[index].isChecked = !filters[index].isChecked;

    this.setState({
      filters: filters
    });

    this.dispatchChange();
  }

  dispatchChange() {
    var filters = this.state.filters.filter(item => {
      return item.isChecked;
    });
    Dispatcher.dispatch(
      this.props.eventName + ":change",
      this.props.name,
      filters
    );
  }

  render() {
    var items = [];

    this.state.filters.map((item, index) => {
      var key = this.props.name + "-" + index;
      items.push(
        <li key={key}>
          <input
            type="checkbox"
            id={key}
            checked={item.isChecked}
            onChange={this.handleChange.bind(this, index)}
          />
          <label htmlFor={key}>{item.label}</label>
        </li>
      );
    });

    return <ul className="filterset">{items}</ul>;
  }
}

FilterSetCheckbox.propTypes = {
  name: PropTypes.string,
  filters: PropTypes.array.isRequired,
  defaultAllSelected: PropTypes.bool,
  eventName: PropTypes.string,
  label1: PropTypes.string,
  label2: PropTypes.string
};

export default FilterSetCheckbox;
