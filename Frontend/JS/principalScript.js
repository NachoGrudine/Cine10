const API_URL = "https://localhost:7291/api/funciones"; 
const API_URL_FILTROS = "https://localhost:7291/api/funciones/filtros"; 
const API_URL_EMP = "https://localhost:7291/api/Empleado/Obtener"; 

let sliderInterval;


const token = localStorage.getItem('authToken'); 
const expiryTime = localStorage.getItem('expiryTime'); 
const currentTime = new Date().getTime(); 

if (currentTime > expiryTime) {
    logout();
    alert("No estás autenticado o tu sesión ha expirado. Redirigiendo a la página de login."); window.location.href = '../HTML/login.html'; 
} else { 
console.log('Token válido y sesión activa.' + expiryTime); }

const payload = token.split('.')[1]; // Obtener la parte del payload (segunda parte del JWT)
const decodedPayload = JSON.parse(atob(payload)); // Decodificar Base64 y convertir a objeto

// Obtener el id_usuario
const id_usuario = decodedPayload.IdUsuario;
const nombreUser = decodedPayload.sub;

document.addEventListener("DOMContentLoaded", () => { 
    mostrarPrincipal();

})


    


function logout() { 
    localStorage.removeItem('authToken');
    localStorage.removeItem('expiryTime'); 
}

particlesJS("particles-js", {
    particles: {
      number: { value: 160, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
        polygon: { nb_sides: 5 },
        image: { src: "img/github.svg", width: 100, height: 100 }
      },
      opacity: {
        value: 1,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0, sync: false }
      },
      size: {
        value: 2,
        random: true,
        anim: { enable: false, speed: 4, size_min: 0.3, sync: false }
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 600 }
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: false, mode: "bubble" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 250, size: 0, duration: 2, opacity: 0, speed: 3 },
        repulse: { distance: 400, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 }
      }
    },
    retina_detect: true
  });
  var count_particles, stats, update;
  stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";
  document.body.appendChild(stats.domElement);
  count_particles = document.querySelector(".js-count-particles");
  update = function () {
    stats.begin();
    stats.end();
    if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
      count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
    }
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
  


function mostrarImagen(varBinaryData) {
    // Verificar que los datos binarios no estén vacíos
    if (!varBinaryData || varBinaryData.byteLength === 0) {
        return '<p>No se encontró la imagen.</p>';
    }

    // Convertir los datos binarios a una cadena base64
    const base64Data = varBinaryData;

    // Crear la URL de datos para la imagen
    const dataUrl = 'data:image/jpg;base64,' + base64Data;

    // Crear el HTML para mostrar la imagen con relación 16:9
    const html = `<img src="${dataUrl}" style="width:100%; height:100%; object-fit: cover; aspect-ratio: 3 / 4;" alt="Imagen de Película">`;

    return html;
}

function mostrarImagenUrl(varBinaryData) {
    // Verificar que los datos binarios no estén vacíos
    if (!varBinaryData || varBinaryData.byteLength === 0) {
        return '<p>No se encontró la imagen.</p>';
    }

    // Convertir los datos binarios a una cadena base64
    const base64Data = varBinaryData;

    // Crear la URL de datos para la imagen
    const dataUrl = 'data:image/jpg;base64,' + base64Data;

    
    return dataUrl;
}








function resetDatePicker(selector) {
    const datePicker = document.getElementById(selector) ;
    
    if (datePicker) {
        datePicker.value = ''; 
        
    } else {
        console.warn(`No se encontró un elemento con el selector: ${selector}`);
        
    }
}


function formatearFecha(fechaStr) {
    const [year, month, day] = fechaStr.split('-');
    let fecha = new Date(Date.UTC(year, month - 1, day));
    
    
    fecha.setUTCDate(fecha.getUTCDate() + 1);

    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
}


    
function mostrarFunciones(funciones) {
    const contenedorFunciones = document.getElementById("contenedor-funciones");
    
    
    if (!contenedorFunciones) {
        console.error("No se encontró el contenedor con id 'contenedor-funciones'");
        return;
    }

    contenedorFunciones.innerHTML = ""; 
    let fechaStr = "";
    funciones.forEach(funcion => {
        


        
        if(funcion.fecha != fechaStr){
            fechaStr = funcion.fecha;
            const fechaElement = document.createElement("div");
            fechaElement.classList.add("fechas");
            fechaElement.innerHTML = `<h3 class="fechas-titulo">${formatearFecha(fechaStr)}</h3>`;
            contenedorFunciones.appendChild(fechaElement)
        }


        
        

        const funcionElement = document.createElement("div");
        funcionElement.classList.add("funcion");

        // Extraer información de la función
        const idFuncion = funcion.idFuncion
        
        const horarioInicio = funcion.horarioInicio; 
        const [horas, minutos] = horarioInicio.split(':');
        const horarioFormateado = `${horas}:${minutos}`;
        const fecha = funcion.fecha;
        const tituloPelicula = funcion.idPeliculaNavigation.titulo;
        const idioma = funcion.idIdiomaNavigation.idiomaa;
        const tipoProyeccion = funcion.idTipoProyeccionNavigation.tipoProyeccion;
        const sala = funcion.idSalaNavigation.nombre;
        
        const director = funcion.idPeliculaNavigation.director; 
        const productora = funcion.idPeliculaNavigation.productora; 
        const duracion = funcion.idPeliculaNavigation.duracion;  
        const img = funcion.idPeliculaNavigation.imagen;
        const funcionInfo = " " + tituloPelicula + " de las " + horarioFormateado + ", en la sala " + sala + " del dia  " + fecha;



        // Crear HTML para la función
        funcionElement.innerHTML =  `
                            <div class="acordeon">
    <input type="radio" name="acordeon" id="btn-acordeon${idFuncion}" class="btn-acordeon">
    <label class="funcion" for="btn-acordeon${idFuncion}">
        <div class="funcion-info" >
        
        
            <span class="funcion-horario">${horarioFormateado}</span>
            <span class="funcion-titulo">${tituloPelicula}</span>
            <div class="funcion-right">
                <span class="funcion-sala">${sala}</span>
                
            </div>
            
        
        </div>
        <div class="funcion-acciones">
            <button class="editar" id="btn-editar${idFuncion}" onclick="crearEditarFuncion(${idFuncion});">Editar</button>
            <button class="eliminar" id="btn-eliminar${idFuncion}" onclick="confirmarEliminacion(${idFuncion},'${funcionInfo}');">Eliminar</button>
        </div>
    
    </label>
    
    

    <div class="contenido-acordeon">
        <div class="datos-funcion">
            <h4>Datos de la funcion</h4>
            <p>Id funcion: ${idFuncion}</p>
            <p>Fecha: ${fecha}</p>
            <p>Hora Inicio: ${horarioFormateado}</p>
            <p>Idioma: ${idioma}</p>
            <p>Tipo de Proyección: ${tipoProyeccion}</p>
            <p>Sala: ${sala}</p>
            
        </div>
        
        <div class="datos-pelicula">
            <h4>Datos de la Pelicula</h4>
            <p>Titulo: ${tituloPelicula}</p>
            <p>Director: ${director}</p>
            <p>Productora: ${productora}</p>
            <p>Duración: ${duracion} minutos</p>
        </div>
        
        <div class ="foto-pelicula">  ${mostrarImagen(img)} </div>
        
    </div>
</div>
        `;

        // Agregar la función al contenedor principal
        contenedorFunciones.appendChild(funcionElement);
    });
}

