let peliculasData = []; 
function cargarPeliculas() {
    const apiUrl = 'https://localhost:7291/Obtener/Peliculas';
    const contenedorMaestro = document.getElementById("contenedor_maestro");


    if (!contenedorMaestro) {
        console.error("No se encontró el contenedor con id 'contenedor_maestro'");
        return;
    }

    contenedorMaestro.innerHTML = "";
    const peliculasContainer = document.getElementById('peliculasContainer');
    peliculasContainer.innerHTML = ""; 

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw mostrarModal('Error al obtener las películas' + error.message)
            }
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                peliculasContainer.innerHTML = '<p>No se encontraron películas.</p>';
                return;
            }
            peliculasData = Array.from(new Set(data.map(pelicula => JSON.stringify(pelicula)))).map(item => JSON.parse(item));

            peliculasHabilitadas()
        })
        .catch(error => {
            console.error('Error al cargar las películas:', error);
            mostrarModal('Error al cargar las películas');
        });
}

function mostrarModal(titulo, mensaje) {
    document.getElementById('modalMensajeLabel').innerText = titulo;
    document.getElementById('modalMensajeCuerpo').innerText = mensaje;
    const modal = new bootstrap.Modal(document.getElementById('modalMensaje'));
    modal.show();
}

function peliculasHabilitadas() {
    const peliculasHabilitadas = peliculasData.filter(pelicula => pelicula.estado === 'H');
    mostrarPeliculas(peliculasHabilitadas); 
}

function peliculasDeshabilitadas() {
    const peliculasDeshabilitadas = peliculasData.filter(pelicula => pelicula.estado === 'D');
    mostrarPeliculasDesHabilitadas(peliculasDeshabilitadas);
}

function mostrarPeliculas(peliculas) {
    const peliculasContainer = document.getElementById('peliculasContainer');
    peliculasContainer.innerHTML = ` 
        <div class="tituloConBotones">
            <h2 class="titulo-principal-peli">Películas</h2>
            <button class="but-crear-peli" type="button" onclick="mostrarFormularioAgregarPelicula();">+</button>
            <button class="but-crear-peli" type="button" onclick="peliculasHabilitadas();">Películas Habilitadas</button>
            <button class="but-crear-peli" type="button" onclick="peliculasDeshabilitadas();">Películas Deshabilitadas</button>
        </div>`;

    if (peliculas.length === 0) {
        peliculasContainer.innerHTML += '<h2 class="titulo-principal-peli">No se encontraron películas.</h2>';
        return;
    }

    peliculas.forEach(pelicula => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'w3-third w3-margin-bottom movie-card';

        tarjeta.innerHTML = `
            <div class="w3-card-4 movie-card-content">
                <div class="movie-info">
                    <div class="movie-header">
                        <h2>${pelicula.titulo}</h2>
                    </div>
                </div>
                <div class="movie-img">${mostrarImagen(pelicula.imagen)}</div>
                <div class="movie-body">
                    <b>Sinopsis:</b> <span>${pelicula.sinopsis}</span>
                    <div class="movie-footer">
                        <b>Director:</b> <span>${pelicula.director}</span>
                    </div>
                    <div class="card-buttons">
                        <button class="btn-icon" onclick="editarPelicula(${pelicula.idPelicula})"><img src="../RESOURCES/iconEditar.ico" alt="Editar"></button>
                        <button class="btn-icon" onclick="borrarPelicula(${pelicula.idPelicula})"><img src="../RESOURCES/iconBorrar.ico" alt="Borrar"></button>
                        <button class="btn-icon" onclick="verPelicula(${pelicula.idPelicula})"><img src="../RESOURCES/iconMostrarTodo.ico" alt="VerTodo"></button>
                    </div>
                </div>
            </div>
        `;
        peliculasContainer.appendChild(tarjeta);
    });
}




