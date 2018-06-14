import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.object,
    index: PropTypes.string,
    updateFish: PropTypes.func
  };

  handleChange = ({currentTarget: {name, value}}) => {
    // update fishes state
    // 1. Take a copy of the current fish
    if(name === 'price') value = Number(value);
    const updatedFish = {
        ...this.props.fish,
      [name]: value
    };
    this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    return (
        <div className="fish-edit">
          <input name="name" type="text" placeholder="Name"  value={this.props.fish.name} onChange={this.handleChange}/>
          <input name="price" type="text" placeholder="Price"  value={this.props.fish.price} onChange={this.handleChange}/>
          <select name="status"  value={this.props.fish.status} onChange={this.handleChange}>
            <option value="available">Fresh!</option>
            <option value="unavailable">Sold Out!</option>
          </select>
          <textarea name="desc" placeholder="Desc" value={this.props.fish.desc} onChange={this.handleChange}/>
          <input name="image" type="text" placeholder="Image"  value={this.props.fish.image} onChange={this.handleChange}/>
          <button onClick={() => this.props.deleteFish(this.props.index)}>Remove fish</button>
        </div>
    );
  }
}

export default EditFishForm;
