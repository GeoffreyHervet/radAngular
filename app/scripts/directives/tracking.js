'use strict';

(function(angular){
  var isReady = false;
  var scopeData = {};
  var callback = null;
  var itemEl = null;
  var timer = null;

  angular.element(document).ready(function(){
    isReady = true;
    if (callback) {
      if (timer) {
        timer.cancel();
      }
      timer = null;
      callback(scopeData);
      callback = null;
      scopeData = null;
    };
  });

  /**
   * @ngdoc directive
   * @name angularApp.directive:tracking
   * @description
   * # tracking
   */
  angular.module('angularApp')
    .directive('tracking', function (Cart, User, Lang, $timeout, $location, ENV) {
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
        ometria: {
          all: function(){
            //console.log('OMETRIA PIXEL');
            var url = window.location.protocol+"//cdn.ometria.com/tags/e965f97c4ae02674.js";
            setTimeout(function(){var sc=document.createElement('script');sc.src=url;sc.setAttribute('async','true');
              document.getElementsByTagName("head")[0].appendChild(sc);},50);
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
            var getPrice = function(val) {
              try {
                return parseFloat(val.replace('$', '').replace('£', '').replace(',', '.'));
              } catch (e) {
                return 0.0;
              }
            };

            var getImpressionFieldObject = function(id, price, name, qty){
              var product = data.product;
              id = id ? id : product.entity_id;
              try {
                price = price ? price : product.price._regular;
                name = name ? name : product.name;
              } catch (e) {
                price = price ? price : 0;
                name = name ? name : 'name bug';
              }
              var ret = {
                'id':       id,
                'name':     name,
                'price':    getPrice(price)
              };

              if (qty) {
                ret.quantity = qty;
              }
              return ret;
            };

            var step = 0;
            switch (data.type) {
              case 'product':
                __gaTracker('ec:addProduct', getImpressionFieldObject());
                step = 1;
                //__gaTracker('send', 'event', 'catalog', 'impression', {'nonInteraction': true});
                break;
              case 'add2cart':
                __gaTracker('ec:addProduct', getImpressionFieldObject());
                step = 2;
                break;
              case 'cart-confirmation':
                angular.forEach(data.items, function(item){
                  var price = item.formated_price._special ? item.formated_price._special : item.formated_price._regular;
                  __gaTracker('ec:addProduct', getImpressionFieldObject(item.item_id, price, item.name, parseInt(item.qty)));
                });
                step = 3;
                break;
              case 'cart-product-edit':
                __gaTracker('ec:addProduct', getImpressionFieldObject(data.product.product._id, data.product.price._regular, data.product.name, parseInt(data.qty)));
                step = 4;
                break;
              case 'auth-connexion':
                step = 5;
                break;
              case 'cart-delivery-address-list':
              case 'cart-delivery-address-create':
                step = 6;
                break;
              case 'cart-payment-add':
              case 'cart-payment-list':
                step = 7;
                break;
              case 'checkout-success':
                //case 'account-order-detail':
                angular.forEach(data.items, function(item){
                  __gaTracker('ec:addProduct', getImpressionFieldObject(item._product_id, item.price.including_tax._value, item.name, item.qty.value.__text));
                });
                var objData = {
                  id:         data.order.number,
                  revenue:    getPrice(data.order.totals.grand_total.__text),
                  step:       8
                };
                if (data.order.totals.tax && data.order.totals.tax.summary) {
                  objData.tax = getPrice(data.order.totals.tax.summary.__text);
                }
                if (data.order.totals && data.order.totals.shipping) {
                  objData.shipping = getPrice(data.order.totals.shipping.__text);
                }
                if (data.order.totals.discount) {
                  try {
                    objData.coupon = /^.+ \((.+)\)$/.exec(data.order.totals.discount._label)[1];
                  }
                  catch (e){
                    // ignore coupong
                  }
                }
                __gaTracker('ec:setAction', 'purchase', objData);
                __gaTracker('send', 'pageview', {
                  'page': $location.path()
                });
                break;
              default:
                __gaTracker('send', 'pageview', {
                  'page': $location.path()
                });
                break;
            }
            if (step > 0) {
              __gaTracker('ec:setAction','checkout', {
                'step': step
              });
              __gaTracker('send', 'pageview');
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

          scopeData = scope;
          itemEl = element;

          callback = function() {
            console.info('tracking', scopeData.data.type);
            angular.forEach(TRACKER, function (data) {
              try {
                if (data[scopeData.type]) {
                  html += data[scopeData.type](scopeData.data);
                }
              }
              catch (e) {
                console.info(e);
              }
            });
            itemEl.html(html);
          };

          if (isReady) {
            if (timer != null) {
              $timeout.cancel(timer);
            }
            timer = $timeout(function(){
              timer = null;
              callback(scopeData);
              callback = null;
              scopeData = null;
            }, 250);
          }
        }
      };
    });
})(angular);
