/**
 * AGRO-EMPIRE: SISTEMA DE PRESTIGIO MULTI-DIMENSIONAL
 * Sistema avanzado de prestigio con cuatro dimensiones únicas
 */

class PrestigeSystem {
    constructor(gameEngine) {
        this.game = gameEngine;
        this.activePrestige = null;
        this.prestigeHistory = [];
        this.globalPrestigeTree = {};
        
        this.initialize();
    }
    
    // ==========================================
    // INICIALIZACIÓN
    // ==========================================
    
    initialize() {
        console.log("✨ Inicializando Sistema de Prestigio Multi-Dimensional...");
        
        // Configurar árbol de prestigio global
        this.setupGlobalPrestigeTree();
        
        // Verificar requisitos de prestigio disponibles
        this.updatePrestigeAvailability();
        
        console.log("✅ Sistema de Prestigio inicializado");
    }
    
    setupGlobalPrestigeTree() {
        this.globalPrestigeTree = {
            // Nodos del árbol de prestigio global
            speed_boost: {
                id: 'speed_boost',
                name: 'Aceleración Cósmica',
                description: 'Aumenta la velocidad global del juego',
                maxLevel: 10,
                currentLevel: 0,
                cost: { temporal_essence: 1, stellar_fragments: 1 },
                costMultiplier: 1.5,
                effect: (level) => ({ globalSpeedMultiplier: 1 + (level * 0.1) }),
                prerequisites: []
            },
            efficiency_master: {
                id: 'efficiency_master',
                name: 'Maestría de Eficiencia',
                description: 'Reduce costos de todas las unidades',
                maxLevel: 20,
                currentLevel: 0,
                cost: { primordial_sequences: 2, cosmic_bonds: 1 },
                costMultiplier: 1.3,
                effect: (level) => ({ costReduction: Math.pow(0.95, level) }),
                prerequisites: []
            },
            quantum_leap: {
                id: 'quantum_leap',
                name: 'Salto Cuántico',
                description: 'Permite saltar eras iniciales en nuevas partidas',
                maxLevel: 5,
                currentLevel: 0,
                cost: { temporal_essence: 5, stellar_fragments: 3 },
                costMultiplier: 2.0,
                effect: (level) => ({ skipEras: level }),
                prerequisites: ['speed_boost']
            },
            genetic_mastery: {
                id: 'genetic_mastery',
                name: 'Maestría Genética',
                description: 'Desbloquea especies híbridas únicas',
                maxLevel: 15,
                currentLevel: 0,
                cost: { primordial_sequences: 3, temporal_essence: 2 },
                costMultiplier: 1.4,
                effect: (level) => ({ hybridSpeciesUnlocked: level }),
                prerequisites: ['efficiency_master']
            },
            cosmic_network: {
                id: 'cosmic_network',
                name: 'Red Cósmica',
                description: 'Habilita comercio interdimensional',
                maxLevel: 1,
                currentLevel: 0,
                cost: { cosmic_bonds: 10, stellar_fragments: 5 },
                costMultiplier: 1.0,
                effect: (level) => ({ interdimensionalTrade: level > 0 }),
                prerequisites: ['quantum_leap', 'genetic_mastery']
            }
        };
    }
    
    // ==========================================
    // VERIFICACIÓN DE DISPONIBILIDAD
    // ==========================================
    
    updatePrestigeAvailability() {
        const gameState = this.game.getGameState();
        
        // Verificar cada tipo de prestigio
        Object.entries(GameData.PRESTIGE_SYSTEMS).forEach(([type, config]) => {
            const isAvailable = this.checkPrestigeRequirements(type, config, gameState);
            config.available = isAvailable;
            
            if (isAvailable && !config.wasAvailable) {
                this.game.showNotification(
                    `✨ ¡Nuevo prestigio disponible: ${config.name}!`,
                    "success",
                    5000
                );
                config.wasAvailable = true;
            }
        });
    }
    
    checkPrestigeRequirements(type, config, gameState) {
        const requirements = config.requirements;
        
        switch (type) {
            case 'temporal':
                return gameState.player.currentEra >= 12 || 
                       gameState.stats.totalCreditsEarned >= 1e50;
                       
            case 'spatial':
                return this.getPlanetsColonized(gameState) >= 10 || 
                       gameState.player.currentEra >= 10;
                       
            case 'genetic':
                return this.isBiotechComplete(gameState) || 
                       this.getMythicSpeciesCreated(gameState) >= 1;
                       
            case 'economic':
                return this.getMarketControlPercentage(gameState) >= 75 || 
                       gameState.stats.totalCreditsEarned >= 1e100;
                       
            default:
                return false;
        }
    }
    
