import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const deliveryZones = [
  {
    id: 1,
    name: 'Zona Campo Grande',
    center: { lat: -22.879489, lng: -43.544272 },
    radiusKm: 5,
    price: 15.0
  },
  {
    id: 2,
    name: 'Zona Mangaratiba',
    center: { lat: -22.924943, lng: -43.908152 },
    radiusKm: 20,
    price: 25.0
  },
];

const choppOptions = [
  { label: 'Chopp Costa Verde 50L - 640', value: 'Chopp Costa Verde 50L', price: 640 },
  { label: 'Chopp Ravache 30L - 470', value: 'Chopp Ravache 30L', price: 470 },
  { label: 'Chopp Brahma 50L - 880', value: 'Chopp Brahma 50L', price: 880 },
];

function MultiZoneDeliveryChecker() {
  const [cep, setCep] = useState('');
  const [cepPosition, setCepPosition] = useState(null);
  const [zonesFound, setZonesFound] = useState([]);
  const [error, setError] = useState('');

  // Dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    dataEntrega: '',
    dataRetirada: '',
    endereco: '',
    choppOption: '',
    frete: 0,
  });

  const handleCheckCEP = () => {
    setError('');
    setCepPosition(null);
    setZonesFound([]);
    if (cep) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: cep }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const loc = results[0].geometry.location;
          const position = { lat: loc.lat(), lng: loc.lng() };
          setCepPosition(position);

          // Verifica as zonas de entrega e define o frete conforme a primeira zona encontrada
          const foundZones = deliveryZones.filter(zone => {
            const latLngZone = new window.google.maps.LatLng(zone.center.lat, zone.center.lng);
            const latLngCEP = new window.google.maps.LatLng(position.lat, position.lng);
            const distance = window.google.maps.geometry.spherical.computeDistanceBetween(latLngZone, latLngCEP);
            return distance <= zone.radiusKm * 1000;
          });
          setZonesFound(foundZones);

          let frete = 0;
          if (foundZones.length > 0) {
            frete = foundZones[0].price;
          }
          setFormData(prev => ({
            ...prev,
            endereco: results[0].formatted_address,
            frete: frete
          }));
        } else {
          setError("Erro ao buscar CEP: " + status);
        }
      });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Calcula o período de aluguel (considerando datas como inclusivas)
    const dateEntrega = new Date(formData.dataEntrega);
    const dateRetirada = new Date(formData.dataRetirada);
    const diffTime = dateRetirada.getTime() - dateEntrega.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    let additionalCharge = 0;
    if (diffDays > 2) {
      additionalCharge = (diffDays - 2) * 80;
    }

    // Encontra o preço do chopp selecionado
    const selectedChopp = choppOptions.find(opt => opt.label === formData.choppOption);
    const choppPrice = selectedChopp ? selectedChopp.price : 0;

    // Calcula o total: frete + preço do chopp + adicional da chopeira (se houver)
    const total = formData.frete + choppPrice + additionalCharge;

    // Monta a mensagem do pedido
    const message = `Pedido Completo:
Nome: ${formData.nome}
Telefone: ${formData.telefone}
Data de Entrega: ${formData.dataEntrega}
Data da Retirada: ${formData.dataRetirada}
Período de Aluguel: ${diffDays} dia(s)
Endereço: ${formData.endereco}
CEP: ${cep}
Opção de Chopp: ${formData.choppOption}
Frete: R$ ${formData.frete.toFixed(2)}
Adicional Chopeira: R$ ${additionalCharge.toFixed(2)}
Total: R$ ${total.toFixed(2)}`;

    // Número do WhatsApp (incluindo código do país, ex: 55 para Brasil)
    const whatsappNumber = '5521993149994';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    
    // Abre o WhatsApp em uma nova aba com a mensagem pré-preenchida
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Verificador de CEP e Pedido</h1>
      
      <div className="row">
        <div className="col-12 col-md-6 mb-4">
          {/* Input para CEP */}
          <div className="mb-3">
            <label htmlFor="cepInput" className="form-label">Digite o CEP (ex: 23088-000)</label>
            <input
              id="cepInput"
              type="text"
              className="form-control"
              placeholder="23088-000"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </div>
          <button onClick={handleCheckCEP} className="btn btn-primary mb-3">
            Verificar CEP
          </button>

          {/* Exibe as zonas de entrega encontradas */}
          {zonesFound.length > 0 && (
            <div className="alert alert-success">
              <p className="mb-1">CEP está dentro das seguintes zonas de entrega:</p>
              <ul className="mb-0">
                {zonesFound.map(zone => (
                  <li key={zone.id}>{zone.name} - Frete: R$ {zone.price.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          )}
          
          {cepPosition && zonesFound.length === 0 && (
            <div className="alert alert-warning">
              CEP NÃO está dentro de nenhuma zona de entrega.
            </div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          {/* Formulário para o pedido (aparece se o CEP for válido) */}
          {cepPosition && (
            <form onSubmit={handleFormSubmit} className="mt-4">
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className="form-control"
                  value={formData.nome}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefone" className="form-label">Telefone Celular</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  className="form-control"
                  value={formData.telefone}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dataEntrega" className="form-label">Data de Entrega</label>
                <input
                  type="date"
                  id="dataEntrega"
                  name="dataEntrega"
                  className="form-control"
                  value={formData.dataEntrega}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dataRetirada" className="form-label">Data da Retirada</label>
                <input
                  type="date"
                  id="dataRetirada"
                  name="dataRetirada"
                  className="form-control"
                  value={formData.dataRetirada}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="endereco" className="form-label">Endereço de Entrega</label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  className="form-control"
                  value={formData.endereco}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="choppOption" className="form-label">Opção de Chopp</label>
                <select
                  id="choppOption"
                  name="choppOption"
                  className="form-select"
                  value={formData.choppOption}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Selecione uma opção</option>
                  {choppOptions.map((opt, idx) => (
                    <option key={idx} value={opt.label}>{opt.label}</option>
                  ))}
                </select>
              </div>
              {/* Exibe o campo de frete (somente leitura) */}
              <div className="mb-3">
                <label htmlFor="frete" className="form-label">Frete (R$)</label>
                <input
                  type="number"
                  id="frete"
                  name="frete"
                  className="form-control"
                  value={formData.frete}
                  readOnly
                />
              </div>
              <button type="submit" className="btn btn-success">
                Enviar Pedido via WhatsApp
              </button>
            </form>
          )}
        </div>
        
        {/* Coluna com o mapa */}
        <div className="col-12 col-md-6">
          <LoadScript
            googleMapsApiKey="AIzaSyATbaD0Ue9jdRR-nPVsGuRX2IjRJf_vcYI"
            libraries={["geometry"]}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={deliveryZones[0].center}
              zoom={12}
            >
              {deliveryZones.map(zone => (
                <React.Fragment key={zone.id}>
                  <Marker position={zone.center} />
                  <Circle
                    center={zone.center}
                    radius={zone.radiusKm * 1000}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 1,
                      strokeWeight: 3,
                      fillColor: "#FF0000",
                      fillOpacity: 0.2,
                    }}
                  />
                </React.Fragment>
              ))}
              {cepPosition && (
                <Marker
                  position={cepPosition}
                  icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                />
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}

export default MultiZoneDeliveryChecker;
