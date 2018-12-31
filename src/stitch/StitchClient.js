import {
  Stitch,
  GoogleRedirectCredential
} from 'mongodb-stitch-browser-sdk';

//Replate your-stitch-app with your stitch application id:
var client;

if(!client){
  Stitch.initializeDefaultAppClient('mqdiag-ryglf');
}
client = Stitch.defaultAppClient;

let authed = client.auth.isLoggedIn;

console.log("redirect result: " + client.auth.hasRedirectResult());
if (client.auth.hasRedirectResult()) {
  client.auth.handleRedirectResult().then(user => {
    console.log(user);
  });
}

console.log("user logged status: " + authed);
if (!authed) {
  const credential = new GoogleRedirectCredential();
  client.auth.loginWithRedirect(credential);
}

if(authed){
  console.log(client.auth.user.profile.email);
}

export function uploadExplain(arg) {
  return client.callFunction("postExplain", [arg]).then(diagnostics => {
    return diagnostics;
  })
};
