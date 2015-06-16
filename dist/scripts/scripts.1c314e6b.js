"use strict";angular.module("config",[]).constant("ENV",{name:"production",apiEndpoint:"http://preprod2.rad.co",defaultLang:"fr"}),window.scrollTo(0,1),angular.module("angularApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","pascalprecht.translate","xml","config","nl2br","infinite-scroll"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/index.html",controller:"MainCtrl"}).when("/login",{templateUrl:"views/auth/login.html",controller:"LoginCtrl"}).when("/connexion",{templateUrl:"views/auth/connexion.html",controller:"ConnexionCtrl"}).when("/logout",{templateUrl:"views/auth/logout.html",controller:"LogoutCtrl"}).when("/register",{templateUrl:"views/auth/register.html",controller:"RegisterCtrl"}).when("/lost-password",{templateUrl:"views/auth/lost-password.html",controller:"LostPasswordCtrl"}).when("/my-account/orders",{templateUrl:"views/account/my-orders.html",controller:"MyOrdersCtrl"}).when("/my-account/order/:num/:id",{templateUrl:"views/account/order-recap.html",controller:"OrderRecapCtrl"}).when("/category/:categoryslug",{templateUrl:"views/store/category.html",controller:"CategoryCtrl"}).otherwise({redirectTo:"/"})}]).config(["$httpProvider",function(a){a.interceptors.push("xmlHttpInterceptor")}]).config(["$translateProvider",function(a){var b={TITLE:"Rad.co",APP_NAME:"Rad",global:{loading:"Chargement en cours"},login:{with_facebook:"Se connecter avec Facebook",or_register_email:"Connexion ou inscription par e-mail"},form:{submit:"Valider"},error:{connexion_lost:"Problème de connexion, veuillez re-essayer plus tard."},connexion:{form:{legend:"Veuillez saisir vos identifiants de connexion.","email.placeholder":"Adresse email","password.placeholder":"Mot de passe"},facebook:"Se connecter avec facebook"},register:{new_account:"Créer un nouveau compte",title:"Inscription",facebook:"S'inscrire avec Facebook",form:{legend:"Merci de renseigner tous les champs suivantes.","firstname.placeholder":"Prénom","lastname.placeholder":"Nom","email.placeholder":"Adresse email","password.placeholder":"Mot de passe","birthday.placeholder":"31/12/2000","cell.placeholder":"06 06 06 06 06"}},lostpass:{title:"Aide","form.legend":"Veuillez renseigner votre adresse e-mail.","form.email.placeholder":"Adresse e-mail.",success:"Un e-mail vient d’être envoyé à {{email}} afin de rénitialiser votre mot de passe."},menu:{center_title:"Menu",title:"Menu",cart:"Panier",profile:"Profil",orders:"Mes commandes",payments:"Paiement",addresses:"Mes adresses",free_orders:"Commande offerte",help:"Aide",logout:"Déconnexion"},myaccount:{myorders:{title:"Mes commandes",noorders:"Pas de commandes",order_link:"Commande #{{id}} du {{date}}"},order:{title:"Commande #{{id}}",detail:"Détail de la commande",subTotal:"Sous-total",shipPrice:"Frais de livraison",credit:"Crédit d'achat",total:"Total",payment:"Mode de paiement",delivery:"Livraison",billing:"Facturation"}},product:{product:"Produit",products:"Produits",quantity:"Quantité",size:"Taille"},"":""},c=function(a,b,d){return angular.forEach(b,function(b,e){"string"==typeof b?a[d+e]=b:a=c(a,b,d+e+".")}),a};a.translations("fr",c({},b,"")),a.preferredLanguage("fr"),a.useSanitizeValueStrategy(null)}]),angular.module("angularApp").controller("MainCtrl",["$scope","ApiLink","$cookies","$http","LocalStorage",function(a,b,c,d,e){a.inserts=e.getObject("home/inserts"),a.inserts=null,a.inserts||(a.loading=!0,d.get(b.getApiBase()+"/raaad_xmlconnect/index/index/app_code/"+b.getAppCode()+"/level/1").then(function(b){a.loading=!1,b.data&&b.data.home&&b.data.home.inserts&&(a.inserts=b.data.home.inserts.insert,e.putObject("home/inserts",a.inserts))},function(){a.loading=!1}))}]),angular.module("angularApp").controller("LoginCtrl",["$scope",function(a){}]),angular.module("angularApp").controller("ConnexionCtrl",["$scope","User","$location",function(a,b,c){a.title="Connexion",a.email="",a.password="",a.loading=!1,a.error=null,a.submitForm=function(){return a.loading=!0,a.error=null,b.login(a.email,a.password).then(function(b){"success"==b.message.status?c.path("/"):(a.loading=!1,a.error=b.message.text)},function(){a.loading=!1,a.error="error.connexion_lost"}),!1}}]),angular.module("angularApp").controller("RegisterCtrl",["$scope","User","$location",function(a,b,c){a.title="Connexion",a.firstname="",a.lastname="",a.email="",a.password="",a.loading=!1,a.error=null,a.errors=null;var d=function(){return{email:a.email,password:a.password,confirmation:a.password,is_subscribed:!0,firstname:a.firstname,lastname:a.lastname}};a.submitForm=function(){a.loading=!0,a.error=null,a.errors=null,b.register(d()).then(function(b){"success"==b.message.status?c.path("/"):(a.loading=!1,a.errors=b.message.text)},function(){a.loading=!1,a.error="error.connexion_lost"})}}]),angular.module("angularApp").controller("LostPasswordCtrl",["$scope","User","$timeout","$location",function(a,b,c,d){a.title="lostpass.title",a.email="",a.loading=!1,a.error=null,a["false"]=!0,a.submitForm=function(){a.loading=!0,a.error=null,b.forgotPassword(a.email).then(function(b){a.loading=!1,"success"==b.message.status?(a.success="lostpass.success",a.error=null,a.translateData={email:a.email},c(function(){d.path("/")},5e3)):a.error=b.message.text},function(){a.loading=!1,a.error="error.connexion_lost"})}}]),angular.module("angularApp").controller("LogoutCtrl",["$scope","$location","User","$timeout",function(a,b,c,d){c.logout(),d(function(){b.path("/")},2e3)}]),angular.module("angularApp").controller("CategoryCtrl",["$scope","$routeParams","$location","Category",function(a,b,c,d){return a.categoryId=parseInt(b.categoryslug),a.page=0,a.title="global.loading",a.loaded=!1,a.infiniteLoading=!1,a.infiniteDisabled=!0,isNaN(a.categoryId)?c.path("/"):(isNaN(a.page)&&(a.page=0),a.loading=!0,a.category=null,d.get(a.categoryId,a.page).then(function(b){a.loading=!1,a.category=b,a.infiniteDisabled=!1},function(){a.error=!0,a.loading=!1}),void(a.loadMore=function(){a.infiniteLoading||a.infiniteDisabled||(a.infiniteLoading=!0,d.get(a.categoryId,++a.page).then(function(b){return a.infiniteLoading=!1,b.products?void angular.forEach(b.products.item,function(b){a.category.products.item.push(b)}):a.infiniteDisabled=!0},function(){a.infiniteLoading=!1}))}))}]),angular.module("angularApp").controller("MyOrdersCtrl",["$scope","User","$location","order",function(a,b,c,d){return b.getToken()?(a.loading=!0,a.orders=[],a.error=!1,a.no_orders=!1,a.title="myaccount.myorders.title",void d.list().then(function(b){return a.no_orders=!1,a.loading=!1,b.message&&"error"===b.message.status?a.error=b.message.text:b.orders&&b.orders.item?a.orders=b.orders.item:void(a.no_orders=!0)},function(){a.loading=!1,a.error="error.connexion_lost"})):c.path("/login")}]),angular.module("angularApp").controller("OrderRecapCtrl",["$scope","$routeParams","User","$location","order",function(a,b,c,d,e){return c.getToken()?(a.loading=!0,a.order=null,a.error=!1,a.title="myaccount.order.title",a.transData={id:b.num},a.items=[],a.totals=[],e.get(b.id).then(function(b){return a.loading=!1,b.message&&"error"===b.message.status?a.error=b.message.text:b.order_details?(a.order=b.order_details,a.items=Array.isArray(a.order.ordered_items.item)?a.order.ordered_items.item:[a.order.ordered_items.item],a.totals=[],void angular.forEach(a.order.totals,function(b){b.summary&&(b=b.summary),a.totals.push({label:b._label,val:b.__text})})):void(a.error="error.connexion_lost")},function(){a.loading=!1,a.error="error.connexion_lost"}),void(a.sameAddresses=function(a,b){return a.entity_id.__text==b.entity_id.__text?!0:a.city.__text==b.city.__text&&a.country.__text==b.country.__text&&a.country_id.__text==b.country_id.__text&&a.firstname.__text==b.firstname.__text&&a.lastname.__text==b.lastname.__text&&a.postcode.__text==b.postcode.__text&&a.street1.__text==b.street1.__text&&a.street.__text==b.street.__text&&a.telephone.__text==b.telephone.__text})):d.path("/login")}]),angular.module("angularApp").service("CurrentUser",function(){return{}}),angular.module("angularApp").service("responseHandler",["$q",function(a){var b=function(b,c){return"object"==typeof b.data?("function"==typeof c&&c(b),b.data):a.reject(b.data)},c=function(b){a.reject(b.data)},d=function(a){return a.then(b,c)};return{success:b,error:c,handle:d}}]),angular.module("angularApp").service("Utils",function(){var a=function(a){return a?a.toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,""):""},b=function(a){if(null==a)return!0;if(a.length>0)return!1;if(0===a.length)return!0;for(var b in a)if(hasOwnProperty.call(a,b))return!1;return!0},c=function(){return 0|Math.floor(Date.now()/1e3)};return{slugify:a,isEmpty:b,getTimestamp:c}}),angular.module("angularApp").service("ApiLink",["ENV","Lang",function(a,b){var c=function(a,b,c){var f="";return c&&angular.forEach(c,function(a,b){f+="/"+encodeURIComponent(b)+"/"+encodeURIComponent(a)}),d()+"/xmlconnect/"+encodeURIComponent(a)+"/"+encodeURIComponent(b)+"/app_code/"+e()+f},d=function(){return a.apiEndpoint+"/"+b.get()},e=function(){return encodeURIComponent(b.getAppCode())};return{get:c,getApiBase:d,getAppCode:e}}]),angular.module("angularApp").service("Lang",["ENV","$cookies",function(a,b){var c="fr us uk de".split(" "),d=b.get("lang")||a.defaultLang,e=function(){return d},f=function(a){a=a.toLowerCase();for(var b=0;b<c.length;b++)if(c[b]===a.toLowerCase()){d=a;break}return d};return{get:e,set:f,getAppCode:function(){return"fr_iph1"}}}]),angular.module("angularApp").service("MagentoPostRequest",["$http","$httpParamSerializer",function(a,b){return function(c,d,e){var f={"Content-Type":"application/x-www-form-urlencoded"};return e&&(f.Authorization='token="'+e+'"'),a({method:"POST",url:c,headers:f,data:b(d)})}}]),angular.module("angularApp").factory("User",["$http","ApiLink","MagentoPostRequest","$cookies","responseHandler",function(a,b,c,d,e){var f,g="_token_user",h=function(b){f=b,b?(d.put(g,b),a.defaults.headers.common.Authorization='token="'+b+'"'):(d.remove(g),delete a.defaults.headers.common.Authorization)};h(d.get(g)||null);var i=function(a){return e.success(a,function(a){a.data.message.token&&h(a.data.message.token)})},j=function(a,d){return c(b.get("customer","login"),{username:a,password:d},f).then(i,e.error)},k=function(a){return c(b.get("customer","save"),a,f).then(i,e.error)},l=function(a){return c(b.get("customer","forgotpassword"),{email:a},f).then(i,e.error)},m=function(){return a({method:"GET",url:b.get("customer","logout"),headers:{Authorization:'token="'+f+'"'}}).then(h(null))};return{login:j,logout:m,register:k,forgotPassword:l,getToken:function(){return(f||"")+""}}}]),angular.module("angularApp").factory("order",["User","$http","responseHandler","ApiLink",function(a,b,c,d){var e=function(){return c.handle(b({method:"GET",url:d.get("customer","orderlist")}))},f=function(a){return c.handle(b({method:"GET",url:d.get("customer","orderdetails",{order_id:a})}))};return{list:e,get:f}}]),angular.module("angularApp").factory("MenuCategories",["$http","$q","$cookies","ApiLink",function(a,b,c,d){var e="MenuCategories",f=3600,g=null,h=function(){return 0|Math.floor(Date.now()/1e3)},i=function(){var a=c.getObject(e+"_val");if(a){var b=parseInt(c.get(e+"_time"));if(!(b<h()))return g=a,a;c.remove(e+"_val")}return null},j=function(a){var b={};return angular.forEach(a.category,function(a){console.log(a),b[a.entity_id]={n:a.name,c:{}},a.children&&angular.forEach(a.children.category,function(c){b[a.entity_id].c[c.entity_id]=c.name})}),b},k=function(a){a=j(a),g=a,c.putObject(e+"_val",a),c.put(e+"_time",h()+f)},l=function(){return b(function(b,c){var e=g||i();return e?b(e):void a.get(d.getApiBase()+"/raaad_xmlconnect/index/index/app_code/"+d.getAppCode()+"/level/3").then(function(a){a.data&&a.data.home&&a.data.home.categorytree?(e=a.data.home.categorytree,k(e),b(e)):c(null)},function(){c(null)})})};return function(){return l()}}]),angular.module("angularApp").factory("Category",["$http","responseHandler","ApiLink","LocalStorage","$q",function(a,b,c,d,e){var f=function(f,g){return e(function(e,h){var i="catalog/category/"+f+"-"+g,j=d.getObject(i);return j?e(j):void b.handle(a({method:"GET",url:c.get("catalog","category",{id:f,count:30,offset:30*g})})).then(function(a){return a.category?(d.putObject(i,a.category,300),e(a.category)):void h(null)},function(){h(null)})})};return{get:f}}]),angular.module("angularApp").directive("splashScreen",function(){return{restrict:"A",link:function(a,b){angular.element(document).ready(function(){b.remove()})}}}),angular.module("angularApp").directive("loader",function(){return{template:'<div class="loader-directive"><div class="loader"></div></div>'}}),angular.module("angularApp").directive("menuTop",["$http","MenuCategories","Utils",function(a,b,c){return{templateUrl:"views/directives/menutop.html",restrict:"E",link:function(a){a.Utils=c,a.categories=null,b().then(function(b){a.categories=b,window.categories=b;var c=null;a.toggleMenuState=function(){c=c||angular.element("#menu-dropdown"),c.toggleClass("menu-open")}})}}}]),angular.module("angularApp").directive("menuLeftBtn",["User","$rootScope",function(a,b){var c=angular.element("html");return b.$on("$routeChangeStart",function(){c.removeClass("left-open")}),{templateUrl:"views/directives/menuleftbtn.html",restrict:"E",link:function(b,d){var e=d.find(".left-menu-opener");a.getToken()?e.click(function(a){a.preventDefault(),c.toggleClass("left-open")}):e.attr("href","#/login")}}}]),angular.module("angularApp").service("LocalStorage",["Utils",function(a){var b=window.localStorage,c=600,d=function(d,e){e=e||c;var f=parseInt(b.getItem(d+"_time"));return f<a.getTimestamp()+e?(i(d),null):b.getItem(d)},e=function(d,e,f){f=f||c,b.setItem(d+"_time",a.getTimestamp()+f),b.setItem(d,e)},f=function(a,b){var c=d(a,b);return c?JSON.parse(c):c},g=function(a,b,d){d=d||c,e(a,JSON.stringify(b),d)},h=function(){b.clear()},i=function(a){b.removeItem(a+"_time"),b.removeItem(a)};return{get:d,put:e,getObject:f,putObject:g,clear:h,remove:i}}]);