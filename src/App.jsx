/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

import axios from 'axios';
import { useEffect, useState } from "react";

const LIMIT = 20;
function App() {
  const [list, setList] = useState([]);
  const [pag, setPag] = useState(0);
  
  const fetchListData = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon')
    .then((response) => {
      const sortedArray = [...response.data.results];

      sortedArray.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      console.log(sortedArray);
      const promisesrray = sortedArray.map((item) => {
        return axios.get(item.url);
      });

      Promise.all(promisesrray).then((values) => setList(values));
      
      //setList(sortedArray);
    });
  }

  const fetchListDataPaged = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${pag}&limit=${pag + LIMIT}`)
    .then((response) => {
      const sortedArray = [...response.data.results];

      sortedArray.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      console.log(sortedArray);
      const promisesrray = sortedArray.map((item) => {
        return axios.get(item.url);
      });

      Promise.all(promisesrray).then((values) => setList(values));
      
      //setList(sortedArray);
    });
  }

  useEffect(() => {
    fetchListData();
  }, []);

  useEffect(() => {
    fetchListDataPaged();
  }, [pag]);
 
  const handlerOnClick = (e) => {console.log(e);
    if (e.target.innerText === "< previous" && pag !==0 ) setPag(pag - LIMIT);
    if (e.target.innerText === "next >"  ) setPag(pag + LIMIT);
  };

  return (
    <>
      <h1>Consumir api pokémon</h1>
      <hr />
      {list.length === 0 && "Carregando pokemon...."}
      {list.map((item) => (
        <Pokemon key={item.data.name} data={item.data} />
      ))}
      <hr />
      <span onClick={handlerOnClick}>{'< previous'}</span>
      <span> | </span>
      <span onClick={handlerOnClick}>{'next >'}</span>
    </>
  );
}

const Pokemon = ({ data }) => {
  //const [details, setDetails] = useState(null);

  // const fetchIndividualPokemon = () => {
  //   axios.get(data.url).then((response) => setDetails(response.data));
  // }

  // useEffect(() => {
  //   fetchIndividualPokemon();
  // }, []);

  // if(!details) {
  // if(!data) {
  //   return <div>-</div>;
  // }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src={data.sprites.front_default}
        style={{ width: 30, marginRight: 20 }}
      />
      <span>
        <b>{data.name}</b> - EXP {data.base_experience}
      </span>
    </div>
  );
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default App;
