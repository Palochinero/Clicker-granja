# 🌱 AGRO-EMPIRE
## De Granja a Imperio Galáctico

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)

**Agro-Empire** es un juego incremental revolucionario que transforma el género tradicional de "clicker" en una experiencia épica de construcción de imperio agrícola. Evoluciona desde un humilde granjero hasta convertirte en el emperador de la agricultura galáctica, controlando ecosistemas enteros y manipulando las leyes fundamentales del universo.

## 🎮 Características Principales

### 🌌 Progresión Épica
- **12 Eras Únicas**: Desde granjas familiares hasta control galáctico
- **Escalado Exponencial**: Números que van desde cientos hasta 1e45+ créditos
- **20+ Unidades de Producción**: Desde gallineros hasta manipuladores de entropía
- **Narrativa Emergente**: Historia que evoluciona con tus decisiones

### 🔄 Sistema de Prestigio Multi-Dimensional
- **4 Tipos Únicos de Prestigio**: Temporal, Espacial, Genético, Económico
- **Árbol de Prestigio Global**: Meta-meta-progresión permanente
- **Monedas Especializadas**: Esencia Temporal, Fragmentos Estelares, etc.
- **Reinicio Inteligente**: Bonificaciones permanentes que se acumulan

### 💻 Experiencia Técnica Avanzada
- **Arquitectura Modular**: 4,000+ líneas de código bien estructurado
- **Performance Optimizada**: 60fps con cálculos complejos
- **Guardado Robusto**: Auto-save con compresión y validación
- **Debug Tools**: Herramientas avanzadas de desarrollo

## 🚀 Instalación y Ejecución

### Ejecución Local Rápida
```bash
# Opción 1: Python (recomendado)
python3 -m http.server 8000

# Opción 2: Node.js
npx serve .

# Opción 3: PHP
php -S localhost:8000

# Opción 4: Cualquier servidor HTTP local
```

Luego visita `http://localhost:8000` en tu navegador.

### Requisitos del Sistema
- **Navegador Moderno**: Chrome 70+, Firefox 65+, Safari 13+, Edge 79+
- **JavaScript**: ES6+ habilitado
- **Almacenamiento**: LocalStorage disponible
- **Performance**: Recomendado 4GB RAM para eras avanzadas

## 📈 Guía de Progresión

### 🎯 Objetivos por Era

| Era | Nombre | Nivel | Objetivo | Duración | Unidades Clave |
|-----|--------|--------|----------|----------|----------------|
| 1 | Granja Familiar | 1-10 | 100K créditos | 30min-2h | Gallineros, Tractores |
| 2 | Cooperativa Regional | 11-25 | 10M créditos | 2-8h | Biorreactores, Drones |
| 3 | Corporación Estatal | 26-45 | 1B créditos | 8-24h | Laboratorios, Estaciones |
| 4 | Conglomerado Nacional | 46-70 | 100B créditos | 1-3 días | Complejos Industriales |
| 5 | Multinacional Global | 71-100 | 10T créditos | 3-7 días | Investigación Orbital |
| 6 | Pionero Oceánico | 101-130 | 1Qa créditos | 1-2 semanas | Complejos Acuícolas |
| 7 | Arquitecto Vertical | 131-165 | 100Qa créditos | 2-4 semanas | Torres Verticales |
| 8 | Señor del Clima | 166-200 | 10Qi créditos | 1-2 meses | Controladores Climáticos |
| 9 | Bioingeniería Extrema | 201-240 | 1Sx créditos | 2-3 meses | Cámaras de Génesis |
| 10 | Conquistador Orbital | 241-285 | 100Sx créditos | 3-6 meses | Anillos Orbitales |
| 11 | Colonizador Planetario | 286-335 | 10Sp créditos | 6-12 meses | Terraformadores |
| 12 | Emperador Galáctico | 336-400+ | ∞ | 1+ años | Cultivadores Universales |

### 💡 Consejos Estratégicos

#### Primeros Pasos (Eras 1-3)
1. **Prioriza la automatización** sobre clics manuales
2. **Reinvierte constantemente** en nuevas unidades
3. **Desbloquea mejoras** para multiplicar la eficiencia
4. **Aprende el ritmo** de cada era

#### Juego Medio (Eras 4-8)
1. **Gestiona múltiples recursos** (biomasa, energía, conocimiento)
2. **Optimiza sinergias** entre unidades de diferentes tiers
3. **Planifica el primer prestigio** cuando el progreso se ralentice
4. **Experimenta con estrategias** de especialización

