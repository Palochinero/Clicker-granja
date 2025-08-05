/**
 * AGRO-EMPIRE: ARCHIVO PRINCIPAL
 * Inicialización del juego y punto de entrada
 */

// Variables globales del juego
let gameEngine;
let gameUI;

// ==========================================
// INICIALIZACIÓN PRINCIPAL
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("🌱 Iniciando Agro-Empire...");
    
    try {
        // Verificar que todos los módulos estén disponibles
        if (!window.GameUtils) {
            throw new Error("GameUtils no está disponible");
        }
        
        if (!window.GameData) {
            throw new Error("GameData no está disponible");
        }
        
        if (!window.GameEngine) {
            throw new Error("GameEngine no está disponible");
        }
        
        if (!window.GameUI) {
            throw new Error("GameUI no está disponible");
        }
        
        // Inicializar el motor del juego
        console.log("🔧 Inicializando motor del juego...");
        gameEngine = new GameEngine();
        
        // Dar tiempo para que el motor se inicialice completamente
        setTimeout(() => {
            // Inicializar la interfaz de usuario
            console.log("🎨 Inicializando interfaz de usuario...");
            gameUI = new GameUI(gameEngine);
            
            // Configurar manejadores globales
            setupGlobalEventHandlers();
            
            // Marcar como completamente inicializado
            markGameAsReady();
            
            console.log("✅ Agro-Empire inicializado completamente!");
            
            // Mostrar mensaje de bienvenida personalizado
            showWelcomeMessage();
            
        }, 100);
        
    } catch (error) {
        console.error("❌ Error al inicializar Agro-Empire:", error);
        showErrorMessage(error.message);
    }
});

// ==========================================
// CONFIGURACIÓN DE EVENTOS GLOBALES
// ==========================================

function setupGlobalEventHandlers() {
    // Prevenir cierre accidental de la ventana
    window.addEventListener('beforeunload', function(e) {
        if (gameEngine && gameEngine.isRunning) {
            gameEngine.saveGame();
            
            // Solo mostrar confirmación si hay progreso significativo
            const gameState = gameEngine.getGameState();
            if (gameState.stats.totalCreditsEarned > 1000) {
                e.preventDefault();
                e.returnValue = 'Tu progreso se ha guardado. ¿Estás seguro de que quieres salir?';
                return e.returnValue;
            }
        }
    });
    
    // Guardar al cerrar/cambiar de pestaña
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && gameEngine) {
            gameEngine.saveGame();
        }
    });
    
    // Pausar/reanudar el juego cuando la ventana pierde/gana foco
    window.addEventListener('blur', function() {
        if (gameEngine) {
            gameEngine.isRunning = false;
        }
    });
    
    window.addEventListener('focus', function() {
        if (gameEngine) {
            gameEngine.isRunning = true;
        }
    });
    
    // Manejar errores globales
    window.addEventListener('error', function(e) {
        console.error('Error global capturado:', e.error);
        GameUtils.showNotification("Se produjo un error. El juego se ha guardado automáticamente.", "error");
        
        if (gameEngine) {
            gameEngine.saveGame();
        }
    });
    
    // Manejar errores de promesas no capturadas
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Promesa rechazada no manejada:', e.reason);
        e.preventDefault();
    });
}

// ==========================================
// FUNCIONES DE UTILIDAD GLOBAL
// ==========================================

function markGameAsReady() {
    document.body.classList.add('game-ready');
    
    // Ocultar cualquier pantalla de carga si existe
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    
    // Habilitar elementos de la interfaz
    document.querySelectorAll('[data-enable-on-ready]').forEach(element => {
        element.disabled = false;
    });
}

function showWelcomeMessage() {
    const gameState = gameEngine.getGameState();
    const isNewPlayer = gameState.stats.totalClicks === 0 && gameState.stats.totalCreditsEarned === 0;
    
    if (isNewPlayer) {
        // Mensaje para nuevos jugadores
        setTimeout(() => {
            GameUtils.showNotification(
                "¡Bienvenido a Agro-Empire! Haz clic en 'Cosechar' para comenzar tu imperio agrícola.",
                "success",
                6000
            );
        }, 1000);
        
        // Tutorial básico después de unos segundos
        setTimeout(() => {
            showBasicTutorial();
        }, 3000);
    } else {
        // Mensaje para jugadores que regresan
        const playTime = Math.floor(gameState.player.totalPlaytime / 60); // en minutos
        let welcomeMsg = "¡Bienvenido de vuelta!";
        
        if (playTime > 60) {
            welcomeMsg += ` Has jugado por ${Math.floor(playTime / 60)} horas.`;
        } else if (playTime > 0) {
            welcomeMsg += ` Has jugado por ${playTime} minutos.`;
        }
        
        GameUtils.showNotification(welcomeMsg, "success", 4000);
    }
}

