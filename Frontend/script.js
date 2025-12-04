// La dirección de tu Backend (C#). Aca es donde JavaScript va a buscar los datos.
const API_URL = "https://localhost:7258/api/vehiculos";


// Estas variables recuerdan qué está viendo el usuario para no perderse.
let paginaActual = 1;          // Qué página de resultados estamos viendo (1, 2, 3...)
let terminoBusqueda = "";      // Qué escribió en el buscador (ej: "Fiat")
let precioMin = "";            // Filtro de precio mínimo
let precioMax = "";            // Filtro de precio máximo
let marcaSeleccionada = "";    // Filtro de marca (Radio button)
let ordenSeleccionado = "";    // Filtro de orden (Select: precio, km, año)

// Variables de Lógica de Control 
let esModoVerMenos = false;    // Bandera: ¿El botón dice "Ver Más" o "Volver"?
let esModoVerTodo = false;     // Bandera: ¿El usuario apretó "Ir al Catálogo" (traer todo)?
let autosCargados = [];        // Memoria Clave: Guardamos acá los autos que trae la API 
                               // para poder mostrar sus detalles en el Modal sin llamar al servidor de nuevo.


//  INICIO DE LA APLICACIÓN (Main)
// Este evento se dispara cuando el HTML terminó de cargarse por completo.
document.addEventListener("DOMContentLoaded", () => {
    
    // Apenas entra el usuario, cargamos los primeros 6 autos.
    cargarAutos(); 

    
    //  CONFIGURACIÓN DE EVENTOS (Escuchadores)
    // Aca le decimos a los botones y teclas qué hacer cuando el usuario interactúa.

    // BUSCADOR (Input de Texto y Lupa) ---
    const inputBuscador = document.getElementById("txtSearch");
    const btnLupa = document.getElementById("btnSearch");

    // Función interna para ejecutar la búsqueda
    const realizarBusqueda = () => {
        terminoBusqueda = inputBuscador.value; // Guardamos lo que escribió
        resetearPaginacion(); // Borramos lo que había y volvemos a pág 1
        cargarAutos();        // Llamamos a la API con el filtro nuevo
    };

    // Si el usuario está en el input y aprieta ENTER
    if (inputBuscador) {
        inputBuscador.addEventListener("keyup", (e) => {
            if (e.key === "Enter") realizarBusqueda();
        });
    }
    // Si el usuario hace clic en el ícono de la lupa
    if (btnLupa) {
        btnLupa.addEventListener("click", realizarBusqueda);
    }

    // FILTROS DE PRECIO 
    const btnMin = document.getElementById("btnMin");
    const inpMin = document.getElementById("inpMin");
    const btnMax = document.getElementById("btnMax");
    const inpMax = document.getElementById("inpMax");

    // Lógica para Precio Mínimo
    const aplicarMin = (e) => {
        e.preventDefault(); // Evita que la página se recargue (es un form)
        precioMin = inpMin.value;
        resetearPaginacion();
        cargarAutos();
    };
    if (btnMin) btnMin.addEventListener("click", aplicarMin); // Clic en flecha
    if (inpMin) inpMin.addEventListener("keyup", (e) => { if (e.key === "Enter") aplicarMin(e); }); // Enter

    // Lógica para Precio Máximo
    const aplicarMax = (e) => {
        e.preventDefault();
        precioMax = inpMax.value;
        resetearPaginacion();
        cargarAutos();
    };
    if (btnMax) btnMax.addEventListener("click", aplicarMax);
    if (inpMax) inpMax.addEventListener("keyup", (e) => { if (e.key === "Enter") aplicarMax(e); });

    // FILTRO DE MARCAS 
    // Buscamos todos los circulitos que tengan name="marca"
    const radiosMarca = document.querySelectorAll('input[name="marca"]');
    radiosMarca.forEach(radio => {
        // El evento "change" detecta cuando seleccionás uno nuevo
        radio.addEventListener("change", (e) => {
            marcaSeleccionada = e.target.value; // Guardamos "Fiat", "Ford", etc.
            resetearPaginacion();
            cargarAutos();
        });
    });

    //  ORDENAMIENTO
    const selectOrden = document.getElementById("select_1");
    if (selectOrden) {
        selectOrden.addEventListener("change", (e) => {
            ordenSeleccionado = e.target.value; // Guardamos "precio_asc", "km_desc", etc.
            resetearPaginacion();
            cargarAutos();
        });
    }

    // BOTÓN INTELIGENTE "VER MÁS / VER MENOS" 
    const botonVerMas = document.querySelector(".boton_vermas");
    if (botonVerMas) {
        botonVerMas.addEventListener("click", (e) => {
            e.preventDefault(); // Que no te lleve arriba de la página
            
            if (esModoVerMenos) {
                // CASO 1: El botón dice "Ver Menos" (Volver)
                resetearPaginacion();
                esModoVerMenos = false;
                botonVerMas.textContent = "Ver Más Autos";
                cargarAutos(); // Recargamos solo los primeros 6
                
                // Scroll suave hacia arriba 
                const buscador = document.querySelector(".barra_busqueda");
                if (buscador) buscador.scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
                // CASO 2: El botón dice "Ver Más"
                paginaActual++; // Avanzamos de página (1 -> 2)
                cargarAutos();  // Traemos los siguientes (sin borrar los anteriores)
            }
        });
    }

    //  BOTÓN HERO "IR AL CATÁLOGO" 
    // Este botón es un RESET TOTAL. Limpia todos los filtros.
    const btnHero = document.getElementById("btnHero");
    if (btnHero) {
        btnHero.addEventListener("click", () => {
            // Limpiamos inputs visuales y variables de memoria
            inputBuscador.value = ""; terminoBusqueda = "";
            inpMin.value = ""; precioMin = "";
            inpMax.value = ""; precioMax = "";
            marcaSeleccionada = ""; ordenSeleccionado = "";
            
            // Visualmente marcamos "Todas" en el radio button
            const radioTodas = document.querySelector('input[value="Todas"]');
            if(radioTodas) radioTodas.checked = true;
            if(selectOrden) selectOrden.value = "precio_asc";

            paginaActual = 1;
            esModoVerTodo = true; // Activamos modo especial: Traer 100 autos
            limpiarCatalogo();
            cargarAutos();
        });
    }

    //  Botón "Ver Todo" para marcas ocultas
    const btnVerMarcas = document.getElementById("btnVerMarcas");
    const marcasExtra = document.getElementById("marcas-extra");
    if (btnVerMarcas && marcasExtra) { 
        btnVerMarcas.addEventListener("click", () => {
            // Alternar visibilidad 
            if (marcasExtra.style.display === "none") {
                marcasExtra.style.display = "block";
                btnVerMarcas.textContent = "Ver Menos"; 
            } else {
                marcasExtra.style.display = "none";
                btnVerMarcas.textContent = "Ver Todo"; 
            }
        });
    }

    // MODAL: EVENTOS DE CIERRE 
    const modalOverlay = document.getElementById("modaloverlay");
    const btnCerrarModal = document.querySelector(".close-modal");

    // Cerrar con la X
    if (btnCerrarModal) btnCerrarModal.addEventListener("click", cerrarModal);
    
    // Cerrar haciendo clic en el fondo oscuro (afuera de la tarjeta)
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) cerrarModal();
        });
    }

}); 


