import Card from '../Card';

import './styles.css';

const Body = () => {
  return (
    <main className="body-container">
      <input
        className="title"
        placeholder="Busque um filme por nome, ano ou gênero"
      />
      <Card />
      <Card />
      <Card />
    </main>
  );
};

export default Body;
