import { useState } from "react";
import 'jspdf-autotable'
import { useNavigate } from "react-router-dom"

export default function Registrar() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const Registrar = async (event) => {
    event.preventDefault();

    try {
      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({
          nome: nome,
          email: email
        })
      });
      if (resposta.ok) {
        navigate("/")
      }
    } catch {
      alert("Algo de errado não está certo ");
    }
    alert("Opa, os dados estão salvos!");
  }
  return (
    <main className={styles.register}>
      <form className={styles.form} onSubmit={Registrar}>
        <label>
          Nome

          <input
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}>
          </input>
          </label>
          <label>
          Email


          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}/>
        
        </label>
        <button type="submit">Criar Usuário</button>
      </form>
    </main>
  );
}