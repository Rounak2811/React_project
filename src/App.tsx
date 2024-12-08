import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

const App: React.FC = () => {
  const [formType, setFormType] = useState<'login' | 'signup'>('login');

  return (
    <div className="app-container">
      <header>
        <h1>{formType === 'login' ? 'Login' : 'Sign Up'}</h1>
      </header>
      {formType === 'login' ? (
        <LoginForm onSwitch={() => setFormType('signup')} />
      ) : (
        <SignUpForm onSwitch={() => setFormType('login')} />
      )}
    </div>
  );
};

export default App;
