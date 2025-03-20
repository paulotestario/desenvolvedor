import React, { useState } from 'react';
import CepSearch from './CepSearch.jsx'; // Certifique-se de que o caminho está correto
import './modal.css'; // Arquivo com os estilos do modal

// Componente Modal reutilizável
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button className="modal-close" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

// Componente CarrinhoDeCompras
function CarrinhoDeCompras() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="carrinho-container">
      <h1>Carrinho de Compras</h1>
      <p>Aqui estão os itens adicionados no carrinho.</p>
      {/* Botão que abre o modal para finalizar a compra */}
      <button onClick={() => setIsModalOpen(true)}>Finalizar Compra</button>

      {/* Modal com a busca de CEP */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Informe seu CEP</h2>
        <CepSearch />
      </Modal>
    </div>
  );
}

export default CarrinhoDeCompras;
