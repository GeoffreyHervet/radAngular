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
    'infinite-scroll',
    'uiSwitch',
    'payment'
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

      .when('/my-account/profile', {
        templateUrl: 'views/account/profile.html',
        controller: 'MyAccountProfileCtrl'
      })
      .when('/my-account/profile/email', {
        templateUrl: 'views/account/email.html',
        controller: 'MyAccountProfileEmailCtrl'
      })
      .when('/my-account/profile/password', {
        templateUrl: 'views/account/password.html',
        controller: 'MyAccountProfilePasswordCtrl'
      })
      .when('/my-account/cards', {
        templateUrl: 'views/account/cards.html',
        controller: 'MyAccountCardsCtrl'
      })
      .when('/my-account/card/:id', {
        templateUrl: 'views/account/card-detail.html',
        controller: 'MyAccountCardsDetailCtrl'
      })
      .when('/my-account/addresses', {
        templateUrl: 'views/account/addresses.html',
        controller: 'MyAccountAddressesCtrl'
      })
      .when('/my-account/address/add', {
        templateUrl: 'views/account/address-add.html',
        controller: 'MyAccountAddressesAddCtrl'
      })
      .when('/my-account/address/edit/:id', {
        templateUrl: 'views/account/address-edit.html',
        controller: 'MyAccountAddressesEditCtrl'
      })
      .when('/my-account/free-orders', {
        templateUrl: 'views/account/free-orders.html',
        controller: 'MyAccountFreeOrdersCtrl'
      })

      .when('/help', {
        templateUrl: 'views/pages/help.html',
        controller: 'PageHelpCtrl'
      })
      .when('/search', {
        templateUrl: 'views/store/category.html',
        controller: 'SearchCtrl'
      })
      .when('/page/:slug', {
        templateUrl: 'views/pages/cms.html',
        controller: 'CmsPageCtrl'
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
      .when('/cart', {
        templateUrl: 'views/store/cart.html',
        controller: 'CartCtrl'
      })
      .when('/cart/edit/:itemId', {
        templateUrl: 'views/cart/edit.html',
        controller: 'CartEditCtrl'
      })
      .when('/cart/delivery-address-list', {
        templateUrl: 'views/cart/delivery-address-list.html',
        controller: 'CartDeliveryAddressListCtrl'
      })
      .when('/cart/delivery-address-create', {
        templateUrl: 'views/cart/delivery-address-create.html',
        controller: 'CartCreateDeliveryAddressCtrl'
      })
      .when('/cart/billing-address-list', {
        templateUrl: 'views/cart/billing-address-list.html',
        controller: 'CartBillingAddressListCtrl'
      })
      .when('/cart/billing-address-create', {
        templateUrl: 'views/cart/billing-address-create.html',
        controller: 'CartCreateBillingAddressCtrl'
      })
      .when('/cart/payment', {
        templateUrl: 'views/cart/payment-list.html',
        controller: 'CartPaymentListCtrl'
      })
      .when('/cart/payment-add', {
        templateUrl: 'views/cart/payment-add.html',
        controller: 'CartPaymentAddCtrl'
      })
      .when('/success', {
        templateUrl: 'views/cart/success.html',
        controller: 'SuccessCtrl'
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
        submit: 'Valider',
        'use': 'Utiliser',
        edit: 'Modifier'
      },
      error: {
        connexion_lost: 'Problème de connexion, veuillez re-essayer plus tard.',
        unknown_reason: 'Problème de connexion, veuillez re-essayer plus tard.'
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
        search: 'Recherche',
        center_title: 'Menu',
        title: 'Menu',
        cart: 'Panier',
        profile: 'Profil',
        orders: 'Mes commandes',
        payments: 'Paiement',
        addresses: 'Mes adresses',
        free_orders: 'Commande offerte',
        help: 'Aide',
        logout: 'Déconnexion',
        home: 'Shop',
        login: 'Connexion',
        cgv: 'Termes'
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
        },
        profile: {
          title: 'Mon compte',
          form_legend: 'Informations personnelles',
          email: 'Adresse e-mail',
          email_new: 'Nouvelle adresse email',
          current_password: 'Mot de passe actuel',
          current_email_is: 'Votre adresse e-mail est actuellement {{email}}.',
          password_help: 'Rentrez le nouveau mot de passe puis l\'ancien.',
          password: 'Mot de passe',
          password_new: 'Nouveau mot de passe',
          settings: 'Préférences',
          newsletter: 'Newsletter',
          newsletter_help: 'Je souhaiterai recevoir la newsletter de Rad.co afin de découvrir toutes les dernières infos, nouveautés; et offres spéciales.',
          facebook_link: 'Lier mon compte facebook',
          cards: 'Paiement',
          no_cards: 'Vous n\'avez pas de carte de paiement enregistrée.',
          card_info: 'Informations de la carte',
          remove_card: 'Supprimer la carte',
          addresses: 'Adresses',
          addresses_add: 'Nouvelle adresse',
          addresses_edit: 'Détail de l\'adresse',
          remove_address: 'Supprimer l\'addresse',
          address_edit_save: 'Valider les changements'
        }
      },

      product: {
        product: 'Produit',
        products: 'Produits',
        quantity: 'Quantité',
        size: 'Taille',
        share: 'Partager',
        add: 'Ajouter au panier',
        more_information: 'Plus d\'infos sur le produit',
        more_products: 'Voir plus de produits {{brand}}',
        succes_add_cart: 'Produit ajouté au panier !'
      },

      cart: {
        product_in_cart:  '{{nb}} produit dans votre panier',
        products_in_cart: '{{nb}} produits dans votre panier',
        order:            'Commander',
        reloading:        'Mise à jour du panier en cours',
        title:            'Panier',
        valid:            'Valider mon panier',
        empty:            'Votre panier est vide',
        address: {
          add:  'Ajouter une adresse'
        },
        delivery: {
          title: 'Adresse de livraison',
          create_placeholder: 'Merci de renseigner votre adresse de livraison.',
          firstname: 'Prénom',
          lastname: 'Nom',
          address: 'Adresse',
          address2: 'Complément d\'adresse',
          city: 'Ville',
          postcode: 'Code postal',
          tel: 'Numéro de téléphone',
          use_for_billing: 'Même adresse de facturation'
        },
        billing: {
          title: 'Adresse de facturation',
          create_placeholder: 'Merci de renseigner votre adresse de facturation.'
        },
        payment: {
          title: 'Paiement',
          add: 'Ajouter une carte',
          add_placeholder: 'Merci de renseigner votre information de paiement'
        },
        edit: 'Éditer',
        edit_product: 'Éditer le produit',
        remove: 'Retirer du panier'
      },

      card: {
        owner: 'Nom sur la carte',
        number: 'Numéro de carte',
        exp_date: 'Date d\'expiration',
        cvc: 'Cryptogramme',
        reusable: 'Mémoriser pour mes prochains achats',
        error: {
          number: 'Numéro de carte erroné',
          exp: 'Date d\'expiration erronée',
          cvc: 'Cryptogramme erroné'
        }
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