    // ==========================================
    // CÁLCULOS DE REQUISITOS
    // ==========================================
    
    getPlanetsColonized(gameState) {
        // Calcular planetas colonizados basado en unidades espaciales
        let planets = 0;
        
        Object.entries(gameState.units).forEach(([unitId, unitData]) => {
            const unitConfig = GameData.PRODUCTION_UNITS[unitId];
            if (unitConfig && unitConfig.era >= 6 && unitData.owned > 0) {
                planets += Math.floor(unitData.owned / 10); // Cada 10 unidades = 1 planeta
            }
        });
        
        return planets;
    }
    
    isBiotechComplete(gameState) {
        const biotechTechs = [
            'basic_genetics', 'genetic_engineering', 'synthetic_biology', 
            'selective_breeding', 'artificial_life'
        ];
        
        return biotechTechs.every(techId => 
            gameState.technologies[techId]?.researched
        );
    }
    
    getMythicSpeciesCreated(gameState) {
        // Calcular especies míticas basado en investigación genética avanzada
        let mythicSpecies = 0;
        
        if (gameState.technologies['synthetic_biology']?.researched) mythicSpecies++;
        if (gameState.technologies['artificial_life']?.researched) mythicSpecies++;
        
        return mythicSpecies;
    }
    
    getMarketControlPercentage(gameState) {
        // Calcular control de mercado basado en producción y recursos
        const totalProduction = this.game.calculateProductionPerSecond();
        const baselineProduction = 1e12; // Producción necesaria para 1% de control
        
        return Math.min((totalProduction / baselineProduction) * 100, 100);
    }
    
    // ==========================================
    // EJECUTAR PRESTIGIO
    // ==========================================
    
    performPrestige(type) {
        const config = GameData.PRESTIGE_SYSTEMS[type];
        const gameState = this.game.getGameState();
        
        if (!this.checkPrestigeRequirements(type, config, gameState)) {
            this.game.showNotification("No cumples los requisitos para este prestigio", "error");
            return false;
        }
        
        // Confirmar prestigio
        const confirmMessage = `¿Estás seguro de que quieres realizar el prestigio "${config.name}"?\n\nEsto reiniciará tu progreso pero obtendrás bonificaciones permanentes.`;
        
        if (!confirm(confirmMessage)) {
            return false;
        }
        
        // Calcular recompensas de prestigio
        const prestigeRewards = this.calculatePrestigeRewards(type, gameState);
        
        // Guardar estado de prestigio
        this.savePrestigeState(type, prestigeRewards);
        
        // Aplicar prestigio
        this.applyPrestige(type, prestigeRewards);
        
        // Reiniciar juego con bonificaciones
        this.resetGameWithPrestige(type, prestigeRewards);
        
        this.game.showNotification(
            `✨ ¡Prestigio ${config.name} completado! Obtienes bonificaciones permanentes.`,
            "success",
            6000
        );
        
        return true;
    }
    
    calculatePrestigeRewards(type, gameState) {
        const config = GameData.PRESTIGE_SYSTEMS[type];
        let rewards = {};
        
        switch (type) {
            case 'temporal':
                rewards.temporal_essence = this.calculateTemporalEssence(gameState);
                rewards.speedBonus = rewards.temporal_essence * 0.05; // 5% por esencia
                rewards.techCostReduction = rewards.temporal_essence * 0.02; // 2% por esencia
                break;
                
            case 'spatial':
                rewards.stellar_fragments = this.calculateStellarFragments(gameState);
                rewards.planetTypes = this.unlockRandomPlanetTypes(rewards.stellar_fragments);
                rewards.crossPlanetBonus = true;
                break;
                
            case 'genetic':
                rewards.primordial_sequences = this.calculatePrimordialSequences(gameState);
                rewards.baseEfficiencyBonus = rewards.primordial_sequences * 0.1; // 10% por secuencia
                rewards.newSpecies = this.unlockNewSpecies(rewards.primordial_sequences);
                break;
                
            case 'economic':
                rewards.cosmic_bonds = this.calculateCosmicBonds(gameState);
                rewards.tradeRouteBonus = rewards.cosmic_bonds * 0.15; // 15% por bono
                rewards.permanentContracts = true;
                break;
        }
        
        return rewards;
    }
    
