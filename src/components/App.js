import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object
  };

  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const {params} = this.props.match;

    // load order from localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({order: JSON.parse(localStorageRef)});
    }

    // sync fishes state to firebase
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
        this.props.match.params.storeId,
        JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes});
  };

  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = {...this.state.fishes};
    // 2. Add out new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the existing state
    const fishes = {...this.state.fishes};
    // 2. Update existing fish
    fishes[key] = updatedFish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. Take a copy of the existing state
    const fishes = {...this.state.fishes};
    // 2. Remove the fish (null is needed for re-base)
    fishes[key] = null;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

  addToOrder = key => {
    // 1. Take a copy of state
    const order = {...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our current state
    this.setState({ order });
  };

  removeFromOrder = key => {
    // 1. Take a copy of state
    const order = {...this.state.order };
    // 2. Remove an item from order
    delete order[key];
    // 3. Call setState to update our current state
    this.setState({ order });
  };

  render() {
    return (
        <div className="catch-of-the-day">
          <div className="menu">
            <Header tagline="Fresh seafood market" />
            <ul className="menu-fish">
              {
                Object.keys(this.state.fishes).map(key => (
                    <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
                ))
              }
            </ul>
          </div>
          <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
          <Inventory
              addFish={this.addFish}
              loadSampleFishes={this.loadSampleFishes}
              fishes={this.state.fishes}
              updateFish={this.updateFish}
              deleteFish={this.deleteFish}
              storeId={this.props.match.params.storeId}
          />
        </div>
    )
  }
}

export default App;
