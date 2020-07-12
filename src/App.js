import React, { useEffect, useState } from "react";
import api from "./services/api";
//import { render } from "react-dom";


import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
  
    const response = await api.post("repositories",  {
      "title": `Novo repositório ${Date.now()}`,
      "url": `http://github.com/novo-repo-${Date.now()}`,
      "techs": [
        "Node.js",
        "ReactJS"
      ],
      "likes": 0
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }


  async function handleRemoveRepository(id) {

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex > -1) {

      const response = await api.delete(`repositories/${id}`);
      
      if (response.status === 204){
        repositories.splice(repositoryIndex, 1)
        setRepositories([...repositories])
      }
      
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repository => 
          <li key={repository.id}> {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
