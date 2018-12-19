import d from '../dispacher';
import * as ACT from '../types';

export function addDiagnostic(diagnostic) {
  console.log(diagnostic);

  d.dispatch({
    type: ACT.ADD_DIAGNOSTIC,
    payload: diagnostic
  });
}
