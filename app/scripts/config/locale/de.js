"use strict";

angular
  .module('angularApp')
  .config(function ($translateProvider) {
    $translateProvider.translations('de', {
    "TITLE": "Rad.co",
    "APP_NAME": "Rad",
    "lang": "Deutsch",
    "app.free": "Free",
    "app.android": "On the Google Play",
    "app.view": "View",
    "lang.fr": "Français (France \/ Belgique)",
    "lang.us": "English (USA)",
    "lang.uk": "English (United kingdom)",
    "lang.de": "Deutsch (Deutschland)",
    "country": "Deutschland",
    "country.change": "Change",
    "store.change": "Shop wechseln",
    "global.loading": "Wird geladen",
    "404.product": "Produkt konnte nicht gefunden werden",
    "404.category": "Kategorie konnte nicht gefunden werden",
    "login.with_facebook": "Mit Facebook anmelden",
    "login.or_register_email": "Anmeldung oder Registrierung via E-Mail",
    "form.submit": "Bestätigen",
    "form.connect": "Anmelden",
    "form.use": "Verwenden",
    "form.edit": "Bearbeiten",
    "form.state": "",
    "error.connexion_lost": "Probleme bei der Anmeldung, bitte versuchen Sie es später erneut.",
    "error.unknown_reason": "Probleme bei der Anmeldung, bitte versuchen Sie es später erneut.",
    "error.facebook_rejected": "Leider konnten Sie nicht über Facebook angemeldet werden.",
    "error.phone_number": "Ungültige Handynummer",
    "connexion.form.legend": "Bitte geben Sie Ihre Anmeldedaten ein.",
    "connexion.form.email.placeholder": "E-Mail-Adresse",
    "connexion.form.password.placeholder": "Passwort",
    "connexion.form.lost_password": "Passwort vergessen?",
    "connexion.facebook": "Mit Facebook anmelden",
    "register.new_account": "Konto erstellen",
    "register.title": "Registrierung",
    "register.facebook": "Mit Facebook registrieren",
    "register.form.legend": "Bitte füllen Sie alle nachfolgenden Felder aus. ",
    "register.form.firstname.placeholder": "Vorname",
    "register.form.lastname.placeholder": "Nachname",
    "register.form.email.placeholder": "E-Mail-Adresse",
    "register.form.password.placeholder": "Passwort",
    "register.form.birthday.placeholder": "31\/12\/2000",
    "register.form.cell.placeholder": "06 06 06 06 06",
    "search.empty": "Keine Artikel gefunden.",
    "lostpass.title": "Passwort vergessen",
    "lostpass.form.legend": "Bitte geben Sie Ihre E-Mail-Adresse an.",
    "lostpass.form.email.placeholder": "E-Mail-Adresse.",
    "lostpass.success": "Sie erhalten in Kürze ein E-Mail an {{email}}, um Ihr Passwort zurückzusetzen.",
    "menu.default": "Shop",
    "menu.search": "Suchen",
    "menu.center_title": "Menu",
    "menu.title": "Menu",
    "menu.cart": "Einkaufstasche",
    "menu.profile": "Mein Konto",
    "menu.orders": "Bestellungen",
    "menu.payments": "Zahlung",
    "menu.addresses": "Meine Adressen",
    "menu.free_orders": "Guthaben",
    "menu.help": "Hilfe",
    "menu.logout": "Abmelden",
    "menu.home": "Shop",
    "menu.login": "Anmelden",
    "menu.cgv": "AGB",
    "menu.new": "Neu",
    "myaccount.myorders.title": "Bestellungen",
    "myaccount.myorders.noorders": "Keine Bestellungen",
    "myaccount.myorders.order_link": "Bestellung #{{id}} vom {{date}}",
    "myaccount.order.title": "Bestellung #{{id}} ",
    "myaccount.order.detail": "Details der Bestellung",
    "myaccount.order.subTotal": "Zwischensumme",
    "myaccount.order.shipPrice": "Versandkosten",
    "myaccount.order.credit": "Kaufguthaben",
    "myaccount.order.total": "Gesamtbetrag",
    "myaccount.order.payment": "Zahlungsart",
    "myaccount.order.delivery": "Lieferadresse",
    "myaccount.order.billing": "Rechnungsadresse",
    "myaccount.profile.title": "Mein Konto",
    "myaccount.profile.form_legend": "Persönliche Informationen",
    "myaccount.profile.free_order.title": "Guthaben",
    "myaccount.profile.free_order.headline": "Freunde einladen und Einkaufsguthaben erhalten",
    "myaccount.profile.free_order.submessage": "10 Freunde einladen und Sie erhalten 30 € Einkaufsguthaben, bei 25 Freunden sogar 50 €.",
    "myaccount.profile.free_order.sharemsg": "Entdecken Sie urbane Mode auf Rad. Freunde einladen und bis zu 50 €  Kaufguthaben auf {{url}} erhalten. #radshop via @radshop",
    "myaccount.profile.free_order.share.sms": "Via Nachricht einladen",
    "myaccount.profile.free_order.share.whatsapp": "Via WhatsApp einladen",
    "myaccount.profile.free_order.share.facebook": "Via Facebook einladen",
    "myaccount.profile.free_order.share.twitter": "via Twitter einladen",
    "myaccount.profile.free_order.credit_info": "Verfügbares Guthaben.",
    "myaccount.profile.free_order.used": "{{amount}} ausgegeben",
    "myaccount.profile.free_order.available": "{{amount}} verfügbar",
    "myaccount.profile.free_order.invit_info": "Anzahl der versendeten Einladungen.",
    "myaccount.profile.free_order.intit_sended": "{{number}} Einladungen versendet",
    "myaccount.profile.email": "E-Mail-Adresse",
    "myaccount.profile.email_new": "Neue E-Mail-Adresse",
    "myaccount.profile.current_password": "Aktuelles Passwort",
    "myaccount.profile.current_email_is": "Ihre aktuelle E-Mail-Adresse lautet {{email}}.",
    "myaccount.profile.password_help": "Bitte geben Sie Ihr neues Passwort und darunter Ihr aktuelles Passwort ein.",
    "myaccount.profile.password": "Passwort",
    "myaccount.profile.password_new": "Neues Passwort",
    "myaccount.profile.settings": "Einstellungen",
    "myaccount.profile.newsletter": "Newsletter",
    "myaccount.profile.newsletter_help": "Ich möchte gerne den Newsletter von Rad.co erhalten, um über die aktuellsten Informationen, Neuheiten und Angebote informiert zu werden.",
    "myaccount.profile.facebook_link": "Verknüpfen Sie mein Facebook-Konto.",
    "myaccount.profile.cards": "Zahlung",
    "myaccount.profile.no_cards": "Sie haben keine Kreditkarte registriert.",
    "myaccount.profile.card_info": "Informationen zu Ihrer Kreditkarte",
    "myaccount.profile.remove_card": "Meine Kreditkarte entfernen",
    "myaccount.profile.addresses": "Adressen",
    "myaccount.profile.addresses_add": "Neue Adresse",
    "myaccount.profile.addresses_edit": "Details der Adresse",
    "myaccount.profile.remove_address": "Adresse entfernen",
    "myaccount.profile.address_edit_save": "Änderungen bestätigen",
    "product.description": "Produktbeschreibung",
    "product.specificities": "Produktspezifikationen",
    "product.product": "Produkt",
    "product.products": "Produkte",
    "product.quantity": "Anzahl",
    "product.size": "Größe",
    "product.info": "Informationen",
    "product.share": "Teilen",
    "product.add": "In die Tasche",
    "product.more_information": "Weitere Informationen zum Produkt",
    "product.more_products": "Weitere Produkte von {{brand}} ansehen",
    "product.succes_add_cart": "Produkt wurde hinzugefügt!",
    "cart.product_in_cart": "{{nb}} Produkt in Ihrer Tasche",
    "cart.products_in_cart": "{{nb}} Produkte in Ihrer Tasche",
    "cart.edit_empty": "Artikel konnte nicht gefunden werden",
    "cart.confirm": "Bestätigung",
    "cart.order": "Zur Tasche",
    "cart.reloading": "Einkaufstasche aktualisieren",
    "cart.title": "Einkaufstasche",
    "cart.valid": "Zur Kasse",
    "cart.empty": "Ihre Einkaufstasche ist leer.",
    "cart.pay": "Jetzt kaufen",
    "cart.success": "Zusammenfassung",
    "cart.recap.payment": "Zahlung",
    "cart.recap.shipping": "Lieferadresse",
    "cart.recap.billing": "Rechnungsadresse",
    "cart.recap.promo": "Rabattcode",
    "cart.recap.promo_placeholder": "Rabattcode eingeben",
    "cart.recap.promo_apply": "Rabattcode einlösen",
    "cart.address.add": "Adresse hinzufügen",
    "cart.add_card": "Fügen Sie eine Kreditkarte hinzu",
    "cart.details": "Details",
    "cart.total.subtotal": "Zwischensumme",
    "cart.total.shipping": "Lieferung und Versand",
    "cart.total.tax": "Inklusive MwSt.",
    "cart.total.grand_total": "Gesamtbetrag inkl. MwSt. ",
    "cart.total.raaad_credit": "Rad Guthaben",
    "cart.total.discount": "Rabattcode",
    "cart.delivery.title": "Lieferadresse",
    "cart.delivery.create_placeholder": "Bitte geben Sie Ihre Lieferadresse an.",
    "cart.delivery.firstname": "Vorname",
    "cart.delivery.lastname": "Nachname",
    "cart.delivery.address": "Adresse",
    "cart.delivery.address2": "Adresszusatz\/Firma",
    "cart.delivery.city": "Stadt",
    "cart.delivery.country": "",
    "cart.delivery.postcode": "Postleitzahl",
    "cart.delivery.tel": "Handynummer",
    "cart.delivery.use_for_billing": "Gleiche Rechnungsadresse",
    "cart.billing.title": "Rechnungsadresse",
    "cart.billing.create_placeholder": "Bitte geben Sie Ihre Rechnungsadresse an.",
    "cart.payment.title": "Zahlung",
    "cart.payment.add": "Eine Kreditkarte hinzufügen",
    "cart.payment.add_placeholder": "Bitte geben Sie Ihre Zahlungsinformationen an.",
    "cart.edit": "Bearbeiten",
    "cart.edit_product": "Produkt bearbeiten",
    "cart.remove": "Aus der Tasche entfernen",
    "card.not_found": "Karte konnte nicht gefunden werden",
    "card.owner": "Name des Karteninhabers",
    "card.number": "Kreditkartennummer",
    "card.exp_date": "Ablaufdatum (ex: 12/2018)",
    "card.cvc": "Prüfnummer",
    "card.reusable": "Diese Angaben zur späteren Verwendung speichern.",
    "card.error.number": "Kreditkartennummer ist inkorrekt.",
    "card.error.exp": "Ablaufdatum ist inkorrekt.",
    "card.error.cvc": "Prüfnummer ist inkorrekt.",
    "TU": "OS",
    "CONDITIONS GENERALES DE VENTE": "Terms and conditions",
    "error.empty.firstname": "Please fill your firstname",
    "error.empty.lastname": "Please fill your name",
    "error.empty.street": "Please fill your street",
    "error.empty.city": "Please fill your city",
    "error.facebook_canceled": "Vous ne vous êtes pas authentifié avec Facebook.",
    "card.pay_data_present": "For security reasons, you will not able to modify your previous card informations",
    "success.thankyou": "DANKE !",
    "success.text": "Ihre Bestellung registriert worden. Sie werden bald eine Zusammenfassung E-Mail erhalten.",
    "success.title": "Bestätigung",
    "card.pretext": "Die von Ihnen angegebenen Zahlungsinformationen werden nur nach Abschluss Ihrer Bestellung verwendet.",
    "form.card.save": "Save this card"
}
);
  })
;