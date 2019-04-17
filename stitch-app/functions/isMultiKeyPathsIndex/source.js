exports = function(indexName,isMultiKey,multiKeyPaths,version){
  /*
  arg: fullDocument from the ChangeEvent 
  Add a validation for indexes missing multiKeyPaths:
    https://jira.mongodb.org/browse/SERVER-38051
  */
  
  /* the explain plan is retrieved by the startDiagnosticFunction in the arg parameter*/

  /* run the diagnostic logic */
  /* return { "positive": true/false, "description":diagnoscti.id/empty} */
  var result ="";

  //Will need to find all indexes contained in the explain output
  console.log("Start MultikeyPaths validation");
  let v = version.split(".");

  //Check MongoDB version is greater than 3.2
  if(v[0]>3 || (v[0]==3 && v[1]>2)){
    //console.log("version is greater than 3.2");
    //console.log("isMultiKey: "+isMultiKey+" multiKeyPaths: "+multiKeyPaths+" indexName: "+indexName);
    if(isMultiKey===true  && !multiKeyPaths){
     result = "The index is Multikey but is missing multikeyPaths rebuild your index: "+indexName;
    }
  }
  
  return result;
};