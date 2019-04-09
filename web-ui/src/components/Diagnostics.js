import React from 'react';
import Diagnostic from './Diagnostic.js.js.js';
import diagnosticsStore from '../flux/stores/diagnostics';

export default class Diagnostics extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      diagnostics:diagnosticsStore.getDiagnostics()
    }
  }
  componentDidMount(){
    diagnosticsStore.on('change',()=> {
      this.setState({diagnostics:diagnosticsStore.getDiagnostics()});
    });
  }
  render(){
    const {diagnostics} = this.state,
          chl = [];
    for(const {_id,label} of diagnostics){
      chl.push(<Diagnostic key={_id}>{label}</Diagnostic>);
    }
    return <div>{chl}</div>;
  }
}
