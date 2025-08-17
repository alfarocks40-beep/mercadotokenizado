export interface Platform {
  id: string;
  name: string;
  about: string;
  url: string;
}

export const PLATFORMS_DATA: Platform[] = [
  { 
    id: '1',
    name: "Netspaces", 
    about: "Imóveis tokenizados e mercado secundário.", 
    url: "https://netspaces.com.br/" 
  },
  { 
    id: '2',
    name: "Tokenizadora (Vórtx)", 
    about: "Emissão e negociação reguladas de valores mobiliários tokenizados.", 
    url: "https://tokenizadora.com.br/" 
  },
  { 
    id: '3',
    name: "Liqi", 
    about: "Acesso a ativos antes restritos via tokenização.", 
    url: "https://www.liqi.com.br/" 
  },
  { 
    id: '4',
    name: "BlockBR", 
    about: "Infraestrutura e distribuição whitelabel de tokens.", 
    url: "https://blockbr.com.br/" 
  },
  { 
    id: '5',
    name: "Tokeniza", 
    about: "Crowdfunding com foco em democratizar investimentos.", 
    url: "https://tokeniza.com.br/" 
  },
  { 
    id: '6',
    name: "Droom", 
    about: "Tokenização de precatórios e direitos creditórios.", 
    url: "https://droom.com.br/" 
  }
];