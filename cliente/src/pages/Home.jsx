import { useEffect, useState } from "react";
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@mui/material';
import NavBar from '../components/NavBar';

export default function Home() {
  const [jogoPS5, setJogosPS5] = useState([]);

  useEffect(() => {
    const buscarJogosPS5 = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/jogosPS5");
        const dados = await resposta.json();
        setJogosPS5(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    };
    buscarJogosPS5();
  }, []);

  const deletar = async (id) => {
    try {
      await fetch(`http://localhost:3000/jogosPS5/${id}`, {
        method: 'DELETE',
      });
      setJogosPS5(jogoPS5.filter((jogo) => jogo.id !== id));
    } catch {
      alert("Algo deu errado");
    }
  };

  const exportarPDF = () => {
    const doc = new jspdf();
    const table = jogoPS5.map((jogo) => [
      jogo.titulo,
      jogo.genero
    ]);

    doc.text("Lista de Jogos PS5", 10, 10);
    doc.autoTable({
      head: [["Título", "Gênero"]],
      body: table
    });

    doc.save("jogosPS5.pdf");
  };

  return (
    <div>
      <NavBar />
      <table>
        <thead>
          <Button variant="contained" onClick={() => exportarPDF()}>Gerar PDF</Button>
          <Button variant="contained" onClick={() => exportarTítulo()}>Título</Button>
          <Button variant="contained" onClick={() => exportarGêneros()}>Gênero</Button>
        </thead>
        <tbody>
          {jogoPS5.map((jogo) => (
            <tr key={jogo.id}>
              <td>{jogo.titulo}</td>
              <td>{jogo.genero}</td>
              <td>
                <button onClick={() => deletar(jogo.id)}>🗑️</button>
                <a href={`/Alterar/${jogo.id}`}>
                  <button>Alterar</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
