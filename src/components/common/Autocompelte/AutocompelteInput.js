import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { targetIsDescendant, KeyCodes } from '../../../common/dom';

import AutocompelteSuggestions from './AutocompelteSuggestions';
import { containsFilter } from './filterOptions';

import './AutocompelteInput.styl';

export default class AutocompelteInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    filterFn: PropTypes.func,
  }

  static defaultProps = {
    value: '',
    options: [],
    className: null,
    filterFn: containsFilter,
  }

  constructor(props) {
    super(props);

    this.inputRef = createRef();
    this.containerRef = createRef();

    this.state = {
      focus: false,
      value: props.value,
      filtered: props.filterFn(props.options, props.value),
    };
  }

  static getDerivedStateFromProps({ value, options, filterFn }, prevState) {
    if (value !== prevState.value) {
      return {
        value,
        filtered: filterFn(options, value),
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.focus && this.state.focus) {
      document.addEventListener('click', this.handleDocumentClick);
    }
    if (prevState.focus && !this.state.focus) {
      document.removeEventListener('click', this.handleDocumentClick);
    }
  }

  componentWillUnmount() {
    if (this.state.focus) {
      document.removeEventListener('click', this.handleDocumentClick);
    }
  }

  handleDocumentClick = (event) => {
    if (this.state.focus && !targetIsDescendant(event, this.containerRef.current)) {
      this.blur();
    }
  };

  handleKeyDown = (evt) => {
    switch (evt.keyCode) {
      case KeyCodes.ESC:
      case KeyCodes.TAB:
        this.blur();
        break;
      case KeyCodes.ENTER: {
        if (this.state.filtered.length) {
          this.handleSelect(this.state.filtered[0]);
        }
        break;
      }
      default:
        break;
    }
  }

  handleChange = (evt) => {
    this.props.onChange(evt);
  }

  handleFocus = () => {
    this.setState({ focus: true });
  }

  blur = () => {
    if (this.state.focus) {
      this.inputRef.current.blur();
      this.setState({ focus: false });
    }
  }

  focus = () => {
    this.inputRef.current.focus();
  }

  handleSelect = (value) => {
    this.props.onSelect(value);
    this.blur();
  }

  render() {
    const {
      value, className, options, onSelect, onChange, filterFn, ...rest
    } = this.props;
    const { focus, filtered } = this.state;
    return (
      <div className={cn('gem-autocomplete', className)} ref={this.containerRef}>
        <input
          type="text"
          className="gem-autocomplete-input"
          value={value}
          ref={this.inputRef}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          {...rest}
        />
        {focus &&
          <AutocompelteSuggestions options={filtered} onSelect={this.handleSelect} />
        }
      </div>
    );
  }
}
