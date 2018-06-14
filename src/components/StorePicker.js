import React from 'react';
import {getFunName} from '../helpers';
import PropTypes from 'prop-types';

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object
  };
  myInput = React.createRef();
  goToStore = (event) => {
    // 1. Stop the form from submitting.
    event.preventDefault();
    // 2. Get the text from that input.
    const storeName = this.myInput.value.value;
    // 3. Change the page to /store/whatever-they-inputed
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please enter a store</h2>
          <input
              ref={this.myInput}
              type="text"
              required
              placeholder="Store Name"
              defaultValue={getFunName()}/>
          <button type="submit">Visit store →</button>
        </form>
    );
  }
}

export default StorePicker;
