exports = function(totalKeysExamined,nReturned){
  
  console.log("Validate Query Targeting Ratio");
  const diagnostics = context.values.get("diagnostics");
  let result = diagnostics.isQueryTargetingOk.ok;
  
  if (Number(totalKeysExamined) !== 0) { 
    let ratio = Number(nReturned)/Number(totalKeysExamined);
    //console.log(ratio);
    if(Number(ratio)===0){
      result = "The query retrieved no results scanning: "+totalKeysExamined+" index keys";
    } else if(1/ratio>=1000){
      result = diagnostics.isQueryTargetingOk.needChage;
      //console.log(result+" ratio:"+1/ratio);
    } else if(1/ratio>=100){
      result = diagnostics.isQueryTargetingOk.bad;
      //console.log(result+" ratio:"+1/ratio);
    }
  } else if (nReturned!==0){
    result = diagnostics.isQueryTargetingOk.missingIndex;
  }
  return result;
};