'use strict';

angular
  .module('angularApp')
  .config(function ($translateProvider) {
    var base = {
      TITLE: 'Rad.co',
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
          'password.placeholder': 'Mot de passe',
          lost_password: 'Mot de passe oublié'
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
        'default': 'Shop',
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
        edit_empty:       'Article non trouvé',
        order:            'Commander',
        reloading:        'Mise à jour du panier en cours',
        title:            'Panier',
        valid:            'Valider mon panier',
        empty:            'Votre panier est vide',
        address: {
          add:  'Ajouter une adresse'
        },
        details:  'détails',
        total: {
          'subtotal':             'Sous-total',
          'shipping':             'Livraison',
          'tax':                  'TVA',
          'grand_total':          'Total de la commande',
          'raaad_credit':         'Crédits d\'achat',
          'discount':             'Code promo'
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