async function mostrarFormularioEdicionDesHabilitadas(pelicula) {
    const contenedorFormulario = document.getElementById('peliculasContainer');
    if (!contenedorFormulario) {
        console.error("El contenedor del formulario no se encuentra en el DOM");
        return;
    }
    contenedorFormulario.style.display="block"

    contenedorFormulario.innerHTML = `
    <form id="formularioEditarPelicula" class="formulario-pelicula">
        <div class="w3-section">
            <label><b>Título</b></label>
            <input class="w3-input w3-border" type="text" name="titulo" value="${pelicula.titulo}" placeholder="Escriba un título..." required>
        </div>
        <div class="w3-section">
            <label><b>Sinopsis</b></label>
            <textarea class="w3-input w3-border" name="sinopsis" placeholder="Escriba una sinopsis..." required>${pelicula.sinopsis}</textarea>
        </div>
        <div class="w3-section">
            <label><b>Productora</b></label>
            <input class="w3-input w3-border" type="text" name="productora" value="${pelicula.productora}" placeholder="Escriba el nombre de la productora..." required>
        </div>
        <div class="w3-section">
            <label><b>Género</b></label>
            <select class="w3-input w3-border" id="idGenero" required></select>
        </div>
        <div class="w3-section">
            <label><b>Calificación</b></label>
            <select class="w3-input w3-border" id="idCalificacion" required></select>
        </div>
        <div class="w3-section">
            <label><b>País de Origen</b></label>
            <select class="w3-input w3-border" id="idPaisOrigen" required></select>
        </div>
        <div class="w3-section">
            <label><b>Director</b></label>
            <input class="w3-input w3-border" type="text" name="director" value="${pelicula.director}" placeholder="Escriba el nombre del director..." required>
        </div>
        <div class="w3-section">
            <label><b>Duración (minutos)</b></label>
            <input class="w3-input w3-border" type="number" name="duracion" value="${pelicula.duracion}" placeholder="Cargue la duración..." required>
        </div>
        <div class="w3-section">
            <label><b>Fecha de Estreno</b></label>
           <input class="w3-input w3-border" type="date" name="fechaEstreno" value="${formatDateToInput(pelicula.fechaEstreno)}" placeholder="Seleccione la fecha de estreno..." required>
        </div>
        <div class="w3-section">
            <label><b>Foto de la Película</b></label>
            <input class="w3-input w3-border" type="file" id="fotoPelicula" accept="image/*">
        </div>

        <button type="submit" class="w3-button w3-black">Guardar</button>
        <button type="button" class="w3-button w3-gray" id="volverBtn" onclick="cargarPeliculas()">Volver</button>
    </form>
    `;

    cargarComboboxes();

    cargarGenerosEditar(pelicula.idGenero);
    cargarCalificacionesEditar(pelicula.idCalificacion);
    cargarPaisesOrigenEditar(pelicula.idPaisOrigen);


    



    const formulario = document.getElementById('formularioEditarPelicula');
    formulario.addEventListener('submit', async function (event) {
        event.preventDefault();

        const inputFile = document.getElementById('fotoPelicula');
        let imagen = '';
        if (inputFile.files.length > 0) {
            try {
                imagen = await convertirImagenABase64(inputFile);
            } catch (error) {
                mostrarModal(error);
                return;
            }
            if (imagen.startsWith("data:image")) {
                imagen = imagen.split(",")[1];
            }
        } else {
            imagen = pelicula.imagen;
        }

        const estado = "D"
        const titulo = formulario.titulo.value;
        const sinopsis = formulario.sinopsis.value;
        const director = formulario.director.value;
        const productora = formulario.productora.value;
        const duracion = parseInt(formulario.duracion.value, 10);
        const fechaEstreno = new Date(formulario.fechaEstreno.value).toISOString();
        const idGenero = parseInt(formulario.idGenero.value, 10);
        const idCalificacion = parseInt(formulario.idCalificacion.value, 10);
        const idPaisOrigen = parseInt(formulario.idPaisOrigen.value, 10);

        if (!titulo || !sinopsis || !director || !productora || duracion <= 0 || !fechaEstreno || idGenero === 0 || idCalificacion === 0 || idPaisOrigen === 0) {
            mostrarModal('Por favor, complete todos los campos requeridos.');
            return;
        }

        const apiUrl = `https://localhost:7291/api/Peliculas/Actualizar/Peliculas/${pelicula.idPelicula}`;
        const peliculaActualizada = {
            titulo,
            sinopsis,
            director,
            duracion,
            productora,
            fechaEstreno,
            idGenero,
            idCalificacion,
            idPaisOrigen,
            estado,
            imagen
        };

        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(peliculaActualizada)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al actualizar la película: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                mostrarModal('Éxito', data.message);
                cargarPeliculas();
            })
            .catch(error => {
                mostrarModal('Error', error.message);
            });
    });
}




