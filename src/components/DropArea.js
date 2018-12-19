import React from 'react';
import Dropzone from 'react-dropzone'
import * as stitch from '../Stitch';
import {addDiagnostic} from '../flux/actions/diagnostics';

class DropArea extends React.Component {
  constructor() {
    super()
    this.state = { files: [] }
  }
  render() {
    return (
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Drop your .explain() output in a .json file here and let the magic happen </p>
          </Dropzone>
        </div>
    );
  }
  onDrop(acceptedFiles) {
      acceptedFiles.forEach(file => {
          const reader = new FileReader();
          reader.onload = () => {
              var explainPlan = reader.result;
              stitch.uploadExplain(explainPlan).then(diags => {
                //const mockup = [{"label":"diag1","_id":1},{"label":"diag2","_id":2}]
                for(let d of diags){
                  addDiagnostic(d);
                }
              });
          };
          reader.onabort = () => console.log('file reading was aborted');
          reader.onerror = () => console.log('file reading has failed');
          reader.readAsText(file);
      });
  }
}

export default DropArea;
