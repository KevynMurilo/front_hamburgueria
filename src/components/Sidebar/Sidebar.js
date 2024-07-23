import React, { useState, useContext } from 'react';
import logo from '../../assets/logo2.png';
import { FaSignOutAlt, FaBars, FaTimes, FaExternalLinkSquareAlt } from 'react-icons/fa';
import { BiSolidRegistered } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { CgInternal } from "react-icons/cg";
import { FaCashRegister } from "react-icons/fa6";
import { MdTableRestaurant } from "react-icons/md";
import LogoutModal from './LogoutModal';
import AuthContext from "../../contexts/AuthContext";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Botão para abrir/fechar o Sidebar */}
      <button
        onClick={handleToggle}
        className="fixed top-6 left-6 text-white bg-gray-900 p-3 rounded-full hover:bg-blue-500 focus:outline-none z-50"
      >
        {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 overflow-y-auto pb-10 h-screen w-80 lg:w-96 bg-gray-900 text-white transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
      >
        <div className="flex justify-center my-6">
          <img
            src={logo} alt='Logo'
            className='w-44 lg:w-64 object-cover'
          />
        </div>

        <ul className="px-5">
        <li className="mb-6">
            <a href="/dashboard" className="flex items-center text-xl hover:bg-gray-700 p-3 rounded">
              <MdDashboard className="mr-4 text-blue-400" size={28} />
              Dashboard
            </a>
          </li>
          <li className="mb-6">
            <a href="/pedidos-internos" className="flex items-center text-xl hover:bg-gray-700 p-3 rounded">
              <CgInternal className="mr-4 text-blue-400" size={28} />
              Pedidos Internos
            </a>
          </li>
          <li className="mb-6">
            <a href="/pedidos-externos" className="flex items-center text-xl hover:bg-gray-700 p-3 rounded">
              <FaExternalLinkSquareAlt className="mr-4 text-blue-400" size={28} />
              Pedidos Externos
            </a>
          </li>
          <li className="mb-6">
            <a href="/realizar-pedidos" className="flex items-center text-xl hover:bg-gray-700 p-3 rounded">
              <FaCashRegister className="mr-4 text-blue-400" size={28} />
              Realizar Pedidos
            </a>
          </li>
          <li className="mb-6">
            <a href="/cadastrar-produto" className="flex items-center text-xl hover:bg-gray-700 p-3 rounded">
              <BiSolidRegistered className="mr-4 text-blue-400" size={28} />
              Cadastrar Produto
            </a>
          </li>
          <li className="mb-6">
            <a href="/cadastrar-mesa" className="flex items-center text-xl hover:bg-gray-700 p-3 rounded">
              <MdTableRestaurant className="mr-4 text-blue-400" size={28} />
              Gerenciar Mesas
            </a>
          </li>
          <li className="mb-6">
            <a href="/registrar-garcom" className="flex items-center text-xl hover:bg-gray-700 p-3 rounded">
              <FiUsers className="mr-4 text-blue-400" size={28} />
              Gerenciar Garçons
            </a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center text-xl hover:bg-gray-700 p-3 rounded w-full"
            >
              <FaSignOutAlt className="mr-4 text-blue-400" size={28} />
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Modal de Logout */}
      {showLogoutModal && (
        <LogoutModal
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
};

export default Sidebar;