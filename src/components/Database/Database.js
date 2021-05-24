import "./Database.css";

import React, { Component } from 'react';

class Database extends Component {

    render() {
        return (
            <>
            <div className="container" id="dataset">
                <div key={this.props.image.name + this.props.image.target} id="imageDiv">
                    <img className="image" src={this.props.image.image} alt="an error has occured"></img>
                    {/* <p>Name: {this.props.image.name}</p>
                    <p>Tag: {this.props.image.target}</p> */}
                </div>
            </div>
            </>
        );
    }
}

export default Database;