    calculateTemporalEssence(gameState) {
        const baseEssence = Math.floor(gameState.player.currentEra / 2);
        const productionBonus = Math.floor(Math.log10(gameState.stats.totalCreditsEarned) / 10);
        return Math.max(1, baseEssence + productionBonus);
    }
    
    calculateStellarFragments(gameState) {
        const planetsColonized = this.getPlanetsColonized(gameState);
        const spaceUnits = this.countSpaceUnits(gameState);
        return Math.max(1, Math.floor(planetsColonized / 2) + Math.floor(spaceUnits / 5));
    }
    
    calculatePrimordialSequences(gameState) {
        const biotechCount = this.countBiotechResearched(gameState);
        const geneticUnits = this.countGeneticUnits(gameState);
        return Math.max(1, biotechCount + Math.floor(geneticUnits / 10));
    }
    
    calculateCosmicBonds(gameState) {
        const marketControl = this.getMarketControlPercentage(gameState);
        const economicTech = this.countEconomicTech(gameState);
        return Math.max(1, Math.floor(marketControl / 10) + economicTech);
    }
    
    // ==========================================
    // FUNCIONES AUXILIARES DE CÁLCULO
    // ==========================================
    
    countSpaceUnits(gameState) {
        const spaceUnitIds = [
            'orbital_research_station', 'regional_climate_manipulator'
        ];
        
        return spaceUnitIds.reduce((total, unitId) => {
            return total + (gameState.units[unitId]?.owned || 0);
        }, 0);
    }
    
    countBiotechResearched(gameState) {
        const biotechIds = [
            'basic_genetics', 'genetic_engineering', 'synthetic_biology',
            'selective_breeding', 'artificial_life'
        ];
        
        return biotechIds.filter(techId => 
            gameState.technologies[techId]?.researched
        ).length;
    }
    
    countGeneticUnits(gameState) {
        const geneticUnitIds = ['genetic_lab', 'microbial_bioreactor'];
        
        return geneticUnitIds.reduce((total, unitId) => {
            return total + (gameState.units[unitId]?.owned || 0);
        }, 0);
    }
    
    countEconomicTech(gameState) {
        const economicTechIds = [
            'market_analysis', 'supply_chain_optimization', 'futures_trading'
        ];
        
        return economicTechIds.filter(techId => 
            gameState.technologies[techId]?.researched
        ).length;
    }
    
    unlockRandomPlanetTypes(fragmentCount) {
        const planetTypes = ['ocean', 'desert', 'frozen', 'volcanic', 'nebula'];
        const unlocked = [];
        
        for (let i = 0; i < Math.min(fragmentCount, planetTypes.length); i++) {
            const randomType = planetTypes[Math.floor(Math.random() * planetTypes.length)];
            if (!unlocked.includes(randomType)) {
                unlocked.push(randomType);
            }
        }
        
        return unlocked;
    }
    
    unlockNewSpecies(sequenceCount) {
        const species = [
            'quantum_wheat', 'bio_luminescent_corn', 'void_berries',
            'crystalline_rice', 'phase_shifting_tomatoes'
        ];
        
        return species.slice(0, Math.min(sequenceCount, species.length));
    }
    
    // ==========================================
    // APLICAR PRESTIGIO
    // ==========================================
    
    savePrestigeState(type, rewards) {
        const prestigeEntry = {
            type: type,
            timestamp: Date.now(),
            rewards: rewards,
            prePrestigeState: {
                era: this.game.gameState.player.currentEra,
                level: this.game.gameState.player.level,
                totalCredits: this.game.gameState.stats.totalCreditsEarned,
                totalUnits: Object.values(this.game.gameState.units)
                    .reduce((sum, unit) => sum + unit.owned, 0)
            }
        };
        
        this.prestigeHistory.push(prestigeEntry);
        
        // Actualizar estado de prestigio actual
        const currentPrestige = this.game.gameState.prestige[type];
        currentPrestige.level++;
        
        // Agregar moneda de prestigio
        Object.entries(rewards).forEach(([currency, amount]) => {
            if (currency.includes('_')) { // Es una moneda de prestigio
                currentPrestige.currency = (currentPrestige.currency || 0) + amount;
            }
        });
    }
    