function mostrarPeliculasDesHabilitadas(peliculas) {
    const peliculasContainer = document.getElementById('peliculasContainer');
    peliculasContainer.innerHTML = ` 
        <div class="tituloConBotones">
            <h2 class="titulo-principal-peli">Películas</h2>
            <button class="but-crear-peli" type="button" onclick="mostrarFormularioAgregarPelicula();">+</button>
            <button class="but-crear-peli" type="button" onclick="peliculasHabilitadas();">Películas Habilitadas</button>
            <button class="but-crear-peli" type="button" onclick="peliculasDeshabilitadas();">Películas Deshabilitadas</button>
        </div>`; 

    if (peliculas.length === 0) {
        peliculasContainer.innerHTML += '<h2 class="titulo-principal-peli">No se encontraron películas.</h2>';
        return;
    }

    peliculas.forEach(pelicula => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'w3-third w3-margin-bottom movie-card';

        tarjeta.innerHTML = `
            <div class="w3-card-4 movie-card-content">
                <div class="movie-info">
                    <div class="movie-header">
                        <h2>${pelicula.titulo}</h2>
                    </div>
                </div>
                <div class="movie-img">${mostrarImagen(pelicula.imagen)}</div>
                <div class="movie-body">
                    <b>Sinopsis:</b> <span>${pelicula.sinopsis}</span>
                    <div class="movie-footer">
                        <b>Director:</b> <span>${pelicula.director}</span>
                    </div>
                    <div class="card-buttons">
                        <button class="btn-icon" onclick="editarPelicula(${pelicula.idPelicula})"><img src="../RESOURCES/iconEditar.ico" alt="Editar"></button>
                        <button class="btn-icon" onclick="borrarPelicula(${pelicula.idPelicula})"><img src="../RESOURCES/icono_activar.ico" alt="Borrar"></button>
                        <button class="btn-icon" onclick="verPelicula(${pelicula.idPelicula})"><img src="../RESOURCES/iconMostrarTodo.ico" alt="VerTodo"></button>
                    
                    </div>
                </div>
            </div>
        `;
        peliculasContainer.appendChild(tarjeta);
    });
}




function verPelicula(idPelicula) {
    console.log(`Quiero ver la película con id: ${idPelicula}`);
    const apiUrl = `https://localhost:7291/api/Peliculas/Obtener/Peliculas/${idPelicula}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta de la API: ${response.status}`);
            }
            return response.json();
        })
        .then(pelicula => {
            console.log('Datos de la película:', pelicula);

            const peliculasContainer = document.getElementById('peliculasContainer');
            peliculasContainer.innerHTML = '';
            
            mostrarFormularioVisualizacion(pelicula);
        })
        .catch(error => {
            console.error('Error al cargar los detalles de la película:', error);
        });
}

