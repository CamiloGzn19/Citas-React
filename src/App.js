import React, { useEffect, useState } from "react";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";

function App() {
  // Citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // useEffect para realizar ciertas operaciones cuando el state cambia

  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  // Función que tome las citas actuales y agrege la nueva
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  // Función eliminar la cita
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  // Mensaje condicional
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <>
      <h1>Administrador de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