    applyPrestige(type, rewards) {
        const gameState = this.game.gameState;
        
        // Aplicar bonificaciones permanentes según el tipo
        switch (type) {
            case 'temporal':
                this.applyTemporalPrestige(rewards, gameState);
                break;
            case 'spatial':
                this.applySpatialPrestige(rewards, gameState);
                break;
            case 'genetic':
                this.applyGeneticPrestige(rewards, gameState);
                break;
            case 'economic':
                this.applyEconomicPrestige(rewards, gameState);
                break;
        }
        
        // Actualizar multiplicadores globales
        this.game.updateGlobalMultipliers();
    }
    
    applyTemporalPrestige(rewards, gameState) {
        // Aplicar bonificación de velocidad global
        this.game.globalMultipliers.timeAcceleration = 
            (this.game.globalMultipliers.timeAcceleration || 1) * (1 + rewards.speedBonus);
        
        // Reducir costos de tecnología
        this.game.globalMultipliers.techCostReduction = 
            (this.game.globalMultipliers.techCostReduction || 1) * (1 - rewards.techCostReduction);
        
        // Marcar tecnologías conocidas para partida futura
        gameState.prestigeKnowledge = gameState.prestigeKnowledge || {};
        gameState.prestigeKnowledge.technologies = Object.keys(gameState.technologies)
            .filter(techId => gameState.technologies[techId].researched);
    }
    
    applySpatialPrestige(rewards, gameState) {
        // Desbloquear tipos de planeta
        gameState.unlockedPlanetTypes = gameState.unlockedPlanetTypes || [];
        rewards.planetTypes.forEach(planetType => {
            if (!gameState.unlockedPlanetTypes.includes(planetType)) {
                gameState.unlockedPlanetTypes.push(planetType);
            }
        });
        
        // Habilitar comercio entre planetas
        gameState.crossPlanetTrade = true;
    }
    
    applyGeneticPrestige(rewards, gameState) {
        // Aplicar bonificación de eficiencia base
        this.game.globalMultipliers.baseEfficiency = 
            (this.game.globalMultipliers.baseEfficiency || 1) * (1 + rewards.baseEfficiencyBonus);
        
        // Desbloquear nuevas especies
        gameState.unlockedSpecies = gameState.unlockedSpecies || [];
        rewards.newSpecies.forEach(species => {
            if (!gameState.unlockedSpecies.includes(species)) {
                gameState.unlockedSpecies.push(species);
            }
        });
    }
    
    applyEconomicPrestige(rewards, gameState) {
        // Aplicar bonificación de rutas comerciales
        this.game.globalMultipliers.tradeRouteBonus = 
            (this.game.globalMultipliers.tradeRouteBonus || 1) * (1 + rewards.tradeRouteBonus);
        
        // Habilitar contratos permanentes
        gameState.permanentContracts = true;
        
        // Establecer rutas comerciales pasivas
        gameState.passiveTradeRoutes = gameState.passiveTradeRoutes || [];
        for (let i = 0; i < Math.floor(rewards.cosmic_bonds); i++) {
            gameState.passiveTradeRoutes.push({
                id: `route_${Date.now()}_${i}`,
                type: 'cosmic',
                income: Math.floor(rewards.cosmic_bonds * 1000),
                interval: 3600000 // 1 hora
            });
        }
    }
    
    resetGameWithPrestige(type, rewards) {
        // Guardar bonificaciones de prestigio antes del reset
        const prestigeBonuses = {
            type: type,
            rewards: rewards,
            appliedMultipliers: { ...this.game.globalMultipliers },
            specialUnlocks: {
                planetTypes: this.game.gameState.unlockedPlanetTypes || [],
                species: this.game.gameState.unlockedSpecies || [],
                knowledge: this.game.gameState.prestigeKnowledge || {}
            }
        };
        
        // Reiniciar estado del juego
        const newGameState = JSON.parse(JSON.stringify(GameData.INITIAL_GAME_STATE));
        
        // Preservar datos de prestigio
        newGameState.prestige = this.game.gameState.prestige;
        newGameState.prestigeHistory = this.prestigeHistory;
        newGameState.prestigeBonuses = prestigeBonuses;
        
        // Aplicar bonificaciones de inicio según el tipo de prestigio
        this.applyStartingBonuses(type, rewards, newGameState);
        
        // Reemplazar estado del juego
        this.game.gameState = newGameState;
        
        // Reinicializar sistemas
        this.game.initializeNewGame();
        this.game.updateGlobalMultipliers();
        
        // Guardar inmediatamente
        this.game.saveGame();
    }
    
