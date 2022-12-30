import "./App.css";
import { useState, useEffect } from "react";
import BtnCounter from "./components/BtnCounter";
import Card from "./components/Card";

function App() {
  const [number, setNumber] = useState(0);
  const [title, setTitle] = useState("Sono la Home");
  const [post, setPost] = useState([]);
  const [type, setType] = useState("posts");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((data) => setPost(data.filter((p, i) => i < number)));
  }, [number, type]);

  const increseCounter = () => {
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
        {post.map((item, index, array) => (
          <Card key={index} body={item.body} title={item.title || item.name} />
        ))}
      </ul>
    </div>
  );
}

export default App;
