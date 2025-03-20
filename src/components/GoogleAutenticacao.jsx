import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = 'SEU_CLIENT_ID_DO_GOOGLE.apps.googleusercontent.com';

function App() {
  const handleLoginSuccess = (response) => {
    console.log('Login realizado com sucesso:', response.profileObj);
    // Aqui você pode salvar as informações do usuário ou atualizar seu estado
  };

  const handleLoginFailure = (response) => {
    console.error('Falha ao realizar login:', response);
  };

  return (
    <div>
      <h1>Autenticação com Google</h1>
      <GoogleLogin
        clientId={clientId}
        buttonText="Entrar com Google"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default App;