    applyStartingBonuses(type, rewards, gameState) {
        switch (type) {
            case 'temporal':
                // Comenzar con conocimiento de tecnologías
                if (gameState.prestigeBonuses.specialUnlocks.knowledge.technologies) {
                    gameState.prestigeBonuses.specialUnlocks.knowledge.technologies.forEach(techId => {
                        if (gameState.technologies[techId]) {
                            gameState.technologies[techId].unlocked = true;
                        }
                    });
                }
                
                // Comenzar con créditos bonus
                gameState.resources.credits = Math.floor(rewards.temporal_essence * 10000);
                break;
                
            case 'spatial':
                // Comenzar con selección de planeta
                gameState.currentPlanetType = rewards.planetTypes[0] || 'earth';
                gameState.resources.credits = Math.floor(rewards.stellar_fragments * 5000);
                break;
                
            case 'genetic':
                // Comenzar con especies mejoradas
                gameState.resources.credits = Math.floor(rewards.primordial_sequences * 7500);
                gameState.resources.biomass = Math.floor(rewards.primordial_sequences * 100);
                break;
                
            case 'economic':
                // Comenzar con rutas comerciales activas
                gameState.resources.credits = Math.floor(rewards.cosmic_bonds * 15000);
                gameState.startingContracts = Math.floor(rewards.cosmic_bonds);
                break;
        }
    }
    
    // ==========================================
    // ÁRBOL DE PRESTIGIO GLOBAL
    // ==========================================
    
    canAffordGlobalPrestigeNode(nodeId) {
        const node = this.globalPrestigeTree[nodeId];
        const gameState = this.game.gameState;
        
        if (!node || node.currentLevel >= node.maxLevel) {
            return false;
        }
        
        // Verificar prerequisites
        if (!this.checkGlobalPrestigePrerequisites(nodeId)) {
            return false;
        }
        
        // Verificar costo
        const cost = this.calculateGlobalPrestigeCost(nodeId);
        
        return Object.entries(cost).every(([currency, amount]) => {
            const availableCurrency = this.getTotalPrestigeCurrency(currency);
            return availableCurrency >= amount;
        });
    }
    
    checkGlobalPrestigePrerequisites(nodeId) {
        const node = this.globalPrestigeTree[nodeId];
        
        return node.prerequisites.every(prereqId => {
            const prereq = this.globalPrestigeTree[prereqId];
            return prereq && prereq.currentLevel > 0;
        });
    }
    
    calculateGlobalPrestigeCost(nodeId) {
        const node = this.globalPrestigeTree[nodeId];
        const cost = {};
        
        Object.entries(node.cost).forEach(([currency, baseCost]) => {
            cost[currency] = Math.floor(baseCost * Math.pow(node.costMultiplier, node.currentLevel));
        });
        
        return cost;
    }
    
    getTotalPrestigeCurrency(currency) {
        const gameState = this.game.gameState;
        let total = 0;
        
        Object.values(gameState.prestige).forEach(prestigeData => {
            if (currency === 'temporal_essence' && prestigeData.temporal_essence) {
                total += prestigeData.temporal_essence;
            } else if (currency === 'stellar_fragments' && prestigeData.stellar_fragments) {
                total += prestigeData.stellar_fragments;
            } else if (currency === 'primordial_sequences' && prestigeData.primordial_sequences) {
                total += prestigeData.primordial_sequences;
            } else if (currency === 'cosmic_bonds' && prestigeData.cosmic_bonds) {
                total += prestigeData.cosmic_bonds;
            }
        });
        
        return total;
    }
    
    purchaseGlobalPrestigeNode(nodeId) {
        if (!this.canAffordGlobalPrestigeNode(nodeId)) {
            this.game.showNotification("No puedes permitirte esta mejora de prestigio", "error");
            return false;
        }
        
        const node = this.globalPrestigeTree[nodeId];
        const cost = this.calculateGlobalPrestigeCost(nodeId);
        
        // Deducir costo
        this.spendPrestigeCurrency(cost);
        
        // Aumentar nivel del nodo
        node.currentLevel++;
        
        // Aplicar efectos
        const effects = node.effect(node.currentLevel);
        this.applyGlobalPrestigeEffects(nodeId, effects);
        
        this.game.showNotification(
            `✨ Mejorado: ${node.name} (Nivel ${node.currentLevel})`,
            "success"
        );
        
        return true;
    }
    
