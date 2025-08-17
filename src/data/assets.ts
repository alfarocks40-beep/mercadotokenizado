export interface Asset {
  id: string;
  name: string;
  category: string;
  platform: string;
  ticket: number;
  yield: string;
  term: string;
  url: string;
}

export const ASSETS: Asset[] = [
  { 
    id: '1',
    name: "Residencial Alpha 01", 
    category: "Imóvel", 
    platform: "Netspaces", 
    ticket: 10000, 
    yield: "12% a.a.", 
    term: "36m", 
    url: "https://netspaces.com.br/" 
  },
  { 
    id: '2',
    name: "CarbonCredit BR-01", 
    category: "Carbono", 
    platform: "BlockBR", 
    ticket: 500, 
    yield: "8% a.a.", 
    term: "24m", 
    url: "https://blockbr.com.br/" 
  },
  { 
    id: '3',
    name: "Precatório SP-22", 
    category: "Judicial", 
    platform: "Droom", 
    ticket: 1000, 
    yield: "15% a.a.", 
    term: "18m", 
    url: "https://droom.com.br/" 
  },
  { 
    id: '4',
    name: "CRA Agro Norte", 
    category: "Crédito", 
    platform: "Tokenizadora", 
    ticket: 1000, 
    yield: "CDI + 2%", 
    term: "36m", 
    url: "https://tokenizadora.com.br/" 
  },
  { 
    id: '5',
    name: "Start BR Seed 01", 
    category: "Startup", 
    platform: "Tokeniza", 
    ticket: 500, 
    yield: "variável", 
    term: "60m", 
    url: "https://tokeniza.com.br/" 
  },
  { 
    id: '6',
    name: "FII Token Renda", 
    category: "Fundo", 
    platform: "Liqi", 
    ticket: 250, 
    yield: "10% a.a.", 
    term: "indef.", 
    url: "https://www.liqi.com.br/" 
  }
];

export const CATEGORIES = [...new Set(ASSETS.map(asset => asset.category))].sort();
export const PLATFORMS = [...new Set(ASSETS.map(asset => asset.platform))].sort();