function ordenarFuncionesPorFechaYHora(funciones) {
    return funciones.sort((a, b) => {
        // Crea objetos Date a partir de fecha y horarioInicio
        const fechaA = new Date(`${a.fecha}T${a.horarioInicio}`);
        const fechaB = new Date(`${b.fecha}T${b.horarioInicio}`);
        
        // Compara las fechas
        return fechaA - fechaB;
    });
}

async function buscarFunciones() {
    // Obtener las fechas
    const fechaDesde = document.getElementById('fecha-des').value;
    const fechaHasta = document.getElementById('fecha-has').value;

    // Obtener el estado de los checkboxes
    const salasSeleccionadas = [];
    const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            salasSeleccionadas.push(index + 1); // Agrega 1 para Infinity, 2 para Galaxy, etc.
        }
    });

    // Crear los parámetros para la consulta
    const params = new URLSearchParams();
    if (fechaDesde) params.append('fechaDes', fechaDesde);
    if (fechaHasta) params.append('fechaHas', fechaHasta);
    if (salasSeleccionadas.length > 0) {
        salasSeleccionadas.forEach(sala => params.append('salas', sala));
    }

    try {
        // Llamada a la API usando fetch con await
        
        const response = await fetch(`https://localhost:7291/api/funciones/filtros?${params.toString()}`);
        
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        
        // Obtener el JSON de la respuesta
        const funciones = await response.json();
        
        // Llamar a una función para mostrar las funciones en la interfaz
        mostrarFunciones(ordenarFuncionesPorFechaYHora(funciones));
    } catch (error) {
        console.error('Error al obtener las funciones:', error);
    }
}


    // Función para cargar las funciones desde la API
async function cargarFunciones() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Error al obtener funciones: ${response.statusText}`);
        }

        const funciones = await response.json();
        mostrarFunciones(ordenarFuncionesPorFechaYHora(funciones));
    } catch (error) {
        console.error("Error al cargar funciones:", error);
        alert("No se pudieron cargar las funciones.");
    }
}



async function eliminarFuncion(id) {
    try {
        const response = await fetch(`https://localhost:7291/api/Funciones/${id}`, {
            method: 'DELETE'
        });

        if (response.status === 404) {
            console.error("Función no encontrada o no se pudo eliminar.");
        } else if (response.ok) {
            console.log("Función eliminada con éxito.");
            cargarFunciones();
        } else {
            console.error("Error al eliminar la función.");
        }
    } catch (error) {
        console.error("Hubo un problema con la solicitud:", error);
    }
}

function confirmarEliminacion(id, info) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar la funcion:" + info );

    if (confirmacion) {
        eliminarFuncion(id);
        
    } else {
        console.log("Eliminación cancelada.");
    }
}