    spendPrestigeCurrency(cost) {
        const gameState = this.game.gameState;
        
        Object.entries(cost).forEach(([currency, amount]) => {
            let remaining = amount;
            
            // Gastar de cada tipo de prestigio proporcionalmente
            Object.values(gameState.prestige).forEach(prestigeData => {
                if (remaining <= 0) return;
                
                let available = 0;
                if (currency === 'temporal_essence') available = prestigeData.temporal_essence || 0;
                else if (currency === 'stellar_fragments') available = prestigeData.stellar_fragments || 0;
                else if (currency === 'primordial_sequences') available = prestigeData.primordial_sequences || 0;
                else if (currency === 'cosmic_bonds') available = prestigeData.cosmic_bonds || 0;
                
                const toSpend = Math.min(remaining, available);
                
                if (currency === 'temporal_essence') prestigeData.temporal_essence -= toSpend;
                else if (currency === 'stellar_fragments') prestigeData.stellar_fragments -= toSpend;
                else if (currency === 'primordial_sequences') prestigeData.primordial_sequences -= toSpend;
                else if (currency === 'cosmic_bonds') prestigeData.cosmic_bonds -= toSpend;
                
                remaining -= toSpend;
            });
        });
    }
    
    applyGlobalPrestigeEffects(nodeId, effects) {
        Object.entries(effects).forEach(([effectType, value]) => {
            switch (effectType) {
                case 'globalSpeedMultiplier':
                    this.game.globalMultipliers.prestigeSpeed = 
                        (this.game.globalMultipliers.prestigeSpeed || 1) * value;
                    break;
                    
                case 'costReduction':
                    this.game.globalMultipliers.prestigeCostReduction = 
                        (this.game.globalMultipliers.prestigeCostReduction || 1) * value;
                    break;
                    
                case 'skipEras':
                    this.game.gameState.prestigeSkipEras = Math.max(
                        this.game.gameState.prestigeSkipEras || 0,
                        value
                    );
                    break;
                    
                case 'hybridSpeciesUnlocked':
                    this.game.gameState.hybridSpeciesUnlocked = 
                        (this.game.gameState.hybridSpeciesUnlocked || 0) + 1;
                    break;
                    
                case 'interdimensionalTrade':
                    this.game.gameState.interdimensionalTrade = value;
                    break;
            }
        });
        
        // Actualizar multiplicadores globales
        this.game.updateGlobalMultipliers();
    }
    
    // ==========================================
    // INTERFAZ PÚBLICA
    // ==========================================
    
    getPrestigeInfo(type) {
        const config = GameData.PRESTIGE_SYSTEMS[type];
        const gameState = this.game.gameState;
        const currentPrestige = gameState.prestige[type];
        
        return {
            ...config,
            currentLevel: currentPrestige.level,
            currency: currentPrestige.currency || 0,
            available: config.available || false,
            nextRewards: this.calculatePrestigeRewards(type, gameState)
        };
    }
    
    getAllPrestigeInfo() {
        return Object.keys(GameData.PRESTIGE_SYSTEMS).map(type => ({
            type,
            ...this.getPrestigeInfo(type)
        }));
    }
    
    getGlobalPrestigeTreeInfo() {
        return Object.entries(this.globalPrestigeTree).map(([nodeId, node]) => ({
            ...node,
            canAfford: this.canAffordGlobalPrestigeNode(nodeId),
            cost: this.calculateGlobalPrestigeCost(nodeId),
            prerequisites: node.prerequisites.map(prereqId => ({
                id: prereqId,
                name: this.globalPrestigeTree[prereqId]?.name,
                satisfied: this.globalPrestigeTree[prereqId]?.currentLevel > 0
            }))
        }));
    }
    
    getPrestigeCurrencies() {
        const gameState = this.game.gameState;
        
        return {
            temporal_essence: this.getTotalPrestigeCurrency('temporal_essence'),
            stellar_fragments: this.getTotalPrestigeCurrency('stellar_fragments'),
            primordial_sequences: this.getTotalPrestigeCurrency('primordial_sequences'),
            cosmic_bonds: this.getTotalPrestigeCurrency('cosmic_bonds')
        };
    }
}

// Hacer el sistema accesible globalmente
window.PrestigeSystem = PrestigeSystem;