function showBasicTutorial() {
    // Tutorial muy básico para nuevos jugadores
    const tutorialSteps = [
        {
            element: '#main-click-btn',
            text: "Haz clic aquí para cosechar y ganar créditos",
            duration: 4000
        },
        {
            element: '.tabs',
            text: "Usa estas pestañas para navegar por las diferentes secciones",
            duration: 4000
        },
        {
            element: '#units-list',
            text: "Aquí puedes comprar unidades que generen créditos automáticamente",
            duration: 4000
        }
    ];
    
    // Implementación simple del tutorial
    let currentStep = 0;
    
    function showTutorialStep() {
        if (currentStep >= tutorialSteps.length) return;
        
        const step = tutorialSteps[currentStep];
        const element = document.querySelector(step.element);
        
        if (element) {
            // Agregar clase de highlight
            element.classList.add('tutorial-highlight');
            
            // Mostrar mensaje
            GameUtils.showNotification(`💡 Tutorial: ${step.text}`, "success", step.duration);
            
            // Remover highlight después de la duración
            setTimeout(() => {
                element.classList.remove('tutorial-highlight');
                currentStep++;
                setTimeout(showTutorialStep, 1000);
            }, step.duration);
        } else {
            currentStep++;
            showTutorialStep();
        }
    }
    
    showTutorialStep();
}

function showErrorMessage(message) {
    // Crear un overlay de error simple
    const errorOverlay = document.createElement('div');
    errorOverlay.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            color: white;
            font-family: Arial, sans-serif;
        ">
            <div style="
                background: #2a2a2a;
                padding: 30px;
                border-radius: 10px;
                border: 2px solid #ff4444;
                max-width: 500px;
                text-align: center;
            ">
                <h2 style="color: #ff4444; margin: 0 0 20px 0;">
                    ❌ Error de Inicialización
                </h2>
                <p style="margin: 0 0 20px 0; line-height: 1.5;">
                    ${message}
                </p>
                <button onclick="location.reload()" style="
                    background: #ff4444;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                ">
                    Recargar Página
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(errorOverlay);
}

// ==========================================
// FUNCIONES DE DEPURACIÓN (solo en desarrollo)
// ==========================================

