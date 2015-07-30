'use strict';

window._initFb = function(){
  FB.init({
    appId: 406695926021804,
    version: 'v2.4',
    cookie: false
  });
};
window.fbAsyncInit = function() {
  window._initFb();
};


(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
