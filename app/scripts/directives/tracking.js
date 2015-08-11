'use strict';

/**
 * @ngdoc directive
 * @name angularApp.directive:tracking
 * @description
 * # tracking
 */
angular.module('angularApp')
  .directive('tracking', function (Cart, User, Lang, $timeout, Analytics, $location) {
    var getCartIds = function(){
      var ret = [];
      angular.forEach(Cart.getFormattedDetails().items, function(item){
        ret.push(item.entity_id);
      });

      return ret;
    };

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
              'DISCOUNT': '' + (order.totals.discount && parseFloat(order.totals.discount.__text.replace('$','').replace('£','').replace(',','.')) * -1 || 0),
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
          window._fbq = window._fbq || [];
          window._fbq.push(['track', '6022242255528', {'value': '' + parseFloat(trackingData.product.price._regular.replace('$','').replace('£','').replace(',','.')) * trackingData.qty, 'currency': Lang.getCurrency()}]);
          return '';
        },
        success: function () {
          window._fbq = window._fbq || [];
          window._fbq.push(['track', '6008869953328', {'value': '' + parseFloat(order.totals.grand_total.__text.replace('$','').replace('£','').replace(',','.')), 'currency': Lang.getCurrency()}]);
          return '';
        },
        all: function () {
          var a = new Image;
          a.src = 'https://www.facebook.com/tr?id=594067254033319&ev=PageView&noscript=1&_=' +  new Date().getTime();
          return '';
        }
      },
      adwords: {
        success: function(){
          //window.google_conversion_id = 954489404;
          //window.google_conversion_language = Lang.get();
          //window.google_conversion_format = "3";
          //window.google_conversion_color = "ffffff";
          //window.google_conversion_label = "kdFvCMTY_QcQvLSRxwM";
          //window.google_conversion_value = parseFloat(order.totals.grand_total.__text.replace('$','').replace('£','').replace(',','.'));
          //window.google_conversion_currency = Lang.getCurrency();
          //window.google_remarketing_only = false;
          //
          //var oldDocumentWrite = document.write;
          //
          //  document.write = function(node){
          //    jQuery('body').append(node)
          //  };
          //
          //  jQuery.getScript('//www.googleadservices.com/pagead/conversion.js', function() {
          //    setTimeout(function () {
          //      document.write = oldDocumentWrite
          //    });
          //  });
          return '';
        },
        all: function(data) {
          //window.google_tag_params = {
          //  ecomm_prodid: data.id == -1 ? getCartIds() : (data.id || 0),
          //  ecomm_pagetype: data.type || 'default',
          //  ecomm_totalvalue: Cart.getFormattedDetails().totals && Cart.getFormattedDetails().totals.grand_total && Cart.getFormattedDetails().totals.grand_total.value
          //};
          //window.google_conversion_id = 954489404;
          //window.google_custom_params = window.google_tag_params;
          //window.google_remarketing_only = true;
          //
          //var oldDocumentWrite = document.write;
          //
          //document.write = function (node) {
          //  jQuery('body').append(node)
          //};
          //
          //jQuery.getScript('//www.googleadservices.com/pagead/conversion.js', function () {
          //  $timeout(function () {
          //    document.write = oldDocumentWrite
          //  });
          //});
          return '';
        }
      },
      twitter: {
        success: function(){
          window.twttr.conversion.trackPid("l4wsu", { tw_sale_amount: parseFloat(order.totals.grand_total.__text.replace('$','').replace('£','').replace(',','.')), tw_order_quantity: 1 });
          return '';
        },
        all: function(){
          window.twttr.conversion.trackPid("l4wsy", { tw_sale_amount: Cart.getFormattedDetails().totals && Cart.getFormattedDetails().totals.grand_total && Cart.getFormattedDetails().totals.grand_total.value, tw_order_quantity: 1});
          return '';
        }
      },
      outbrain: {
        success: function(){
          var a = new Image;
          a.src = 'https://traffic.outbrain.com/network/trackpxl?advid=30615&action=view&_=' +  new Date().getTime();
          return '';
        }
      },
      analytics: {
        all: function(data){
          console.log('tracking', data);
          Analytics.trackPage($location.path());
          switch (data.type) {
            case 'product':
              Analytics.addImpression(data.product.entity_id, data.product.name, 'Category', 'Brand', 'Category', '1', '1', parseFloat(data.product.price._regular.replace('$','').replace('£','').replace(',','.')));
              Analytics.pageView();
              break;
            //case 'product-info':
            //  Analytics.addProduct(data.product.entity_id, data.product.name, 'Category', 'Brand', '1', parseFloat(data.product.price._regular.replace('$','').replace('£','').replace(',','.')), '1', '', '1');
            //  Analytics.trackDetail();
            //  break;
            case 'add2cart':
              Analytics.addProduct(data.product.entity_id, data.product.name, 'Category', 'Brand', '1', parseFloat(data.product.price._regular.replace('$','').replace('£','').replace(',','.')), data.quantity, '', '1');
              Analytics.trackCart('add');
              Analytics.trackCheckout(1);
              console.log('ADDED');
              break;
            case 'cart':
              Analytics.trackCheckout(2);
              break;
            case 'cart-delivery-address-list':
              Analytics.trackCheckout(3);
              break;
            case 'cart-payment-list':
              Analytics.trackCheckout(4);
              break;
            case 'checkout-success':
            //case 'account-order-detail': for testing :)
              //Analytics.trackCheckout(5); -> trackTransaction : 5, '');
              var pos = 1;
              angular.forEach(data.items, function(item){
                Analytics.addProduct(item._product_id, item.name, 'Category', 'Brand', '1', parseFloat(item.price.including_tax._value.replace('$','').replace('£','').replace(',','.')), item.qty.value.__text, '', pos++);
              });
              Analytics.trackTransaction(data.order.number, 'Mobile cart', parseFloat(data.order.totals.grand_total.__text.replace('$','').replace('£','').replace(',','.')), data.order.totals.tax.summary ? parseFloat(data.order.totals.tax.summary.__text.replace('$','').replace('£','').replace(',','.')) : 0, data.order.totals.tax.shipping ? parseFloat(tax.shipping.__text.replace('$','').replace('£','').replace(',','.')) : 0, 'FLAT10', '', 5, '');
              break;
            default:
              break;
          }

          return '';
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