#### End-Game (Eras 9-12)
1. **Domina el sistema de prestigio** multi-dimensional
2. **Invierte en el árbol global** de prestigio estratégicamente
3. **Balance todos los recursos** terciarios cuidadosamente
4. **Busca optimizaciones** de long-term para máxima eficiencia

## 🛠️ Debug y Desarrollo

### 🔧 Funciones de Consola

#### Recursos y Progresión
```javascript
// Agregar recursos
debug.addCredits(1000000);
debug.addBiomass(50000);
debug.addEnergy(25000);

// Progresión rápida
debug.setLevel(50);
debug.setEra(6);
debug.unlockAllUnits();
debug.completeAllAchievements();

// Información del juego
debug.getGameInfo();
debug.getPerformanceInfo();
```

#### Sistema de Prestigio
```javascript
// Prestigio forzado
debug.forcePrestigeAvailable('temporal');
debug.forcePrestigeAvailable('spatial');
debug.forcePrestigeAvailable('genetic');
debug.forcePrestigeAvailable('economic');

// Agregar monedas de prestigio
debug.addPrestigeCurrency('temporal', 100);
debug.addPrestigeCurrency('spatial', 50);

// Prestigio rápido
debug.quickPrestige('temporal');

// Información de prestigio
debug.getPrestigeInfo();
```

### 📊 Herramientas de Análisis
```javascript
// Performance monitoring
debug.getPerformanceInfo(); // FPS, memoria, etc.

// Balance testing
debug.calculateOptimalStrategy(era); // Análisis de eficiencia

// Save manipulation
debug.exportSave(); // Backup manual
debug.importSave(saveString); // Restaurar específico
```

## 📚 Documentación Técnica

### 🏗️ Arquitectura del Proyecto

```
/workspace/
├── index.html                 # 🏠 Punto de entrada y estructura HTML
├── styles/
│   └── main.css              # 🎨 Estilos completos (900+ líneas)
├── js/
│   ├── utils.js              # 🔧 Utilidades y helpers (400+ líneas)
│   ├── gameData.js           # 📊 Configuración y datos (1000+ líneas)
│   ├── gameEngine.js         # ⚙️ Motor principal del juego (800+ líneas)
│   ├── prestigeSystem.js     # 🔄 Sistema de prestigio (600+ líneas)
│   ├── ui.js                # 🖼️ Interfaz de usuario (700+ líneas)
│   └── main.js              # 🚀 Inicialización y globales (200+ líneas)
├── INFORME_COMPLETO.md       # 📋 Documentación exhaustiva
├── LICENSE                   # ⚖️ Licencia MIT
└── README.md                 # 📖 Este archivo
```

### 🎯 Sistemas Implementados

- ✅ **Motor del Juego**: Sistema de producción automática con delta-time
- ✅ **12 Eras Completas**: Con unidades, objetivos y narrativa única
- ✅ **Prestigio Multi-Dimensional**: 4 tipos con árbol global de mejoras
- ✅ **Sistema de Logros**: 15+ achievements con recompensas tangibles
- ✅ **Guardado Automático**: Persistencia local con compresión Base64
- ✅ **Interfaz Moderna**: Responsive design con animaciones CSS3
- ✅ **Debug Tools**: Herramientas completas de desarrollo y testing
- ✅ **Performance**: Optimizado para manejar cálculos de 1e45+

### 🔍 APIs Principales

#### GameEngine
```javascript
const game = new GameEngine();
game.initialize();                    // Inicializar juego
game.performClick(x, y);             // Clic manual
game.buyUnit('unit_id', quantity);   // Comprar unidades
game.calculateProductionPerSecond(); // Calcular producción
```

#### PrestigeSystem
```javascript
const prestige = new PrestigeSystem(gameEngine);
prestige.performPrestige('temporal'); // Ejecutar prestigio
prestige.getPrestigeInfo('spatial');  // Info de prestigio
prestige.purchaseGlobalPrestigeNode('speed_boost'); // Árbol global
```

## 📊 Métricas del Proyecto

### 📈 Estadísticas de Desarrollo
- **📝 4,000+ líneas de código** distribuidas en arquitectura modular
- **🎮 12 eras épicas** con progresión matemáticamente balanceada
- **🔢 Escalado hasta 1e45+** con performance mantenida a 60fps
- **🌐 Responsive design** compatible con desktop, tablet y móvil
- **💾 Sistema de guardado robusto** con compresión y validación
- **🎨 Interfaz pulida** con 50+ animaciones CSS personalizadas

