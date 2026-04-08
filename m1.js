const coloreshex = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF', '#974c4c', '#888888'];
const colorsHSL = ['hsl(0, 100%, 50%)', 'hsl(120, 100%, 50%)', 'hsl(240, 100%, 50%)', 'hsl(60, 100%, 50%)', 'hsl(300, 100%, 50%)', 'hsl(180, 100%, 50%)', 'hsl(0, 0%, 100%)', 'hsl(133, 56%, 35%)', 'hsl(0, 0%, 53%)'];

const contenedor = document.getElementById("contenedor");

// mea ayudo a generar colores 
let coloresGenerados = [];

// hacer boton 
function generarColores(cantidad){
    coloresGenerados = [];

    for (let i = 0; i < cantidad; i++) {
        let colorBase = coloreshex[Math.floor(Math.random() * coloreshex.length)];
        coloresGenerados.push(colorBase);
    }

    mostrarColores();
}

//  Función para mostrar colores
function mostrarColores() {
    contenedor.innerHTML = "";

    const formato = document.getElementById("formatSelect").value;

    coloresGenerados.forEach(colorBase => {
        const cuadro = document.createElement("div");
        cuadro.classList.add("cuadro");

        let textoColor = formato === "HEX"
            ? colorBase
            : hexAHsl(colorBase);

        //fondo SIEMPRE usa el color original
        cuadro.style.backgroundColor = colorBase;

        //texto cambia según formato
        cuadro.textContent = textoColor;

        contenedor.appendChild(cuadro);
    });
}

//(genera nuevos colores)
document.querySelector("button").addEventListener("click", () => {
    const cantidad = document.getElementById("colorSelect").value;
    generarColores(cantidad);
});

//  Evento del selector (solo cambia formato)
document.getElementById("formatSelect").addEventListener("change", () => {
    mostrarColores();
});

// Función HEX a HSL
function hexAHsl(hex) {
    hex = hex.replace("#", "");

    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l;

    l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = ((g - b) / d) % 6;
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h = Math.round(h * 60);
        if (h < 0) h += 360;
    }

    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}
