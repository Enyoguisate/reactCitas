import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Citas from "./components/Cita";

function App() {

  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  // Funcion que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  // Funcion para eliminar cita por id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };


  const titulo = citas.length ? 'Administra tus citas' : 'No hay Citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="containter">
        <div className="row">
          <div className="one-half column">
            <Formulario citas={citas} crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Citas key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