function mostrarFormularioVisualizacion(pelicula) {
    const contenedorFormulario = document.getElementById('peliculasContainer');
    if (!contenedorFormulario) {
        console.error("El contenedor del formulario no se encuentra en el DOM");
        return;
    }

    contenedorFormulario.style.display="block"
    contenedorFormulario.innerHTML = `
    <form id="formularioVerPelicula" class="formulario-pelicula">
        <div class="w3-section">
            <label><b>Título</b></label>
            <input class="w3-input w3-border" type="text" name="titulo" value="${pelicula.titulo}" placeholder="Escriba un titulo..." disabled>
        </div>
        <div class="w3-section">
            <label><b>Sinopsis</b></label>
            <textarea class="w3-input w3-border" name="sinopsis" placeholder="Escriba una sinopsis..." disabled>${pelicula.sinopsis}</textarea>
        </div>
        <div class="w3-section">
            <label><b>Productora</b></label>
            <input class="w3-input w3-border" type="text" name="productora" value="${pelicula.productora}" placeholder="Escriba el nombre de la productora..." disabled>
        </div>
        <div class="w3-section">
            <label><b>Estado</b></label>
            <input class="w3-input w3-border" type="text" name="estado" value="${pelicula.estado}" placeholder="Escriba el nombre de la productora..." disabled>
        </div>
        <div class="w3-section">
            <label><b>Género</b></label>
            <select class="w3-input w3-border" id="idGenero" disabled></select>
        </div>
        <div class="w3-section">
            <label><b>Calificación</b></label>
            <select class="w3-input w3-border" id="idCalificacion" disabled></select>
        </div>
        <div class="w3-section">
            <label><b>País de Origen</b></label>
            <select class="w3-input w3-border" id="idPaisOrigen" disabled></select>
        </div>
        <div class="w3-section">
            <label><b>Director</b></label>
            <input class="w3-input w3-border" type="text" name="director" value="${pelicula.director}" placeholder="Escriba el nombre del director..." disabled>
        </div>
        <div class="w3-section">
            <label><b>Duración (minutos)</b></label>
            <input class="w3-input w3-border" type="number" name="duracion" value="${pelicula.duracion}" placeholder="Cargue la duración..." disabled>
        </div>
        <div class="w3-section">
            <label><b>Fecha de Estreno</b></label>
            <input class="w3-input w3-border" type="date" name="fechaEstreno" value="${formatDateToInput(pelicula.fechaEstreno)}" placeholder="Seleccione la fecha de estreno..." disabled>
        </div>
        <button type="button" class="w3-button w3-gray" id="volverBtn" onclick="cargarPeliculas()">Volver</button>
        
    </form>
    `;
    cargarComboboxes();
    cargarGenerosEditar(pelicula.idGenero);
    cargarCalificacionesEditar(pelicula.idCalificacion);
    cargarPaisesOrigenEditar(pelicula.idPaisOrigen);



    


}


function cargarGenerosEditar(idGeneroSeleccionado) {
    fetch('https://localhost:7291/Obtener/Generos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar géneros');
            }
            return response.json();
        })
        .then(data => {
            const generoSelect = document.getElementById('idGenero');
            generoSelect.innerHTML = '<option value="" disabled>Seleccione un género</option>'; 

            data.forEach(genero => {
                const option = document.createElement('option');
                option.value = genero.idGenero; 
                option.textContent = genero.genero1; 
                generoSelect.appendChild(option);
            });

            if (idGeneroSeleccionado) {
                generoSelect.value = idGeneroSeleccionado;
            }
        })
        .catch(error => {
            console.error('Error al cargar géneros:', error);
            mostrarModal(error.message); 
        });
}
function cargarCalificacionesEditar(idCalificacionSeleccionada) {
    fetch('https://localhost:7291/Obtener/Calificaciones')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar calificaciones');
            }
            return response.json();
        })
        .then(data => {
            const calificacionSelect = document.getElementById('idCalificacion');
            calificacionSelect.innerHTML = '<option value="" disabled>Seleccione una calificación</option>'; 

            data.forEach(calificacion => {
                const option = document.createElement('option');
                option.value = calificacion.idCalificacion;
                option.textContent = calificacion.calificacion;
                calificacionSelect.appendChild(option);
            });

            if (idCalificacionSeleccionada) {
                calificacionSelect.value = idCalificacionSeleccionada;
            }
        })
        .catch(error => {
            console.error('Error al cargar calificaciones:', error);
            mostrarModal(error.message); 
        });
}


