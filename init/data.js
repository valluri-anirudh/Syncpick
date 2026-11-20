const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=60`;

const point = (lng, lat) => ({ type: "Point", coordinates: [lng, lat] });

const sampleListings = [
  {
    title: "QuickFix Plumbing",
    description: "Leak repairs, pipe fitting and bathroom plumbing, same-day service.",
    image: { filename: "seed-plumber", url: img("photo-1585704032915-c3400ca199e7") },
    price: 500,
    location: "Kukatpally, Hyderabad",
    contact: "9999900001",
    category: "plumber",
    geometry: point(78.4017, 17.4948),
  },
  {
    title: "BrightSpark Electricals",
    description: "Wiring, MCB and fan installation, and safety inspections by licensed electricians.",
    image: { filename: "seed-electrician", url: img("photo-1621905251189-08b45d6a269e") },
    price: 400,
    location: "Banjara Hills, Hyderabad",
    contact: "9999900002",
    category: "electrician",
    geometry: point(78.4483, 17.4156),
  },
  {
    title: "Master Carpenters",
    description: "Modular wardrobes, custom furniture and door repairs.",
    image: { filename: "seed-carpenter", url: img("photo-1504148455328-c376907d081c") },
    price: 800,
    location: "Koramangala, Bangalore",
    contact: "9999900003",
    category: "carpenter",
    geometry: point(77.6309, 12.9352),
  },
  {
    title: "ColorCraft Painters",
    description: "Interior and exterior painting, waterproofing and texture finishes.",
    image: { filename: "seed-painter", url: img("photo-1562259949-e8e7689d7828") },
    price: 1500,
    location: "Andheri, Mumbai",
    contact: "9999900004",
    category: "painter",
    geometry: point(72.8697, 19.1136),
  },
  {
    title: "CoolAir HVAC Services",
    description: "AC installation, servicing and gas refilling for homes and offices.",
    image: { filename: "seed-hvac", url: img("photo-1631545806609-8d2c1f1ac9f4") },
    price: 700,
    location: "Connaught Place, Delhi",
    contact: "9999900005",
    category: "hvac",
    geometry: point(77.2167, 28.6315),
  },
  {
    title: "SunPower Solar",
    description: "Rooftop solar installation with net-metering support.",
    image: { filename: "seed-solar", url: img("photo-1509391366360-2e959784a276") },
    price: 25000,
    location: "Hinjewadi, Pune",
    contact: "9999900006",
    category: "solar",
    geometry: point(73.7389, 18.5912),
  },
  {
    title: "BuildRight Contractors",
    description: "Turnkey home construction, extensions and project management.",
    image: { filename: "seed-contractor", url: img("photo-1503387762-592deb58ef4e") },
    price: 5000,
    location: "T Nagar, Chennai",
    contact: "9999900007",
    category: "general contractor",
    geometry: point(80.2341, 13.0418),
  },
  {
    title: "BlueWave Pool & Spa",
    description: "Pool cleaning, maintenance and spa equipment repair.",
    image: { filename: "seed-pool", url: img("photo-1575429198097-0414ec08e8cd") },
    price: 1200,
    location: "Jubilee Hills, Hyderabad",
    contact: "9999900008",
    category: "pool & spa",
    geometry: point(78.4075, 17.4326),
  },
];

module.exports = { data: sampleListings };
