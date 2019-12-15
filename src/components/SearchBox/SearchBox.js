import React from "react";
import PropTypes from "prop-types";
import { styles } from "./SearchBoxStyle";

/**
 * A generic SearchBox Component with basic UI Functionality
 */
class SearchBox extends React.PureComponent {
  /**
   * Constructor of SearchBox Component
   */
  constructor(props) {
    super(props);
    this.state = { inputValue: "", hasError: false };
  }
  handleTextInputChange = event => {
    console.log("handleTextInputChange");
    var letters = /^[0-9a-zA-Z]+$/;
    let newState = {
      inputValue: event.target.value,
      hasError: false,
      errorMessage: ""
    };
    if (event.target.value && !event.target.value.match(letters)) {
      newState.hasError = true;
      newState.errorMessage =
        (this.props.onError && this.props.onError()) ||
        "Please enter AlphaNumeric values";
    }
    this.setState({ ...newState });
  };
  /**
   * render : Lifecycle method of react,
   *
   */
  render() {
    const {
      hasError: propsHasError,
      onSearchClick,
      error: propsErrorMessage
    } = this.props;
    const hasError = propsHasError || this.state.hasError;
    const errorMessage = propsErrorMessage || this.state.errorMessage;
    const style = styles({ hasError });

    return (
      <div>
        <div style={style.root}>
          <input
            type={"text"}
            style={style.input}
            value={this.state.inputValue}
            onChange={this.handleTextInputChange}
          ></input>
          <button
            style={style.button}
            onClick={event =>
              onSearchClick(this.state.inputValue, this.state.hasError, event)
            }
          >
            Search
          </button>
        </div>
        {hasError && <span style={style.errorMessage}>{errorMessage}</span>}
      </div>
    );
  }
}

SearchBox.defaultProps = { hasError: false, error: "" };
SearchBox.propTypes = {
  error: PropTypes.string,
  hasError: PropTypes.bool,
  onSearchClick: PropTypes.func,
  onError: PropTypes.func
};

export default SearchBox;
