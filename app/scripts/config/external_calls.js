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

  // SDKS
  //addScript('//connect.facebook.net/es_LA/sdk.js');}

})();
