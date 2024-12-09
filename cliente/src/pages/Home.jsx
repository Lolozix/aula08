import { useEffect, useState } from "react";
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@mui/material';


export default function Home() {

  const [usuario, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [usuario])

  const deletar = async (id) => {
    try {

      await fetch("http://localhost:3000/usuarios" + id, {
        method: 'DELETE',
      });
    } catch {
      alert("Algo deu errado")
    }
  }

  const exportarPDF = () => {

    const doc = new jspdf();
    const table = usuario.map(usuario => [
      usuario.nome,
      usuario.email
    ]);

    doc.text("Lista de Usuários", 10, 10);
    doc.autoTable({
      head: [["Nome", "E-mail"]],
      body: table
    });


    doc.save("alunosIFMS.pdf");
  };

  return (
    <table>
      <thead>
        <Button variant="contained" onClick={() => exportarPDF()}>Gerar PDF</Button>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {usuario.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.nome}</td>
            <td>{usuario.email}</td>
            <td>
              <button onClick={() => removerPessoa(usuario.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}