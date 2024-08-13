import React from 'react';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';

const App = () => {
  return (
    <div>
      <h1>Comments</h1>
      <CommentForm />
      <CommentList />
    </div>
  );
};

export default App;
