import React from 'react';
import Dropzone from 'react-dropzone'
import * as stitch from './Stitch';

class DropArea extends React.Component {
  constructor() {
    super()
    this.state = { files: [] }
  }
  render() {
    return (
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
    );
  }
  onDrop(acceptedFiles) {
      acceptedFiles.forEach(file => {
          const reader = new FileReader();
          reader.onload = () => {
              var text = reader.result;
              //console.log(text)
              stitch.uploadExplain(text);
              // do whatever you want with the file content
          };
          reader.onabort = () => console.log('file reading was aborted');
          reader.onerror = () => console.log('file reading has failed');
          reader.readAsText(file);
      });
  }
}

export default DropArea;
