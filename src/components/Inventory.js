import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import base, {firebaseApp} from '../base';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';


class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    storeId: PropTypes.string
  };

  state = {
    uid: null,
    owner: null
  };

  authHandler = async authData => {
    console.log(authData);
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. Claim it if there is no owner
    if(!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    console.log('logging out');
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.authHandler({ user });
      }
    })
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;

    // 1. Check if they are logged in
    if(!this.state.uid) {
      return <Login authenticate={this.authenticate}/>;
    }

    // 2. Check if they are the owner of the store
    if(this.state.uid !== this.state.owner) {
      return <div>
        <p>Sorry, you're not the owner!</p>
        {logout}
      </div>
    }

    // 3. They must be the owner, just render the inventory

    return (
        <div className="Inventory">
          <h2>
            Inventory
          </h2>
          {logout}
          {Object.keys(this.props.fishes).map(key => (
              <EditFishForm
                  fish={this.props.fishes[key]}
                  key={key}
                  index={key}
                  updateFish={this.props.updateFish}
                  deleteFish={this.props.deleteFish}
              />
          ))}
          <AddFishForm addFish={this.props.addFish}/>
          <button onClick={this.props.loadSampleFishes}>Load sample fishes
          </button>
        </div>
    );
  }
}

export default Inventory;
