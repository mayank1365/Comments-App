import React from 'react';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import './styles.css'; 

const App = () => {
  return (
    <div className="App">
      <h1>Comments System</h1>
      <CommentForm />
      <CommentList />
    </div>
  );
};

export default App;
