const Index = () => {
  console.log('Index component is rendering');
  
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>
      <h1>AtivosTokenizados - Teste Simples</h1>
      <p>Se você está vendo isso, a aplicação básica funciona.</p>
      
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid black' }}>
        <h2>Teste de Dados</h2>
        <p>Residencial Alpha 01 - Imóvel - R$ 10.000</p>
        <p>CarbonCredit BR-01 - Carbono - R$ 500</p>
      </div>
      
      <button 
        onClick={() => alert('Botão funcionando!')}
        style={{ 
          marginTop: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Testar Interação
      </button>
    </div>
  );
};

export default Index;