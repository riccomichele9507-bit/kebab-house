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
  phone: "+39 351 000 0000",
  phoneDisplay: "351 000 0000",
  whatsapp: "+393510000000",
  whatsappDisplay: "351 000 0000",
  whatsappLink:
    "https://wa.me/393510000000?text=" +
    encodeURIComponent("Ciao Kebab House! Vorrei fare un ordine."),
  email: "info@kebabhouse-policoro.it",
  hours: {
    weekdays: "12:00 – 15:00 · 18:00 – 23:30",
    weekend: "12:00 – 15:30 · 18:00 – 00:30",
    closed: "Sempre aperti",
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
