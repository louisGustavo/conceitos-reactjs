import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Desafio ReactJS",
      url: "https://github.com/louisGustavo/conceitos-reactjs",
      techs: ['NodeJS', 'ReactJS']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    
    if (response.status === 204) {
      const repositoryIndex = repositories.findIndex(
        repository => repository.id === id
      );
  
      repositories.splice(repositoryIndex, 1);
  
      setRepositories([...repositories]);
    } else {
      alert('Erro ao deletar o repositório');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <div key={repository.id}>
          <li>{repository.title}</li>
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </div>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
