-- Create assets table
CREATE TABLE public.assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  platform TEXT NOT NULL,
  ticket INTEGER NOT NULL,
  yield TEXT NOT NULL,
  term TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create platforms table
CREATE TABLE public.platforms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  about TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (making data public for now since this is a display website)
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platforms ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Assets are viewable by everyone" 
ON public.assets 
FOR SELECT 
USING (true);

CREATE POLICY "Platforms are viewable by everyone" 
ON public.platforms 
FOR SELECT 
USING (true);

-- Insert existing assets data
INSERT INTO public.assets (name, category, platform, ticket, yield, term, url) VALUES
('Residencial Alpha 01', 'Imóvel', 'Netspaces', 10000, '12% a.a.', '36m', 'https://netspaces.com.br/'),
('CarbonCredit BR-01', 'Carbono', 'BlockBR', 500, '8% a.a.', '24m', 'https://blockbr.com.br/'),
('Precatório SP-22', 'Judicial', 'Droom', 1000, '15% a.a.', '18m', 'https://droom.com.br/'),
('CRA Agro Norte', 'Crédito', 'Tokenizadora', 1000, 'CDI + 2%', '36m', 'https://tokenizadora.com.br/'),
('Start BR Seed 01', 'Startup', 'Tokeniza', 500, 'variável', '60m', 'https://tokeniza.com.br/'),
('FII Token Renda', 'Fundo', 'Liqi', 250, '10% a.a.', 'indef.', 'https://www.liqi.com.br/');

-- Insert existing platforms data
INSERT INTO public.platforms (name, about, url) VALUES
('Netspaces', 'Imóveis tokenizados e mercado secundário.', 'https://netspaces.com.br/'),
('Tokenizadora (Vórtx)', 'Emissão e negociação reguladas de valores mobiliários tokenizados.', 'https://tokenizadora.com.br/'),
('Liqi', 'Acesso a ativos antes restritos via tokenização.', 'https://www.liqi.com.br/'),
('BlockBR', 'Infraestrutura e distribuição whitelabel de tokens.', 'https://blockbr.com.br/'),
('Tokeniza', 'Crowdfunding com foco em democratizar investimentos.', 'https://tokeniza.com.br/'),
('Droom', 'Tokenização de precatórios e direitos creditórios.', 'https://droom.com.br/');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_assets_updated_at
  BEFORE UPDATE ON public.assets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_platforms_updated_at
  BEFORE UPDATE ON public.platforms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();