/**
 * Sistema Multiversal de Agro-Empire
 * Maneja la generación procedural de universos, conexiones interdimensionales,
 * anomalías multiversales y el Nexus Central
 */

class MultiverseSystem {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.connectedUniverses = new Map();
        this.activeConnections = new Map();
        this.nexusLevel = 0;
        this.quantumSeeds = [];
        this.anomalies = [];
        this.multiversalFactions = new Map();
        this.realityManipulations = new Map();
        
        this.initialize();
    }

    initialize() {
        this.setupNexusCentral();
        this.initializeFactions();
        this.setupUniverseGeneration();
    }

    setupNexusCentral() {
        this.nexusCentral = {
            level: 0,
            modules: {
                monitoring: { level: 0, active: false },
                connection_management: { level: 0, active: false },
                quantum_storage: { level: 0, active: false, capacity: 0 },
                temporal_sync: { level: 0, active: false },
                research_center: { level: 0, active: false }
            },
            quantumStorage: new Map(),
            connectedUniverseCount: 0,
            totalRealityEssence: 0
        };
    }

    initializeFactions() {
        this.multiversalFactions.set('reality_weavers', {
            name: 'Tejedores de Realidades',
            description: 'Antigua civilización que mantiene el equilibrio multiversal',
            relationship: 'neutral',
            reputation: 0,
            missions: [],
            bonuses: { stability_bonus: 1.0 }
        });

        this.multiversalFactions.set('entropy_harvesters', {
            name: 'Cosechadores de Entropía',
            description: 'Facción parasitaria que se alimenta del decaimiento',
            relationship: 'hostile',
            reputation: -100,
            missions: [],
            bonuses: { decay_resistance: 0.8 }
        });

        this.multiversalFactions.set('void_explorers', {
            name: 'Exploradores del Vacío',
            description: 'Entidades solitarias en busca de conocimiento',
            relationship: 'neutral',
            reputation: 0,
            missions: [],
            bonuses: { discovery_bonus: 1.2 }
        });

        this.multiversalFactions.set('primordial_cultivators', {
            name: 'Cultivadores Primordiales',
            description: 'Creen que la agricultura es la fuerza fundamental',
            relationship: 'friendly',
            reputation: 50,
            missions: [],
            bonuses: { agricultural_bonus: 1.3 }
        });
    }

    setupUniverseGeneration() {
        this.universeCounter = 0;
        this.generationSeed = Math.random() * 1000000;
    }

    // Generación procedural de universos
    generateUniverse(seedType = 'basic_quantum_seed') {
        const seed = QUANTUM_SEEDS[seedType];
        if (!seed) return null;

        const universeId = `universe_${this.universeCounter++}`;
        const availableTypes = this.getAvailableUniverseTypes(seed.universeAccess);
        const selectedType = this.selectRandomUniverseType(availableTypes);
        
        const universe = {
            id: universeId,
            name: this.generateUniverseName(),
            type: selectedType,
            properties: this.generateUniverseProperties(selectedType),
            connections: new Map(),
            anomalies: [],
            resources: new Map(),
            units: new Map(),
            stability: Math.random() * 0.4 + 0.6, // 60-100% estabilidad inicial
            discovered: false,
            explorationLevel: 0,
            lastUpdate: Date.now()
        };

        this.connectedUniverses.set(universeId, universe);
        return universe;
    }

    getAvailableUniverseTypes(accessTypes) {
        const available = [];
        for (const accessType of accessTypes) {
            if (UNIVERSE_TYPES[accessType]) {
                available.push(...Object.values(UNIVERSE_TYPES[accessType].types));
            }
        }
        return available;
    }

    selectRandomUniverseType(availableTypes) {
        return availableTypes[Math.floor(Math.random() * availableTypes.length)];
    }

    generateUniverseName() {
        const prefixes = ['Neo', 'Proto', 'Meta', 'Ultra', 'Hyper', 'Omni', 'Quantum', 'Cosmic', 'Stellar', 'Void'];
        const suffixes = ['Realm', 'Sphere', 'Dimension', 'Cosmos', 'Reality', 'Verse', 'Space', 'Field', 'Domain', 'Plane'];
        const numbers = Math.floor(Math.random() * 9999) + 1;
        
        return `${prefixes[Math.floor(Math.random() * prefixes.length)]}-${suffixes[Math.floor(Math.random() * suffixes.length)]} ${numbers}`;
    }

    generateUniverseProperties(universeType) {
        const baseProperties = {
            temperature: Math.random() * 2000 - 273, // Kelvin to Celsius range
            gravity: Math.random() * 5 + 0.1, // 0.1x to 5.1x Earth gravity
            atmosphere: Math.random(),
            energy_level: Math.random(),
            time_flow: Math.random() * 3 + 0.1, // 0.1x to 3.1x normal time
            dimensional_stability: Math.random() * 0.8 + 0.2
        };

        // Aplicar modificadores específicos del tipo de universo
        this.applyUniverseTypeModifiers(baseProperties, universeType);
        
        return baseProperties;
    }

    applyUniverseTypeModifiers(properties, universeType) {
        if (universeType.bonuses) {
            for (const [bonus, multiplier] of Object.entries(universeType.bonuses)) {
                if (properties[bonus] !== undefined) {
                    properties[bonus] *= multiplier;
                }
            }
        }

        if (universeType.penalties) {
            for (const [penalty, multiplier] of Object.entries(universeType.penalties)) {
                if (properties[penalty] !== undefined) {
                    properties[penalty] *= multiplier;
                }
            }
        }
    }

    // Gestión de conexiones multiversales
    createConnection(universeId1, universeId2, connectionType = 'stable') {
        const connection = {
            id: `${universeId1}_${universeId2}`,
            type: connectionType,
            stability: this.calculateConnectionStability(connectionType),
            energyCost: this.calculateConnectionCost(connectionType),
            transferRate: this.calculateTransferRate(connectionType),
            bidirectional: connectionType !== 'unstable',
            lastUsed: Date.now()
        };

        this.activeConnections.set(connection.id, connection);
        
        // Añadir la conexión a ambos universos
        const universe1 = this.connectedUniverses.get(universeId1);
        const universe2 = this.connectedUniverses.get(universeId2);
        
        if (universe1) universe1.connections.set(universeId2, connection);
        if (universe2 && connection.bidirectional) {
            universe2.connections.set(universeId1, connection);
        }

        return connection;
    }

    calculateConnectionStability(type) {
        const baseStability = {
            stable: 0.95,
            unstable: 0.3,
            quantum: 0.7,
            entangled: 0.8
        };
        return baseStability[type] || 0.5;
    }

    calculateConnectionCost(type) {
        const baseCost = {
            stable: 100,
            unstable: 10,
            quantum: 500,
            entangled: 1000
        };
        return baseCost[type] || 50;
    }

    calculateTransferRate(type) {
        const baseRate = {
            stable: 1.0,
            unstable: 0.3,
            quantum: 1.5,
            entangled: 2.0
        };
        return baseRate[type] || 0.5;
    }

    // Sistema de anomalías multiversales
    generateAnomaly(universeId) {
        const anomalyTypes = [
            'resource_rain', 'temporal_distortion', 'parasitic_invasion', 
            'reality_echo', 'dimensional_rift', 'gravity_wave',
            'energy_surge', 'consciousness_leak', 'time_loop',
            'matter_transmutation'
        ];

        const type = anomalyTypes[Math.floor(Math.random() * anomalyTypes.length)];
        const anomaly = {
            id: `anomaly_${Date.now()}_${Math.random()}`,
            type: type,
            severity: Math.random() * 0.8 + 0.2, // 20% a 100% severidad
            duration: Math.random() * 300000 + 60000, // 1-5 minutos
            effect: this.calculateAnomalyEffect(type),
            universeId: universeId,
            startTime: Date.now(),
            resolved: false
        };

        this.anomalies.push(anomaly);
        const universe = this.connectedUniverses.get(universeId);
        if (universe) {
            universe.anomalies.push(anomaly);
        }

        return anomaly;
    }

    calculateAnomalyEffect(type) {
        const effects = {
            resource_rain: { type: 'bonus', target: 'resources', multiplier: 5.0, duration: 120000 },
            temporal_distortion: { type: 'modifier', target: 'time_flow', multiplier: 0.1, duration: 180000 },
            parasitic_invasion: { type: 'penalty', target: 'production', multiplier: 0.3, duration: 240000 },
            reality_echo: { type: 'knowledge', amount: 1000, duration: 0 },
            dimensional_rift: { type: 'instability', amount: -0.3, duration: 300000 },
            gravity_wave: { type: 'modifier', target: 'gravity', multiplier: 3.0, duration: 150000 },
            energy_surge: { type: 'bonus', target: 'energy_production', multiplier: 2.0, duration: 120000 },
            consciousness_leak: { type: 'penalty', target: 'efficiency', multiplier: 0.7, duration: 180000 },
            time_loop: { type: 'reset', target: 'production_cycle', duration: 60000 },
            matter_transmutation: { type: 'conversion', from: 'biomass', to: 'exotic_materials', ratio: 0.1, duration: 240000 }
        };

        return effects[type] || { type: 'neutral' };
    }

    // Manipulación de Leyes Físicas (MLF)
    manipulatePhysicalLaw(universeId, lawType, newValue, cost) {
        const gameState = this.gameEngine.gameState;
        
        // Verificar recursos
        if (!this.canAffordManipulation(cost)) {
            return { success: false, message: 'Recursos insuficientes' };
        }

        // Consumir recursos
        this.consumeResources(cost);

        // Aplicar manipulación
        const manipulation = {
            id: `mlf_${Date.now()}`,
            universeId: universeId,
            lawType: lawType,
            originalValue: this.getUniverseProperty(universeId, lawType),
            newValue: newValue,
            energyCost: cost.dimensional_energy || 0,
            timestamp: Date.now(),
            duration: cost.duration || Infinity // Permanente por defecto
        };

        this.realityManipulations.set(manipulation.id, manipulation);
        this.applyPhysicalLawChange(universeId, lawType, newValue);

        return { success: true, manipulation: manipulation };
    }

    canAffordManipulation(cost) {
        const gameState = this.gameEngine.gameState;
        for (const [resource, amount] of Object.entries(cost)) {
            if ((gameState.resources[resource] || 0) < amount) {
                return false;
            }
        }
        return true;
    }

    consumeResources(cost) {
        const gameState = this.gameEngine.gameState;
        for (const [resource, amount] of Object.entries(cost)) {
            gameState.resources[resource] = (gameState.resources[resource] || 0) - amount;
        }
    }

    getUniverseProperty(universeId, property) {
        const universe = this.connectedUniverses.get(universeId);
        return universe?.properties[property] || 0;
    }

    applyPhysicalLawChange(universeId, lawType, newValue) {
        const universe = this.connectedUniverses.get(universeId);
        if (universe) {
            universe.properties[lawType] = newValue;
            universe.lastUpdate = Date.now();
        }
    }

    // Actualización del sistema multiversal
    update(deltaTime) {
        this.updateUniverses(deltaTime);
        this.updateConnections(deltaTime);
        this.updateAnomalies(deltaTime);
        this.updateNexusCentral(deltaTime);
        this.generateRandomEvents(deltaTime);
    }

    updateUniverses(deltaTime) {
        for (const [id, universe] of this.connectedUniverses) {
            // Actualizar estabilidad
            this.updateUniverseStability(universe, deltaTime);
            
            // Procesar producción específica del universo
            this.processUniverseProduction(universe, deltaTime);
            
            // Aplicar efectos del tipo de universo
            this.applyUniverseTypeEffects(universe, deltaTime);
        }
    }

    updateUniverseStability(universe, deltaTime) {
        // La estabilidad decae lentamente sin mantenimiento
        const decayRate = 0.001 / 1000; // 0.1% por segundo
        universe.stability = Math.max(0, universe.stability - decayRate * deltaTime);

        // Anomalías afectan la estabilidad
        for (const anomaly of universe.anomalies) {
            if (!anomaly.resolved && anomaly.effect.type === 'instability') {
                universe.stability += anomaly.effect.amount * deltaTime / 1000;
            }
        }
    }

    processUniverseProduction(universe, deltaTime) {
        const timeMultiplier = universe.properties.time_flow || 1;
        const effectiveDelta = deltaTime * timeMultiplier;

        // Aplicar bonificaciones específicas del universo
        for (const [resourceType, bonus] of Object.entries(universe.type.bonuses || {})) {
            if (typeof bonus === 'number') {
                const baseProduction = this.getBaseResourceProduction(resourceType);
                const universeProduction = baseProduction * bonus * effectiveDelta / 1000;
                this.addResourceToUniverse(universe, resourceType, universeProduction);
            }
        }
    }

    getBaseResourceProduction(resourceType) {
        // Calcular la producción base según las unidades del jugador
        return this.gameEngine.gameState.productionPerSecond || 0;
    }

    addResourceToUniverse(universe, resourceType, amount) {
        if (!universe.resources.has(resourceType)) {
            universe.resources.set(resourceType, 0);
        }
        universe.resources.set(resourceType, universe.resources.get(resourceType) + amount);
    }

    applyUniverseTypeEffects(universe, deltaTime) {
        // Efectos específicos según el tipo de universo
        switch (universe.type.name) {
            case 'Universo Entrópico':
                this.applyEntropicDecay(universe, deltaTime);
                break;
            case 'Universo Cíclico':
                this.applyCyclicalReset(universe, deltaTime);
                break;
            case 'Universo de la Abundancia':
                this.applySpontaneousGeneration(universe, deltaTime);
                break;
            case 'Universo de la Escasez':
                this.applyExtremeScarcity(universe, deltaTime);
                break;
        }
    }

    applyEntropicDecay(universe, deltaTime) {
        const decayRate = 0.01; // 1% por segundo
        for (const [resourceType, amount] of universe.resources) {
            const decay = amount * decayRate * deltaTime / 1000;
            universe.resources.set(resourceType, Math.max(0, amount - decay));
        }
    }

    applyCyclicalReset(universe, deltaTime) {
        const cycleTime = 300000; // 5 minutos
        const timeSinceCycle = Date.now() - (universe.lastCycleReset || 0);
        
        if (timeSinceCycle >= cycleTime) {
            // Reiniciar recursos pero mantener mejoras
            universe.resources.clear();
            universe.lastCycleReset = Date.now();
        }
    }

    applySpontaneousGeneration(universe, deltaTime) {
        const generationRate = 0.001; // 0.1% de los recursos actuales por segundo
        const randomResource = Object.keys(MULTIVERSAL_RESOURCES)[Math.floor(Math.random() * Object.keys(MULTIVERSAL_RESOURCES).length)];
        const currentAmount = universe.resources.get(randomResource) || 0;
        const generated = currentAmount * generationRate * deltaTime / 1000 + Math.random() * 100;
        
        this.addResourceToUniverse(universe, randomResource, generated);
    }

    applyExtremeScarcity(universe, deltaTime) {
        // En universos de escasez, la producción es extremadamente lenta pero muy eficiente
        const efficiencyBonus = 5.0;
        const productionPenalty = 0.1;
        
        // Aplicar estos efectos a las unidades en este universo
        // (esto se manejaría en coordinación con el GameEngine)
    }

    updateConnections(deltaTime) {
        for (const [id, connection] of this.activeConnections) {
            // Degradar conexiones inestables
            if (connection.type === 'unstable') {
                connection.stability -= 0.001 * deltaTime / 1000;
                if (connection.stability <= 0) {
                    this.removeConnection(id);
                }
            }

            // Transferir recursos a través de conexiones activas
            this.processResourceTransfer(connection, deltaTime);
        }
    }

    removeConnection(connectionId) {
        const connection = this.activeConnections.get(connectionId);
        if (connection) {
            // Remover de los universos conectados
            const [universe1Id, universe2Id] = connectionId.split('_');
            const universe1 = this.connectedUniverses.get(universe1Id);
            const universe2 = this.connectedUniverses.get(universe2Id);
            
            if (universe1) universe1.connections.delete(universe2Id);
            if (universe2) universe2.connections.delete(universe1Id);
        }
        
        this.activeConnections.delete(connectionId);
    }

    processResourceTransfer(connection, deltaTime) {
        // Transferencia automática de recursos entre universos conectados
        // basada en demanda y disponibilidad
        const [universe1Id, universe2Id] = connection.id.split('_');
        const universe1 = this.connectedUniverses.get(universe1Id);
        const universe2 = this.connectedUniverses.get(universe2Id);

        if (!universe1 || !universe2) return;

        const transferRate = connection.transferRate * deltaTime / 1000;
        
        // Transferir recursos de manera equilibrada
        this.balanceResources(universe1, universe2, transferRate);
    }

    balanceResources(universe1, universe2, transferRate) {
        for (const resourceType of Object.keys(MULTIVERSAL_RESOURCES)) {
            const amount1 = universe1.resources.get(resourceType) || 0;
            const amount2 = universe2.resources.get(resourceType) || 0;
            
            if (amount1 > amount2) {
                const transfer = Math.min((amount1 - amount2) * 0.1 * transferRate, amount1 * 0.05);
                universe1.resources.set(resourceType, amount1 - transfer);
                universe2.resources.set(resourceType, amount2 + transfer);
            }
        }
    }

    updateAnomalies(deltaTime) {
        this.anomalies = this.anomalies.filter(anomaly => {
            const elapsed = Date.now() - anomaly.startTime;
            
            if (elapsed >= anomaly.duration && !anomaly.resolved) {
                this.resolveAnomaly(anomaly);
                return false;
            }
            
            return !anomaly.resolved;
        });

        // Limpiar anomalías resueltas de los universos
        for (const [id, universe] of this.connectedUniverses) {
            universe.anomalies = universe.anomalies.filter(anomaly => !anomaly.resolved);
        }
    }

    resolveAnomaly(anomaly) {
        anomaly.resolved = true;
        
        // Aplicar efectos de resolución
        switch (anomaly.effect.type) {
            case 'knowledge':
                this.gameEngine.gameState.resources.cosmic_knowledge = 
                    (this.gameEngine.gameState.resources.cosmic_knowledge || 0) + anomaly.effect.amount;
                break;
            case 'bonus':
                // Los bonuses se manejan durante su duración
                break;
            case 'penalty':
                // Las penalizaciones se revierten automáticamente
                break;
        }
    }

    updateNexusCentral(deltaTime) {
        // Procesamiento del Nexus Central
        if (this.nexusCentral.modules.quantum_storage.active) {
            this.processQuantumStorage(deltaTime);
        }
        
        if (this.nexusCentral.modules.temporal_sync.active) {
            this.processTemporalSynchronization(deltaTime);
        }
    }

    processQuantumStorage(deltaTime) {
        // El almacenamiento cuántico puede contener recursos de cualquier universo
        const storageCapacity = this.nexusCentral.modules.quantum_storage.capacity;
        
        // Agregar recursos al almacenamiento cuántico desde universos conectados
        for (const [universeId, universe] of this.connectedUniverses) {
            for (const [resourceType, amount] of universe.resources) {
                const currentStored = this.nexusCentral.quantumStorage.get(resourceType) || 0;
                if (currentStored < storageCapacity) {
                    const transferAmount = Math.min(amount * 0.01, storageCapacity - currentStored);
                    universe.resources.set(resourceType, amount - transferAmount);
                    this.nexusCentral.quantumStorage.set(resourceType, currentStored + transferAmount);
                }
            }
        }
    }

    processTemporalSynchronization(deltaTime) {
        // Sincronizar el flujo temporal entre universos conectados
        const targetTimeFlow = 1.0; // Flujo temporal estándar
        
        for (const [id, universe] of this.connectedUniverses) {
            if (universe.properties.time_flow !== targetTimeFlow) {
                const adjustment = (targetTimeFlow - universe.properties.time_flow) * 0.001 * deltaTime / 1000;
                universe.properties.time_flow += adjustment;
            }
        }
    }

    generateRandomEvents(deltaTime) {
        // Generar eventos aleatorios multiversales
        const eventChance = 0.0001; // 0.01% por segundo por universo
        
        for (const [id, universe] of this.connectedUniverses) {
            if (Math.random() < eventChance * deltaTime / 1000) {
                if (Math.random() < 0.3) {
                    this.generateAnomaly(id);
                } else if (Math.random() < 0.1) {
                    this.generateFactionEvent(id);
                }
            }
        }
    }

    generateFactionEvent(universeId) {
        const factions = Array.from(this.multiversalFactions.values());
        const faction = factions[Math.floor(Math.random() * factions.length)];
        
        // Generar una misión o evento de facción
        const event = {
            type: 'faction_contact',
            factionId: faction.name,
            universeId: universeId,
            timestamp: Date.now(),
            message: this.generateFactionMessage(faction),
            reward: this.generateFactionReward(faction)
        };

        // Agregar el evento al sistema de eventos del juego
        this.gameEngine.addEvent(event);
    }

    generateFactionMessage(faction) {
        const messages = {
            'Tejedores de Realidades': [
                'Hemos detectado alteraciones en el tejido de la realidad...',
                'Tu manipulación multiversal está siendo observada.',
                'Mantén el equilibrio, Agro-Emperador.'
            ],
            'Cosechadores de Entropía': [
                'Tus universos están madurando... perfectos para la cosecha.',
                'La entropía es inevitable. Únete a nosotros.',
                'Detectamos debilidad en tus defensas dimensionales.'
            ],
            'Exploradores del Vacío': [
                'Conocimiento por recursos... ¿te interesa un intercambio?',
                'Hemos descubierto anomalías fascinantes en el sector 7.',
                'Los secretos del vacío están a tu alcance.'
            ],
            'Cultivadores Primordiales': [
                'Tus métodos agrícolas trascienden las dimensiones.',
                'La vida que siembras honra las tradiciones ancestrales.',
                'Compartamos semillas de realidades antiguas.'
            ]
        };

        const factionMessages = messages[faction.name] || ['Mensaje desconocido'];
        return factionMessages[Math.floor(Math.random() * factionMessages.length)];
    }

    generateFactionReward(faction) {
        // Generar recompensas específicas de cada facción
        const rewards = {
            'Tejedores de Realidades': { cosmic_knowledge: 500, dimensional_energy: 50 },
            'Cosechadores de Entropía': { quantum_time: 100 },
            'Exploradores del Vacío': { genetic_data: 1000, cosmic_knowledge: 200 },
            'Cultivadores Primordiales': { genetic_data: 2000, reality_essence: 1 }
        };

        return rewards[faction.name] || {};
    }

    // Métodos públicos para la interfaz
    getConnectedUniverses() {
        return Array.from(this.connectedUniverses.values());
    }

    getActiveAnomalies() {
        return this.anomalies.filter(a => !a.resolved);
    }

    getNexusStatus() {
        return {
            level: this.nexusCentral.level,
            modules: this.nexusCentral.modules,
            connectedUniverses: this.nexusCentral.connectedUniverseCount,
            quantumStorage: Object.fromEntries(this.nexusCentral.quantumStorage)
        };
    }

    getMultiversalFactions() {
        return Array.from(this.multiversalFactions.values());
    }

    // Método para plantar Semillas Cuánticas
    plantQuantumSeed(seedType, targetLocation) {
        const seed = QUANTUM_SEEDS[seedType];
        if (!seed) return { success: false, message: 'Semilla cuántica inválida' };

        // Verificar recursos
        if (!this.canAffordManipulation(seed.cost)) {
            return { success: false, message: 'Recursos insuficientes para plantar la semilla' };
        }

        // Consumir recursos
        this.consumeResources(seed.cost);

        // Generar nuevo universo
        const newUniverse = this.generateUniverse(seedType);
        if (!newUniverse) {
            return { success: false, message: 'Error al generar el universo' };
        }

        // Crear conexión automática al Nexus
        this.createConnection('nexus_central', newUniverse.id, 'stable');

        return { 
            success: true, 
            universe: newUniverse,
            message: `Nuevo universo ${newUniverse.name} conectado exitosamente`
        };
    }
}

// Exportar la clase
window.MultiverseSystem = MultiverseSystem;