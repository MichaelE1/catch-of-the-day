import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";

class Inventory extends React.Component {
  // In future should set up a form rather than hard coding these values! :')
  state = {
    email: "REMOVED",
    password: "REMOVED",
    authenticated: false
  };

  static propTypes = {
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    fishes: PropTypes.object
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ authenticated: true });
      }
    });
  }

  authenticate = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ authenticated: true });
      })
      .catch(() => {
        console.log("Username or password error!");
      });
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ authenticated: false });
  };

  render() {
    if (!this.state.authenticated) {
      return <Login authenticate={this.authenticate} />;
    }

    return (
      <div className="inventory">
        <h2>Inventory!!!</h2>
        <button onClick={this.logout}>Log Out</button>
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            fish={this.props.fishes[key]}
            key={key}
            index={key}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
