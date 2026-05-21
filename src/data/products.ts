import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import s1 from "@/assets/sabonete-1.jpg";
import s2 from "@/assets/sabonete-2.jpg";
import s3 from "@/assets/sabonete-3.jpg";
import s4 from "@/assets/sabonete-4.jpg";
import s5 from "@/assets/sabonete-5.jpg";
import s6 from "@/assets/sabonete-6.jpg";
import s7 from "@/assets/sabonete-7.jpg";

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
  {
    slug: "sabonete-alecrim",
    name: "Sabonete Artesanal de Alecrim",
    category: "Sabonetes Artesanais",
    price: 28,
    description: "Sabonete vegetal artesanal com alecrim, óleo de coco e manteiga de karité. Limpeza suave e aroma revigorante.",
    image: s1,
    badges: ["Vegano", "Artesanal"],
  },
  {
    slug: "sabonete-lavanda",
    name: "Sabonete Artesanal de Lavanda",
    category: "Sabonetes Artesanais",
    price: 28,
    description: "Sabonete vegetal artesanal com lavanda e aveia. Acalma a pele e proporciona relaxamento.",
    image: s2,
    badges: ["Vegano", "Artesanal"],
  },
  {
    slug: "sabonete-mel",
    name: "Sabonete Artesanal de Mel e Própolis",
    category: "Sabonetes Artesanais",
    price: 32,
    description: "Sabonete hidratante com mel, própolis e azeite de oliva. Nutre e protege a pele naturalmente.",
    image: s3,
    badges: ["Natural", "Hidratante"],
  },
  {
    slug: "sabonete-argila-verde",
    name: "Sabonete Artesanal de Argila Verde",
    category: "Sabonetes Artesanais",
    price: 30,
    description: "Sabonete purificante com argila verde e óleo de tea tree. Controle de oleosidade e desintoxicação da pele.",
    image: s4,
    badges: ["Detox", "Artesanal"],
  },
  {
    slug: "sabonete-calendula",
    name: "Sabonete Artesanal de Calêndula",
    category: "Sabonetes Artesanais",
    price: 30,
    description: "Sabonete suave com calêndula e camomila. Ideal para peles sensíveis e delicadas.",
    image: s5,
    badges: ["Sensível", "Natural"],
  },
  {
    slug: "sabonete-capim-limao",
    name: "Sabonete Artesanal de Capim Limão",
    category: "Sabonetes Artesanais",
    price: 26,
    description: "Sabonete refrescante com capim limão e gengibre. Energiza os sentidos e revitaliza a pele.",
    image: s6,
    badges: ["Refrescante", "Vegano"],
  },
  {
    slug: "sabonete-ervas-finas",
    name: "Sabonete Artesanal de Ervas Finas",
    category: "Sabonetes Artesanais",
    price: 28,
    description: "Sabonete botânico com mix de ervas finas e óleos essenciais. Equilíbrio e bem-estar para o dia a dia.",
    image: s7,
    badges: ["Botânico", "Artesanal"],
  },
];
