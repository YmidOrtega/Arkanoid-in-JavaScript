# Arkanoid in JavaScript

Este proyecto es una implementación simple del clásico juego Arkanoid utilizando JavaScript, HTML5 Canvas y CSS. Perfecto para quienes desean aprender cómo construir mecánicas básicas de juegos en la web.

## Características

- **Gráficos renderizados con Canvas**: Utiliza el elemento `<canvas>` para dibujar la pelota, la paleta y los bloques.
- **Movimiento suave de la pelota y la paleta**: Control de la paleta mediante las teclas izquierda y derecha del teclado.
- **Colisiones**:
  - Rebote de la pelota en los bordes del canvas y en la paleta.
  - Reinicio del juego si la pelota cae por debajo de la paleta.
- **Estructura modular**: Código organizado en funciones separadas para dibujo, control de eventos, movimiento y colisiones.
- **Interfaz minimalista**: Fondo oscuro y gráficos sencillos para mayor enfoque en la jugabilidad.

## Estructura del proyecto

```
Arkanoid-in-JavaScript/
├── index.html
├── src/
│   ├── app.js
│   └── style.css
└── README.md
```

### Archivos principales

- `index.html`: Contiene el canvas y enlaza los archivos de estilo y script.
- `src/app.js`: Lógica principal del juego (dibujo, movimiento, eventos y colisiones).
- `src/style.css`: Estilos para el fondo y el canvas.

## Cómo jugar

1. **Abre el archivo `index.html` en tu navegador web.**
2. **Controla la paleta usando las teclas de flecha izquierda y derecha (`←`, `→`).**
3. **Evita que la pelota caiga. Si lo hace, el juego se reinicia automáticamente.**

## Instalación y ejecución

No se requiere instalación especial. Solo necesitas un navegador moderno.

1. Clona este repositorio:
   ```bash
   git clone https://github.com/YmidOrtega/Arkanoid-in-JavaScript.git
   ```
2. Abre el archivo `index.html` en tu navegador.

## Personalización y mejoras sugeridas

- Agregar bloques/bricks con puntajes y diferentes colores.
- Implementar niveles y vidas.
- Añadir efectos de sonido y música.
- Mejorar el sistema de colisiones y la física de movimiento.
- Hacer que el juego sea responsive y se adapte a diferentes tamaños de pantalla.

## Licencia

Este proyecto está bajo la licencia MIT.

---

¡Contribuciones y sugerencias son bienvenidas!
