import React from 'react';
import Dropzone from 'react-dropzone'
import {addDiagnostic,deleteDiagnostics} from '../flux/actions/diagnostics';

class DropArea extends React.Component {
  constructor(props) {
    super()
    this.client = props.client
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

              this.client.callFunction("postExplain", [explainPlan]).then(diagnostics => {
                const diags = diagnostics.slice(0);
                console.log(diags);
                deleteDiagnostics();
                for(let d of diags[0]){
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