### ⚖️ Balance Matemático
```javascript
// Costos exponenciales controlados
baseCost * Math.pow(multiplier, owned)
// Donde multiplier varía: 1.15 (básico) → 2.0 (épico)

// Tiempo de recuperación de inversión
ROI_target = 60-300 segundos (según era)

// Incentivo de automatización
passive_income = click_income * 10-50
```

## 🚀 Roadmap y Expansiones Futuras

### 🔮 Próximas Características (v2.0)
- **🧬 Sistema de Investigación**: Árbol de tecnologías completamente funcional
- **⚡ Eventos Dinámicos**: Sistema completo de eventos temporales
- **👥 Multijugador**: Gremios, comercio y competencia entre jugadores
- **🎵 Audio**: Música ambiente y efectos de sonido inmersivos
- **☁️ Cloud Saves**: Sincronización entre dispositivos

### 🔧 Optimizaciones Técnicas (v1.5)
- **🎮 WebGL Canvas**: Rendering optimizado para visualización de granja
- **📱 PWA**: Aplicación web progresiva con soporte offline
- **⚡ WebAssembly**: Cálculos matemáticos ultra-rápidos para end-game
- **📊 Analytics**: Métricas detalladas de comportamiento del jugador
- **🌍 Localización**: Soporte para múltiples idiomas

## 🤝 Contribuciones

### 🛠️ Cómo Contribuir

1. **Fork** el proyecto desde GitHub
2. **Crea** una branch para tu feature:
   ```bash
   git checkout -b feature/MiCaracteristicaIncreible
   ```
3. **Commit** tus cambios:
   ```bash
   git commit -m 'Add: Mi característica increíble'
   ```
4. **Push** a la branch:
   ```bash
   git push origin feature/MiCaracteristicaIncreible
   ```
5. **Abre** un Pull Request con descripción detallada

### 🎯 Áreas de Contribución

- **🎮 Nuevas Mecánicas**: Sistemas de juego innovadores
- **🎨 Mejoras Visuales**: Animaciones, efectos, temas
- **⚡ Optimización**: Performance y escalabilidad
- **🐛 Bug Fixes**: Corrección de errores y mejoras
- **📚 Documentación**: Guías, tutoriales, comentarios
- **🌍 Localización**: Traducción a otros idiomas

### 📋 Guidelines de Código

- **📝 Comentarios**: Documentar funciones complejas
- **🏗️ Arquitectura**: Mantener separación de responsabilidades
- **🧪 Testing**: Probar con debug tools antes de PR
- **📐 Estilo**: Seguir convenciones existentes del proyecto

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para detalles completos.

```
Copyright (c) 2024 Agro-Empire Project
```

## 🌟 Reconocimientos

### 🎮 Inspiración del Género
- **Cookie Clicker**: Pionero del género incremental
- **Universal Paperclips**: Narrativa emergente profunda
- **Kittens Game**: Complejidad de recursos escalable
- **Antimatter Dimensions**: Sistemas de prestigio innovadores

### 🛠️ Tecnologías
- **Vanilla JavaScript**: Por la pureza y control total
- **CSS3**: Animaciones y diseño visual moderno
- **HTML5**: Estructura semántica y accesibilidad
- **GitHub**: Hosting y control de versiones

---

## 📞 Enlaces y Recursos

- **🎮 Jugar Online**: [GitHub Pages](https://palochinero.github.io/Clicker-granja)
- **📊 Informe Completo**: [INFORME_COMPLETO.md](INFORME_COMPLETO.md)
- **🐛 Reportar Bugs**: [GitHub Issues](https://github.com/Palochinero/Clicker-granja/issues)
- **💬 Discusiones**: [GitHub Discussions](https://github.com/Palochinero/Clicker-granja/discussions)

---

<div align="center">

### 🌱 ¡Cultiva el Universo, Un Clic a la Vez! 🌌

**Agro-Empire** • *De Granja a Imperio Galáctico*

[![Jugar Ahora](https://img.shields.io/badge/🎮_Jugar_Ahora-brightgreen?style=for-the-badge)](https://palochinero.github.io/Clicker-granja)
[![Ver Código](https://img.shields.io/badge/📂_Ver_Código-blue?style=for-the-badge)](https://github.com/Palochinero/Clicker-granja)

</div>