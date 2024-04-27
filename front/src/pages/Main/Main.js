import React, { useState, useEffect } from 'react';
import { Table, Input, Button } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './Main.css';
import axios from 'axios';
import dayjs from 'dayjs';
import UserForm from '../../components/UserForm/UserForm';
import defaultImage from '../../img/dflImg.png';

const { Search } = Input;

const Main = () => {
  const API_ENDPOINT = 'http://localhost:8080';

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_ENDPOINT}/listar`);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
    setLoading(false);
  };

  const handleCreate = async (values) => {
    try {
      const { data_nascimento2, foto2 } = values;
      const dataNascimentoFormatada =
        dayjs(data_nascimento2).format('DD/MM/YYYY');

      // Prepare the form data
      const formData = new FormData();
      formData.append('nome', values.nome);
      formData.append('data_nascimento', dataNascimentoFormatada);
      if (foto2 && foto2[0]) {
        formData.append('foto', foto2[0].originFileObj);
      }

      await axios.post(`${API_ENDPOINT}/cadastrar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchUsers();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const handleUpdate = async (values) => {
    try {
      const { data_nascimento2, foto2 } = values;
      const dataNascimentoFormatada =
        dayjs(data_nascimento2).format('DD/MM/YYYY');

      const formData = new FormData();
      formData.append('idLong', selectedUser.idLong);
      formData.append('nome', values.nome);
      formData.append('data_nascimento', dataNascimentoFormatada);
      if (foto2 && foto2[0]) {
        formData.append('foto', foto2[0].originFileObj);
      }

      await axios.put(`${API_ENDPOINT}/alterar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      fetchUsers();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const handleDelete = async (idLong) => {
    try {
      await axios.delete(`${API_ENDPOINT}/remover/${idLong}`);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      key: 'foto1',
      dataIndex: 'foto',
      render: (foto) => (
        <img
          src={foto ? `data:image/jpeg;base64,${foto}` : defaultImage}
          alt="User Profile"
          style={{
            borderRadius: '50%',
            width: '50px',
            height: '50px',
          }}
        />
      ),
    },
    { key: 'nome', title: 'Nome', dataIndex: 'nome' },
    {
      key: 'data_nascimento',
      title: 'Nascimento',
      dataIndex: 'dataNascimento',
      render: (dataNascimento) =>
        dayjs(dataNascimento, 'DD/MM/YYYY').format('DD/MM/YYYY'),
    },
    { key: 'idLong', title: 'ID', dataIndex: 'idLong' },
    {
      key: 'action',
      title: 'Ação',
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            onClick={() => {
              setSelectedUser(record);
              setModalVisible(true);
            }}
            style={{ marginRight: '8px' }}
            className="action-button"
          >
            <EditOutlined className="icon" />
            <span className="text">Editar</span>
          </Button>
          <Button
            onClick={() => handleDelete(record.idLong)}
            className="action-button"
          >
            <DeleteOutlined className="icon" />
            <span className="text">Deletar</span>
          </Button>
        </div>
      ),
      fixed: 'right',
    },
  ];

  const handleSearch = async (term) => {
    setSearchTerm(term);
    try {
      const response = await axios.get(`${API_ENDPOINT}/listar`);
      const filteredUsers = response.data.filter((user) =>
        user.nome.toLowerCase().includes(term.toLowerCase())
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  return (
    <div className="tela">
      <h1 style={{ marginBottom: 30, color: '000000', opacity: '0.8' }}>
        Cadastro de usuários
      </h1>
      <div style={{ marginBottom: '16px', width: '100%', flexWrap: 'nowrap' }}>
        <Search
          placeholder="Buscar usuário..."
          value={searchTerm}
          size="large"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: '45%', marginRight: '16px' }}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setModalVisible(true);
            setSelectedUser(null);
          }}
        >
          <PlusOutlined /> Criar Usuário
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="idLong"
        loading={loading}
        scroll={{ x: true }}
      />

      <UserForm
        isVisible={isModalVisible}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancel={() => setModalVisible(false)}
        initialValues={selectedUser}
      />

      <footer style={{ marginTop: '56px', textAlign: 'center' }}>
        @ Criado por{' '}
        <a
          href="https://matheus-bomtempo.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Matheus Bomtempo
        </a>
      </footer>
    </div>
  );
};

export default Main;
