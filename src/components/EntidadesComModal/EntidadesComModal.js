// PedidosComModal.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Modal from './Modal';

function PedidosComModal({ title, items, fetchItemsData, fetchItems }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentItemData, setCurrentItemData] = useState([]);

  useEffect(() => {
    if (selectedItem !== null) {
      fetchItemsData(selectedItem)
        .then((data) => setCurrentItemData(data))
        .catch(() => setCurrentItemData([]));
    }
  }, [selectedItem, fetchItemsData]);

  const handleItemClick = (id) => {
    setSelectedItem(id);
    setModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 px-4 pt-6 pb-6 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 lg:p-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`w-full h-40 flex justify-center items-center text-white text-2xl font-bold rounded-lg cursor-pointer lg:hover:scale-105 shadow-xl ${
                item.status === 'disponivel' ? 'bg-gray-700' : 'bg-red-400'
              }`}
              onClick={() => handleItemClick(item.id)}
            >
              <h1>{title} {item.numero || item.nome}</h1>
            </div>
          ))}
        </div>
      </div>
      {modalOpen && selectedItem !== null && (
        <Modal
          itemId={selectedItem}
          data={currentItemData}
          onClose={() => {
            setModalOpen(false);
            setSelectedItem(null);
            setCurrentItemData([]);
            fetchItems();
          }}
        />
      )}
    </div>
  );
}

export default PedidosComModal;