//LÓGICA DE COMUNICACIÓN CON API (Backend)
async function cargarAutos() {
    const contenedor = document.getElementById("contenedor-autos");
    const contenedorBoton = document.querySelector(".contenedor-boton-vermas");
    const botonVerMas = document.querySelector(".boton_vermas");

    try {
        // Si apretamos el botón Hero, pedimos 100. Si no, pedimos 7 (6 para mostrar + 1 ).
        let cantidadAPedir = esModoVerTodo ? 100 : 7;

        //  CONSTRUIR LA URL (Query Strings)
        // Armamos la dirección: api/vehiculos?pagina=1&cantidad=7&buscar=fiat...
        let url = `${API_URL}?pagina=${paginaActual}&cantidad=${cantidadAPedir}`;
        
        // Solo agregamos los filtros a la URL si tienen valor
        if (terminoBusqueda !== "") url += `&buscar=${terminoBusqueda}`;
        if (precioMin !== "") url += `&min=${precioMin}`;
        if (precioMax !== "") url += `&max=${precioMax}`;
        if (marcaSeleccionada !== "" && marcaSeleccionada !== "Todas") url += `&marca=${marcaSeleccionada}`;
        if (ordenSeleccionado !== "") url += `&orden=${ordenSeleccionado}`;

        // LLAMADA AL SERVIDOR (Fetch)
        // "await" espera a que la API responda antes de seguir
        const respuesta = await fetch(url);
        const autos = await respuesta.json(); // Convertimos la respuesta a una lista de objetos JS

        //  GUARDADO EN MEMORIA
        if (paginaActual === 1) autosCargados = autos; // Si es búsqueda nueva, reemplazamos la memoria
        else autosCargados = autosCargados.concat(autos); // Si es "Ver Más", agregamos a lo que ya había

        // LÓGICA Detectar fin de lista
        let hayMasPaginas = false;
        if (!esModoVerTodo && autos.length > 6) {
            // Si pedimos 7 y llegaron 7, significa que hay más autos para la próxima.
            hayMasPaginas = true;
            autos.pop(); // Sacamos el auto n° 7 de la lista visual (lo guardamos para después)
        }

        // MANEJO DE "SIN RESULTADOS"
        if (autos.length === 0 && paginaActual === 1) {
            contenedor.innerHTML = "<h3>No se encontraron resultados :(</h3>";
            if(contenedorBoton) contenedorBoton.style.display = "none"; // Ocultamos el botón "Ver Más"
            return;
        }

        // DIBUJAR TARJETAS 
        autos.forEach(auto => {
            // Formato de moneda argentina(aunque estan en dolares) ($ 10.000)
            const precioFormateado = auto.precio.toLocaleString('es-AR'); 
            const kmFormateado = auto.kilometraje.toLocaleString('es-AR');

            
            // Fijate el onclick="abrirModal(${auto.id})" -> Eso conecta la tarjeta con el modal
            const tarjeta = `
                <div class="card_content" onclick="abrirModal(${auto.id})">
                    <img src="${auto.imagenUrl}" alt="${auto.modelo}" class="card_img">
                    <h2 class="card_title">${auto.marca} ${auto.modelo}</h2>
                    <p class="card_subtitle">${auto.descripcion}</p>
                    <ul class="card_details">
                        <li>Año: ${auto.año}</li>
                        <li>${kmFormateado} km</li>
                        <li>Transmisión: ${auto.transmision || "Manual"}</li>
                    </ul>
                    <div class="card_precio"> 
                        <h4 class="price">Precio</h4>
                        <h3 class="plata">$ ${precioFormateado}</h3>
                    </div>
                </div>
            `;
            // Inyectamos la tarjeta en el contenedor
            contenedor.innerHTML += tarjeta;
        });

        // GESTIÓN DEL BOTÓN "VER MÁS"
        if (contenedorBoton) {
            contenedorBoton.style.display = "block";
            if (esModoVerTodo) {
                botonVerMas.textContent = "Ver Menos (Volver)";
                esModoVerMenos = true;
            } else if (hayMasPaginas) {
                botonVerMas.textContent = "Ver Más Autos"; // Todavía quedan autos
                esModoVerMenos = false;
            } else {
                botonVerMas.textContent = "Ver Menos (Volver)"; // Se acabaron
                esModoVerMenos = true;
            }
        }
    } catch (error) {
        console.error("Error:", error); // Logueamos error si falla la API
    }
}


