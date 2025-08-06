/**
 * AGRO-EMPIRE: UTILIDADES
 * Funciones auxiliares para el juego
 */

// ==========================================
// FORMATEO DE NÚMEROS
// ==========================================

/**
 * Sufijos para números grandes
 */
const NUMBER_SUFFIXES = [
    '', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc',
    'UDc', 'DDc', 'TDc', 'QaDc', 'QiDc', 'SxDc', 'SpDc', 'OcDc', 'NoDc', 'Vg',
    'UVg', 'DVg', 'TVg', 'QaVg', 'QiVg', 'SxVg', 'SpVg', 'OcVg', 'NoVg', 'Tg'
];

/**
 * Formatea un número grande con sufijos
 * @param {number} num - Número a formatear
 * @param {number} precision - Precisión decimal (default: 2)
 * @param {boolean} scientific - Usar notación científica para números muy grandes
 * @returns {string} Número formateado
 */
function formatNumber(num, precision = 2, scientific = false) {
    if (num === 0) return '0';
    if (num < 0) return '-' + formatNumber(-num, precision, scientific);
    
    // Para números muy pequeños
    if (num < 1 && num > 0) {
        return num.toFixed(precision);
    }
    
    // Para números menores a 1000, mostrar sin sufijo
    if (num < 1000) {
        return num.toFixed(precision === 2 && num >= 100 ? 0 : precision);
    }
    
    // Calcular el índice del sufijo
    const tier = Math.floor(Math.log10(num) / 3);
    
    // Si excede nuestros sufijos o el usuario prefiere notación científica
    if (tier >= NUMBER_SUFFIXES.length || scientific) {
        return num.toExponential(precision);
    }
    
    const suffix = NUMBER_SUFFIXES[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = num / scale;
    
    return scaled.toFixed(precision) + suffix;
}

/**
 * Formatea un número como moneda
 * @param {number} amount - Cantidad a formatear
 * @param {string} symbol - Símbolo de moneda (default: '')
 * @returns {string} Cantidad formateada como moneda
 */
function formatCurrency(amount, symbol = '') {
    return symbol + formatNumber(amount);
}

/**
 * Formatea un tiempo en segundos a formato legible
 * @param {number} seconds - Segundos a formatear
 * @returns {string} Tiempo formateado
 */
function formatTime(seconds) {
    if (seconds < 60) {
        return Math.floor(seconds) + 's';
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}m ${remainingSeconds}s`;
    } else if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    } else {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        return `${days}d ${hours}h`;
    }
}

/**
 * Formatea un porcentaje
 * @param {number} value - Valor entre 0 y 1
 * @param {number} precision - Precisión decimal
 * @returns {string} Porcentaje formateado
 */
function formatPercentage(value, precision = 1) {
    return (value * 100).toFixed(precision) + '%';
}

// ==========================================
// CÁLCULOS DE JUEGO
// ==========================================

/**
 * Calcula el costo de la siguiente unidad usando escalado exponencial
 * @param {number} baseCost - Costo base
 * @param {number} owned - Cantidad poseída
 * @param {number} multiplier - Multiplicador de escalado (default: 1.15)
 * @returns {number} Costo de la siguiente unidad
 */
function calculateCost(baseCost, owned, multiplier = 1.15) {
    return Math.floor(baseCost * Math.pow(multiplier, owned));
}

/**
 * Calcula cuántas unidades se pueden comprar con una cantidad de dinero
 * @param {number} money - Dinero disponible
 * @param {number} baseCost - Costo base de la unidad
 * @param {number} owned - Cantidad ya poseída
 * @param {number} multiplier - Multiplicador de escalado
 * @returns {number} Cantidad máxima que se puede comprar
 */
function calculateMaxAffordable(money, baseCost, owned, multiplier = 1.15) {
    if (money < calculateCost(baseCost, owned, multiplier)) {
        return 0;
    }
    
    let count = 0;
    let totalCost = 0;
    let currentCost = calculateCost(baseCost, owned, multiplier);
    
    while (totalCost + currentCost <= money) {
        totalCost += currentCost;
        count++;
        currentCost = calculateCost(baseCost, owned + count, multiplier);
    }
    
    return count;
}

/**
 * Calcula el costo total de comprar múltiples unidades
 * @param {number} baseCost - Costo base
 * @param {number} owned - Cantidad ya poseída
 * @param {number} count - Cantidad a comprar
 * @param {number} multiplier - Multiplicador de escalado
 * @returns {number} Costo total
 */
function calculateTotalCost(baseCost, owned, count, multiplier = 1.15) {
    let totalCost = 0;
    for (let i = 0; i < count; i++) {
        totalCost += calculateCost(baseCost, owned + i, multiplier);
    }
    return totalCost;
}

/**
 * Calcula la producción total considerando sinergias
 * @param {Object} units - Objeto con unidades y sus cantidades
 * @param {Object} synergies - Objeto con bonificaciones de sinergia
 * @returns {number} Producción total por segundo
 */
function calculateTotalProduction(units, synergies = {}) {
    let totalProduction = 0;
    
    for (const [unitType, data] of Object.entries(units)) {
        if (data.owned > 0) {
            let baseProduction = data.baseProduction * data.owned;
            
            // Aplicar bonificaciones de sinergia
            let synergyMultiplier = 1;
            if (synergies[unitType]) {
                synergyMultiplier = synergies[unitType];
            }
            
            totalProduction += baseProduction * synergyMultiplier;
        }
    }
    
    return totalProduction;
}

// ==========================================
// UTILIDADES DE INTERFAZ
// ==========================================

/**
 * Crea un elemento DOM con clases y atributos
 * @param {string} tag - Tipo de elemento
 * @param {string|string[]} classes - Clase(s) CSS
 * @param {Object} attributes - Atributos del elemento
 * @param {string} textContent - Contenido de texto
 * @returns {HTMLElement} Elemento creado
 */
function createElement(tag, classes = [], attributes = {}, textContent = '') {
    const element = document.createElement(tag);
    
    if (typeof classes === 'string') {
        classes = [classes];
    }
    
    classes.forEach(cls => element.classList.add(cls));
    
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    
    if (textContent) {
        element.textContent = textContent;
    }
    
    return element;
}

/**
 * Muestra una notificación temporal
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, warning, error)
 * @param {number} duration - Duración en milisegundos (default: 3000)
 */
function showNotification(message, type = 'success', duration = 3000) {
    const container = document.getElementById('notifications');
    if (!container) return;
    
    const notification = createElement('div', ['notification', type], {}, message);
    container.appendChild(notification);
    
    // Auto-remover después de la duración especificada
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, duration);
}

/**
 * Anima un número cambiando gradualmente
 * @param {HTMLElement} element - Elemento que contiene el número
 * @param {number} from - Valor inicial
 * @param {number} to - Valor final
 * @param {number} duration - Duración en milisegundos
 * @param {Function} formatter - Función de formateo (opcional)
 */
function animateNumber(element, from, to, duration = 500, formatter = formatNumber) {
    const startTime = performance.now();
    const difference = to - from;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const current = from + (difference * easeOut);
        element.textContent = formatter(current);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = formatter(to);
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Crea un efecto visual de +X cuando se hace clic
 * @param {number} x - Posición X
 * @param {number} y - Posición Y
 * @param {string} text - Texto a mostrar
 * @param {string} color - Color del efecto
 */
function createClickEffect(x, y, text, color = '#00ff88') {
    const effect = createElement('div', 'click-effect', {
        style: `left: ${x}px; top: ${y}px; color: ${color};`
    }, text);
    
    document.body.appendChild(effect);
    
    // Remover el efecto después de la animación
    setTimeout(() => {
        if (effect.parentNode) {
            effect.parentNode.removeChild(effect);
        }
    }, 600);
}

// ==========================================
// UTILIDADES DE ALMACENAMIENTO
// ==========================================

/**
 * Guarda datos en localStorage de forma segura
 * @param {string} key - Clave de almacenamiento
 * @param {*} data - Datos a guardar
 */
function saveToStorage(key, data) {
    try {
        const serialized = JSON.stringify(data);
        localStorage.setItem(key, serialized);
        return true;
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
        return false;
    }
}

/**
 * Carga datos de localStorage de forma segura
 * @param {string} key - Clave de almacenamiento
 * @param {*} defaultValue - Valor por defecto si no existe
 * @returns {*} Datos cargados o valor por defecto
 */
function loadFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        if (item === null) {
            return defaultValue;
        }
        return JSON.parse(item);
    } catch (error) {
        console.error('Error al cargar de localStorage:', error);
        return defaultValue;
    }
}

/**
 * Exporta datos del juego como string codificado
 * @param {Object} gameData - Datos del juego
 * @returns {string} Datos codificados en base64
 */
function exportGameData(gameData) {
    try {
        const jsonString = JSON.stringify(gameData);
        return btoa(jsonString);
    } catch (error) {
        console.error('Error al exportar datos:', error);
        return null;
    }
}

/**
 * Importa datos del juego desde string codificado
 * @param {string} encodedData - Datos codificados en base64
 * @returns {Object|null} Datos del juego o null si hay error
 */
function importGameData(encodedData) {
    try {
        const jsonString = atob(encodedData);
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error al importar datos:', error);
        return null;
    }
}

// ==========================================
// UTILIDADES DE VALIDACIÓN
// ==========================================

/**
 * Valida si un objeto tiene todas las propiedades requeridas
 * @param {Object} obj - Objeto a validar
 * @param {string[]} requiredProps - Propiedades requeridas
 * @returns {boolean} True si es válido
 */
function validateObject(obj, requiredProps) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }
    
    return requiredProps.every(prop => obj.hasOwnProperty(prop));
}

/**
 * Clamp un valor entre un mínimo y máximo
 * @param {number} value - Valor a limitar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} Valor limitado
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Genera un ID único
 * @returns {string} ID único
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Pausa la ejecución por un tiempo determinado
 * @param {number} ms - Milisegundos a esperar
 * @returns {Promise} Promesa que se resuelve después del tiempo
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==========================================
// UTILIDADES DE EVENTOS
// ==========================================

/**
 * Debounce function para limitar llamadas frecuentes
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función debounced
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function para limitar llamadas
 * @param {Function} func - Función a ejecutar
 * @param {number} limit - Límite en ms
 * @returns {Function} Función throttled
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// UTILIDADES MATEMÁTICAS
// ==========================================

/**
 * Interpolación lineal entre dos valores
 * @param {number} a - Valor inicial
 * @param {number} b - Valor final
 * @param {number} t - Factor de interpolación (0-1)
 * @returns {number} Valor interpolado
 */
function lerp(a, b, t) {
    return a + (b - a) * t;
}

/**
 * Obtiene un número aleatorio entre min y max
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} Número aleatorio
 */
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Obtiene un entero aleatorio entre min y max (inclusivo)
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} Entero aleatorio
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Selecciona un elemento aleatorio de un array
 * @param {Array} array - Array de elementos
 * @returns {*} Elemento aleatorio
 */
function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// ==========================================
// SISTEMA DE GUARDADO MEJORADO
// ==========================================

/**
 * Comprime el estado del juego para guardarlo en localStorage
 * @param {Object} gameState - Estado del juego a comprimir
 * @returns {string} Estado comprimido en base64
 */
function compressGameState(gameState) {
    try {
        // Eliminar datos temporales antes de comprimir
        const cleanState = cleanStateForSave(gameState);
        
        // Convertir a JSON y comprimir usando LZ-string básico
        const jsonString = JSON.stringify(cleanState);
        return simpleCompress(jsonString);
    } catch (error) {
        console.error('Error comprimiendo estado del juego:', error);
        return JSON.stringify(gameState);
    }
}

/**
 * Descomprime el estado del juego desde un string codificado
 * @param {string} compressedData - Estado comprimido en base64
 * @returns {Object|null} Estado del juego o null si hay error
 */
function decompressGameState(compressedData) {
    try {
        // Intentar descomprimir primero
        const decompressed = simpleDecompress(compressedData);
        return JSON.parse(decompressed);
    } catch (error) {
        // Si falla la descompresión, intentar como JSON normal
        try {
            return JSON.parse(compressedData);
        } catch (parseError) {
            console.error('Error descomprimiendo estado del juego:', parseError);
            return null;
        }
    }
}

/**
 * Limpia el estado del juego para que no incluya datos temporales
 * @param {Object} gameState - Estado del juego a limpiar
 * @returns {Object} Estado limpio
 */
function cleanStateForSave(gameState) {
    const cleanState = JSON.parse(JSON.stringify(gameState));
    
    // Eliminar datos temporales que no necesitan guardarse
    if (cleanState.stats) {
        delete cleanState.stats.clicksThisSession;
        cleanState.stats.sessionStartTime = Date.now();
    }
    
    // Limpiar eventos activos que pueden haber expirado
    if (cleanState.events) {
        cleanState.events.activeEvents = cleanState.events.activeEvents || [];
    }
    
    return cleanState;
}

/**
 * Compresión básica usando diccionario de palabras comunes
 * @param {string} str - String a comprimir
 * @returns {string} String comprimido en base64
 */
function simpleCompress(str) {
    // Compresión básica usando diccionario de palabras comunes
    const dictionary = {
        'credits': '©',
        'biomass': '♦',
        'energy': '☼',
        'knowledge': '◊',
        'influence': '♠',
        'quantum_time': '◄',
        'genetic_data': '►',
        'reality_essence': '▲',
        'dimensional_energy': '▼',
        'cosmic_knowledge': '♣',
        'totalClicks': 'tc',
        'totalCreditsEarned': 'tce',
        'totalUnitsBuilt': 'tub',
        'currentEra': 'ce',
        'baseProduction': 'bp',
        'owned': 'o',
        'efficiency': 'e',
        'researched': 'r',
        'purchased': 'p',
        'completed': 'c'
    };
    
    let compressed = str;
    Object.keys(dictionary).forEach(key => {
        const regex = new RegExp(`"${key}"`, 'g');
        compressed = compressed.replace(regex, `"${dictionary[key]}"`);
    });
    
    return btoa(compressed);
}

/**
 * Descompresión inversa
 * @param {string} compressed - String comprimido en base64
 * @returns {string} String descomprimido
 */
function simpleDecompress(compressed) {
    // Descompresión inversa
    const dictionary = {
        '©': 'credits',
        '♦': 'biomass',
        '☼': 'energy',
        '◊': 'knowledge',
        '♠': 'influence',
        '◄': 'quantum_time',
        '►': 'genetic_data',
        '▲': 'reality_essence',
        '▼': 'dimensional_energy',
        '♣': 'cosmic_knowledge',
        'tc': 'totalClicks',
        'tce': 'totalCreditsEarned',
        'tub': 'totalUnitsBuilt',
        'ce': 'currentEra',
        'bp': 'baseProduction',
        'o': 'owned',
        'e': 'efficiency',
        'r': 'researched',
        'p': 'purchased',
        'c': 'completed'
    };
    
    let decompressed = atob(compressed);
    Object.keys(dictionary).forEach(key => {
        const regex = new RegExp(`"${key}"`, 'g');
        decompressed = decompressed.replace(regex, `"${dictionary[key]}"`);
    });
    
    return decompressed;
}

/**
 * Crea un backup del estado del juego
 * @param {Object} gameState - Estado del juego a respaldar
 * @param {string} backupName - Nombre opcional para el backup (default: null)
 * @returns {string} Clave del backup creado
 */
function createBackup(gameState, backupName = null) {
    const timestamp = Date.now();
    const backupKey = backupName || `agro_empire_backup_${timestamp}`;
    
    try {
        const compressed = compressGameState(gameState);
        localStorage.setItem(backupKey, compressed);
        
        // Mantener lista de backups
        const backups = getBackupList();
        backups.push({
            key: backupKey,
            timestamp: timestamp,
            name: backupName || `Backup automático ${new Date(timestamp).toLocaleString()}`
        });
        
        // Mantener solo los últimos 10 backups
        if (backups.length > 10) {
            const oldBackup = backups.shift();
            localStorage.removeItem(oldBackup.key);
        }
        
        localStorage.setItem('agro_empire_backups', JSON.stringify(backups));
        console.log(`💾 Backup creado: ${backupKey}`);
        return backupKey;
    } catch (error) {
        console.error('Error creando backup:', error);
        return null;
    }
}

/**
 * Obtiene la lista de backups guardados
 * @returns {Array} Lista de backups
 */
function getBackupList() {
    try {
        const backups = localStorage.getItem('agro_empire_backups');
        return backups ? JSON.parse(backups) : [];
    } catch (error) {
        console.error('Error obteniendo lista de backups:', error);
        return [];
    }
}

/**
 * Restaura el estado del juego desde un backup
 * @param {string} backupKey - Clave del backup a restaurar
 * @returns {Object|null} Estado del juego restaurado o null
 */
function restoreFromBackup(backupKey) {
    try {
        const compressed = localStorage.getItem(backupKey);
        if (!compressed) {
            throw new Error('Backup no encontrado');
        }
        
        const gameState = decompressGameState(compressed);
        if (!gameState) {
            throw new Error('Error descomprimiendo backup');
        }
        
        return gameState;
    } catch (error) {
        console.error('Error restaurando backup:', error);
        return null;
    }
}

/**
 * Crea un backup automático del estado del juego
 * @param {Object} gameState - Estado del juego a respaldar
 */
function autoBackup(gameState) {
    const lastBackup = localStorage.getItem('agro_empire_last_backup');
    const now = Date.now();
    
    // Crear backup automático cada 30 minutos
    if (!lastBackup || (now - parseInt(lastBackup)) > 1800000) {
        createBackup(gameState);
        localStorage.setItem('agro_empire_last_backup', now.toString());
    }
}

/**
 * Exporta el estado del juego para compartir
 * @param {Object} gameState - Estado del juego a exportar
 * @returns {string} Datos exportados en base64
 */
function exportSaveForSharing(gameState) {
    try {
        const compressed = compressGameState(gameState);
        const exportData = {
            version: '2.0',
            timestamp: Date.now(),
            data: compressed,
            checksum: calculateChecksum(compressed)
        };
        
        return btoa(JSON.stringify(exportData));
    } catch (error) {
        console.error('Error exportando save:', error);
        return null;
    }
}

/**
 * Importa el estado del juego desde un string codificado para compartir
 * @param {string} importString - String codificado a importar
 * @returns {Object|null} Estado del juego importado o null
 */
function importSaveFromSharing(importString) {
    try {
        const exportData = JSON.parse(atob(importString));
        
        // Verificar checksum
        if (exportData.checksum !== calculateChecksum(exportData.data)) {
            throw new Error('Datos corruptos o manipulados');
        }
        
        return decompressGameState(exportData.data);
    } catch (error) {
        console.error('Error importando save:', error);
        return null;
    }
}

/**
 * Calcula un checksum simple para verificar la integridad de los datos
 * @param {string} data - Datos a verificar
 * @returns {string} Checksum en base36
 */
function calculateChecksum(data) {
    // Simple checksum para verificar integridad
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convertir a 32bit integer
    }
    return hash.toString(36);
}

/**
 * Obtiene el tamaño del estado del juego (original vs comprimido)
 * @param {Object} gameState - Estado del juego
 * @returns {Object} Objeto con tamaños original y comprimido
 */
function getSaveSize(gameState) {
    const jsonSize = JSON.stringify(gameState).length;
    const compressedSize = compressGameState(gameState).length;
    
    return {
        original: formatBytes(jsonSize),
        compressed: formatBytes(compressedSize),
        ratio: Math.round((1 - compressedSize / jsonSize) * 100)
    };
}

/**
 * Formatea bytes a una unidad legible (KB, MB, GB, etc.)
 * @param {number} bytes - Número de bytes
 * @returns {string} String con la unidad de medida
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Exportar funciones principales
window.GameUtils = {
    formatNumber,
    formatCurrency,
    formatTime,
    formatPercentage,
    calculateCost,
    calculateMaxAffordable,
    calculateTotalCost,
    calculateTotalProduction,
    createElement,
    showNotification,
    animateNumber,
    createClickEffect,
    saveToStorage,
    loadFromStorage,
    exportGameData,
    importGameData,
    validateObject,
    clamp,
    generateUniqueId,
    sleep,
    debounce,
    throttle,
    lerp,
    randomBetween,
    randomInt,
    randomChoice,
    compressGameState,
    decompressGameState,
    createBackup,
    getBackupList,
    restoreFromBackup,
    autoBackup,
    exportSaveForSharing,
    importSaveFromSharing,
    calculateChecksum,
    getSaveSize,
    formatBytes
};