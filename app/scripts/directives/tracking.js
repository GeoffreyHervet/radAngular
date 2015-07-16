'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:tracking
 * @description
 * # tracking
 */
angular.module('angularApp')
  .directive('tracking', function (Cart, User, Lang) {
    var TRACKER = {
      CJ: {
        product: function () {
          (function (e) {
            var t = '1786', n = document, r, i, s = {
              http: 'http://cdn.mplxtms.com/s/MasterTMS.min.js',
              https: 'https://secure-cdn.mplxtms.com/s/MasterTMS.min.js'
            }, o = s[/\w+/.exec(window.location.protocol)[0]];
            i = n.createElement('script'), i.type = 'text/javascript', i.async = !0, i.src = o + '#' + t, r = n.getElementsByTagName('script')[0], r.parentNode.insertBefore(i, r), i.readyState ? i.onreadystatechange = function () {
              if (i.readyState === 'loaded' || i.readyState === 'complete')i.onreadystatechange = null
            } : i.onload = function () {
              try {
                e()
              } catch (t) {
              }
            }
          })(function () {
          });

          return '';
        },
        success: function (order) {
          window.MasterTmsUdo = {
            'CJ': {
              'CID': '1533216',
              'TYPE': '377414',
              'DISCOUNT': '' + (order.totals.discount && parseFloat(order.totals.discount.__text.replace(',','.')) * -1 || 0),
              'OID': '' + order.number,
              'COUPON': (order.totals.discount ? 'ATTENTE WEB SERVICE' : ''),
              'CURRENCY': Lang.getCurrency(),
              'AMOUNT': '0',
              'FIRECJ': 'TRUE',
              PRODUCTLIST: [
                {
                  'ITEM': User.isLoggued() ? 'old' : 'new',
                  'AMT': '' + Cart.getFormattedDetails().totals.subtotal.value,
                  'QTY': '1',
                  'DCNT': '0'
                }
              ]
            }
          };
          return '';
        }
      },
      facebook: {
        add_to_cart: function (trackingData) {
          (function () {
            var _fbq = window._fbq || (window._fbq = []);
            if (!_fbq.loaded) {
              var fbds = document.createElement('script');
              fbds.async = true;
              fbds.src = '//connect.facebook.net/en_US/fbds.js';
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(fbds, s);
              _fbq.loaded = true;
            }
          })();
          window._fbq = window._fbq || [];
          window._fbq.push(['track', '6022242255528', {'value': '' + parseFloat(trackingData.product.price._regular.replace(',','.')) * trackingData.qty, 'currency': Lang.getCurrency()}]);
          return '';
        },
        success: function () {
          (function () {
            var _fbq = window._fbq || (window._fbq = []);
            if (!_fbq.loaded) {
              var fbds = document.createElement('script');
              fbds.async = true;
              fbds.src = '//connect.facebook.net/en_US/fbds.js';
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(fbds, s);
              _fbq.loaded = true;
            }
          })();
          window._fbq = window._fbq || [];
          window._fbq.push(['track', '6008869953328', {'value': '' + parseFloat(order.totals.grand_total.__text.replace(',','.')), 'currency': Lang.getCurrency()}]);
          return '';
        },
        all: function () {
          !function (f, b, e, v, n, t, s) {
            if (f.fbq)return;
            n = f.fbq = function () {
              n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq)f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
          }(window,
            document, 'script', '//connect.facebook.net/en_US/fbevents.js');
          fbq('init', '375964892541593');
          fbq('track', 'PageView');
          return '';
        }
      },
      adwords: {
        success: function(){
          window.google_conversion_id = 954489404;
          window.google_conversion_language = Lang.get();
          window.google_conversion_format = "3";
          window.google_conversion_color = "ffffff";
          window.google_conversion_label = "kdFvCMTY_QcQvLSRxwM";
          window.google_conversion_value = parseFloat(order.totals.grand_total.__text.replace(',','.'));
          window.google_conversion_currency = Lang.getCurrency();
          window.google_remarketing_only = false;

          var oldDocumentWrite = document.write;

            document.write = function(node){
              jQuery('body').append(node)
            };

            jQuery.getScript('//www.googleadservices.com/pagead/conversion.js', function() {
              setTimeout(function () {
                document.write = oldDocumentWrite
              });
            });
          return '';
        },
        all: function(data) {
          window.google_tag_params = {
            ecomm_prodid: data.id || 0,
            ecomm_pagetype: data.type || 'default',
            ecomm_totalvalue: Cart.getFormattedDetails().totals && Cart.getFormattedDetails().totals.subtotal && Cart.getFormattedDetails().totals.subtotal.value
          };
          window.google_conversion_id = 954489404;
          window.google_custom_params = window.google_tag_params;
          window.google_remarketing_only = true;

          var oldDocumentWrite = document.write;

          document.write = function (node) {
            jQuery('body').append(node)
          };

          jQuery.getScript('//www.googleadservices.com/pagead/conversion.js', function () {
            setTimeout(function () {
              document.write = oldDocumentWrite
            });
          });
          return '';
          //angular.element('body').append('<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"></script>');
          //return '';
        }
      },
      twitter: {
        success: function(){
          jQuery
            .getScript('//platform.twitter.com/oct.js')
            .done(function(){
              console.log('OK platform.twitter.com/oct.js');
              twttr.conversion.trackPid("l4wsu", { tw_sale_amount: parseFloat(order.totals.grand_total.__text.replace(',','.')), tw_order_quantity: 1 });
            })
            .fail(function(){
              console.info('KO platform.twitter.com/oct.js');
            })
          ;
          return '';
        },
        all: function(){
          jQuery
            .getScript('//platform.twitter.com/oct.js')
            .done(function(){
              console.log('OK platform.twitter.com/oct.js');
              twttr.conversion.trackPid("l4wsy", { tw_sale_amount: Cart.getFormattedDetails().totals && Cart.getFormattedDetails().totals.subtotal && Cart.getFormattedDetails().totals.subtotal.value, tw_order_quantity: 1});
            })
            .fail(function(){
              console.info('KO platform.twitter.com/oct.js');
            })
          ;
          return '';
        }
      },
      outbrain: {
        success: function(){
          return '<img src="http://traffic.outbrain.com/network/trackpxl?advid=30615&action=view" />';
        }
      }
    };

    return {
      template: '<div class="hide"></div>',
      restrict: 'E',
      scope: {
        type: '@', // product, success, all
        data: '=' // all => {id: product_id, type: home|product|account,xxxx}
      },
      link: function postLink(scope, element) {
        var html = '';

        console.log('data', scope.data);

        angular.forEach(TRACKER, function(data) {
          try {
            if (data[scope.type]) {
              html += data[scope.type](scope.data);
            }
          }
          catch (e) {
            console.error(e);
          }
        });
        element.html(html);
      }
    };
  });
