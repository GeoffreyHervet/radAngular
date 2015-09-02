"use strict";

angular
  .module('angularApp')
  .config(function ($translateProvider) {
    $translateProvider.translations('fr', {
    "TITLE": "Rad.co",
    "APP_NAME": "Rad",
    "app.free": "Gratuit",
    "app.android": "Sur le Google Play",
    "app.view": "Voir",
    "lang": "Français",
    "lang.fr": "Français (France \/ Belgique)",
    "lang.us": "English (USA)",
    "lang.uk": "English (United kingdom)",
    "lang.de": "Deutsch (Deutschland)",
    "country": "France",
    "country.change": "Changer",
    "store.change": "Changer de boutique",
    "global.loading": "Chargement en cours",
    "404.product": "Produit non trouvé",
    "404.category": "Catégorie non trouvée",
    "login.with_facebook": "Se connecter avec Facebook",
    "login.or_register_email": "Connexion ou inscription par e-mail",
    "form.submit": "Valider",
    "form.connect": "Connexion",
    "form.use": "Utiliser",
    "form.edit": "Modifier",
    "form.state": "Merci de choisir un état",
    "error.connexion_lost": "Problème de connexion, veuillez re-essayer plus tard.",
    "error.unknown_reason": "Problème de connexion, veuillez re-essayer plus tard.",
    "error.facebook_rejected": "Vous ne vous êtes pas authentifié avec Facebook.",
    "error.facebook_canceled": "Vous ne vous êtes pas authentifié avec Facebook.",
    "error.phone_number": "Erreur sur le numéro de téléphone",
    "connexion.form.legend": "Veuillez saisir vos identifiants de connexion.",
    "connexion.form.email.placeholder": "Adresse email",
    "connexion.form.password.placeholder": "Mot de passe",
    "connexion.form.lost_password": "Mot de passe oublié",
    "connexion.facebook": "Se connecter avec facebook",
    "register.new_account": "Créer un nouveau compte",
    "register.title": "Inscription",
    "register.facebook": "S'inscrire avec Facebook",
    "register.form.legend": "Merci de renseigner tous les champs suivantes.",
    "register.form.firstname.placeholder": "Prénom",
    "register.form.lastname.placeholder": "Nom",
    "register.form.email.placeholder": "Adresse email",
    "register.form.password.placeholder": "Mot de passe",
    "register.form.birthday.placeholder": "31\/12\/2000",
    "register.form.cell.placeholder": "06 06 06 06 06",
    "search.empty": "Pas de résultats pour cette recherche.",
    "lostpass.title": "Mot de passe oublié",
    "lostpass.form.legend": "Veuillez renseigner votre adresse e-mail.",
    "lostpass.form.email.placeholder": "Adresse e-mail.",
    "lostpass.success": "Un e-mail vient d'être envoyé à {{email}} afin de réinitialiser votre mot de passe.",
    "menu.default": "Shop",
    "menu.search": "Recherche",
    "menu.center_title": "Menu",
    "menu.title": "Menu",
    "menu.cart": "Panier",
    "menu.profile": "Profil",
    "menu.orders": "Mes commandes",
    "menu.payments": "Mes cartes",
    "menu.addresses": "Mes adresses",
    "menu.free_orders": "Commande offerte",
    "menu.help": "Aide",
    "menu.logout": "Déconnexion",
    "menu.home": "Shop",
    "menu.login": "Connexion",
    "menu.cgv": "Termes & Conditions",
    "menu.new": "Nouveautés",
    "myaccount.myorders.title": "Mes commandes",
    "myaccount.myorders.noorders": "Pas de commandes",
    "myaccount.myorders.order_link": "Commande #{{id}} du {{date}}",
    "myaccount.order.title": "Commande #{{id}}",
    "myaccount.order.detail": "Détail de la commande",
    "myaccount.order.subTotal": "Sous-total",
    "myaccount.order.shipPrice": "Frais de livraison",
    "myaccount.order.credit": "Crédit d'achat",
    "myaccount.order.total": "Total",
    "myaccount.order.payment": "Mode de paiement",
    "myaccount.order.delivery": "Livraison",
    "myaccount.order.billing": "Facturation",
    "myaccount.profile.title": "Mon compte",
    "myaccount.profile.form_legend": "Informations personnelles",
    "myaccount.profile.free_order.title": "Commande offerte",
    "myaccount.profile.free_order.headline": "Faites découvrir Rad.co à vos amis et gagnez du crédit d’achat.",
    "myaccount.profile.free_order.submessage": "Invitez 10 amis et gagnez 30€ de crédit d'achat, invitez 25 amis et gagnez 50€.",
    "myaccount.profile.free_order.sharemsg": "Découvrez la mode sur Rad. Invitez vos amis et gagnez jusqu’à 50€ de crédits {{url}} #radshop via @radshop",
    "myaccount.profile.free_order.share.sms": "Partager par message",
    "myaccount.profile.free_order.share.whatsapp": "Partager par WhatsApp",
    "myaccount.profile.free_order.share.facebook": "Partager par Facebook",
    "myaccount.profile.free_order.share.twitter": "Partager par Twitter",
    "myaccount.profile.free_order.credit_info": "Crédit disponible",
    "myaccount.profile.free_order.used": "{{amount}} dépensés",
    "myaccount.profile.free_order.available": "{{amount}} disponibles",
    "myaccount.profile.free_order.invit_info": "Nombre d’invitations envoyées.",
    "myaccount.profile.free_order.intit_sended": "{{number}} invitations envoyées",
    "myaccount.profile.email": "Adresse e-mail",
    "myaccount.profile.email_new": "Nouvelle adresse email",
    "myaccount.profile.current_password": "Mot de passe actuel",
    "myaccount.profile.current_email_is": "Votre adresse e-mail est actuellement {{email}}.",
    "myaccount.profile.password_help": "Rentrez le nouveau mot de passe puis l'ancien.",
    "myaccount.profile.password": "Mot de passe",
    "myaccount.profile.password_new": "Nouveau mot de passe",
    "myaccount.profile.settings": "Préférences",
    "myaccount.profile.newsletter": "Newsletter",
    "myaccount.profile.newsletter_help": "Je souhaiterai recevoir la newsletter de Rad.co afin de découvrir toutes les dernières infos, nouveautés; et offres spéciales.",
    "myaccount.profile.facebook_link": "Lier mon compte facebook",
    "myaccount.profile.cards": "Paiement",
    "myaccount.profile.no_cards": "Vous n'avez pas de carte de paiement enregistrée.",
    "myaccount.profile.card_info": "Informations de la carte",
    "myaccount.profile.remove_card": "Supprimer la carte",
    "myaccount.profile.addresses": "Adresses",
    "myaccount.profile.addresses_add": "Nouvelle adresse",
    "myaccount.profile.addresses_edit": "Détail de l'adresse",
    "myaccount.profile.remove_address": "Supprimer l'addresse",
    "myaccount.profile.address_edit_save": "Valider les changements",
    "product.description": "Description du produit.",
    "product.specificities": "Spécificités du produit",
    "product.product": "Produit",
    "product.products": "Produits",
    "product.quantity": "Quantité",
    "product.size": "Taille",
    "product.info": "Infos produit",
    "product.share": "Partager",
    "product.add": "Ajouter au panier",
    "product.more_information": "Plus d'infos sur le produit",
    "product.more_products": "Voir plus de produits {{brand}}",
    "product.succes_add_cart": "Produit ajouté au panier !",
    "cart.product_in_cart": "{{nb}} produit dans votre panier",
    "cart.products_in_cart": "{{nb}} produits dans votre panier",
    "cart.edit_empty": "Article non trouvé",
    "cart.confirm": "Confirmation",
    "cart.order": "Commander",
    "cart.reloading": "Mise à jour du panier en cours",
    "cart.title": "Panier",
    "cart.valid": "Valider mon panier",
    "cart.empty": "Votre panier est vide",
    "cart.pay": "Passer commande",
    "cart.success": "Récapitulatif",
    "cart.recap.payment": "Paiement",
    "cart.recap.shipping": "Livraison",
    "cart.recap.billing": "Facturation",
    "cart.recap.promo": "Code promo",
    "cart.recap.promo_placeholder": "Saisir un code promo",
    "cart.recap.promo_apply": "Appliquer le code promo",
    "cart.address.add": "Ajouter une adresse",
    "cart.add_card": "Ajouter un moyen de paiement",
    "cart.details": "détails",
    "cart.total.subtotal": "Sous-total",
    "cart.total.shipping": "Livraison",
    "cart.total.tax": "Dont TVA",
    "cart.total.grand_total": "Total de la commande",
    "cart.total.raaad_credit": "Crédits d'achat",
    "cart.total.discount": "Code promo",
    "cart.delivery.title": "Adresse de livraison",
    "cart.delivery.create_placeholder": "Merci de renseigner votre adresse de livraison.",
    "cart.delivery.firstname": "Prénom",
    "cart.delivery.lastname": "Nom",
    "cart.delivery.address": "Adresse",
    "cart.delivery.address2": "Complément d'adresse",
    "cart.delivery.city": "Ville",
    "cart.delivery.country": "Pays",
    "cart.delivery.postcode": "Code postal",
    "cart.delivery.tel": "Numéro de téléphone",
    "cart.delivery.use_for_billing": "Même adresse de facturation",
    "cart.billing.title": "Adresse de facturation",
    "cart.billing.create_placeholder": "Merci de renseigner votre adresse de facturation.",
    "cart.payment.title": "Paiement",
    "cart.payment.add": "Ajouter une carte",
    "cart.payment.add_placeholder": "Merci de renseigner vos informations de paiement",
    "cart.edit": "Éditer",
    "cart.edit_product": "Éditer le produit",
    "cart.remove": "Retirer du panier",
    "card.not_found": "Carte non trouvée",
    "card.owner": "Nom sur la carte",
    "card.number": "Numéro de carte",
    "card.exp_date": "Date d'expiration (ex: 12\/2018)",
    "card.cvc": "Cryptogramme",
    "card.reusable": "Mémoriser pour mes prochains achats",
    "card.error.number": "Numéro de carte erroné",
    "card.error.exp": "Date d'expiration erronée",
    "card.error.cvc": "Cryptogramme erroné",
    "TU": "Taille unique",
    "CONDITIONS GENERALES DE VENTE": "Conditions générales de vente",
    "error.empty.firstname": "Merci de renseigner le prénom",
    "error.empty.lastname": "Merci de renseigner le nom",
    "error.empty.street": "Merci de renseigner la rue",
    "error.empty.city": "Merci de renseigner la ville",
    "card.pay_data_present": "Pour des raisons de sécurité, vous ne pouvez pas éditer l'ancienne carte.",
    "success.thankyou": "MERCI !",
    "success.text": "Votre commande à bien été enregistrée. Vous allez bientôt recevoir un e-mail récapitulatif.",
    "success.title": "Commande confirmée",
    "card.pretext": "Ce moyen de paiement ne sera utilisé uniquement lors de la validation de votre panier.",
    "form.card.save": "Enregistrer la carte"
}
);
  })
;