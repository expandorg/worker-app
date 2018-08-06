import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { targetIsDescendant, KeyCodes } from '../../../common/dom';

import Suggestions from './Suggestions';
import Suggestion from './Suggestion';

import { containsFilter } from './filterOptions';

import './AutocompleteInput.styl';

export default class AutocompleteInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
    allowAdd: PropTypes.bool,
    clear: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    filterFn: PropTypes.func,
  }

  static defaultProps = {
    value: '',
    clear: false,
    allowAdd: false,
    options: [],
    className: null,
    filterFn: containsFilter,
    onSelect: Function.prototype,
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
        const { value, filtered } = this.state;
        if (value) {
          if (this.props.allowAdd) {
            this.handleSelect(value);
          } else if (filtered.length) {
            this.handleSelect(filtered[0]);
          }
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

  handleClear = (evt) => {
    evt.preventDefault();
    this.handleSelect('');
  }

  render() {
    const {
      value, className, options, onSelect, onChange, filterFn, allowAdd, clear, ...rest
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
        {clear && value &&
          <button className="gem-autocomplete-clear" onClick={this.handleClear} >
            ✕
          </button>
        }
        {focus && filtered.length !== 0 &&
          <Suggestions>
            {filtered.map(suggest =>
              <Suggestion key={suggest} value={suggest} onSelect={this.handleSelect} />,
            )}
          </Suggestions>
        }
      </div>
    );
  }
}
