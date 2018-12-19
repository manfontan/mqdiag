import React, { Component } from 'react';
import DropArea from './components/DropArea';
import Diagnostics from './components/Diagnostics';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="mquery-diag-app">
        <DropArea />
        <Diagnostics />
      </div>
    );
  }
}

export default App;
