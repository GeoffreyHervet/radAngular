'use strict';

(function (){
  var addScript = function(url,content){
    var a = ['s','c','r','i','p','t'];
    var str = '<' + a.join('');
    if (url) {
      str += ' src="' + url + '">';
    }
    else {
      str += '>' + content;
    }
    str += '</' + a.join('') + '>';
    document.write(str);
  };

  // TRACKING

  //addScript('//connect.facebook.net/en_US/fbds.js');
  addScript('//platform.twitter.com/oct.js');
  addScript(0, "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-31344840-1', 'auto');");

  // SDKS
  //addScript('//connect.facebook.net/es_LA/sdk.js');

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    //js.src = "//connect.facebook.net/en_US/sdk.js";
    js.src = "//connect.facebook.net/en_US/sdk/debug.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  setTimeout(function(){
    FB.init({
      appId: 406695926021804,
      version: 'v2.4',
      cookie: false
    });
  }, 1000);

})();
