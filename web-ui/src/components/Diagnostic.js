import React from 'react';

export default class Diagnostic extends React.Component{
  render(){
    return <p><span>{this.props.children}</span></p>;
  }
}