function cargarPaisesOrigenEditar(idPaisOrigenSeleccionado) {
    fetch('https://localhost:7291/Obtener/PaisOrigen')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar países de origen');
            }
            return response.json();
        })
        .then(data => {
            const paisSelect = document.getElementById('idPaisOrigen');
            paisSelect.innerHTML = '<option value="" disabled>Seleccione un país de origen</option>'; 
            data.forEach(pais => {
                const option = document.createElement('option');
                option.value = pais.idPaisOrigen;
                option.textContent = pais.pais;
                paisSelect.appendChild(option);
            });

            if (idPaisOrigenSeleccionado) {
                paisSelect.value = idPaisOrigenSeleccionado;
            }
        })
        .catch(error => {
            console.error('Error al cargar países de origen:', error);
            mostrarModal(error.message);
        });
}

//editar------------------------------------------------------------------------------------------------------



async function mostrarFormularioEdicion(pelicula) {
    const contenedorFormulario = document.getElementById('peliculasContainer');
    if (!contenedorFormulario) {
        console.error("El contenedor del formulario no se encuentra en el DOM");
        return;
    }
    contenedorFormulario.style.display="block"

    contenedorFormulario.innerHTML = `
        <form id="formularioEditarPelicula" class="formulario-pelicula">
            <div class="w3-section">
                <label><b>Título</b></label>
                <input class="w3-input w3-border" type="text" name="titulo" value="${pelicula.titulo}" placeholder="Escriba un titulo..." required>
            </div>
            <div class="w3-section">
                <label><b>Sinopsis</b></label>
                <textarea class="w3-input w3-border" name="sinopsis" placeholder="Escriba una sinopsis..." required>${pelicula.sinopsis}</textarea>
            </div>
             <div class="w3-section">
                <label><b>Productora</b></label>
                <input class="w3-input w3-border" type="text" name="productora" value="${pelicula.productora}" placeholder="Escriba el nombre de la productora..." required>
            </div>
            <div class="w3-section">
                <label><b>Género</b></label>
                <select class="w3-input w3-border" id="idGenero" required></select>
            </div>
            <div class="w3-section">
                <label><b>Calificación</b></label>
                <select class="w3-input w3-border" id="idCalificacion" required></select>
            </div>
            <div class="w3-section">
                <label><b>País de Origen</b></label>
                <select class="w3-input w3-border" id="idPaisOrigen" required></select>
            </div>
            <div class="w3-section">
                <label><b>Director</b></label>
                <input class="w3-input w3-border" type="text" name="director" value="${pelicula.director}" placeholder="Escriba el nombre del director..." required>
            </div>
            <div class="w3-section">
                <label><b>Duración (minutos)</b></label>
                <input class="w3-input w3-border" type="number" name="duracion" value="${pelicula.duracion}" placeholder="Cargue la duración..." required>
            </div>
            <div class="w3-section">
                <label><b>Fecha de Estreno</b></label>
               <input class="w3-input w3-border" type="date" name="fechaEstreno" value="${formatDateToInput(pelicula.fechaEstreno)}" placeholder="Seleccione la fecha de estreno..." required>
            </div>
            <div class="w3-section">
                <label><b>Foto de la Película</b></label>
                <input class="w3-input w3-border" type="file" id="fotoPelicula"  accept="image/*" >
            </div>
            <button type="submit" class="w3-button w3-black"  >Guardar</button>
            <button type="button" class="w3-button w3-gray" id="volverBtn" onclick="cargarPeliculas()">Volver</button>
        </form>
    `;

    cargarComboboxes();

    cargarGenerosEditar(pelicula.idGenero);
    cargarCalificacionesEditar(pelicula.idCalificacion);
    cargarPaisesOrigenEditar(pelicula.idPaisOrigen);

    
    const formulario = document.getElementById('formularioEditarPelicula');
    formulario.addEventListener('submit', async function (event) {
        event.preventDefault();

        const inputFile = document.getElementById('fotoPelicula');
        let imagen = '';
        if (inputFile.files.length > 0) {
            try {
                imagen = await convertirImagenABase64(inputFile);
            } catch (error) {
                mostrarModal(error);
                return;
            }
            if (imagen.startsWith("data:image")) {
                imagen = imagen.split(",")[1];
            }
        } else {
            imagen = pelicula.imagen;
        }

        const estado = "H"
        const titulo = formulario.titulo.value;
        const sinopsis = formulario.sinopsis.value;
        const director = formulario.director.value;
        const productora = formulario.productora.value;
        const duracion = parseInt(formulario.duracion.value, 10);
        const fechaEstreno = new Date(formulario.fechaEstreno.value).toISOString();
        const idGenero = parseInt(formulario.idGenero.value, 10);
        const idCalificacion = parseInt(formulario.idCalificacion.value, 10);
        const idPaisOrigen = parseInt(formulario.idPaisOrigen.value, 10);

        if (!titulo || !sinopsis || !director || !productora || duracion <= 0 || !fechaEstreno || idGenero === 0 || idCalificacion === 0 || idPaisOrigen === 0) {
            mostrarModal('Por favor, complete todos los campos requeridos.');
            return;
        }

        const apiUrl = `https://localhost:7291/api/Peliculas/Actualizar/Peliculas/${pelicula.idPelicula}`;
        const peliculaActualizada = {
            titulo,
            sinopsis,
            director,
            duracion,
            productora,
            fechaEstreno,
            idGenero,
            idCalificacion,
            idPaisOrigen,
            estado,
            imagen
        };

        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(peliculaActualizada)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al actualizar la película: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                mostrarModal('Éxito', data.message);
                cargarPeliculas();
            })
            .catch(error => {
                mostrarModal('Error', error.message);
            });
    });
 
    



    

}
 function guardarPelicula(pelicula) {

    const formulario = document.getElementById('formularioEditarPelicula');
    


    const inputFile = document.getElementById('fotoPelicula');
    let imagen = '';
    if (inputFile.files.length > 0) {
        try {
            imagen =  convertirImagenABase64(inputFile); 

        } catch (error) {
            mostrarModal(error); 
            return;
        }
        if (imagen.startsWith("data:image")) {
            imagen = imagen.split(",")[1]; 

        }
    }
    else {
        imagen = pelicula.imagen;

    }


    const titulo = formulario.titulo.value;
    const sinopsis = formulario.sinopsis.value;
    const director = formulario.director.value;
    const productora = formulario.productora.value;
    const duracion = parseInt(formulario.duracion.value, 10);
    const fechaEstreno = new Date(formulario.fechaEstreno.value).toISOString();  
    const idGenero = parseInt(formulario.idGenero.value, 10);
    const idCalificacion = parseInt(formulario.idCalificacion.value, 10);
    const idPaisOrigen = parseInt(formulario.idPaisOrigen.value, 10);

    if (!titulo || !sinopsis || !director || !productora || duracion <= 0 || !fechaEstreno || idGenero === 0 || idCalificacion === 0 || idPaisOrigen === 0) {
        mostrarModal('Por favor, complete todos los campos requeridos.');
        return; 
    }
    console.log(pelicula)
    console.log('Datos del formulario:', { titulo, sinopsis, director, duracion, productora, fechaEstreno, idGenero, idCalificacion, idPaisOrigen, imagen });

    const apiUrl = `https://localhost:7291/api/Peliculas/Actualizar/Peliculas/${pelicula.idPelicula}`;


    const peliculaActualizada = {
        titulo,
        sinopsis,
        director,
        duracion,
        productora,
        fechaEstreno,
        idGenero,
        idCalificacion,
        idPaisOrigen,
        imagen,
        estado:"H"
    };
    console.log(peliculaActualizada)
    fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(peliculaActualizada)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al actualizar la película: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Película actualizada con éxito', data);
            mostrarModal('Exito', data.message);
        })
        .catch(error => {
            console.error('Error al actualizar la película:', error);
            mostrarModal('Error', error.message);

        });
       
}



    
function mostrarFormularioAgregarPelicula() {

        const peliculasContainer = document.getElementById('peliculasContainer');
        peliculasContainer.innerHTML = `
        
    <h2 class="w3-center">Agregar Nueva Película</h2>
    <form id="formAgregarPelicula" class="formulario-pelicula" enctype="multipart/form-data">
        <div class="w3-section">
            <label><b>Título</b></label>
            <input class="w3-input w3-border" type="text" id="titulo" placeholder="Escriba un título..." required>
        </div>
        <div class="w3-section">
            <label><b>Sinopsis</b></label>
            <textarea class="w3-input w3-border" id="sinopsis" placeholder="Escriba una sinopsis..." required></textarea>
        </div>
        <div class="w3-section">
            <label><b>Género</b></label>
            <select class="w3-input w3-border" id="idGenero" required></select>
        </div>
        <div class="w3-section">
            <label><b>Calificación</b></label>
            <select class="w3-input w3-border" id="idCalificacion" required></select>
        </div>
        <div class="w3-section">
            <label><b>País de Origen</b></label>
            <select class="w3-input w3-border" id="idPaisOrigen" required></select>
        </div>
        <div class="w3-section">
            <label><b>Productora</b></label>
            <input class="w3-input w3-border" type="text" id="productora" placeholder="Escriba la productora..." required>
        </div>
        <div class="w3-section">
            <label><b>Director</b></label>
            <input class="w3-input w3-border" type="text" id="director" placeholder="Escriba el nombre del director..." required>
        </div>
        <div class="w3-section">
            <label><b>Duración (minutos)</b></label>
            <input class="w3-input w3-border" type="number" id="duracion" placeholder="Cargue la duración..." required>
        </div>
        <div class="w3-section">
            <label><b>Fecha de Estreno</b></label>
            <input class="w3-input w3-border" type="date" id="fechaEstreno" required>
        </div>
        <div class="w3-section">
            <label><b>Foto de la Película</b></label>
            <input class="w3-input w3-border" type="file" id="fotoPelicula" accept="image/*" >
        </div>
        <button type="button" class="w3-button w3-block w3-black" onclick="enviarPelicula()">Cargar</button>
        <button type="button" class="w3-button w3-gray" id="volverBtn" onclick="cargarPeliculas()">Volver</button>
    </form>


    `;
    
    
    cargarComboboxes();
    
    

        
}










