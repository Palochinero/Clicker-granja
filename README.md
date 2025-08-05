# 🌱 Agro-Empire: De Granja a Imperio Galáctico

Un juego incremental (idle/clicker) desarrollado en JavaScript vanilla que te lleva desde una pequeña granja familiar hasta controlar la agricultura de galaxias enteras.

## 🎮 Descripción del Juego

**Agro-Empire** es un juego incremental futurista donde comienzas como un pequeño agricultor que ha heredado una parcela de tierra de su abuela Elara. A través de clics estratégicos, compra de unidades de producción automática, investigación de tecnologías y gestión de recursos, construirás un imperio agrícola que eventualmente se expandirá más allá de las estrellas.

### 🌟 Características Principales

- **12 Eras de Progresión**: Desde Granja Familiar hasta Emperador Galáctico
- **Sistema de Clics Evolutivo**: Clics básicos, cuánticos, temporales y omnipresentes
- **Producción Automática**: Más de 15 tipos de unidades de producción con sinergias complejas
- **Árbol de Tecnologías**: 4 ramas de investigación (Biología, Tecnología, Espacial, Economía)
- **Sistema de Prestigio Multi-dimensional**: 4 tipos de prestigio (Temporal, Espacial, Genético, Económico)
- **Eventos Dinámicos**: Crisis y oportunidades que afectan el gameplay
- **Sistema de Logros**: Más de 15 logros en múltiples categorías
- **Narrativa Emergente**: Historia que evoluciona con tus decisiones

## 🚀 Instalación y Ejecución

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado

### Instalación Local
1. Clona o descarga este repositorio
2. Abre `index.html` en tu navegador
3. ¡Comienza a construir tu imperio!

### Para Desarrollo
Si quieres contribuir al proyecto:

```bash
# Clona el repositorio
git clone https://github.com/tuusuario/agro-empire.git

# Entra al directorio
cd agro-empire

# Abre con tu editor preferido
code .

# Sirve localmente (opcional, con cualquier servidor local)
python -m http.server 8000
# o
npx serve .
```

## 🎯 Cómo Jugar

### Primeros Pasos
1. **Haz Clic**: Comienza haciendo clic en el botón "Cosechar" para ganar tus primeros créditos
2. **Compra Unidades**: Usa los créditos para comprar tu primer Gallinero Autónomo
3. **Automatiza**: Las unidades generan créditos automáticamente, incluso cuando no estás jugando
4. **Expande**: Compra más unidades y mejoras para aumentar tu producción

### Progresión
- **Recursos**: Gestiona Créditos, Biomasa, Energía y Conocimiento
- **Unidades**: Desde gallineros hasta estaciones orbitales
- **Tecnologías**: Investiga para desbloquear nuevas posibilidades
- **Logros**: Completa desafíos para obtener bonificaciones permanentes

### Estrategias Avanzadas
- **Sinergias**: Las unidades de la misma era se benefician mutuamente
- **Eventos**: Responde estratégicamente a crisis y oportunidades
- **Prestigio**: Reinicia el juego con bonificaciones permanentes

## 🏗️ Arquitectura Técnica

### Estructura del Proyecto
```
agro-empire/
├── index.html              # Archivo principal HTML
├── styles/
│   └── main.css            # Estilos CSS del juego
├── js/
│   ├── utils.js            # Utilidades y funciones auxiliares
│   ├── gameData.js         # Configuración de datos del juego
│   ├── gameEngine.js       # Motor principal del juego
│   ├── ui.js               # Sistema de interfaz de usuario
│   └── main.js             # Inicialización y punto de entrada
└── assets/                 # Recursos (imágenes, sonidos, etc.)
```

### Componentes Principales

#### 🔧 GameEngine
- **Responsabilidad**: Lógica central del juego
- **Funciones**: Cálculo de producción, sistema de clics, compras, logros
- **Frecuencia**: Actualización cada 50ms

#### 🎨 GameUI
- **Responsabilidad**: Interfaz de usuario y visualización
- **Funciones**: Actualización de elementos DOM, manejo de eventos, navegación
- **Conexión**: Se comunica directamente con GameEngine

#### 📊 GameData
- **Responsabilidad**: Configuración estática del juego
- **Contenido**: Eras, unidades, tecnologías, logros, eventos

#### 🛠️ GameUtils
- **Responsabilidad**: Funciones auxiliares
- **Funciones**: Formateo de números, almacenamiento, validaciones

## 🎮 Sistemas de Juego

### Sistema de Recursos
- **Créditos**: Moneda principal
- **Biomasa**: Materia orgánica para construcción
- **Energía**: Poder para tecnologías avanzadas
- **Conocimiento**: Recurso para investigación

### Sistema de Producción
```javascript
// Ejemplo de cálculo de producción
totalProduction = Σ(unidades[i].cantidad × unidades[i].produccionBase × multiplicadores)
```

### Sistema de Costos
```javascript
// Escalado exponencial de costos
costoActual = costoBase × (multiplicador ^ cantidadPoseida)
```

## 🎯 Funciones de Depuración

El juego incluye funciones de depuración accesibles desde la consola del navegador:

```javascript
// Agregar recursos
debug.addCredits(1000000);
debug.addResource('knowledge', 5000);

// Manipular estado
debug.levelUp(5);
debug.unlockAllUnits();

// Información del sistema
debug.getGameState();
debug.getPerformanceInfo();

// Control del juego
game.save();
game.reset();
```

## 🚀 Eras del Juego

1. **Granja Familiar** (Niveles 1-10): Operaciones básicas
2. **Cooperativa Regional** (11-25): Expansión local
3. **Corporación Estatal** (26-45): Dominio nacional
4. **Conglomerado Nacional** (46-70): Control del país
5. **Multinacional Global** (71-100): Presencia mundial
6. **Pionero Oceánico** (101-130): Agricultura marina
7. **Arquitecto Vertical** (131-165): Granjas en megaciudades
8. **Señor del Clima** (166-200): Control climático
9. **Bioingeniería Extrema** (201-240): Creación de vida
10. **Conquistador Orbital** (241-285): Agricultura espacial
11. **Colonizador Planetario** (286-335): Múltiples planetas
12. **Emperador Galáctico** (336+): Control galáctico

## 🏆 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

### Áreas de Contribución
- **Nuevas unidades y tecnologías**
- **Eventos dinámicos**
- **Mejoras de UI/UX**
- **Optimizaciones de rendimiento**
- **Traducciones**

## 📝 Notas de Desarrollo

### Estado Actual
- ✅ Motor del juego funcional
- ✅ Sistema de recursos y producción
- ✅ Interfaz de usuario básica
- ✅ Sistema de guardado/carga
- ✅ Logros y progresión
- 🔄 Sistema de tecnologías (parcial)
- ⏳ Sistema de prestigio (pendiente)
- ⏳ Eventos dinámicos (pendiente)

### Próximas Funcionalidades
- Sistema de investigación completo
- Implementación completa del prestigio
- Eventos aleatorios y crisis
- Música y efectos de sonido
- Animaciones avanzadas
- Modo multijugador (futuro)

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 🎵 Inspiración

Inspirado por juegos como:
- Cookie Clicker
- Adventure Capitalist
- Kittens Game
- Universal Paperclips

---

**¡Disfruta construyendo tu imperio agrícola intergaláctico!** 🌌🚜

*Desarrollado con ❤️ y mucho ☕*