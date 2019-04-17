exports = function(doc){
  /*
    This function should call all the diagnostic functions and retrieve a document with the results.
  */
  
  console.log("Start Diagnoscits:");
  
  const functions = context.values.get("functions");
  
  // Use high-order function to get the JSON field values.
  function getter (str) {
    return obj => str.split(".").reduce((obj,key)=> ( obj && obj[key] !== 'undefined') ? obj[key]:undefined, obj);
  }

  // Get the validation fields from the explain() doc:
  const nReturned = getter("executionStats.nReturned");
  const totalKeysExamined = getter("executionStats.totalKeysExamined");
  const version = getter("serverInfo.version");
  const isMultiKey = getter("executionStats.executionStages.inputStage.isMultiKey");
  const isMultiKeyPathsIndex= getter("executionStats.executionStages.inputStage.isMultiKeyPathsIndex");
  const indexName = getter("executionStats.executionStages.inputStage.indexName");
  const _id = getter("_id");

  let result = [];
  let validations = [];
  
  // Add the validation functions based on the available fields:
  if(totalKeysExamined(doc) !== undefined && nReturned(doc) !== undefined){
    validations.push(context.functions.execute(functions.isQueryTargetingOk,totalKeysExamined(doc),nReturned(doc)));
  }
  if(version(doc ) !== undefined && isMultiKeyPathsIndex(doc) !== undefined &&  indexName(doc)!== undefined || isMultiKey(doc) !== undefined  ){
    validations.push(context.functions.execute(functions.isMultiKeyPathsIndex,indexName(doc),isMultiKey(doc),isMultiKeyPathsIndex(doc),version(doc)));  
  } 

  //Use promises to asynchronously call validation functions.
  return Promise.all(validations).then(diags => {
    //TODO currently the validations return a string. Update the diagnostic functions to return a JSON.
    console.log("Getting Diagnostics");
    console.log("diagnostic : "+ diags[0]+" "+diags[1]);
    for (i = 0; i < diags.length; i++){
      result.push({"_id":_id(doc)+"-"+i,"label":EJSON.stringify(diags[i])});
    }
    return result;
  });
};