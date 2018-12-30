import EventEmitter from 'events';
import d from '../dispatcher';
import * as ACT from '../types';

class DiagnosticsStore extends EventEmitter{
  constructor(){
    super();
    this.diagnostics = [];
    this.action = this.action.bind(this);
  }

  getDiagnostics(){
    return this.diagnostics.slice(0);
  }

  addDiagnostic(diagnostic){
    const diagnostics = this.diagnostics.slice(0);

    diagnostics.push(diagnostic);

    this.diagnostics = diagnostics;
    this.emit('change');
  }
  deleteDiagnostics(){
    this.diagnostics=[];
    this.emit('change');
  }

  action({type,payload}){
    switch(type){
      case ACT.ADD_DIAGNOSTIC:
      this.addDiagnostic(payload);
      break;
      case ACT.DEL_DIAGNOSTICS:
      this.deleteDiagnostics();
      break;
      default:
      break;
    }

  }
}

const diagnosticStore = new DiagnosticsStore();

d.register(diagnosticStore.action);

export default diagnosticStore;
