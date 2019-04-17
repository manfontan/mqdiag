exports = function(arg){
  /*
      - on post explain call:
        - Start diagnostics which will run all the diagnostics for the explain plan.
  */
      const atlasService = context.values.get("atlasService");
      const functionName = context.values.get("functions");
      let db = context.values.get("db");
      
      var collection = context.services.get(atlasService.name).db(atlasService.db).collection(atlasService.collection);
      
      let input = EJSON.parse(arg);
      input.reporter = context.user;
      input.date = new Date();
      
      return collection.insertOne(input).then(doc =>{
        return collection.find({"_id": doc.insertedId}).toArray().then(results =>
          results.map(result => {
            let diags = context.functions.execute(functionName.startQueryDiagnostic, result);
            return diags;
          }));
      });
};
