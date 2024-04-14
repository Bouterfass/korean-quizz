import './App.css';
import React from 'react';

const Quizz = ({ qs: qs }) => {

  const [index, setIndex] = React.useState(0);
  let parsedData = JSON.parse(qs);
  let questions = Object.values(parsedData);


  return <>
    {questions[index] ? questions[index]["korean"] : "Pas de question"}
    <button onClick={() => setIndex(index => index + 1)}>Suivant</button>
  </>

}

function App() {

  const [jsonData, setJsonData] = React.useState([]);

  const handleFileChange = event => {

    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        console.log(e);
        const json = JSON.parse(e.target.result);
        setJsonData(json)
      } catch (error) {
        console.error("Erreur lors de la conversion du fichier en JSON :", error);
      }
    }
    reader.readAsText(file);
  }


  return (
    <div className="App">
      <input type="file" onChange={e => handleFileChange(e)} />
      <div>
        <h3>Quizz:</h3>
        {
          jsonData ? (
            <Quizz qs={JSON.stringify(jsonData, null, 2)} />
          ) : <>
            no file
          </>
        }
      </div>
    </div>
  );
}

export default App;
