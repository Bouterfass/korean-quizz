import './App.css';
import React from 'react';

const Quizz = ({ qs: qs }) => {

  const [index, setIndex] = React.useState(0);
  const [ans, setAns] = React.useState('');
  const [step, setStep] = React.useState(0);
  const [showAns, setShowAns] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(0);
  let parsedData = JSON.parse(qs);
  let questions = Object.values(parsedData);



  const handleInputChange = (event) => {
    setAns(event.target.value);  // Met à jour la réponse à chaque changement dans l'input
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (step === 1) {
        setIndex(prevIndex => (prevIndex + 1) % questions.length);
        setAns('');  // Réinitialise l'input
        setStep(0);
        setShowAns(false);
        setIsCorrect(0);
      } else {
        setShowAns(true);
        if (event.target.value === questions[index]["letter"]) {
          setIsCorrect(1);
        } 
        else {
          setIsCorrect(-1);
        }
        setStep(prev => prev + 1);
      }
    }
  }

  return (
    <>
      <div className='questions'>
        {questions[index] ? <p>{questions[index]["french"]}</p> : <p>"Pas de question"</p>}
        {showAns && <p>{questions[index]["korean"]} </p>}
        {showAns && <p style={{ color: isCorrect === 1 ? "green" : "red" }}>{questions[index]["letter"]}</p>}
        <input
          type='text'
          value={ans}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder='ta réponse'
        />
      </div>
    </>);

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


  return (<>
    <div className="app">
      <h3>Quizz:</h3>
      <input type="file" onChange={e => handleFileChange(e)} />
      <div className='quizz'>
        {
          jsonData ? (
            <Quizz qs={JSON.stringify(jsonData, null, 2)} />
          ) : <>
            no file
          </>
        }
      </div>
    </div>

  </>
  );
}

export default App;
