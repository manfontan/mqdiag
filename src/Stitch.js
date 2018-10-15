import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'

//Replate your-stitch-app with your stitch application id:
Stitch.initializeDefaultAppClient('mqdiag-ryglf');
const client = Stitch.defaultAppClient;
client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
  console.log(`logged in anonymously as user ${user.id}`)
});

export function uploadExplain(arg){
  return client.callFunction("postExplain", [arg]).then(echoedResult => {
    return JSON.stringify(echoedResult);
})
};
