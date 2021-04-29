import React, { Component } from "react";

export default class ButtonLoader extends Component {
  state = {
    loading: false
  };

  fetchData = () => {
    this.props.handleLogin()
    this.setState({ loading: true });

    //Faking API call here
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  render() {
    const { loading } = this.state;

    return (
      <div>
        <button className="button" onClick={this.fetchData} disabled={loading}>
          {loading && 
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            ></i>
          }
          {loading && <span>{this.props.text}</span>}
          {!loading && <span>{this.props.text1}</span>}
        </button>
      </div>
    );
  }
}
