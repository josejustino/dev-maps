import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./global.css";
import "./App.css";
import "./Main.css";

import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

// Componente: Bloco isolado de HTML, CSS, JS, o qual não interfere no restante da aplicação.
// Propriedade: Informações que um componente PAI passa para o componente filho.
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)

// OBS: CRIAR BOTÕES DE EDITAR E DELETAR USUÁRIO

function App() {
  const [devs, setDevs] = useState([]);

  // useEffect: Serve para disparar uma função toda vez que uma informação alterar, ou uma única vez durante a renderização do componente.
  
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
