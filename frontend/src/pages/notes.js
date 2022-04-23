import {
  useEffect,
  useState,
} from 'react';

import Grid from '@mui/material/Grid';

import Element from '../components/Nota';

function Notes(args) {
  const [lista, setLista] = useState([
    {
      titulo: "Nota 1",
      cuerpo: "Hola soy Rebeca Radío Armindo",
    },
  ]);

  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [usuario, setUsuario] = useState(sessionStorage.getItem('Usuario'));

  useEffect(() => {
    cargarNotas();
    

  }, [usuario]);

  function cargarNotas(){
    var axios = require("axios").default;
    axios
    .get(
     `/api/${user}/notes`)
      .then((response) => {
        if (response.status===200) {
          var i=0;
          var auxLista=[];
          while(i<response.data.length){
            var tit = response.data[i].title;
            var cue = response.data[i].description;
            auxLista.push({ titulo: tit , cuerpo: cue });
            i++;
          }
          setLista(auxLista);
        }
      }
    );
  }

  function unaNotaMas(){
    var axios = require("axios").default;
    axios
    .post(
      `/api/${user}/notes`,{
        "titulo": titulo,
        "cuerpo": cuerpo
      })
      .then((response) => {
        cargarNotas();
      }
    );
  }

  function eliminar(index) {
    /*var auxLista = lista.filter((elem, idx) => {
      return idx !== index;
    });

    setLista(auxLista);*/
    var titulo =lista[index].titulo;
    var axios = require("axios").default;
    axios
    .delete(
      `/api/${user}/notes/`$titulo)
      .then((response) => {
        alert(response.data);
        cargarNotas();
      }
    );
  }

  function editar(index) {
    var titulo = lista[index].titulo;
    var nuevoTitulo = cambiaTitulo(lista[index].titulo);
    var nuevoCuerpo = cambiaCuerpo(lista[index].cuerpo);
    /*var auxLista = lista.filter((elem, idx) => {
      return elem;
    });
    if(nuevoTitulo!=="" && nuevoTitulo!==null){
      lista[index].titulo = nuevoTitulo;
    }
    if(nuevoCuerpo!=="" && nuevoCuerpo!==null){
      lista[index].cuerpo = nuevoCuerpo;
    }
    setLista(auxLista);*/

    var axios = require("axios").default;
    axios
    .put(
      `/api/${user}/notes`$titulo,{
        "nuevoTitulo": nuevoTitulo,
        "nuevoCuerpo": nuevoCuerpo
      })
      .then((response) => {
        cargarNotas();
      }
    );
  }

  function cambiaTitulo(titulo){
    return prompt("Inserte el nuevo título para la nota", titulo);
  }

  function cambiaCuerpo(cuerpo){
    return prompt("Inserte el nuevo cuerpo para la nota", cuerpo);
  }


  return (
    <div className="notas">
      <div className="usuario">
        <p>Hola {usuario}</p>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Titulo de la nota</th>
            <th>Cuerpo de la nota</th>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                value={titulo}
                className="titulo"
                onInput={(e) => {
                  setTitulo(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                type="text"
                className="cuerpo"
                value={cuerpo}
                onInput={(e) => {
                  setCuerpo(e.target.value);
                }}
              />
            </td>
            <td>
              <button
                type="button"
                className="nuevo"
                onClick={() => {
                  if (titulo && cuerpo) {
                    unaNotaMas();
                    setTitulo("");
                    setCuerpo("");
                  } else {
                    alert("Error, falta un campo");
                  }

                  console.log(lista);
                }}
              >
                Crear nota
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Grid className="grid" sx={{ flexGrow: 1 }}>
        <Grid container item xs={12}>
          {lista.map((elem, index) => {
            return (
              <tr key={index}>
                <td>
                  <Element
                    titulo={elem.titulo}
                    cuerpo={elem.cuerpo}
                    index={index}
                    eliminar={eliminar}
                    editar={editar}
                  />
                </td>
              </tr>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export default Notes;