// LÓGICA DEL MODAL (Ventana Emergente)
function abrirModal(id) {
    // Buscamos el auto específico en la memoria usando su ID
    const auto = autosCargados.find(a => a.id === id);
    if (!auto) return;

    // Llenamos los elementos del HTML del modal con los datos del auto
    document.getElementById("modal-img").src = auto.imagenUrl;
    document.getElementById("modal-title").textContent = `${auto.marca} ${auto.modelo}`;
    
    // Inyectamos los íconos de características
    const specsContainer = document.getElementById("modal-specs");
    const kmFormateado = auto.kilometraje.toLocaleString('es-AR');
    
    if (specsContainer) {
        specsContainer.innerHTML = `
            <div class="spec-item">
                <i class="fa-regular fa-calendar"></i>
                <span>${auto.año}</span>
            </div>
            <div class="spec-item">
                <i class="fa-solid fa-road"></i>
                <span>${kmFormateado} km</span>
            </div>
            <div class="spec-item">
                <i class="fa-solid fa-gears"></i>
                <span>${auto.transmision || "Manual"}</span>
            </div>
        `;
    }

    document.getElementById("modal-desc").textContent = auto.descripcion;
    const precioFormateado = auto.precio.toLocaleString('es-AR');
    document.getElementById("modal-price").textContent = `$ ${precioFormateado} usd`;

    // Limpiamos inputs anteriores (si hubiera)
    const inputEmail = document.getElementById("modal-input-email");
    if(inputEmail) inputEmail.value = ""; 
    
    // Restauramos el botón 
    const btnConsultar = document.querySelector(".modal-boton");
    if(btnConsultar) {
        btnConsultar.textContent = "Lo Quiero!!";
        btnConsultar.disabled = false;
        btnConsultar.style.display = "block";
    }

    // Hacemos visible el fondo oscuro y bloqueamos el scroll
    const modal = document.getElementById("modaloverlay");
    if (modal) {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden"; 
    }
    
    // Activamos la lógica del botón "Lo Quiero"
    configurarBotonAnimado();
}

function cerrarModal() {
    const modal = document.getElementById("modaloverlay");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Devolvemos el scroll a la página
    }
}

// --- Lógica de la Notificación 
function configurarBotonAnimado() {
    const btnConsultar = document.querySelector(".modal-boton");
    if (btnConsultar) {
        btnConsultar.onclick = () => {
            cerrarModal(); // Cerramos ventana
            mostrarNotificacionExito(); // Mostramos cartel 
        };
    }
}

function mostrarNotificacionExito() {
    const toast = document.getElementById("notificacion-toast");
    if (toast) {
        toast.classList.add("mostrar"); // CSS hace bajar el cartel
        setTimeout(() => {
            toast.classList.remove("mostrar"); // A los 3 seg, vuelve a subir
        }, 3000);
    }
}

//  FUNCIONES AUXILIARES

// Resetea la vista a Página 1 (se usa al filtrar o buscar)
function resetearPaginacion() {
    paginaActual = 1;
    esModoVerTodo = false;
    limpiarCatalogo();
}

// Borra todas las tarjetas visualmente antes de cargar nuevas
function limpiarCatalogo() {
    const contenedor = document.getElementById("contenedor-autos");
    if(contenedor) contenedor.innerHTML = "";
}