import type { Option } from "../types";

export const DESTINOS: Option[] = [
  { title: "Bogotá", price: 238559, image: "/img/bogota/bogota.jpg" },
  { title: "Medellín", price: 180000, image: "/img/medellin/medellin.jpg" },
  { title: "Cartagena", price: 350000, image: "/img/cartagena/cartagena.jpg" },
  { title: "Cali", price: 200000, image: "/img/cali/cali.jpg" },
  { title: "San Andrés", price: 250000, image: "/img/san-andres/sanAndres.jpg" },
];

export const LODGINGS: Option[] = [
  // Bogotá
  { title: "Hotel Hyatt Place", price: 515200, image: "/img/bogota/hyatt-bogota.jpg", availableCities: ["Bogotá"] },
  { title: "Hotel Movich Buró", price: 584200, image: "/img/bogota/movich-buro26.jpg", availableCities: ["Bogotá"] },
  { title: "Airbnb Centro Histórico", price: 150000, image: "/img/bogota/airbnb-centro.jpg", availableCities: ["Bogotá"] },
  { title: "Hostal Socialtel Candelaria", price: 55000, image: "/img/bogota/socialtel-candelaria.jpg", availableCities: ["Bogotá"] },
  { title: "Coliving San Felipe", price: 2000000, image: "/img/bogota/plura-san-felipe.jpg", availableCities: ["Bogotá"] },
  
  // Medellín
  { title: "Hotel 23 Medellín", price: 225400, image: "/img/medellin/hotel23-medellin.jpg", availableCities: ["Medellín"] },
  { title: " Hotel Four Points", price: 322000, image: "/img/medellin/fourpoints-medellin.jpg", availableCities: ["Medellín"] },
 { title: "Hostal Purple Monkey", price: 194400, image: "/img/medellin/hostal-purple-monkey.jpg", availableCities: ["Medellín"] },
  { title: "Airbnb El Poblado", price: 240000, image: "/img/medellin/airbnb-poblado.jpg", availableCities: ["Medellín"] },
{ title: "Airbnb con Piscina", price: 240000, image: "/img/medellin/airbnb-poblado-piscina.jpg", availableCities: ["Medellín"] },


  // Cartagena
  { title: "Hotel Hilton Cartagena", price: 521700, image: "/img/cartagena/hilton-cartagena.jpg", availableCities: ["Cartagena"] },
  { title: "Hotel Estelar Cartagena", price: 465000, image: "/img/cartagena/estelar-cartagena.jpg", availableCities: ["Cartagena"] },
{ title: "Cabaña en acantilado", price: 450000, image: "/img/cartagena/cabana-acantilado.jpg", availableCities: ["Cartagena"] },
{ title: "Glamping Playa Blanca", price: 460000, image: "/img/cartagena/glamping.jpg", availableCities: ["Cartagena"] },
{ title: "Hostal Pachamama Cartagena", price: 120000, image: "/img/cartagena/hostal-pachamama.jpg", availableCities: ["Cartagena"] },
  
// Cali
  { title: "Hotel InterContinental Cali", price: 300000, image: "/img/cali/intercontinental-cali.jpg", availableCities: ["Cali"] },
  { title: "Hotel Spiwak Cali", price: 220000, image: "/img/cali/spiwak-cali.jpg", availableCities: ["Cali"] },
{ title: "Hostal Ding‑Dong", price: 80000, image: "/img/cali/hostal-dingdong.jpg", availableCities: ["Cali"] },  
{ title: "Airbnb Apartamento Centro", price: 180000, image: "/img/cali/airbnb-cali.jpg", availableCities: ["Cali"] },
{ title: "Glamping Kuyana", price: 450000, image: "/img/cali/kuyana-glamping.jpg", availableCities: ["Cali"] },

  // San Andrés
  { title: "Hotel Decameron Isleño", price: 900000, image: "/img/san-andres/decameron-isleno.jpg", availableCities: ["San Andrés"] },
  { title: "Hotel Sunrise", price: 450000, image: "/img/san-andres/sunrise-sanis.jpg", availableCities: ["San Andrés"] },
{ title: "Hostal Blue Almond", price: 21000, image: "/img/san-andres/blue-almond.jpg", availableCities: ["San Andrés"] },  
{ title: "Magno Glamping Biosphere", price: 230000, image: "/img/san-andres/glamping.jpg", availableCities: ["San Andrés"] },
{ title: "Cabaña Diana", price: 200000, image: "/img/san-andres/cabana-diana.jpg", availableCities: ["San Andrés"] },

];

