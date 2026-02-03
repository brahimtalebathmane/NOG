export const translations = {
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'عن الجمعية',
      works: 'الأعمال',
      advertisements: 'الإعلانات',
      legal: 'النظام الداخلي',
      donate: 'تبرع الآن',
      contact: 'تواصل معنا'
    },
    home: {
      donate: 'تبرع الآن',
      latestWorks: 'أحدث الأعمال',
      latestAnnouncements: 'أحدث الإعلانات',
      viewAll: 'عرض الكل',
      learnMore: 'اعرف المزيد'
    },
    donate: {
      title: 'ساهم معنا في الخير',
      description: 'للتبرع، يرجى التواصل معنا عبر واتساب',
      whatsappButton: 'تواصل عبر واتساب',
      paymentInfo: 'معلومات الدفع',
      bankDetails: 'التفاصيل المصرفية'
    },
    contact: {
      title: 'تواصل معنا',
      whatsapp: 'واتساب',
      description: 'للاستفسارات والتبرعات، يرجى التواصل معنا عبر واتساب'
    },
    footer: {
      about: 'عن الجمعية',
      quickLinks: 'روابط سريعة',
      contact: 'تواصل معنا',
      rights: 'جميع الحقوق محفوظة',
      associationName: 'جمعية مانقص مال من صدقة'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À propos',
      works: 'Nos activités',
      advertisements: 'Annonces',
      legal: 'Règlement',
      donate: 'Faire un don',
      contact: 'Contact'
    },
    home: {
      donate: 'Faire un don',
      latestWorks: 'Dernières activités',
      latestAnnouncements: 'Dernières annonces',
      viewAll: 'Voir tout',
      learnMore: 'En savoir plus'
    },
    donate: {
      title: 'Contribuez avec nous au bien',
      description: 'Pour faire un don, veuillez nous contacter via WhatsApp',
      whatsappButton: 'Contacter via WhatsApp',
      paymentInfo: 'Informations de paiement',
      bankDetails: 'Coordonnées bancaires'
    },
    contact: {
      title: 'Contactez-nous',
      whatsapp: 'WhatsApp',
      description: 'Pour toute demande de renseignements ou don, veuillez nous contacter via WhatsApp'
    },
    footer: {
      about: 'À propos',
      quickLinks: 'Liens rapides',
      contact: 'Contact',
      rights: 'Tous droits réservés',
      associationName: 'Association Manqass Mal Min Sadaqa'
    }
  }
};

export type TranslationKey = keyof typeof translations.ar;