async function crearEditarFuncion(id) {
    
    const contenedorMaestro = document.getElementById("contenedor_maestro");

    if (!contenedorMaestro) {
        console.error("No se encontró el contenedor con id 'contenedor_maestro'");
        return;
    }

    contenedorMaestro.innerHTML = `
        <form id="formularioFuncion">

            <!-- Sala -->
            <label for="idSala">Sala:</label>
            <select id="idSala" name="idSala" required>
                <!-- Opciones de sala cargadas dinámicamente -->
            </select>
            <br><br>

            <!-- Tipo de Proyección -->
            <label for="idTipoProyeccion">Tipo de Proyección:</label>
            <select id="idTipoProyeccion" name="idTipoProyeccion" required>
                <!-- Opciones de tipo de proyección cargadas dinámicamente -->
            </select>
            <br><br>

            <!-- Idioma -->
            <label for="idIdioma">Idioma:</label>
            <select id="idIdioma" name="idIdioma" required>
                <!-- Opciones de idioma cargadas dinámicamente -->
            </select>
            <br><br>

            <!-- Fecha -->
            <label for="fecha">Fecha:</label>
            <input type="date" id="fecha" name="fecha" required>
            <br><br>

            <!-- Película -->
            <label for="idPelicula">Película:</label>
            <select id="idPelicula" name="idPelicula" required disabled>
                <!-- Opciones de película cargadas dinámicamente -->
            </select>
            <br><br>

            <!-- Horario de Inicio -->
            <label for="horarioInicio">Horario de Inicio:</label>
            <input type="time" id="horarioInicio" name="horarioInicio" required>
            <br><br>

            <button type="submit">Guardar Función</button>
            <button type="button" onclick="mostrarContenedor();">Cancelar</button>
        </form>`;

    cargarSalas();
    cargarTipos();
    cargarIdiomas();
    

    
    document.getElementById('fecha').addEventListener('change', function() {
        const peliculaSelect = document.getElementById('idPelicula');
        if (this.value) {  
            peliculaSelect.disabled = false; 
            cargarLasPeliculas(this.value);
        } else {
            peliculaSelect.disabled = true;  
        }
    });

    if (id > 0) {
        cargarDatosFormulario(id);

        document.getElementById('formularioFuncion').addEventListener('submit', async (event) => {
            event.preventDefault();

            const data = {
                idFuncion: id,
                idSala: parseInt(document.getElementById('idSala').value),
                idPelicula: parseInt(document.getElementById('idPelicula').value),
                idTipoProyeccion: parseInt(document.getElementById('idTipoProyeccion').value),
                idIdioma: parseInt(document.getElementById('idIdioma').value),
                fecha: document.getElementById('fecha').value,
                horarioInicio: document.getElementById('horarioInicio').value + ":00"
            };

            // Verificar que todos los campos estén presentes
            if (!data.idSala || !data.idPelicula || !data.idTipoProyeccion || !data.idIdioma || !data.fecha || !data.horarioInicio) {
                console.error("Faltan campos obligatorios.");
                return;
            }

            try {
                const response = await fetch(`https://localhost:7291/api/Funciones/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const error = await response.text();
                    throw new Error(`Error al actualizar la función: ${error}`);
                }

                const result = await response.json();
                console.log('Función actualizada exitosamente:', result);

            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
            mostrarContenedor();
        });

    } else {
        document.getElementById('formularioFuncion').addEventListener('submit', async (event) => {
            event.preventDefault();

            const data = {
                idSala: parseInt(document.getElementById('idSala').value),
                idPelicula: parseInt(document.getElementById('idPelicula').value),
                idTipoProyeccion: parseInt(document.getElementById('idTipoProyeccion').value),
                idIdioma: parseInt(document.getElementById('idIdioma').value),
                fecha: document.getElementById('fecha').value,
                horarioInicio: document.getElementById('horarioInicio').value + ":00"
            };

            // Verificar que todos los campos estén presentes
            if (!data.idSala || !data.idPelicula || !data.idTipoProyeccion || !data.idIdioma || !data.fecha || !data.horarioInicio) {
                console.error("Faltan campos obligatorios.");
                return;
            }

            try {
                const response = await fetch('https://localhost:7291/api/Funciones', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const error = await response.text();
                    throw new Error(`Error al crear la función: ${error}`);
                }

                const result = await response.json();
                console.log('Función creada exitosamente:', result);

            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
            }
            mostrarContenedor();
        });
    }
}

async function cargarDatosFormulario(idFuncion) {
    try {
        
        const response = await fetch(`https://localhost:7291/api/funciones/${idFuncion}`);
        if (!response.ok) {
            throw new Error(`Error al obtener los datos de la función: ${response.status}`);
        }

        const funcion = await response.json();

        
        document.getElementById('idSala').value = funcion.idSala;
        document.getElementById('idPelicula').value = funcion.idPelicula;
        document.getElementById('idTipoProyeccion').value = funcion.idTipoProyeccion;
        document.getElementById('idIdioma').value = funcion.idIdioma;
        document.getElementById('fecha').value = funcion.fecha;
        const [horas, minutos] = funcion.horarioInicio.split(':');
        const horarioFormateado = `${horas}:${minutos}`;
        document.getElementById('horarioInicio').value = horarioFormateado;

    } catch (error) {
        console.error("Error al cargar datos en el formulario:", error);
        alert("No se pudieron cargar los datos de la función.");
    }
}

function mostrarContenedor() {
    const contenedorMaestro = document.getElementById("contenedor_maestro");

    
    if (!contenedorMaestro) {
        console.error("No se encontró el contenedor con id 'contenedor_maestro'");
        return;
    }
    const peliculasContainer = document.getElementById('peliculasContainer');
    peliculasContainer.innerHTML = ''; 

    contenedorMaestro.innerHTML = `
        <div class = "admin-funciones">
            <button class="but-crear" id="but_crear" onclick="crearEditarFuncion(0);">Crear Nueva Funcion +</button>
            
            <div class="filtros">
                <h4 class="filtros-titulo-prin">Buscador de funciones</h4>
                <form id="form-buscar">
                    <h6 class="filtros-titulo">- Fechas:</h6>
                    <div class="filtro">
                        
                        <div class="input-fecha">
                            <label for="fecha">Desde:</label>
                            <input type="date" id="fecha-des" name="fecha-des">
                            <button class="but-limpiar-fecha" type="button" onclick="resetDatePicker('fecha-des')">X</button>
                        </div>
                    </div>
                    
                    <div class="filtro">
                        
                        <div class="input-fecha">
                            <label for="fecha">Hasta:</label>
                            <input type="date" id="fecha-has" name="fecha-has">
                            <button class="but-limpiar-fecha" type="button" onclick="resetDatePicker('fecha-has')">X</button>
                        </div>
                    </div>
                    <h6 class="filtros-titulo">- Salas:</h6>
                    <div class="checkbox-group">
                        <label>
                            <input type="checkbox" name="Infinity"> Infinity
                        </label>
                        <label>
                            <input type="checkbox" name="Galaxy"> Galaxy
                        </label>
                        <label>
                            <input type="checkbox" name="Luminare"> Luminare
                        </label>
                        <label>
                            <input type="checkbox" name="Nova"> Nova
                        </label>
                    </div>

                    <button class="but-filtros" id="filtros"  onclick="buscarFunciones();">Buscar</button>
                </form>
            </div>
            

        </div>
        
        
        <div id="funciones"> 
            
            
            
            <div id="contenedor-funciones">
                
                
            </div>
            
        </div>`;



    document.getElementById('but_crear').addEventListener('click', () => crearEditarFuncion(event, 0));
    document.getElementById('form-buscar').addEventListener('submit', (event) => {
        event.preventDefault();
        buscarFunciones();
    });

    document.getElementById('filtros').addEventListener('click', function(event) {
        event.preventDefault(); 
        buscarFunciones(); 
    });
    cargarFunciones();

}







async function cargarSalas() {
    try {
        const response = await fetch('https://localhost:7291/api/AuxiliaresFunciones/sala'); 
        if (!response.ok) throw new Error('Error al cargar las salas');

        const salas = await response.json();
        const selectSala = document.getElementById('idSala');

        // Limpiar las opciones actuales
        selectSala.innerHTML = '';

        // Crear la opción por defecto
        const opcionDefault = document.createElement('option');
        opcionDefault.value = '';
        opcionDefault.textContent = 'Seleccionar Sala';
        selectSala.appendChild(opcionDefault);

        // Agregar las nuevas opciones de salas
        salas.forEach(sala => {
            const option = document.createElement('option');
            option.value = sala.idSala;
            option.textContent = sala.nombre;
            selectSala.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las salas:', error);
    }
}

async function cargarIdiomas() {
    try {
        const response = await fetch('https://localhost:7291/api/AuxiliaresFunciones/idioma'); 
        if (!response.ok) throw new Error('Error al cargar los Idiomas');

        const idiomas = await response.json();
        const selectIdioma = document.getElementById('idIdioma');

        // Limpiar las opciones actuales
        selectIdioma.innerHTML = '';

        // Crear la opción por defecto
        const opcionDefault = document.createElement('option');
        opcionDefault.value = '';
        opcionDefault.textContent = 'Seleccionar Idioma';
        selectIdioma.appendChild(opcionDefault);

        // Agregar las nuevas opciones de salas
        idiomas.forEach(idioma => {
            const option = document.createElement('option');
            option.value = idioma.idIdioma;
            option.textContent = idioma.idiomaa;
            selectIdioma.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los Idiomas:', error);
    }
}

async function cargarLasPeliculas(fecha) {
    
    
    try {
        console.log(calcularSemana(fecha))
        const responseCar = await fetch(`https://localhost:7291/api/Cartelera/${calcularSemana(fecha)}`); 
        const cartelera = await responseCar.json();
        if (!responseCar.ok) {
            throw new Error(`Error en la solicitud: ${responseCar.status}`);
        }
    
        

        console.log(cartelera)
        const selectPelicula = document.getElementById('idPelicula');

        // Limpiar las opciones actuales
        selectPelicula.innerHTML = '';

        // Crear la opción por defecto
        const opcionDefault = document.createElement('option');
        opcionDefault.value = '';
        opcionDefault.textContent = 'Seleccionar Pelicula';
        selectPelicula.appendChild(opcionDefault);
        
        // Agregar las nuevas opciones de salas
        cartelera.detalleCarteleras.forEach(detalle => {
            const option = document.createElement('option');

            option.value = detalle.idPeliculaNavigation.idPelicula;
            option.textContent = detalle.idPeliculaNavigation.titulo;
            selectPelicula.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar las Peliculas:', error);
        const selectPelicula = document.getElementById('idPelicula');

        
        selectPelicula.innerHTML = '';
        const opcionDefault = document.createElement('option');
        opcionDefault.value = '';
        opcionDefault.textContent = 'No hay cartelera para esta fecha';
        selectPelicula.appendChild(opcionDefault);
    }
}



async function cargarTipos() {
    try {
        const response = await fetch('https://localhost:7291/api/AuxiliaresFunciones/tipo'); 
        if (!response.ok) throw new Error('Error al cargar los tipos de proyecciones');

        const tipos = await response.json();
        const selectTipo = document.getElementById('idTipoProyeccion');

        // Limpiar las opciones actuales
        selectTipo.innerHTML = '';

        // Crear la opción por defecto
        const opcionDefault = document.createElement('option');
        opcionDefault.value = '';
        opcionDefault.textContent = 'Seleccionar Tipo de Proyeccion';
        selectTipo.appendChild(opcionDefault);

        // Agregar las nuevas opciones de salas
        tipos.forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo.idTipoProyeccion;
            option.textContent = tipo.tipoProyeccion;
            selectTipo.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los Tipos de Proyeccion:', error);
    }
}


async function mostrarPrincipal() {
    const contenedorMaestro = document.getElementById("contenedor_maestro");

    
    if (!contenedorMaestro) {
        console.error("No se encontró el contenedor con id 'contenedor_maestro'");
        return;
    }
    const peliculasContainer = document.getElementById('peliculasContainer');
    peliculasContainer.innerHTML = ''; 

    const response = await fetch( `https://localhost:7291/api/Empleado/Obtener/${id_usuario}` );
    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const Empleado = await response.json();


    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); 
    const dia = String(hoy.getDate()).padStart(2, '0');

    const soloFecha = `${año}-${mes}-${dia}`;

    
    const fechaDesde = soloFecha;
    const fechaHasta = soloFecha;

    const params = new URLSearchParams();
    if (fechaDesde) params.append('fechaDes', fechaDesde);
    if (fechaHasta) params.append('fechaHas', fechaHasta);




    const responseFun = await fetch(`https://localhost:7291/api/funciones/filtros?${params.toString()}`);
    
    if (!responseFun.ok) {
        throw new Error(`Error en la solicitud: ${responseFun.status}`);
    }
    const funciones = await responseFun.json();
    
    const responseCar = await fetch(`https://localhost:7291/api/Cartelera/${calcularSemana(soloFecha)}`); 
    const cartelera = await responseCar.json();
    if (!responseFun.ok) {
        throw new Error(`Error en la solicitud: ${responseFun.status}`);
    }
    console.log(cartelera)
    console.log(calcularSemana(soloFecha))

    let cards = ''; 

    cartelera.detalleCarteleras.forEach(detalle => {
        const pelicula = detalle.idPeliculaNavigation;

        
        cards += `
            <div class="card card-user-pelis" style="width: 20%; margin-right: 10px;">
                <img src="data:image/jpeg;base64,${pelicula.imagen}" class="card-img-top" alt="${pelicula.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${pelicula.titulo}</h5>
                </div>
            </div>
        `;
    });
    
    


    
    let htmlFunc = "<ul>";
    let i = 0;
    funciones.forEach((funcion) => {
        i = i + 1
        const [horas, minutos] = funcion.horarioInicio.split(':');
        const horarioFormateado = `${horas}:${minutos}`;
        htmlFunc += ` 
            <li>
                <strong>Hora:</strong> ${horarioFormateado} | 
                <strong>Sala:</strong> ${funcion.idSalaNavigation.nombre} | 
                <strong>Película:</strong> ${funcion.idPeliculaNavigation.titulo}
            </li>`;
        });
    htmlFunc += "</ul>";


    if (sliderInterval) {
        clearInterval(sliderInterval);
    }


    // Obtener el JSON de la respuesta
    
    contenedorMaestro.innerHTML = `
    <div class="contenedor-user">
        <div class="usuario">
        <H1 class="titulo-user">Holaa ${nombreUser}!! </H1>
        <div class="right-headers">
        <h3 class="fecha-user">Hoy: ${formatearFecha(soloFecha)}</h3>
        
        </div>
    </div>
    <div class="info-user">
    
        <div class="usuario-datos">
            <h3>Empleado: ${Empleado.nombre} ${Empleado.apellido}</h3>
            <div class="info-row">
                <span><strong>DNI:</strong> ${Empleado.documento}</span>
                <span><strong>Fecha de nacimiento:</strong> ${formatearFecha(Empleado.fechaNacimiento)}</span>
            </div>
            <div class="info-row">
                <span><strong>Cargo:</strong> ${Empleado.idCargoNavigation.cargo1}</span>
                <span><strong>Rol:</strong> ${Empleado.idCargoNavigation.descripcion}</span>
            </div>
            <div class="info-row">
                <span><strong>Email:</strong> ${Empleado.email}</span>
                <span><strong>Teléfono:</strong> ${Empleado.telefono}</span>
            </div>
            <div class="info-row">
                <span><strong>Fecha de alta:</strong> ${formatearFecha(Empleado.fechaAlta)}</span>
                <span><strong>Horario:</strong> ${Empleado.horarioEntrada} - ${Empleado.horarioSalida}</span>
            </div>
        </div>
            <div class="usuario-funciones">
                <div class="info-funciones">
                    <h3>Funciones programadas para hoy: ${i}</h3>
                <div class "lista-funciones">${htmlFunc}</div>
                </div>
            </div>
                <h2>Cartelera vigente:</h2>
                <div class="contenedor-user-pelis">
                
                ${cards}
                </div>
            
    </div>



    <H2 class="titulo-funcionalidades">Chekea nuestras funcionalidades!!</H2>
    <div>

        <div class="carousel">
            <div class="list">
                <div class="item">
                    <img src="../images/funPrin.png">
                    <div class="introduce">
                        <div class="title">Funciones </div>
                        <div class="topic">Gestion</div>
                        <div class="des">
                            La sección de administración de funciones en nuestra plataforma ofrece a los gerentes de Cine 19 una interfaz práctica y visual para organizar y supervisar las funciones diarias. Desde esta página, los administradores pueden crear, modificar, visualizar y eliminar funciones de manera intuitiva y eficiente.
                        </div>
                        <button class="seeMore" onclick="mostrarContenedor();">IR &#8599</button>
                    </div>

                </div>

                <div class="item">
                    <img src="../images/funCrear.png">
                    <div class="introduce">
                        <div class="title">Funciones </div>
                        <div class="topic">Crear nueva</div>
                        <div class="des">Crea nuevas funciones de una manera sencilla y dinamica !
                           </div>
                        <button class="seeMore" onclick="mostrarContenedor();">IR &#8599</button>
                    </div>

                </div>

                <div class="item">
                    <img src="../images/funBuscar.png">
                    <div class="introduce">
                        <div class="title">Funciones </div>
                        <div class="topic">Buscar</div>
                        <div class="des">Busca filtrando por distintos parametros las funciones que necesitas !
                           </div>
                        <button class="seeMore" onclick="mostrarContenedor();">IR &#8599</button>
                    </div>

                </div>

                <div class="item">
                    <img src="../images/funEditar.png">
                    <div class="introduce">
                        <div class="title">Funciones </div>
                        <div class="topic">Editar</div>
                        <div class="des">
                            ¿Quieres cambiar algo? Edita las funciones ya creadas ! </div>
                        <button class="seeMore" onclick="mostrarContenedor();">IR &#8599</button>
                    </div>

                </div>

                <div class="item">
                    <img src="../images/funEliminar.png">
                    <div class="introduce">
                        <div class="title">Funciones </div>
                        <div class="topic">Eliminar</div>
                        <div class="des">
                            Elimina las funciones que no necesites !
                        </div>
                        <button class="seeMore" onclick="mostrarContenedor();">IR &#8599</button>
                    </div>

                </div>

                <div class="item">
                    <img src="../images/pelPrin.png">
                    <div class="introduce">
                        <div class="title">Peliculas </div>
                        <div class="topic">Gestion</div>
                        <div class="des">
                            Gestiona las peliculas, cargue nuevas, edite o elimine antiguas, de una manera sencilla y amigable !</div>
                        <button class="seeMore" onclick="cargarPeliculas();">IR &#8599</button>
                    </div>

                </div>

                <div class="item">
                    <img src="../images/pelCrear.png">
                    <div class="introduce">
                        <div class="title">Peliculas </div>
                        <div class="topic">Cargar nuevas</div>
                        <div class="des">
                            Guarda una nueva pelicula para crear funciones o carteleras !</div>
                        <button class="seeMore" onclick="cargarPeliculas();">IR &#8599</button>
                    </div>

                </div>

                <div class="item">
                    <img src="../images/pelEditar.png">
                    <div class="introduce">
                        <div class="title">Peliculas</div>
                        <div class="topic">Editar</div>
                        <div class="des">
                            Edita los datos de las peliculas ya cargadas !</div>
                        <button class="seeMore" onclick="cargarPeliculas();">IR &#8599</button>
                    </div>

                </div>

                <div class="item">
                    <img src="../images/pelEliminar.png">
                    <div class="introduce">
                        <div class="title">Peliculas </div>
                        <div class="topic">Eliminar</div>
                        <div class="des">
                            Borra peliculas que no necesites !</div>
                        <button class="seeMore" onclick="cargarPeliculas();">IR &#8599</button>
                    </div>

                </div>

                <div class="item">
                    <img src="../images/pelVer.png">
                    <div class="introduce">
                        <div class="title">Peliculas</div>
                        <div class="topic">Gestion</div>
                        <div class="des">
                           Mira informacion detallada de las peliculas ! </div>
                        <button class="seeMore" onclick="cargarPeliculas();">IR &#8599</button>
                    </div>

                </div>

                <div class="item">
                    <img src="../images/cartePrin.png">
                    <div class="introduce">
                        <div class="title">Carteleras</div>
                        <div class="topic">Gestion</div>
                        <div class="des">
                           Gestiona tus carteleras de una forma sencilla </div>
                        <button class="seeMore" onclick="mostrarCarteleras();">IR &#8599</button>
                    </div>

                </div>

                <div class="item">
                    <img src="../images/carteCrear.png">
                    <div class="introduce">
                        <div class="title">Carteleras</div>
                        <div class="topic">Crear</div>
                        <div class="des">
                           Crea nuevas carteleras ! </div>
                        <button class="seeMore" onclick="mostrarCarteleras();">IR &#8599</button>
                    </div>

                </div>
                <div class="item">
                    <img src="../images/carteEditar.png">
                    <div class="introduce">
                        <div class="title">Carteleras</div>
                        <div class="topic">Editar</div>
                        <div class="des">
                           Cambia los datos de las carteleras ya creadas ! </div>
                        <button class="seeMore" onclick="mostrarCarteleras();">IR &#8599</button>
                    </div>

                </div>
                <div class="item">
                    <img src="../images/carteEliminar.png">
                    <div class="introduce">
                        <div class="title">Carteleras</div>
                        <div class="topic">Eliminar</div>
                        <div class="des">
                           Borra carteleras que no necesites ! </div>
                        <button class="seeMore" onclick="mostrarCarteleras();">IR &#8599</button>
                    </div>

                </div>
                




            
                
            </div>
            <div class="arrows">
                <button id="prev"><</button>
                <button id="next">></button>
                
            </div>
        </div>

    </div>


        
    
    </div>`;

let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');



nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}
let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    
    if (items.length > 1) { // Solo hace la animación si hay más de un elemento
        if (type === 'next') {
            listHTML.appendChild(items[0]); // Mueve el primer elemento al final
            carousel.classList.add('next');
        } else {
            listHTML.insertBefore(items[items.length - 1], items[0]); // Mueve el último elemento al inicio
            carousel.classList.add('prev');
        }
    }
    
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(() => {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000);
}

const startSliderInterval = () => {
    sliderInterval = setInterval(() => {
        showSlider('next');
    }, 7000);
};


startSliderInterval();



}

function limpiarSliderIntervalo() {
    if (sliderInterval) {
        clearInterval(sliderInterval);
        sliderInterval = null; 
    }
}

function cargarSemanas() {
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() - 6);
    const anoActual = fechaActual.getFullYear();
    let semana = new Date(anoActual, 0, 1); 
    
   
    semana.setHours(0, 0, 0, 0); 
    let opcionesHtml = ''; 

    while (semana.getFullYear() === anoActual) {
        const fechaMasSieteDias = new Date(semana);
        fechaMasSieteDias.setDate(semana.getDate() + 6); 
        
        
        fechaMasSieteDias.setHours(0, 0, 0, 0);

        const semanaInicio = semana.toLocaleDateString();
        const semanaFin = fechaMasSieteDias.toLocaleDateString();

        
        function formatDateToLocalString(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0'); 
            const minutes = String(date.getMinutes()).padStart(2, '0'); 
            const seconds = String(date.getSeconds()).padStart(2, '0'); 
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        }

        
        const semanaISO = formatDateToLocalString(semana);
        const fechaFinISO = formatDateToLocalString(fechaMasSieteDias);

        if (semana >= fechaActual ) {
            opcionesHtml += `<option value="${semanaISO}">Semana del ${semanaInicio} al ${semanaFin}</option>`;
            
        }

        semana.setDate(semana.getDate() + 7);
    }

    const selectSemanas = document.getElementById("semanas");
    selectSemanas.innerHTML = opcionesHtml; 
}









async function guardarCartelera() {
    let semanaSeleccionada = document.getElementById('semanas').value;


    let fechaInicio = new Date(semanaSeleccionada);
    fechaInicio.setHours(0, 0, 0, 0);

    const paisesSeleccionados = Array.from(document.getElementById('countries').selectedOptions).map(option => option.value);

    const data = {
        fechaInicio: fechaInicio.toISOString().split('T')[0],
        detalleCarteleras: paisesSeleccionados 
    };




    // Verificar que todos los campos estén presentes
    if (!data.fechaInicio || !data.detalleCarteleras) {
        console.error("Faltan campos obligatorios.");
        return;
    }
    try {
        
        const response = await fetch('https://localhost:7291/api/Cartelera', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        });

        
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Error al crear la cartelera: ${error}`);
        }

        const result = await response.json();
        console.log('Cartelera creada exitosamente:', result);
        
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        
    }
    mostrarCarteleras();
}



async function crearCartelera() {
    const contenedorMaestro = document.getElementById("contenedor_maestro");
    
    let opcionesHtml = ''; 
    if (!contenedorMaestro) {
        console.error("No se encontró el contenedor con id 'contenedor_maestro'");
        return;
    }



    try {
        const response = await fetch('https://localhost:7291/Obtener/Peliculas/Hab'); 
        if (!response.ok) throw new Error('Error al cargar las Peliculas');
        
        const peliculas = await response.json();

        
        
                
        peliculas.forEach(peli => {
            opcionesHtml += `<option value="${peli.idPelicula}">${peli.titulo}</option>`;
        });
        
        

        
    } catch (error) {
        console.error('Error al cargar las Peliculas:', error);
    }

    const peliculasContainer = document.getElementById('peliculasContainer');
    peliculasContainer.innerHTML = ''; 

    contenedorMaestro.innerHTML = `
        
                <form id="formularioCartelera">
        
                    <label for="semanas">Selecciona una semana:</label>
                    <select id="semanas" name="semana">
                        
                    </select>
                    <select  class="selector" name="countries" id="countries" multiple>
                            ${opcionesHtml}
                    </select>
            
                    <button type="button" class="guardarCartelera" onclick="guardarCartelera();">Guardar Cartelera</button>
                    <button class="cancelar" type="button" onclick="mostrarCarteleras();">Cancelar</button>
                </form>
            `

            
            cargarSemanas();
            new MultiSelectTag('countries', {
                rounded: true,  // redondear bordes
                shadow: true,  // agregar sombra
                placeholder: 'Buscar',  // texto de búsqueda
                tagColor: {
                    textColor: '#ffffff',  // color de texto de las etiquetas
                    borderColor: '#ffffff',  // color de borde de etiquetas
                    bgColor: '#394053'  // color de fondo de etiquetas
                },
                onChange: function(values) {  // evento cuando el valor cambia
                    console.log(values);  // muestra en consola las opciones seleccionadas
                }
            });
    
}





async function mostrarCarteleras() {
    const contenedorMaestro = document.getElementById("contenedor_maestro");
    
    
    if (!contenedorMaestro) {
        console.error("No se encontró el contenedor con id 'contenedor_maestro'");
        return;
    }
    const peliculasContainer = document.getElementById('peliculasContainer');
    peliculasContainer.innerHTML = ''; 

    contenedorMaestro.innerHTML = `
        <div class="carteleras">
            <div class="tituloConBotones">
                <h2 class="titulo-principal">Carteleras</h2>
                <button class="but-crear-cart" type="button" onclick="crearCartelera();">+</button>

            </div>
            <div class="container mt-5">
                <div id="carteleras-container"></div>
            </div>
        </div>
            `




    fetchCarteleras();
}
function ordenarCartelerasPorFechaYHora(carteleras) {
    return carteleras.sort((a, b) => {
        // Crea objetos Date a partir de fecha y horarioInicio
        const fechaA = new Date(`${a.fechaInicio}`);
        const fechaB = new Date(`${b.fechaInicio}`);
        
        // Compara las fechas
        return fechaA - fechaB;
    });
}


async function fetchCarteleras() {
    try {
        const response = await fetch('https://localhost:7291/api/Cartelera'); // Cambia por tu URL de API
        const carteleras = await response.json();
        displayCarteleras(ordenarCartelerasPorFechaYHora(carteleras));
    } catch (error) {
        console.error('Error al obtener carteleras:', error);
    }
}

// Función para obtener el número de semana del año
function getNumeroSemana(fecha) {
    const date = new Date(fecha);
    const startDate = new Date(date.getFullYear(), 0, 1); // Primer día del año
    const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000)); // Número de días desde el inicio del año
    return Math.ceil((days + startDate.getDay() + 1) / 7); // Calcula el número de semana
}

// Función para formatear una fecha en formato "1 de enero de 2024"
function formatFecha(fecha) {
    const date = new Date(fecha);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options); // Formato en español
}

// Función para obtener la fecha de un día específico, a partir de la fecha de inicio
function getFechaDiaSemana(fechaInicio, diaOffset) {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const fecha = new Date(fechaInicio); // Empezamos con la fecha de inicio
    
    // Sumamos el offset (día relativo al inicio) para obtener la fecha correspondiente
    fecha.setDate(fecha.getDate() + diaOffset); 

    // Formateamos la fecha en formato dd/mm
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const fechaFormateada = `${dia}/${mes}`;

    return { dia: dias[fecha.getDay()], fecha: fechaFormateada };
}

// Función para mostrar las carteleras con la línea del tiempo
function displayCarteleras(carteleras) {
    const container = document.getElementById('carteleras-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas carteleras

    // Iteramos sobre las carteleras y generamos el HTML
    carteleras.forEach(cartelera => {
        const carteleraId = cartelera.idCartelera;
        const fechaInicio = cartelera.fechaInicio; // Obtenemos la fecha de inicio de la cartelera
        const fechaFormateada = formatFecha(fechaInicio); // Formateamos la fecha

        let cards = ''; // Contenedor para las tarjetas de esta cartelera

        cartelera.detalleCarteleras.forEach(detalle => {
            const pelicula = detalle.idPeliculaNavigation;

            // Creamos una tarjeta para cada película
            cards += `
                <div class="card" style="width: 14.5rem; margin-right: 10px;">
                    <img src="data:image/jpeg;base64,${pelicula.imagen}" class="card-img-top" alt="${pelicula.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${pelicula.titulo}</h5>
                    </div>
                </div>
            `;
        });

        // Añadimos la línea del tiempo de los días de la semana
        let timelineHTML = '';
        
        // Generamos los 7 días consecutivos a partir de la fecha de inicio
        for (let i = 0; i < 7; i++) {
            const { dia: nombreDia, fecha } = getFechaDiaSemana(fechaInicio, i);
            timelineHTML += `
                <div class="timeline-day">
                    ${nombreDia} ${fecha}
                </div>
            `;
        }

        container.innerHTML += `
                
            <div class="cartelera mb-3">
               <div class="cartelera-inline">
                <label class="btn btn-primary w-100  Letra"  data-bs-toggle="collapse" data-bs-target="#collapseCartelera${carteleraId}" aria-expanded="true" aria-controls="collapseCartelera${carteleraId}">
                    CARTELERA <br> Semana del ${fechaFormateada}
                </label>
                        
                <button class="editar" onclick="editarCartelera(${carteleraId});">Editar</button>
                <button class="eliminar" onclick="confirmarEliminacionCart(${carteleraId},'${fechaFormateada}');">Eliminar</button>
                </div>

                <!-- Línea del tiempo de los días de la semana con fechas -->


                <div id="collapseCartelera${carteleraId}" class="collapse">
                    <div class="timeline">
                        ${timelineHTML}
                    </div>
                    <div class="d-flex flex-row overflow-auto">
                        ${cards}
                    </div>
                </div>
            </div>
        `;
    });
}







async function eliminarCartelera(id) {
    try {
        const response = await fetch(`https://localhost:7291/api/Cartelera/${id}`, {
            method: 'DELETE'
        });

        if (response.status === 404) {
            console.error("Función no encontrada o no se pudo eliminar.");
        } else if (response.ok) {
            console.log("Función eliminada con éxito.");
        } else {
            console.error("Error al eliminar la función.");
        }
    } catch (error) {
        console.error("Hubo un problema con la solicitud:", error);
    }
    mostrarCarteleras();
}



function confirmarEliminacionCart(id, info) {
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar la cartelera del " + info );

    if (confirmacion) {
        eliminarCartelera(id);
        
    } else {
        console.log("Eliminación cancelada.");

    }
}


async function editarCartelera(id) {
    const contenedorMaestro = document.getElementById("contenedor_maestro");
    
    let opcionesHtml = ''; 
    if (!contenedorMaestro) {
        console.error("No se encontró el contenedor con id 'contenedor_maestro'");
        return;
    }



    try {
        const response = await fetch('https://localhost:7291/Obtener/Peliculas/Hab'); 
        if (!response.ok) throw new Error('Error al cargar las Peliculas');
        
        const peliculas = await response.json();

        
        
                
        peliculas.forEach(peli => {
            opcionesHtml += `<option value="${peli.idPelicula}">${peli.titulo}</option>`;
        });
        
        

        
    } catch (error) {
        console.error('Error al cargar las Peliculas:', error);
    }

    const peliculasContainer = document.getElementById('peliculasContainer');
    peliculasContainer.innerHTML = ''; 

    contenedorMaestro.innerHTML = `
        
                <form id="formularioCartelera">
        
                    <label for="semanas">Selecciona una semana:</label>
                    <select id="semanas" name="semana">
                        
                    </select>
                    <select  class="selector" name="countries" id="countries" multiple>
                            ${opcionesHtml}
                    </select>
            
                    <button type="button" class="guardarCartelera" onclick="guardarCarteleraEdit(${id});">Guardar Cartelera</button>
                    <button class="cancelar" type="button" onclick="mostrarCarteleras();">Cancelar</button>
                </form>
            `

            
            cargarSemanas();
            new MultiSelectTag('countries', {
                rounded: true,  // redondear bordes
                shadow: true,  // agregar sombra
                placeholder: 'Buscar',  // texto de búsqueda
                tagColor: {
                    textColor: '#ffffff',  // color de texto de las etiquetas
                    borderColor: '#ffffff',  // color de borde de etiquetas
                    bgColor: '#394053'  // color de fondo de etiquetas
                },
                onChange: function(values) {  // evento cuando el valor cambia
                    console.log(values);  // muestra en consola las opciones seleccionadas
                }
            });

            
         try {
                
            const response = await fetch(`https://localhost:7291/api/Cartelera/buscar/${id}`,{
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Error al obtener los datos de la Cartelera: ${response.status}`);
            }
    
            const cartelera = await response.json();

            let peliculasSeleccionadas = [];
            cartelera.detalleCarteleras.forEach(detalle => {
                peliculasSeleccionadas.push(detalle.id_pelicula);
                
            });
            
            console.log(cartelera)
       
            const selectPeliculas = document.getElementById('countries');

            
            Array.from(selectPeliculas.options).forEach(option => {
                if (peliculasSeleccionadas.includes(parseInt(option.value))) {
                    option.selected = true;
                }
            });
            
            document.getElementById('semanas').value = cartelera.fechaInicio;
            
            console.log(document.getElementById('semanas').value ) 
    
        } catch (error) {
            console.error("Error al cargar datos en el formulario:", error);
            alert("No se pudieron cargar los datos de la Cartelera.");
        }
            
    
}

async function guardarCarteleraEdit(id){
    let semanaSeleccionada = document.getElementById('semanas').value;


    let fechaInicio = new Date(semanaSeleccionada);
    fechaInicio.setHours(0, 0, 0, 0);

    const paisesSeleccionados = Array.from(document.getElementById('countries').selectedOptions).map(option => option.value);

    const data = {
        fechaInicio: fechaInicio.toISOString().split('T')[0],
        detalleCarteleras: paisesSeleccionados 
    };



    console.log(data)
    // Verificar que todos los campos estén presentes
    if (!data.fechaInicio || !data.detalleCarteleras) {
        console.error("Faltan campos obligatorios.");
        return;
    }
    try {
        
        const response = await fetch(`https://localhost:7291/api/Cartelera/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        });

        
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Error al crear la cartelera: ${error}`);
        }

        const result = await response.json();
        console.log('Cartelera creada exitosamente:', result);
        
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        
    }
    mostrarCarteleras();

}

function calcularSemana(fecha){

    const fechaActual = new Date();
    const anoActual = fechaActual.getFullYear();
    let fecha1 = new Date(anoActual, 0, 1); 

    // Convertir ambas fechas a milisegundos
    const tiempo1 = new Date(fecha1).getTime();
    const tiempo2 = new Date(fecha).getTime();

    // Calcular la diferencia en milisegundos
    const diferenciaTiempo = Math.abs(tiempo2 - tiempo1);

    // Convertir la diferencia de milisegundos a días
    let diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));

    diferenciaDias = Math.floor(diferenciaDias / 7); 

    diferenciaDias = diferenciaDias * 7

    
        
    let nuevaFecha = new Date(fecha1);
        
 
    nuevaFecha.setDate(nuevaFecha.getDate() + diferenciaDias);
    
    const anio = nuevaFecha.getFullYear();
    const mes = (nuevaFecha.getMonth() + 1).toString().padStart(2, '0'); 
    const dia = nuevaFecha.getDate().toString().padStart(2, '0'); 

    const fechaFormateada = `${anio}-${mes}-${dia}`;
    return fechaFormateada;
    
 
}