function cargarComboboxes() {
    cargarGeneros();
    cargarCalificaciones();
    cargarPaisesOrigen();
}

function cargarGeneros() {
    fetch('https://localhost:7291/Obtener/Generos')
        .then(response => response.json())
        .then(data => {
            console.log('Datos de calificaciones:', data); 
            const generoSelect = document.getElementById('idGenero');
            generoSelect.innerHTML = '<option value="" disabled selected>Seleccione un género</option>'; // Opción predeterminada
            data.forEach(genero => {
                const option = document.createElement('option');
                option.value = genero.idGenero; // Usa idGenero como el valor
                option.textContent = genero.genero1; // Usa genero1 como el nombre que se muestra
                generoSelect.appendChild(option);
            });
        })
        
        .catch(error => console.error('Error al cargar géneros:', error));
}

function cargarCalificaciones() {
    fetch('https://localhost:7291/Obtener/Calificaciones')
        .then(response => response.json())
        .then(data => {
            console.log('Datos de calificaciones:', data); 
            const calificacionSelect = document.getElementById('idCalificacion');
            calificacionSelect.innerHTML = '<option value="" disabled selected>Seleccione una calificación</option>'; // Opción predeterminada
            data.forEach(calificacion => {
                const option = document.createElement('option');
                option.value = calificacion.idCalificacion; // Usa el idCalificacion
                option.textContent = calificacion.calificacion; // Usa la calificacion
                calificacionSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar calificaciones:', error));
}

function cargarPaisesOrigen() {
    fetch('https://localhost:7291/Obtener/PaisOrigen')
        .then(response => response.json())
        .then(data => {
            console.log('Datos de países de origen:', data); // Verifica los datos en la consola
            const paisSelect = document.getElementById('idPaisOrigen');
            paisSelect.innerHTML = '<option value="" disabled selected>Seleccione un país de origen</option>'; // Opción predeterminada
            data.forEach(pais => {
                const option = document.createElement('option');
                option.value = pais.idPaisOrigen; // Usa el idPaisOrigen
                option.textContent = pais.pais; // Usa la propiedad pais
                paisSelect.appendChild(option); // Agrega la opción al select
            });
        })
        .catch(error => console.error('Error al cargar países de origen:', error));
}





async function enviarPelicula() {
    const apiUrl = 'https://localhost:7291/Agregar/Pelicula';

    const inputFile = document.getElementById('fotoPelicula');
    let imagenPel = '';
    try {
        imagenPel = await convertirImagenABase64(inputFile); // Espera a que la imagen se convierta a Base64
    } catch (error) {
        mostrarModal(error); // Muestra un mensaje si ocurre un error al convertir la imagen
        return;
    }
    if (imagenPel.startsWith("data:image")) {
        imagenPel = imagenPel.split(",")[1]; // Remueve el prefijo "data:image/jpeg;base64,"
    }

    const nuevaPelicula = {
        titulo: document.getElementById('titulo').value,
        sinopsis: document.getElementById('sinopsis').value,
        idGenero: parseInt(document.getElementById('idGenero').value) || 0,
        idCalificacion: parseInt(document.getElementById('idCalificacion').value) || 0,
        idPaisOrigen: parseInt(document.getElementById('idPaisOrigen').value) || 0,
        productora: document.getElementById('productora').value,
        director: document.getElementById('director').value,
        duracion: parseInt(document.getElementById('duracion').value) || 0,
        fechaEstreno: document.getElementById('fechaEstreno').value,
        imagen: imagenPel,
        estado: "H"// Aquí ya es el string "Habilitada" o "Deshabilitada"
    };
    
    console.log(nuevaPelicula)
    // Validaciones
    if (!nuevaPelicula.titulo || !nuevaPelicula.sinopsis || nuevaPelicula.idGenero === 0 ||
        nuevaPelicula.idCalificacion === 0 || nuevaPelicula.idPaisOrigen === 0 ||
        !nuevaPelicula.productora || !nuevaPelicula.director ||
        nuevaPelicula.duracion <= 0 || !nuevaPelicula.fechaEstreno 
        || !nuevaPelicula.estado) {
        mostrarModal('Por favor, complete todos los campos requeridos.');
        return;
    }

    console.log('Datos enviados:', JSON.stringify(nuevaPelicula));

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaPelicula)
        });

        if (!response.ok) {
            throw new Error('Error al agregar la película');
        }

        const contentType = response.headers.get("content-type");
        const data = contentType && contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        if (typeof data === 'string') {
            mostrarModal('Éxito', data);
        } else {
            mostrarModal('Éxito', data.message);
        }
        cargarPeliculas();
    } catch (error) {
        console.error('Error al cargar la película:', error);
        mostrarModal('Error', error.message);
    }
}

