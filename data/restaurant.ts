export const restaurant = {
  name: "Kebab House",
  tagline: "Kebab & Street Food · 100% Halal · Policoro",
  shortTagline: "100% Halal · Nuova Apertura",
  address: {
    street: "Via Dante Alighieri 18",
    city: "Policoro",
    province: "MT",
    postalCode: "75025",
    country: "IT",
    fullAddress: "Via Dante Alighieri 18, 75025 Policoro (MT)",
  },
  phone: "+39 353 349 2178",
  phoneDisplay: "353 349 2178",
  whatsapp: "+393533492178",
  whatsappDisplay: "353 349 2178",
  whatsappLink:
    "https://wa.me/393533492178?text=" +
    encodeURIComponent("Ciao Kebab House! Vorrei fare un ordine."),
  email: "info@kebabhouse-policoro.it",
  hours: {
    weekdays: "11:00 – 00:00 · orario continuato",
    weekend: "11:00 – 00:00 · orario continuato",
    everyday: "Tutti i giorni 11:00 – 00:00",
    closed: "Sempre aperti · orario continuato",
  },
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },
  coords: {
    lat: 40.2122,
    lng: 16.6783,
  },
  googleMapsLink:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Via Dante Alighieri 18, Policoro"),
  mapEmbedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Via Dante Alighieri 18, 75025 Policoro MT") +
    "&output=embed",
  cuisine: ["Kebab", "Street Food", "Halal", "Mediorientale"],
  priceRange: "€",
  halal: true,
} as const;
