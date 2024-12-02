import { useState } from "react";
import { useNavigate } from "react-router-dom"

  export default function Registrar() {

  const [nome , setNome] = useState('');
  const [email, setEmail] = useState('');

const navigate = useNavigate();

  const criaUsuario = async (event) => {
    event.preventDefault();
    try{
     const resposta = await fetch("http://localhost:3000/usuarios",{
        method:'POST',
        headers:{'Content-Type': 'Application/json'},
        body: JSON.stringify({
          nome: nome,
          email: email,
        }),
      });
      if(resposta.ok){
        navigate("/")
      }
    }catch{
      alert("Deu erro ");
    }
    alert("Dados salvos!");
  }
  return (
    <main className={styles.register}>
      <form className={styles.form} onSubmit={criaUsuario}>
        <label>
          Nome
          <input 
          type="text"
          value={nome}
          onChange = {(event) => setNome(event.target.value)}>
          </input>
          </label>
        <label>
          Email
          <input
          type="text"
          value={email}
          onChange = {(event) => setEmail(event.target.value)}>
          </input>
        </label>
        <button type="subimt" onClick={criaUsuario}>Criar Usuário</button>
      </form>
    </main>
  );
}