export const TRANSPORTS: Option[] = [
  { title: "Avión", price: 450000, image: "/img/general/avion.jpg", availableCities: ["Todas"] },
  { title: "Bus", price: 100000, image: "/img/general/bus.jpg", availableCities: ["Todas"] },
  { title: "Carro", price: 180000, image: "/img/general/carro.jpg", availableCities: ["Todas"] },

  //Bogota
  { title: "TransMilenio", price: 3400, image: "/img/bogota/transmi.jpg", availableCities: ["Bogotá"] },
{ title: "Taxi", price: 7000, image: "/img/general/taxi.jpg", availableCities: ["Bogotá"] },

  //Medellin
  { title: "Metro Medellín", price: 4000, image: "/img/medellin/metro.jpg", availableCities: ["Medellín"] },
{ title: "Metro Cable", price: 4000, image: "/img/medellin/metro-cable.jpg", availableCities: ["Medellín"] },

//cartagena
{ title: "Taxi", price: 20000, image: "/img/general/taxi.jpg", availableCities: ["Cartagena"] },
{ title: "Mototaxi / Tuk‑tuk", price: 10000, image: "/img/cartagena/mototaxi.jpg", availableCities: ["Cartagena"] },

  //Cali
  { title: "MIO Cali", price: 3000, image: "/img/cali/mio.jpg", availableCities: ["Cali"] },
{ title: "Taxi (Cali)", price: 6500, image: "/img/general/taxi.jpg", availableCities: ["Cali"] },

//San Andres
{ title: "Taxi ", price: 20000, image: "/img/general/taxi.jpg", availableCities: ["San Andrés"] },  
{ title: "moto", price: 70000, image: "/img/san-andres/moto.jpg", availableCities: ["San Andrés"] },

];

export const ACTIVITIES: Option[] = [
  // Bogotá
  { title: "Museo del Oro", price: 5000, image: "/img/bogota/museo-oro.jpg", availableCities: ["Bogotá"] },
  { title: "Museo Botero", price: 0, image: "/img/bogota/museo-botero.jpg", availableCities: ["Bogotá"] },
  { title: "Tour Street Art", price: 120000, image: "/img/bogota/tour-bogota.jpg", availableCities: ["Bogotá"] },
{ title: "Subida al Cerro de Monserrate", price: 35000, image: "/img/bogota/monserrate.jpg", availableCities: ["Bogotá"] },
  { title: "Jardín Botánico", price: 5000, image: "/img/bogota/jardin-botanico.jpg", availableCities: ["Bogotá"] },

  // Medellín
  { title: "Museo de Antioquia", price: 25000, image: "/img/medellin/museo-antioquia.jpg", availableCities: ["Medellín"] },
  { title: "Parque Arví Senderismo", price: 40000, image: "/img/medellin/sendero.jpg", availableCities: ["Medellín"] },
  { title: "Tour Comuna 13", price: 120000, image: "/img/medellin/tour-medellin.jpg", availableCities: ["Medellín"] },
{ title: "Parque Explora", price: 40000, image: "/img/medellin/parque-explora.jpg", availableCities: ["Medellín"] },
  { title: "Tour Guatapé y Peñol", price: 219000, image: "/img/medellin/guatape-penol.jpg", availableCities: ["Medellín"] },

  // Cartagena
  { title: "Castillo San Felipe", price: 30000, image: "/img/cartagena/castillo-cartagena.jpg", availableCities: ["Cartagena"] },
  { title: "Tour Islas Rosario", price: 150000, image: "/img/cartagena/islas-rosario.jpg", availableCities: ["Cartagena"] },
  { title: "Paseo Nocturno Cartagena", price: 50000, image: "/img/cartagena/paseo-nocturno.jpg", availableCities: ["Cartagena"] },
{ title: "Tour Volcán Totumo", price: 150000, image: "/img/cartagena/totumo.jpg", availableCities: ["Cartagena"] },  
{ title: "Tour Mercado Bazurto", price: 132000, image: "/img/cartagena/mercado.jpg", availableCities: ["Cartagena"] },


  // Cali
  { title: "Museo de Arte Moderno", price: 25000, image: "/img/cali/museo-cali.jpg", availableCities: ["Cali"] },
  { title: "Senderismo Farallones", price: 40000, image: "/img/cali/sendero.jpg", availableCities: ["Cali"] },
  { title: "Ciclismo Urbano", price: 15000, image: "/img/cali/ciclismo.jpg", availableCities: ["Cali"] },
{ title: "Walking Centro Histórico ", price: 60000, image: "/img/cali/centro-historico.jpg", availableCities: ["Cali"] },
{ title: "Tour Afro‑histórico", price: 120000, image: "/img/cali/tour-afro.jpg", availableCities: ["Cali"] },

  // San Andrés
  { title: "Deportes Acuáticos", price: 70000, image: "/img/san-andres/deportes-acuaticos.jpg", availableCities: ["San Andrés"] },
  { title: "Tour en Bote", price: 120000, image: "/img/san-andres/tour-bote.jpg", availableCities: ["San Andrés"] },
  { title: "Vida Nocturna", price: 50000, image: "/img/san-andres/vida-nocturna.jpg", availableCities: ["San Andrés"] },
  { title: "Excursión a Johnny Cay", price: 80000, image: "/img/san-andres/johnny-cay.jpg", availableCities: ["San Andrés"] },
{ title: "Snorkel en La Piscinita", price: 65000, image: "/img/san-andres/snorkel-piscinita.jpg", availableCities: ["San Andrés"] },
];