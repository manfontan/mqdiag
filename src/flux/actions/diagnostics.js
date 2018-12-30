import d from '../dispatcher';
import * as ACT from '../types';

export function addDiagnostic(diagnostic) {
  d.dispatch({
    type: ACT.ADD_DIAGNOSTIC,
    payload: diagnostic
  });
}
export function deleteDiagnostics(){
  d.dispatch({
    type: ACT.DEL_DIAGNOSTICS
  })
}
