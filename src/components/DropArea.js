import React from 'react';
import Dropzone from 'react-dropzone'
import * as stitchClient from '../stitch/StitchClient';
import {addDiagnostic,deleteDiagnostics} from '../flux/actions/diagnostics';

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
              stitchClient.uploadExplain(explainPlan).then(result => {
                const diags = result.slice(0);
                console.log(diags);
                //TODO: removed monckup code
                //const diags = [{"label":"Manuel is a glorious hacker","_id":1},{"label":"Chris is a mighty query performance sourcerer","_id":2},{"label":"Miguel is AWS certified SA lol","_id":3}]
                deleteDiagnostics();
                for(let d of diags[0]){
                  //console.log(d);
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
