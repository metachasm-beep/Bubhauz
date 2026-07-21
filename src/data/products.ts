export interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  materials: string;
  shipping: string;
}

export const products: Product[] = [
  // WARDROBE
  {
    id: "wardrobe-socks",
    category: "wardrobe",
    name: "Cloud-Soft Baby Socks",
    price: "₹800",
    imageUrl: "/Products/Socks.png",
    description: "Keep those tiny toes warm with our ultra-soft, breathable baby socks. Designed with a gentle elastic cuff that stays perfectly in place without leaving marks on delicate skin.",
    materials: "100% GOTS Certified Organic Cotton blend for ultimate breathability. Machine wash cold, tumble dry low.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  },
  {
    id: "wardrobe-nappies",
    category: "wardrobe",
    name: "Premium Bamboo Nappies",
    price: "₹1,200",
    imageUrl: "/Products/Nappies.png",
    description: "Experience the pinnacle of comfort and sustainability. Our premium nappies are ultra-absorbent, hypoallergenic, and crafted to provide a perfect, leak-proof fit while remaining incredibly soft against your baby's skin.",
    materials: "Viscose from Bamboo and Chlorine-free wood pulp. Unscented and free of harsh chemicals.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  },
  {
    id: "wardrobe-apparel-1",
    category: "wardrobe",
    name: "Classic Romper Set",
    price: "₹2,500",
    imageUrl: "/Products/Clothes%201.png",
    description: "An everyday essential elevated. This classic romper set features minimalist design and buttery-soft fabric, allowing your little one complete freedom of movement in unparalleled style.",
    materials: "100% GOTS Certified Organic Cotton. Machine wash delicate.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  },
  {
    id: "wardrobe-gemini",
    category: "wardrobe",
    name: "Signature Bubhauz Knit",
    price: "₹3,200",
    imageUrl: "/Products/Clothes/Gemini_Generated_Image_onnjj2onnjj2onnj.PNG",
    description: "Our signature knitwear brings warmth and luxury together. Perfect for layering during cooler seasons, featuring an elegant, timeless texture that passes down beautifully.",
    materials: "Premium Cotton and Merino Wool blend. Hand wash recommended.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  },

  // NOURISH
  {
    id: "nourish-nibs",
    category: "nourish",
    name: "Silicone Feeding Nibs",
    price: "₹950",
    imageUrl: "/Products/Baby%20Nibs.PNG",
    description: "Make the transition to solid foods safe and joyful. These feeding nibs let your baby explore new tastes without the risk of choking, while soothing teething gums.",
    materials: "100% Food-Grade, BPA-free Silicone. Dishwasher and sterilizer safe.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  },
  {
    id: "nourish-apron-blue",
    category: "nourish",
    name: "Catch-All Bib - Ocean",
    price: "₹1,100",
    imageUrl: "/Products/Apron%20Blue.PNG",
    description: "Mealtime made beautiful and mess-free. Our ergonomic catch-all bib features a deep pocket to catch spills and an adjustable neckband that grows with your child.",
    materials: "100% Food-Grade Silicone. Phthalate and BPA free. Wipe clean or dishwasher safe.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  },
  {
    id: "nourish-apron-pink",
    category: "nourish",
    name: "Catch-All Bib - Rose",
    price: "₹1,100",
    imageUrl: "/Products/Apron%20Pink.PNG",
    description: "Mealtime made beautiful and mess-free. Our ergonomic catch-all bib features a deep pocket to catch spills and an adjustable neckband that grows with your child.",
    materials: "100% Food-Grade Silicone. Phthalate and BPA free. Wipe clean or dishwasher safe.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  },
  {
    id: "nourish-apron-yellow",
    category: "nourish",
    name: "Catch-All Bib - Amber",
    price: "₹1,100",
    imageUrl: "/Products/Apron%20Yellow.PNG",
    description: "Mealtime made beautiful and mess-free. Our ergonomic catch-all bib features a deep pocket to catch spills and an adjustable neckband that grows with your child.",
    materials: "100% Food-Grade Silicone. Phthalate and BPA free. Wipe clean or dishwasher safe.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  },

  // PLAY
  {
    id: "play-gym-1",
    category: "play",
    name: "Scandinavian Wood Play Gym",
    price: "₹4,500",
    imageUrl: "/Products/Play%20Gym%20%201.png",
    description: "Foster early motor skills and sensory development with our minimalist wooden play gym. Designed to beautifully integrate into your modern living space.",
    materials: "Sustainably sourced Beechwood with non-toxic, water-based finishes.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  },
  {
    id: "play-gym-2",
    category: "play",
    name: "Arch Play Gym & Charms",
    price: "₹5,200",
    imageUrl: "/Products/Play%20Gym%202.png",
    description: "An engaging, tactile experience for your baby. Complete with high-contrast sensory charms that encourage reaching, grasping, and visual tracking.",
    materials: "Sustainably sourced Beechwood. Charms made of organic cotton and food-grade silicone.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  },
  {
    id: "play-mat-1",
    category: "play",
    name: "Padded Floor Mat - Cloud",
    price: "₹3,800",
    imageUrl: "/Products/Mat.png",
    description: "Create a safe, plush oasis for tummy time and first rolls. Our premium play mat offers thick, supportive padding with a seamless aesthetic that complements your home decor.",
    materials: "Organic Cotton cover with hypoallergenic polyfill. Cover is removable and machine washable.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  },
  {
    id: "play-mat-2",
    category: "play",
    name: "Padded Floor Mat - Sand",
    price: "₹3,800",
    imageUrl: "/Products/Mat%201.png",
    description: "Create a safe, plush oasis for tummy time and first rolls. Our premium play mat offers thick, supportive padding with a seamless aesthetic that complements your home decor.",
    materials: "Organic Cotton cover with hypoallergenic polyfill. Cover is removable and machine washable.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  },

  // SLEEP
  {
    id: "sleep-hoodie-towel",
    category: "sleep",
    name: "Plush Bear Hooded Towel",
    price: "₹1,800",
    imageUrl: "/Products/Hoodie%20Towel.png",
    description: "Wrap them in pure comfort after bath time. Our luxuriously thick hooded towel keeps them warm and cozy, paving the way for a restful night's sleep.",
    materials: "100% Premium Terry Cotton. Ultra-absorbent and gentle on sensitive skin.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  },
  {
    id: "sleep-simple-towel",
    category: "sleep",
    name: "Classic Muslin Swaddle/Towel",
    price: "₹1,400",
    imageUrl: "/Products/Simple%20Towel.png",
    description: "A versatile essential for sleep routines. This large, breathable muslin fabric can be used as a light towel, a nursing cover, or a secure swaddle for peaceful nights.",
    materials: "100% GOTS Certified Organic Cotton Muslin. Becomes softer with every wash.",
    shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
  }
];

// Helper to get products for a category
export function getProductsByCategory(category: string): Product[] {
  // If Mama, generate placeholders since we have no real images
  if (category === 'mama') {
    return Array.from({ length: 4 }).map((_, i) => {
      const seedId = 999 * (i + 1);
      return {
        id: `mama-${i + 1}`,
        category: 'mama',
        name: `The Mama Edit Essential 0${i + 1}`,
        price: `₹${(i * 15 + 25) * 100}`,
        imageUrl: `https://picsum.photos/seed/${seedId}/600/800`,
        description: "Because you deserve premium care, too. Designed to support mothers with uncompromising quality and comfort.",
        materials: "Premium materials sourced responsibly.",
        shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
      };
    });
  }
  
  return products.filter(p => p.category === category);
}

// Helper to get a single product by ID
export function getProductById(id: string): Product | undefined {
  if (id.startsWith('mama-')) {
    // Generate the matching placeholder on the fly
    const i = parseInt(id.replace('mama-', ''), 10) - 1;
    const seedId = 999 * (i + 1);
    return {
      id: id,
      category: 'mama',
      name: `The Mama Edit Essential 0${i + 1}`,
      price: `₹${(i * 15 + 25) * 100}`,
      imageUrl: `https://picsum.photos/seed/${seedId}/1200/1600`,
      description: "Because you deserve premium care, too. Designed to support mothers with uncompromising quality and comfort.",
      materials: "Premium materials sourced responsibly.",
      shipping: "Complimentary shipping on orders above ₹5000. 14-day hassle-free return policy."
    };
  }
  return products.find(p => p.id === id);
}
