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
    'nl2br'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/account/login.html',
        controller: 'LoginCtrl'
      })
      .when('/connexion', {
        templateUrl: 'views/account/connexion.html',
        controller: 'ConnexionCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/loading.html',
        controller: 'LogoutCtrl'
      })
      .when('/register', {
        templateUrl: 'views/account/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/lost-password', {
        templateUrl: 'views/account/lost-password.html',
        controller: 'LostPasswordCtrl'
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
    var base = {
      TITLE: 'Rad.co', // {{ 'TITLE' | translate }}
      APP_NAME: 'Rad',
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
          legend: 'Veillez saisir vos identifiants de connexion.',
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