function convertirImagenABase64(inputFile) {
    return new Promise((resolve, reject) => {
        const file = inputFile.files[0];
        if (!file) {
            reject('No se ha seleccionado ningún archivo');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // Devuelve el resultado en Base64
        reader.onerror = error => reject('Error al leer el archivo: ' + error);
        reader.readAsDataURL(file);
    });
}

function formatDateToInput(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}




function borrarPelicula(id) {
    const apiUrl = `https://localhost:7291/Eliminar/Peliculas/${id}`; // URL de la API

    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                mostrarModal('Éxito', data.message); // Muestra el mensaje dinámico enviado por la API
                cargarPeliculas(); // Recarga la lista de películas
            } else {
                mostrarModal('Error', data.message); // Muestra el mensaje de error
            }
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarModal('Error', 'Ocurrió un error al procesar la operación.'); // Error genérico
        });
}




function editarPelicula(idPelicula) {
    console.log(`Quiero editar la película con id: ${idPelicula}`);
    const apiUrl = `https://localhost:7291/api/Peliculas/Obtener/Peliculas/${idPelicula}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta de la API: ${response.status}`);
            }
            return response.json();
        })
        .then(pelicula => {
            console.log('Datos de la película a editar:', pelicula);

            const peliculasContainer = document.getElementById('peliculasContainer');
            peliculasContainer.style.display = 'none';

            mostrarFormularioEdicion(pelicula);
        })
        .catch(error => {
            console.error('Error al cargar los detalles de la película:', error);
        });
}