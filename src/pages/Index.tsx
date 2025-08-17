const Index = () => {
  console.log('Index component is rendering');
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">
          AtivosTokenizados
        </h1>
        <p className="text-xl text-center mb-8">
          O hub dos ativos tokenizados no Brasil
        </p>
        
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Residencial Alpha 01</h3>
            <p>Categoria: Imóvel | Plataforma: Netspaces</p>
            <p>Ticket mínimo: R$ 10.000 | Rentabilidade: 12% a.a.</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">CarbonCredit BR-01</h3>
            <p>Categoria: Carbono | Plataforma: BlockBR</p>
            <p>Ticket mínimo: R$ 500 | Rentabilidade: 8% a.a.</p>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Precatório SP-22</h3>
            <p>Categoria: Judicial | Plataforma: Droom</p>
            <p>Ticket mínimo: R$ 1.000 | Rentabilidade: 15% a.a.</p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <button 
            className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90"
            onClick={() => alert('Aplicação funcionando!')}
          >
            Testar Aplicação
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;