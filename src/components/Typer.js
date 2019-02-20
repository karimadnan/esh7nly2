import React, { Component } from 'react';
import '../Mycss.css';
import Typed from 'typed.js';

class TypedJs extends React.Component {
    componentDidMount() {
        // If you want to pass more options as props, simply add
      // your desired props to this destructuring assignment.
      const { strings } = this.props;
      // You can pass other options here, such as typing speed, back speed, etc.
      const options = {
          strings: strings,
        typeSpeed: 100,
        backSpeed: 20,
        loop: true,
        loopCount: "Infinity"
      };
      // this.el refers to the <span> in the render() method
      this.typed = new Typed(this.el, options);
    }
  
    componentWillUnmount() {
        // Make sure to destroy Typed instance on unmounting
      // to prevent memory leaks
      this.typed.destroy();
    }
  
    render() {
      return (
        <div class="badge-Home">
            <h1 style={{fontSize: 40, textAlign: "left"}}>&nbsp; <strong style={{fontSize: 40}}>{this.props.start}</strong> <span
              style={{fontSize: 40}}
              ref={(el) => { this.el = el; }}
            />
            </h1>
        </div>
      );
    }
  }
  export default TypedJs;