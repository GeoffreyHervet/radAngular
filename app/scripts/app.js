'use strict';
window.scrollTo(0, 1);

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'pascalprecht.translate',
    'xml',
    'config',
    'nl2br',
    'infinite-scroll'
  ])
  .config(function ($routeProvider) {
    // TODO refactorize it : controllers/auth/routes.js controllers/account/routes.js ....
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/auth/login.html',
        controller: 'LoginCtrl'
      })
      .when('/connexion', {
        templateUrl: 'views/auth/connexion.html',
        controller: 'ConnexionCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/auth/logout.html',
        controller: 'LogoutCtrl'
      })
      .when('/register', {
        templateUrl: 'views/auth/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/lost-password', {
        templateUrl: 'views/auth/lost-password.html',
        controller: 'LostPasswordCtrl'
      })

      .when('/my-account/orders', {
        templateUrl: 'views/account/my-orders.html',
        controller: 'MyOrdersCtrl'
      })
      .when('/my-account/order/:num/:id', {
        templateUrl: 'views/account/order-recap.html',
        controller: 'OrderRecapCtrl'
      })
      .when('/category/:categoryslug', {
        templateUrl: 'views/store/category.html',
        controller: 'CategoryCtrl'
      })
      .when('/product/:productslug', {
        templateUrl: 'views/store/product.html',
        controller: 'ProductCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  //.config(function($locationProvider){
    //$locationProvider.html5Mode(true);
  //})
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
  })
  .config(function ($translateProvider) {
    // Todo refactorize me : translate.fr.js
    var base = {
      TITLE: 'Rad.co', // {{ 'TITLE' | translate }}
      APP_NAME: 'Rad',
      global: {
        loading: 'Chargement en cours'
      },
      '404': {
        product: 'Produit non trouvé',
        category: 'Catégorie non trouvée'
      },
      login: {
        'with_facebook': 'Se connecter avec Facebook',
        'or_register_email': 'Connexion ou inscription par e-mail'
      },
      form: {
        submit: 'Valider'
      },
      error: {
        connexion_lost: 'Problème de connexion, veuillez re-essayer plus tard.'
      },

      connexion: {
        form: {
          legend: 'Veuillez saisir vos identifiants de connexion.',
          'email.placeholder': 'Adresse email',
          'password.placeholder': 'Mot de passe'
        },
        facebook: 'Se connecter avec facebook'
      },
      register: {
        new_account: 'Créer un nouveau compte',
        title: 'Inscription',
        facebook: 'S\'inscrire avec Facebook',
        form: {
          legend: 'Merci de renseigner tous les champs suivantes.',
          'firstname.placeholder': 'Prénom',
          'lastname.placeholder': 'Nom',
          'email.placeholder': 'Adresse email',
          'password.placeholder': 'Mot de passe',
          'birthday.placeholder': '31/12/2000',
          'cell.placeholder': '06 06 06 06 06'
        }
      },
      lostpass: {
        title: 'Aide',
        'form.legend': 'Veuillez renseigner votre adresse e-mail.',
        'form.email.placeholder': 'Adresse e-mail.',
        'success': 'Un e-mail vient d’être envoyé à {{email}} afin de rénitialiser votre mot de passe.'
      },
      menu: {
        center_title: 'Menu',
        title: 'Menu',
        cart: 'Panier',
        profile: 'Profil',
        orders: 'Mes commandes',
        payments: 'Paiement',
        addresses: 'Mes adresses',
        free_orders: 'Commande offerte',
        help: 'Aide',
        logout: 'Déconnexion'
      },
      'myaccount': {
        'myorders' : {
          title: 'Mes commandes',
          noorders: 'Pas de commandes',
          order_link: 'Commande #{{id}} du {{date}}'
        },
        'order': {
          title: 'Commande #{{id}}',
          detail: 'Détail de la commande',
          subTotal: 'Sous-total',
          shipPrice: 'Frais de livraison',
          credit: 'Crédit d\'achat',
          total: 'Total',
          payment: 'Mode de paiement',
          delivery: 'Livraison',
          billing: 'Facturation'
        }
      },

      product: {
        product: 'Produit',
        products: 'Produits',
        quantity: 'Quantité',
        size: 'Taille',
        share: 'Partager'
      },


      '':''
    };

    var subs = function(trads, hash, base) {
      angular.forEach(hash, function(val, key) {
        if (typeof val === 'string') {
          trads[base + key] = val;
        } else {
          trads = subs(trads, val, base + key + '.');
        }
      });

      return trads;
    };

    $translateProvider.translations('fr', subs({}, base, ''));

    $translateProvider.preferredLanguage('fr');
    $translateProvider.useSanitizeValueStrategy(null);
  })
;
