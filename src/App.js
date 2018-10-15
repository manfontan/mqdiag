import React, { Component } from 'react';
import DropArea from './DropArea';
import Diagnostic from './Diagnostic';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="mquery-diag-app">
        <DropArea />
        <div className="diag-list">
          <Diagnostic diags={["Diagnostic 1","Recommendation 1","Diagnostic 2","Recommendation 2","And so on... This is a terrible mockup XD"]} />
        </div>
      </div>
    );
  }
}

export default App;
