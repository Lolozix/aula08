import { useEffect, useState } from "react";

export default function Home() {

  const [usuarios, setUsuarios] = useState([]);

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
  }, [usuarios])

  const apagar = async (id) => {
    try {

      await fetch("http://localhost:3000/usuarios" + id, {
        method: 'DELETE',
      });
    } catch {
      alert("Algo de errado não está certo")
    }
  }

  return (
    <table>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td><button onClick={() => deletar(usuario.id)}> 🗑️ </button></td>
        </tr>
      )}
    </table>
  );
}