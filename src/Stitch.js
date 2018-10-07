import { Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'

//Replate your-stitch-app with your stitch application id:
Stitch.initializeDefaultAppClient('your-stitch-app');
const client = Stitch.defaultAppClient;
client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
  console.log(`logged in anonymously as user ${user.id}`)
});

export function uploadExplain(arg){
  client.callFunction("postExplain", [arg]).then(echoedResult => {
  console.log(`Echoed result: ${JSON.stringify(echoedResult)}`);
})
};
