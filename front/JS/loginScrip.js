///FEDE JWT
const API_URL_JWT = "https://localhost:7291/api/Jwt" //LINK PARA JWT

async function login() {
    try {

        const usuario1 = document.getElementById("INusuario").value;
        const contra = document.getElementById("INcontraseña").value;

        const usuario = {
            usuario1,
            contra
        };

        //POST
        const response = await fetch(API_URL_JWT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        // Manejo error
        if (!response.ok) {
            const errorDetails = await response.text();
            
            throw new Error(`Error al validar: ${response.statusText}. Detalles: ${errorDetails}`);
        }

        const data = await response.json();
        const token = data.token;
        const expiresIn = new Date(data.expiresIn).getTime();

        console.log('Token recibido:', token);

        //Guardo token y vida util
        localStorage.setItem('authToken', token);
        localStorage.setItem('expiryTime', expiresIn);



        //Redirigiendo...
        window.location.href = '../HTML/principal.html';

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        mostrarModal('Error', 'Usuario o contraseña incorrectos');
    }
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

  function mostrarModal(titulo, mensaje) {
    document.getElementById('modalMensajeLabel').innerText = titulo;
    document.getElementById('modalMensajeCuerpo').innerText = mensaje;
    const modal = new bootstrap.Modal(document.getElementById('modalMensaje'));
    modal.show();
}

