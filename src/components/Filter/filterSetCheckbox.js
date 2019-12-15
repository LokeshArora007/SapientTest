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

  getInitialState() {
    return {
      filters: this.initFilters(this.props.defaultAllSelected)
    };
  }

  componentDidMount() {
    this.setState({
      filters: this.initFilters(false)
    });
    Dispatcher.register(this.props.eventName + ":reset", this.handleReset);
  }

  componentWillUnmount() {
    Dispatcher.unregister(this.props.eventName + ":reset", this.handleReset);
  }

  handleReset() {
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

  handleSelectAll(value) {
    var filters = this.initFilters(value);

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
    var selectedItems = 0;

    console.log(this.state.filters);
    this.state.filters.map((item, index) => {
      if (item.isChecked) {
        selectedItems++;
      }

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

    // var currentState = "some";
    // // if (selectedItems <= 0) {
    // //   currentState = "none";
    // // } else
    // if (selectedItems >= this.props.filters.length) {
    //   currentState = "all";
    // }

    // var label1ClassName = currentState === "all" ? "active" : "";
    // var label1 = (
    //   <span
    //     className={"button " + label1ClassName}
    //     onClick={this.handleSelectAll.bind(this, true)}
    //   >
    //     {this.props.label1}
    //   </span>
    // );
    // var label2ClassName = currentState === "none" ? "active" : "";
    // var label2 = (
    //   <span
    //     className={"button " + label2ClassName}
    //     onClick={this.handleSelectAll.bind(this, false)}
    //   >
    //     {this.props.label2}
    //   </span>
    // );

    return (
      <ul className="filterset">
        {/* <li>
          <label className="select-all">
            <span className="state">{currentState}</span>
            {label1} {label2}
          </label>
        </li> */}
        {items}
      </ul>
    );
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
