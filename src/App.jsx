import "./App.css";
import { useState, useEffect } from "react";
import BtnCounter from "./components/BtnCounter";
import Card from "./components/Card";

function App() {
  // useState per gestire le nostre variabili che mostriamo sul DOM
  // alla mutazione di una "variabile" stato, il componente si rirenderizzerà mostrando il dato mutato.
  // si definisce con un value e un setValue, il setValue muta il value
  const [number, setNumber] = useState(0);
  const [title, setTitle] = useState("Sono la Home");
  const [post, setPost] = useState([]);
  const [type, setType] = useState("posts");

  // useEffect per gestire i side effect, un esempio tipico sono le chiamate fetch, oppure gli eventlistener
  // ha un array di dipendenze, al variare degli stati definiti dentro l'array, si riesegue lo useEffect
  // con array vuoto, lo useEffect si eseguirà al montaggio del componente/app
  // lo useEffect ha un return, il return si esegue allo smontaggio del componente/app,
  // in genere si usa per rimovere gli eventListener creati nello useEffect stesso.
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((data) => setPost(data.filter((_, i) => i < number)));
  }, [number, type]);

  const increseCounter = () => {
    // qui mutiamo il value "number" tramite una funzione che ha parametro ha il valore precedente di number
    setNumber((prev) => prev + 1);
  };

  const decreseCounter = () => {
    setNumber((prev) => prev - 1);
  };

  const changeTitle = () => {
    setTitle("Sono L'about Us");
  };

  return (
    <div className="App">
      <h1>{title}</h1>
      <BtnCounter
        // props di BtnCounter
        text="Increse"
        color="green"
        textColor="white"
        method={increseCounter}
      />
      <p>{number}</p>
      <BtnCounter
        text="decrese"
        color="red"
        textColor="white"
        method={decreseCounter}
      />
      <BtnCounter text="cambio titolo" method={changeTitle} />
      <BtnCounter text="comment" method={() => setType("comments")} />
      <BtnCounter text="posts" method={() => setType("posts")} />
      <ul>
        {
          // mappiamo i risultati della chiamata fetch
          // il map funziona sempre perchè lo useState di post è stato inizializzato con un array vuoto []
          // altrimenti si doveva fare un controllo ternario su post
          // e.g. post.lenght > 0 && post.map
        }
        {post.map((item, index) => (
          <Card key={index} body={item.body} title={item.title || item.name} />
        ))}
      </ul>
    </div>
  );
}

export default App;

// ESEMPI DI TERNARI:
//
// post ?? comment <-------
// post ? post : comment <------ ternario dell'esempio sopra
