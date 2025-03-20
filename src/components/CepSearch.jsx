import React, { useState } from 'react';

function CepSearch() {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Substitua pelos seus dados de acesso à API
  const APP_KEY = 'RpSuudyIsl9SqgKdBdjC3AhSRUruAWJN';
  const APP_SECRET = '4mLX5TNPZoKHfexFH4YQQ8Zfy3VXY9a6yRwObN2nifj1mkYi';

  const buscarCEP = async () => {
    if (!cep.trim()) return;
    setLoading(true);
    setError('');
    setAddress(null);

    try {
      // Garante que o CEP seja codificado corretamente
      const encodedCep = encodeURIComponent(cep.trim());
      const url = `https://webmaniabr.com/api/1/cep/${encodedCep}/?app_key=${APP_KEY}&app_secret=${APP_SECRET}`;
  
      const response = await fetch(url);
      
      if (!response.ok) {
        let errorMsg = 'Erro ao buscar o CEP';
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
          console.error('Erro detalhado:', errorData);
        } catch (parseError) {
          console.error('Não foi possível analisar o erro', parseError);
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setAddress(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Buscar CEP</h2>
      <input
        type="text"
        placeholder="Digite o CEP (ex: 05426-100)"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />
      <button onClick={buscarCEP}>Buscar</button>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      {address && (
        <div className="lead text-muted">
          <p><strong>CEP:</strong> {address.cep}</p>
          <p><strong>Logradouro:</strong> {address.logradouro}</p>
          <p><strong>Bairro:</strong> {address.bairro}</p>
          <p><strong>Cidade:</strong> {address.cidade}</p>
          <p><strong>Estado:</strong> {address.estado}</p>
        </div>
      )}
    </div>
  );
}

export default CepSearch;
