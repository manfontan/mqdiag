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
          <Diagnostic diags={[{"id":"1","name":"diagnostic 1","text":"fix this and that"},{"id":"2","name":"diagnostic 2","text":"fix some other things"},{"id":"3","name":"Mockup warning","text":"And so on... This is a terrible mockup XD"}]} />
        </div>
      </div>
    );
  }
}

export default App;
