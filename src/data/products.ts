import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  badges: string[];
};

export const products: Product[] = [
  {
    slug: "shampoo-solido-alecrim",
    name: "Shampoo Sólido de Alecrim",
    category: "Shampoos Sólidos",
    price: 48,
    description: "Estimula a circulação do couro cabeludo e fortalece os fios, com alecrim e óleos vegetais prensados a frio.",
    image: p1,
    badges: ["Vegano", "Sem sulfato"],
  },
  {
    slug: "oleo-terapeutico-bem-estar",
    name: "Óleo Terapêutico Bem-estar",
    category: "Óleos Terapêuticos",
    price: 86,
    description: "Blend artesanal de jojoba, rícino e alecrim para reparo profundo e brilho natural.",
    image: p2,
    badges: ["Artesanal", "Orgânico"],
  },
  {
    slug: "mascara-cremosa-restauradora",
    name: "Máscara Cremosa Restauradora",
    category: "Condicionadores",
    price: 72,
    description: "Textura rica com manteiga de karité e babosa. Hidratação profunda em poucos minutos.",
    image: p3,
    badges: ["Hidratação"],
  },
  {
    slug: "tonico-capilar-botanico",
    name: "Tônico Capilar Botânico",
    category: "Tônicos Capilares",
    price: 64,
    description: "Borrife diariamente para equilibrar o couro cabeludo e reduzir oleosidade — chá verde, hortelã e cavalinha.",
    image: p4,
    badges: ["Natural", "Sem álcool"],
  },
];