// Funciones de ayuda para depuración (disponibles en la consola)
window.debug = {
    // Obtener estado del juego
    getGameState: () => gameEngine ? gameEngine.getGameState() : null,
    
    // Agregar créditos
    addCredits: (amount) => {
        if (gameEngine) {
            gameEngine.gameState.resources.credits += amount;
            GameUtils.showNotification(`Agregados ${amount} créditos`, "success");
        }
    },
    
    // Agregar recursos
    addResource: (resource, amount) => {
        if (gameEngine) {
            gameEngine.gameState.resources[resource] = 
                (gameEngine.gameState.resources[resource] || 0) + amount;
            GameUtils.showNotification(`Agregados ${amount} ${resource}`, "success");
        }
    },
    
    // Subir nivel
    levelUp: (levels = 1) => {
        if (gameEngine) {
            gameEngine.gameState.player.level += levels;
            GameUtils.showNotification(`Subido ${levels} nivel(es)`, "success");
        }
    },
    
    // Desbloquear todas las unidades
    unlockAllUnits: () => {
        if (gameEngine) {
            Object.keys(gameEngine.gameState.units).forEach(unitId => {
                gameEngine.gameState.units[unitId].unlocked = true;
            });
            GameUtils.showNotification("Todas las unidades desbloqueadas", "success");
        }
    },
    
    // Completar logro
    completeAchievement: (achievementId) => {
        if (gameEngine && gameEngine.gameState.achievements[achievementId]) {
            gameEngine.unlockAchievement(achievementId);
        }
    },
    
    // Activar evento
    triggerEvent: (eventId) => {
        if (gameEngine && GameData.DYNAMIC_EVENTS[eventId]) {
            gameEngine.triggerEvent(GameData.DYNAMIC_EVENTS[eventId]);
        }
    },
    
    // Velocidad del juego
    setGameSpeed: (multiplier) => {
        if (gameEngine) {
            gameEngine.config.updateFrequency = 50 / multiplier;
            GameUtils.showNotification(`Velocidad del juego x${multiplier}`, "warning");
        }
    },
    
    // Información del rendimiento
    getPerformanceInfo: () => {
        if (!gameEngine) return null;
        
        return {
            fps: Math.round(1000 / gameEngine.config.updateFrequency),
            gameState: gameEngine.getGameState(),
            memoryUsage: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + ' MB',
                total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + ' MB'
            } : 'No disponible'
        };
    },
    
    // Funciones específicas de prestigio
    forcePrestigeAvailable: (type) => {
        if (gameEngine && gameEngine.prestigeSystem) {
            const config = GameData.PRESTIGE_SYSTEMS[type];
            if (config) {
                config.available = true;
                config.wasAvailable = true;
                GameUtils.showNotification(`Prestigio ${type} forzado como disponible`, "warning");
            }
        }
    },
    
    // Agregar monedas de prestigio
    addPrestigeCurrency: (type, amount) => {
        if (gameEngine && gameEngine.gameState.prestige[type]) {
            gameEngine.gameState.prestige[type].currency = 
                (gameEngine.gameState.prestige[type].currency || 0) + amount;
            GameUtils.showNotification(`Agregadas ${amount} monedas de prestigio ${type}`, "success");
        }
    },
    
    // Simular prestigio rápido
    quickPrestige: (type) => {
        if (gameEngine && gameEngine.prestigeSystem) {
            debug.forcePrestigeAvailable(type);
            setTimeout(() => {
                gameEngine.prestigeSystem.performPrestige(type);
            }, 100);
        }
    },
    
    // Información del sistema de prestigio
    getPrestigeInfo: () => {
        if (gameEngine && gameEngine.prestigeSystem) {
            return {
                availablePrestige: gameEngine.prestigeSystem.getAllPrestigeInfo(),
                currencies: gameEngine.prestigeSystem.getPrestigeCurrencies(),
                globalTree: gameEngine.prestigeSystem.getGlobalPrestigeTreeInfo(),
                history: gameEngine.prestigeSystem.prestigeHistory
            };
        }
        return null;
    }
};

// ==========================================
// UTILIDADES DE RENDIMIENTO
// ==========================================

// Monitor de rendimiento básico
function setupPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkPerformance() {
        frameCount++;
        const currentTime = performance.now();
        
        // Verificar cada 5 segundos
        if (currentTime - lastTime >= 5000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // Si el FPS es muy bajo, advertir al usuario
            if (fps < 10) {
                console.warn(`⚠️ Rendimiento bajo detectado: ${fps} FPS`);
                
                // Sugerir optimizaciones
                GameUtils.showNotification(
                    "Rendimiento bajo detectado. Considera cerrar otras pestañas del navegador.",
                    "warning",
                    5000
                );
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkPerformance);
    }
    
    // Solo en modo desarrollo
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        requestAnimationFrame(checkPerformance);
    }
}

// ==========================================
// CONFIGURACIÓN ADICIONAL
// ==========================================

// Configurar service worker para funcionalidad offline (futuro)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        // .then(registration => console.log('SW registered'))
        // .catch(error => console.log('SW registration failed'));
    });
}

// Configurar notificaciones push si están disponibles
function setupNotifications() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        // Lógica para notificaciones push (futuro)
    }
}

// Inicializar monitoreo de rendimiento
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(setupPerformanceMonitoring, 2000);
});

// ==========================================
// EXPOSICIÓN GLOBAL PARA ACCESO FÁCIL
// ==========================================

// Hacer las principales funciones accesibles globalmente para depuración
window.game = {
    engine: () => gameEngine,
    ui: () => gameUI,
    save: () => gameEngine ? gameEngine.saveGame() : false,
    load: () => gameEngine ? gameEngine.loadGame() : false,
    reset: () => gameEngine ? gameEngine.resetGame() : false,
    state: () => gameEngine ? gameEngine.getGameState() : null
};

console.log("🎮 Agro-Empire v1.0.0 - Sistema inicializado");
console.log("💡 Usa 'debug.*' en la consola para funciones de depuración");
console.log("🎯 Usa 'game.*' para acceso rápido a funciones principales");