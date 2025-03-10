function mostrarNosotros() {
  const contenedorMaestro = document.getElementById("contenedor_maestro");

  // Si el contenedor ya tiene contenido, lo vacía (para cerrar)
  if (contenedorMaestro.innerHTML) {
    contenedorMaestro.innerHTML = '';
    return;
  }


  // Añadir el contenido dinámico
  contenedorMaestro.innerHTML = `
      <div class="row">
        <!-- Miembro 1 -->
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body text-center">
              <h5 class="card-title">Santino Fenoglio</h5>
              <p class="card-text">DESCRIPCIÓN RANDOM.</p>
            </div>
          </div>
        </div>
        <!-- Miembro 2 -->
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body text-center">
              <h5 class="card-title">Nacho Grudine</h5>
              <p class="card-text">DESCRIPCIÓN RANDOM.</p>
            </div>
          </div>
        </div>
        <!-- Miembro 3 -->
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body text-center">
              <h5 class="card-title">Federico Funes</h5>
              <p class="card-text">DESCRIPCIÓN RANDOM.</p>
            </div>
          </div>
        </div>
        <!-- Miembro 4 -->
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-body text-center">
              <h5 class="card-title">Facundo Rocha</h5>
              <p class="card-text">DESCRIPCIÓN RANDOM.</p>
            </div>
          </div>
        </div>
      </div>
      <div id="youtubePlayer" class="mt-5"></div>
    `;

  // Inicializar el reproductor de YouTube
  videoYoutube();
}

function videoYoutube() {
  new YT.Player('youtubePlayer', {
    height: '700',
    width: '1300',
    videoId: 'WM8bTdBs-cw', // Cambia esto por el ID de tu video
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0
    },
    events: {
      onReady: (event) => console.log('Reproductor listo.'),
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.ENDED) {
          console.log('Video finalizado.');
        }
      }
    }
  });
}

function mostrarLogin() {
  window.location.href = '../HTML/login.html';
}