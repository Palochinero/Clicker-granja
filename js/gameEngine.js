/**
 * AGRO-EMPIRE: MOTOR DEL JUEGO
 * Lógica principal del juego incremental
 */

class GameEngine {
    constructor() {
        this.gameState = null;
        this.isRunning = false;
        this.lastUpdateTime = 0;
        this.updateInterval = null;
        this.autoSaveInterval = null;
        this.prestigeSystem = null;
        this.multiverseSystem = null;
        this.lastAchievementCheck = 0;
        
        // Multiplicadores globales
        this.globalMultipliers = {
            production: 1,
            clickPower: 1,
            cost: 1,
            research: 1,
            timeAcceleration: 1,
            baseEfficiency: 1,
            prestigeSpeed: 1,
            prestigeCostReduction: 1,
            techCostReduction: 1,
            tradeRouteBonus: 1
        };
        
        // Sistema de eventos
        this.eventSystem = {
            activeEvents: [],
            eventQueue: [],
            lastEventCheck: 0
        };
        
        // Configuración
        this.config = {
            updateFrequency: 50, // ms entre actualizaciones
            autoSaveFrequency: 30000, // 30 segundos
            eventCheckFrequency: 60000 // 1 minuto
        };
        
        this.initialize();
    }
    
    // ==========================================
    // INICIALIZACIÓN
    // ==========================================
    
    initialize() {
        console.log("🌱 Inicializando Agro-Empire...");
        
        // Cargar o crear estado del juego
        this.loadGame();
        
        // Configurar intervalos
        this.setupIntervals();
        
        // Inicializar sistemas
        this.initializeSystems();
        
        console.log("✅ Agro-Empire inicializado correctamente");
    }
    
    loadGame() {
        const savedData = GameUtils.loadFromStorage('agro_empire_save', null);
        
        if (savedData && this.validateSaveData(savedData)) {
            this.gameState = this.mergeSaveData(savedData);
            GameUtils.showNotification("Partida cargada exitosamente", "success");
        } else {
            this.gameState = JSON.parse(JSON.stringify(GameData.INITIAL_GAME_STATE));
            this.initializeNewGame();
            GameUtils.showNotification("¡Bienvenido a Agro-Empire!", "success");
        }
        
        // Actualizar tiempo de offline
        this.calculateOfflineProgress();
    }
    
    initializeNewGame() {
        // Configurar unidades iniciales como disponibles
        Object.keys(GameData.PRODUCTION_UNITS).forEach(unitId => {
            const unit = GameData.PRODUCTION_UNITS[unitId];
            this.gameState.units[unitId] = {
                owned: 0,
                unlocked: unit.unlocked || false
            };
        });
        
        // Configurar logros iniciales
        Object.keys(GameData.ACHIEVEMENTS).forEach(achievementId => {
            this.gameState.achievements[achievementId] = {
                completed: false,
                progress: 0
            };
        });
        
        // Configurar tecnologías iniciales
        Object.values(GameData.TECHNOLOGY_TREE).forEach(branch => {
            Object.keys(branch.technologies).forEach(techId => {
                const tech = branch.technologies[techId];
                this.gameState.technologies[techId] = {
                    researched: false,
                    unlocked: tech.unlocked || false,
                    progress: 0
                };
            });
        });
    }
    
    mergeSaveData(savedData) {
        const newState = JSON.parse(JSON.stringify(GameData.INITIAL_GAME_STATE));
        
        // Fusionar datos guardados con estructura actual
        Object.assign(newState, savedData);
        
        // Asegurar que nuevas características están inicializadas
        this.ensureDataIntegrity(newState);
        
        return newState;
    }
    
    ensureDataIntegrity(state) {
        // Agregar nuevas unidades si no existen
        Object.keys(GameData.PRODUCTION_UNITS).forEach(unitId => {
            if (!state.units[unitId]) {
                const unit = GameData.PRODUCTION_UNITS[unitId];
                state.units[unitId] = {
                    owned: 0,
                    unlocked: unit.unlocked || false
                };
            }
        });
        
        // Asegurar que todos los recursos existen
        Object.keys(GameData.INITIAL_GAME_STATE.resources).forEach(resource => {
            if (state.resources[resource] === undefined) {
                state.resources[resource] = 0;
            }
        });
    }
    
    validateSaveData(data) {
        const requiredFields = ['version', 'player', 'resources', 'units'];
        return GameUtils.validateObject(data, requiredFields);
    }
    
    calculateOfflineProgress() {
        const currentTime = Date.now();
        const timeDiff = currentTime - this.gameState.player.lastSave;
        const offlineSeconds = Math.floor(timeDiff / 1000);
        
        // Solo calcular si estuvo offline más de 1 minuto
        if (offlineSeconds > 60) {
            const offlineProduction = this.calculateProductionPerSecond() * offlineSeconds;
            
            // Aplicar bonificación reducida para tiempo offline (75%)
            const offlineBonus = offlineProduction * 0.75;
            
            if (offlineBonus > 0) {
                this.gameState.resources.credits += offlineBonus;
                this.gameState.stats.totalCreditsEarned += offlineBonus;
                
                GameUtils.showNotification(
                    `¡Bienvenido de vuelta! Ganaste ${GameUtils.formatNumber(offlineBonus)} créditos mientras estabas ausente`,
                    "success",
                    5000
                );
            }
        }
        
        this.gameState.player.lastSave = currentTime;
    }
    
    setupIntervals() {
        // Ciclo principal del juego
        this.updateInterval = setInterval(() => {
            this.update();
        }, this.config.updateFrequency);
        
        // Auto-guardado
        this.autoSaveInterval = setInterval(() => {
            if (this.gameState.settings.autoSave) {
                this.saveGame();
            }
        }, this.config.autoSaveFrequency);
        
        // Verificación de eventos
        setInterval(() => {
            this.checkRandomEvents();
        }, this.config.eventCheckFrequency);
    }
    
    initializeSystems() {
        // Inicializar sistema de prestigio
        this.prestigeSystem = new PrestigeSystem(this);
        
        // Inicializar sistema multiversal (solo si está desbloqueado)
        if (this.gameState.player.currentEra >= 12) {
            this.multiverseSystem = new MultiverseSystem(this);
        }
        
        // Inicializar sistema de logros
        this.initializeAchievements();
        
        // Inicializar optimizaciones de rendimiento
        this.optimizePerformance();
        
        // Calcular multiplicadores iniciales
        this.updateGlobalMultipliers();
        
        // Verificar unidades desbloqueables
        this.checkUnlockConditions();
        
        // Marcar como ejecutándose
        this.isRunning = true;
    }
    
    // ==========================================
    // CICLO PRINCIPAL DEL JUEGO
    // ==========================================
    
    update() {
        if (!this.isRunning) return;
        
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // Convertir a segundos
        this.lastDeltaTime = deltaTime; // Para actualizaciones escalonadas
        
        if (this.lastUpdateTime === 0) {
            this.lastUpdateTime = currentTime;
            return;
        }
        
        // Monitorear rendimiento
        this.monitorPerformance(currentTime);
        
        // Actualizar producción pasiva
        this.updateProduction(deltaTime);
        
        // Actualizar investigación
        this.updateResearch(deltaTime);
        
        // Actualizar eventos activos
        this.updateEvents(deltaTime);
        
        // Verificar logros
        this.checkAchievements();
        
        // Verificar condiciones de desbloqueo
        this.checkUnlockConditions();
        
        // Actualizar sistema de prestigio
        if (this.prestigeSystem) {
            this.prestigeSystem.updatePrestigeAvailability();
        }
        
        // Actualizar sistema multiversal
        if (this.multiverseSystem) {
            this.multiverseSystem.update(deltaTime);
        }
        
        // Verificar logros (cada 5 segundos para optimizar)
        if (currentTime - this.lastAchievementCheck > 5000) {
            this.checkAchievements();
            this.lastAchievementCheck = currentTime;
        }
        
        // Actualizar estadísticas del jugador
        this.updatePlayerStats(deltaTime);
        
        // Aplicar actualizaciones por lotes para mejor rendimiento
        this.applyBatchedUpdates();
        
        // Limpieza periódica de memoria
        if (this.frameCount % 1000 === 0) {
            this.cleanupMemory();
        }
        
        this.lastUpdateTime = currentTime;
    }
    
    updateProduction(deltaTime) {
        const productionPerSecond = this.calculateProductionPerSecond();
        const creditsGained = productionPerSecond * deltaTime;
        
        if (creditsGained > 0) {
            this.gameState.resources.credits += creditsGained;
            this.gameState.stats.totalCreditsEarned += creditsGained;
        }
        
        // Actualizar otros recursos basados en unidades especiales
        this.updateSpecialResourceProduction(deltaTime);
    }
    
    updateSpecialResourceProduction(deltaTime) {
        Object.entries(this.gameState.units).forEach(([unitId, unitData]) => {
            const unitConfig = GameData.PRODUCTION_UNITS[unitId];
            
            if (unitData.owned > 0 && unitConfig.produces) {
                Object.entries(unitConfig.produces).forEach(([resource, baseAmount]) => {
                    if (resource !== 'credits') {
                        const amount = baseAmount * unitData.owned * deltaTime * this.globalMultipliers.production;
                        this.gameState.resources[resource] = (this.gameState.resources[resource] || 0) + amount;
                    }
                });
            }
        });
    }
    
    updateResearch(deltaTime) {
        // Aquí se implementará la lógica de investigación automática
        // cuando se añadan laboratorios que generen conocimiento
    }
    
    updateEvents(deltaTime) {
        // Actualizar duración de eventos activos
        this.eventSystem.activeEvents = this.eventSystem.activeEvents.filter(event => {
            event.remainingTime -= deltaTime;
            return event.remainingTime > 0;
        });
        
        // Aplicar efectos de eventos activos
        this.applyEventEffects();
    }
    
    updatePlayerStats(deltaTime) {
        this.gameState.player.totalPlaytime += deltaTime;
        
        // Calcular experiencia basada en producción
        const expGain = Math.floor(this.calculateProductionPerSecond() / 100);
        this.gameState.player.experience += expGain * deltaTime;
        
        // Verificar subida de nivel
        this.checkLevelUp();
    }
    
    // ==========================================
    // SISTEMA DE CLICS
    // ==========================================
    
    performClick(x = 0, y = 0) {
        const clickPower = this.calculateClickPower();
        
        // Agregar recursos
        this.gameState.resources.credits += clickPower;
        this.gameState.stats.totalCreditsEarned += clickPower;
        this.gameState.stats.totalClicks++;
        
        // Efectos visuales
        if (x && y) {
            GameUtils.createClickEffect(x, y, `+${GameUtils.formatNumber(clickPower)}`);
        }
        
        // Verificar logros relacionados con clics
        this.checkClickAchievements();
        
        return clickPower;
    }
    
    calculateClickPower() {
        let basePower = 1;
        
        // Aplicar mejoras de clic
        Object.entries(this.gameState.upgrades).forEach(([upgradeId, upgradeData]) => {
            if (upgradeData.purchased) {
                const upgrade = GameData.UPGRADES[upgradeId];
                if (upgrade.effect.type === 'click_multiplier') {
                    basePower *= upgrade.effect.value;
                }
            }
        });
        
        // Aplicar multiplicador global de clic
        basePower *= this.globalMultipliers.clickPower;
        
        // Bonus por logros
        Object.entries(this.gameState.achievements).forEach(([achievementId, achievementData]) => {
            if (achievementData.completed) {
                const achievement = GameData.ACHIEVEMENTS[achievementId];
                if (achievement.reward.clickMultiplier) {
                    basePower *= achievement.reward.clickMultiplier;
                }
            }
        });
        
        return Math.floor(basePower);
    }
    
    // ==========================================
    // SISTEMA DE PRODUCCIÓN
    // ==========================================
    
    calculateProductionPerSecond() {
        let totalProduction = 0;
        
        Object.entries(this.gameState.units).forEach(([unitId, unitData]) => {
            if (unitData.owned > 0) {
                const unitConfig = GameData.PRODUCTION_UNITS[unitId];
                let unitProduction = unitConfig.baseProduction * unitData.owned;
                
                // Aplicar multiplicadores de mejoras
                unitProduction *= this.getUnitMultiplier(unitId);
                
                // Aplicar multiplicador global
                unitProduction *= this.globalMultipliers.production;
                
                totalProduction += unitProduction;
            }
        });
        
        return totalProduction;
    }
    
    getUnitMultiplier(unitId) {
        let multiplier = 1;
        const unitConfig = GameData.PRODUCTION_UNITS[unitId];
        
        // Multiplicadores por mejoras
        Object.entries(this.gameState.upgrades).forEach(([upgradeId, upgradeData]) => {
            if (upgradeData.purchased) {
                const upgrade = GameData.UPGRADES[upgradeId];
                
                if (upgrade.effect.type === 'unit_multiplier') {
                    if (upgrade.effect.target === 'all' || 
                        upgrade.effect.target === `tier_${unitConfig.tier}` ||
                        upgrade.effect.target === unitId) {
                        multiplier *= upgrade.effect.value;
                    }
                }
            }
        });
        
        // Multiplicadores por sinergias
        multiplier *= this.calculateSynergyBonus(unitId);
        
        // Multiplicadores por logros
        Object.entries(this.gameState.achievements).forEach(([achievementId, achievementData]) => {
            if (achievementData.completed) {
                const achievement = GameData.ACHIEVEMENTS[achievementId];
                if (achievement.reward.productionMultiplier) {
                    multiplier *= achievement.reward.productionMultiplier;
                }
            }
        });
        
        return multiplier;
    }
    
    calculateSynergyBonus(unitId) {
        let bonus = 1;
        const unitConfig = GameData.PRODUCTION_UNITS[unitId];
        
        // Sinergia por era (unidades de la misma era se benefician mutuamente)
        if (this.gameState.upgrades['synergy_optimization']?.purchased) {
            const sameEraUnits = this.countUnitsInEra(unitConfig.era);
            if (sameEraUnits > 1) {
                bonus *= Math.pow(1.05, sameEraUnits - 1);
            }
        }
        
        // Sinergias específicas de unidades
        if (unitConfig.synergyBonus) {
            if (unitConfig.synergyBonus.type === 'all_plants') {
                const plantUnits = this.countPlantUnits();
                bonus *= Math.pow(unitConfig.synergyBonus.multiplier, plantUnits / 10);
            }
        }
        
        return bonus;
    }
    
    countUnitsInEra(era) {
        return Object.entries(this.gameState.units)
            .filter(([unitId, unitData]) => {
                const unitConfig = GameData.PRODUCTION_UNITS[unitId];
                return unitConfig.era === era && unitData.owned > 0;
            })
            .reduce((sum, [, unitData]) => sum + unitData.owned, 0);
    }
    
    countPlantUnits() {
        const plantUnitIds = ['chicken_coop', 'hydroponic_greenhouse', 'microbial_bioreactor'];
        return Object.entries(this.gameState.units)
            .filter(([unitId, unitData]) => plantUnitIds.includes(unitId) && unitData.owned > 0)
            .reduce((sum, [, unitData]) => sum + unitData.owned, 0);
    }
    
    // ==========================================
    // SISTEMA DE COMPRAS
    // ==========================================
    
    buyUnit(unitId, quantity = 1) {
        const unitConfig = GameData.PRODUCTION_UNITS[unitId];
        const unitData = this.gameState.units[unitId];
        
        if (!unitData.unlocked) {
            GameUtils.showNotification("Esta unidad no está desbloqueada", "error");
            return false;
        }
        
        const totalCost = GameUtils.calculateTotalCost(
            unitConfig.baseCost,
            unitData.owned,
            quantity,
            unitConfig.costMultiplier
        );
        
        // Aplicar reducción de costo si hay mejoras
        const adjustedCost = totalCost * this.globalMultipliers.cost;
        
        if (this.gameState.resources.credits < adjustedCost) {
            GameUtils.showNotification("No tienes suficientes créditos", "error");
            return false;
        }
        
        // Verificar límite máximo
        if (unitConfig.maxOwned !== -1 && unitData.owned + quantity > unitConfig.maxOwned) {
            GameUtils.showNotification(`Límite máximo alcanzado (${unitConfig.maxOwned})`, "error");
            return false;
        }
        
        // Realizar compra
        this.gameState.resources.credits -= adjustedCost;
        unitData.owned += quantity;
        this.gameState.stats.totalUnitsBuilt += quantity;
        
        GameUtils.showNotification(
            `Compraste ${quantity}x ${unitConfig.name}`,
            "success"
        );
        
        // Verificar logros
        this.checkUnitAchievements();
        
        return true;
    }
    
    buyMaxUnits(unitId) {
        const unitConfig = GameData.PRODUCTION_UNITS[unitId];
        const unitData = this.gameState.units[unitId];
        
        if (!unitData.unlocked) {
            return false;
        }
        
        const adjustedBaseCost = unitConfig.baseCost * this.globalMultipliers.cost;
        const maxAffordable = GameUtils.calculateMaxAffordable(
            this.gameState.resources.credits,
            adjustedBaseCost,
            unitData.owned,
            unitConfig.costMultiplier
        );
        
        if (maxAffordable > 0) {
            let toBuy = maxAffordable;
            
            // Respetar límite máximo
            if (unitConfig.maxOwned !== -1) {
                toBuy = Math.min(toBuy, unitConfig.maxOwned - unitData.owned);
            }
            
            if (toBuy > 0) {
                return this.buyUnit(unitId, toBuy);
            }
        }
        
        return false;
    }
    
    buyUpgrade(upgradeId) {
        const upgrade = GameData.UPGRADES[upgradeId];
        const upgradeData = this.gameState.upgrades[upgradeId];
        
        if (!upgrade.unlocked) {
            GameUtils.showNotification("Esta mejora no está disponible", "error");
            return false;
        }
        
        if (upgradeData?.purchased) {
            GameUtils.showNotification("Ya tienes esta mejora", "error");
            return false;
        }
        
        if (this.gameState.resources.credits < upgrade.cost) {
            GameUtils.showNotification("No tienes suficientes créditos", "error");
            return false;
        }
        
        // Verificar requisitos
        if (!this.checkUpgradeRequirements(upgrade)) {
            GameUtils.showNotification("No cumples los requisitos", "error");
            return false;
        }
        
        // Realizar compra
        this.gameState.resources.credits -= upgrade.cost;
        
        if (!this.gameState.upgrades[upgradeId]) {
            this.gameState.upgrades[upgradeId] = {};
        }
        
        this.gameState.upgrades[upgradeId].purchased = true;
        
        // Aplicar efectos inmediatos
        this.applyUpgradeEffects(upgrade);
        
        GameUtils.showNotification(`Compraste: ${upgrade.name}`, "success");
        
        return true;
    }
    
    checkUpgradeRequirements(upgrade) {
        const req = upgrade.requirements;
        
        if (req.totalClicks && this.gameState.stats.totalClicks < req.totalClicks) {
            return false;
        }
        
        if (req.era && this.gameState.player.currentEra < req.era) {
            return false;
        }
        
        if (req.unitsOwned) {
            const totalUnits = Object.values(this.gameState.units)
                .reduce((sum, unit) => sum + unit.owned, 0);
            if (totalUnits < req.unitsOwned) {
                return false;
            }
        }
        
        if (req.technology && !this.gameState.technologies[req.technology]?.researched) {
            return false;
        }
        
        return true;
    }
    
    applyUpgradeEffects(upgrade) {
        // Los efectos se aplicarán en tiempo real durante los cálculos
        // Actualizar multiplicadores globales
        this.updateGlobalMultipliers();
    }
    
    // ==========================================
    // SISTEMA DE DESBLOQUEABLES
    // ==========================================
    
    checkUnlockConditions() {
        // Verificar unidades desbloqueables
        Object.entries(GameData.PRODUCTION_UNITS).forEach(([unitId, unitConfig]) => {
            const unitData = this.gameState.units[unitId];
            
            if (!unitData.unlocked && this.checkUnitRequirements(unitConfig)) {
                unitData.unlocked = true;
                GameUtils.showNotification(`¡Nueva unidad desbloqueada: ${unitConfig.name}!`, "success");
            }
        });
        
        // Verificar mejoras desbloqueables
        Object.entries(GameData.UPGRADES).forEach(([upgradeId, upgrade]) => {
            if (!upgrade.unlocked && this.checkUpgradeRequirements(upgrade)) {
                GameData.UPGRADES[upgradeId].unlocked = true;
                GameUtils.showNotification(`¡Nueva mejora disponible: ${upgrade.name}!`, "success");
            }
        });
        
        // Verificar tecnologías desbloqueables
        Object.values(GameData.TECHNOLOGY_TREE).forEach(branch => {
            Object.entries(branch.technologies).forEach(([techId, tech]) => {
                const techData = this.gameState.technologies[techId];
                
                if (!techData.unlocked && this.checkTechRequirements(tech)) {
                    techData.unlocked = true;
                    GameUtils.showNotification(`¡Nueva tecnología disponible: ${tech.name}!`, "success");
                }
            });
        });
    }
    
    checkUnitRequirements(unitConfig) {
        const req = unitConfig.requirements;
        
        if (req.level && this.gameState.player.level < req.level) {
            return false;
        }
        
        if (req.era && this.gameState.player.currentEra < req.era) {
            return false;
        }
        
        if (req.technology && !this.gameState.technologies[req.technology]?.researched) {
            return false;
        }
        
        return true;
    }
    
    checkTechRequirements(tech) {
        if (tech.prerequisites) {
            return tech.prerequisites.every(prereqId => 
                this.gameState.technologies[prereqId]?.researched
            );
        }
        
        return true;
    }
    
    // ==========================================
    // SISTEMA DE LOGROS
    // ==========================================
    
    initializeAchievements() {
        // Inicializar logros si no existen
        if (!this.gameState.achievements) {
            this.gameState.achievements = {};
        }
        
        // Cargar logros desde gameData.js
        Object.keys(window.ACHIEVEMENTS || {}).forEach(achievementId => {
            if (!this.gameState.achievements[achievementId]) {
                this.gameState.achievements[achievementId] = {
                    ...window.ACHIEVEMENTS[achievementId],
                    completed: false,
                    completedAt: null
                };
            }
        });
        
        console.log("🏆 Sistema de logros inicializado");
    }
    
    checkAchievements() {
        let newAchievements = [];
        
        Object.keys(window.ACHIEVEMENTS || {}).forEach(achievementId => {
            const achievement = window.ACHIEVEMENTS[achievementId];
            const playerAchievement = this.gameState.achievements[achievementId];
            
            if (playerAchievement && !playerAchievement.completed && achievement.condition(this.gameState)) {
                this.unlockAchievement(achievementId);
                newAchievements.push(achievement);
            }
        });
        
        return newAchievements;
    }
    
    unlockAchievement(achievementId) {
        const achievement = window.ACHIEVEMENTS[achievementId];
        if (!achievement) return false;
        
        // Marcar como completado
        this.gameState.achievements[achievementId].completed = true;
        this.gameState.achievements[achievementId].completedAt = Date.now();
        
        // Aplicar recompensas
        this.applyAchievementReward(achievement.reward);
        
        // Actualizar estadísticas
        this.gameState.stats.totalAchievementsUnlocked++;
        
        // Mostrar notificación (será manejado por la UI)
        this.triggerEvent('achievementUnlocked', {
            achievement: achievement,
            id: achievementId
        });
        
        console.log(`🏆 Logro desbloqueado: ${achievement.name}`);
        return true;
    }
    
    applyAchievementReward(reward) {
        if (!reward) return;
        
        // Aplicar recompensas de recursos
        Object.keys(reward).forEach(rewardType => {
            const amount = reward[rewardType];
            
            switch (rewardType) {
                case 'credits':
                case 'biomass':
                case 'energy':
                case 'knowledge':
                case 'influence':
                case 'quantum_time':
                case 'genetic_data':
                case 'reality_essence':
                case 'dimensional_energy':
                case 'cosmic_knowledge':
                    if (this.gameState.resources[rewardType] !== undefined) {
                        this.gameState.resources[rewardType] += amount;
                    }
                    break;
                    
                case 'clickPowerBonus':
                    this.globalMultipliers.clickPower += amount;
                    break;
                    
                case 'productionBonus':
                    this.globalMultipliers.production += amount;
                    break;
                    
                case 'timeAcceleration':
                    this.globalMultipliers.timeAcceleration += amount;
                    break;
                    
                case 'prestigeBonus':
                    this.globalMultipliers.prestigeSpeed += amount;
                    break;
                    
                default:
                    console.log(`Tipo de recompensa desconocido: ${rewardType}`);
            }
        });
    }
    
    getCompletedAchievements() {
        return Object.keys(this.gameState.achievements)
            .filter(id => this.gameState.achievements[id].completed)
            .map(id => ({
                id,
                ...window.ACHIEVEMENTS[id],
                completedAt: this.gameState.achievements[id].completedAt
            }));
    }
    
    getAchievementProgress() {
        const total = Object.keys(window.ACHIEVEMENTS || {}).length;
        const completed = this.getCompletedAchievements().length;
        return {
            completed,
            total,
            percentage: Math.round((completed / total) * 100)
        };
    }
    
    getAchievementsByCategory(category) {
        return Object.keys(window.ACHIEVEMENTS || {})
            .filter(id => window.ACHIEVEMENTS[id].type === category)
            .map(id => ({
                id,
                ...window.ACHIEVEMENTS[id],
                completed: this.gameState.achievements[id]?.completed || false,
                completedAt: this.gameState.achievements[id]?.completedAt
            }));
    }
    
    checkClickAchievements() {
        // Verificaciones específicas después de hacer clic
        this.checkAchievements();
    }
    
    checkUnitAchievements() {
        // Verificaciones específicas después de comprar unidades
        this.checkAchievements();
    }
    
    // ==========================================
    // SISTEMA DE NIVEL Y EXPERIENCIA
    // ==========================================
    
    checkLevelUp() {
        const requiredExp = this.getRequiredExperience(this.gameState.player.level);
        
        if (this.gameState.player.experience >= requiredExp) {
            this.gameState.player.level++;
            this.gameState.player.experience -= requiredExp;
            
            GameUtils.showNotification(
                `¡Subiste al nivel ${this.gameState.player.level}!`,
                "success"
            );
            
            // Verificar desbloqueables por nivel
            this.checkUnlockConditions();
        }
    }
    
    getRequiredExperience(level) {
        return Math.floor(100 * Math.pow(1.5, level - 1));
    }
    
    // ==========================================
    // SISTEMA DE EVENTOS
    // ==========================================
    
    checkRandomEvents() {
        const currentTime = Date.now();
        
        if (currentTime - this.eventSystem.lastEventCheck < this.config.eventCheckFrequency) {
            return;
        }
        
        this.eventSystem.lastEventCheck = currentTime;
        
        // Verificar cada evento posible
        Object.values(GameData.DYNAMIC_EVENTS).forEach(event => {
            if (this.shouldTriggerEvent(event)) {
                this.triggerEvent(event);
            }
        });
    }
    
    shouldTriggerEvent(event) {
        // Verificar requisitos de era
        if (event.requirements?.era && this.gameState.player.currentEra < event.requirements.era) {
            return false;
        }
        
        // Verificar si ya hay un evento del mismo tipo activo
        const hasActiveEvent = this.eventSystem.activeEvents.some(active => active.id === event.id);
        if (hasActiveEvent) {
            return false;
        }
        
        // Verificar probabilidad
        return Math.random() < event.probability;
    }
    
    triggerEvent(event) {
        const activeEvent = {
            ...event,
            remainingTime: event.duration,
            triggeredAt: Date.now()
        };
        
        this.eventSystem.activeEvents.push(activeEvent);
        this.gameState.activeEvents.push(activeEvent);
        
        GameUtils.showNotification(
            `📢 Evento: ${event.name}`,
            event.type === 'crisis' ? 'warning' : 'success',
            6000
        );
        
        // Mostrar modal de evento si es necesario
        this.showEventModal(event);
    }
    
    showEventModal(event) {
        // Esta función será implementada en ui.js
        if (window.GameUI) {
            window.GameUI.showEventModal(event);
        }
    }
    
    applyEventEffects() {
        // Reiniciar multiplicadores a valores base
        this.updateGlobalMultipliers();
        
        // Aplicar efectos de eventos activos
        this.eventSystem.activeEvents.forEach(event => {
            if (event.effects.productionMultiplier) {
                this.globalMultipliers.production *= event.effects.productionMultiplier;
            }
            
            if (event.effects.sellPriceMultiplier) {
                // Aplicar cuando se implemente sistema de venta
            }
        });
    }
    
    // ==========================================
    // SISTEMA DE MULTIPLICADORES
    // ==========================================
    
    updateGlobalMultipliers() {
        // Reiniciar valores base (manteniendo prestigio)
        const prestigeMultipliers = {
            timeAcceleration: this.globalMultipliers.timeAcceleration || 1,
            baseEfficiency: this.globalMultipliers.baseEfficiency || 1,
            prestigeSpeed: this.globalMultipliers.prestigeSpeed || 1,
            prestigeCostReduction: this.globalMultipliers.prestigeCostReduction || 1,
            techCostReduction: this.globalMultipliers.techCostReduction || 1,
            tradeRouteBonus: this.globalMultipliers.tradeRouteBonus || 1
        };
        
        this.globalMultipliers.production = 1;
        this.globalMultipliers.clickPower = 1;
        this.globalMultipliers.cost = 1;
        this.globalMultipliers.research = 1;
        
        // Restaurar multiplicadores de prestigio
        Object.assign(this.globalMultipliers, prestigeMultipliers);
        
        // Aplicar efectos de mejoras
        Object.entries(this.gameState.upgrades).forEach(([upgradeId, upgradeData]) => {
            if (upgradeData.purchased) {
                const upgrade = GameData.UPGRADES[upgradeId];
                
                if (upgrade.effect.type === 'cost_reduction') {
                    this.globalMultipliers.cost *= upgrade.effect.value;
                }
            }
        });
        
        // Aplicar efectos de logros
        Object.entries(this.gameState.achievements).forEach(([achievementId, achievementData]) => {
            if (achievementData.completed) {
                const achievement = GameData.ACHIEVEMENTS[achievementId];
                
                if (achievement.reward.productionMultiplier) {
                    this.globalMultipliers.production *= achievement.reward.productionMultiplier;
                }
            }
        });
        
        // Aplicar multiplicadores de prestigio a producción base
        this.globalMultipliers.production *= this.globalMultipliers.baseEfficiency;
        this.globalMultipliers.production *= this.globalMultipliers.prestigeSpeed;
        this.globalMultipliers.cost *= this.globalMultipliers.prestigeCostReduction;
        
        // Aplicar bonificaciones de rutas comerciales pasivas
        if (this.gameState.passiveTradeRoutes && this.gameState.passiveTradeRoutes.length > 0) {
            this.globalMultipliers.production *= this.globalMultipliers.tradeRouteBonus;
        }
    }
    
    // ==========================================
    // SISTEMA DE GUARDADO
    // ==========================================
    
    saveGame() {
        this.gameState.player.lastSave = Date.now();
        
        const success = GameUtils.saveToStorage('agro_empire_save', this.gameState);
        
        if (success) {
            GameUtils.showNotification("Partida guardada", "success", 1000);
        } else {
            GameUtils.showNotification("Error al guardar", "error");
        }
        
        return success;
    }
    
    exportSave() {
        return GameUtils.exportGameData(this.gameState);
    }
    
    importSave(encodedData) {
        const importedData = GameUtils.importGameData(encodedData);
        
        if (importedData && this.validateSaveData(importedData)) {
            this.gameState = this.mergeSaveData(importedData);
            this.saveGame();
            
            GameUtils.showNotification("Partida importada exitosamente", "success");
            return true;
        } else {
            GameUtils.showNotification("Datos de guardado inválidos", "error");
            return false;
        }
    }
    
    resetGame() {
        if (confirm("¿Estás seguro de que quieres reiniciar completamente el juego? Esta acción no se puede deshacer.")) {
            localStorage.removeItem('agro_empire_save');
            location.reload();
        }
    }
    
    // ==========================================
    // MÉTODOS PÚBLICOS PARA LA UI
    // ==========================================
    
    getGameState() {
        return this.gameState;
    }
    
    getUnitCost(unitId, quantity = 1) {
        const unitConfig = GameData.PRODUCTION_UNITS[unitId];
        const unitData = this.gameState.units[unitId];
        
        if (!unitConfig || !unitData) return 0;
        
        return GameUtils.calculateTotalCost(
            unitConfig.baseCost,
            unitData.owned,
            quantity,
            unitConfig.costMultiplier
        ) * this.globalMultipliers.cost;
    }
    
    canAffordUnit(unitId, quantity = 1) {
        return this.gameState.resources.credits >= this.getUnitCost(unitId, quantity);
    }
    
    canAffordUpgrade(upgradeId) {
        const upgrade = GameData.UPGRADES[upgradeId];
        return upgrade && this.gameState.resources.credits >= upgrade.cost;
    }
    
    getCurrentEra() {
        return GameData.ERAS[this.gameState.player.currentEra];
    }
    
    getProgressToNextEra() {
        const currentEra = this.getCurrentEra();
        const nextEra = GameData.ERAS[currentEra.nextEra];
        
        if (!nextEra) return 1; // Máxima era alcanzada
        
        return Math.min(this.gameState.stats.totalCreditsEarned / nextEra.requiredCredits, 1);
    }
    
    // ==========================================
    // OPTIMIZACIONES DE RENDIMIENTO
    // ==========================================
    
    optimizePerformance() {
        // Configurar RAF para animaciones suaves
        this.lastFrameTime = 0;
        this.frameCount = 0;
        this.fps = 60;
        
        // Sistema de cache para cálculos costosos
        this.calculationCache = {
            productionPerSecond: { value: 0, lastUpdate: 0, ttl: 1000 },
            clickPower: { value: 1, lastUpdate: 0, ttl: 5000 },
            globalMultipliers: { value: {}, lastUpdate: 0, ttl: 2000 }
        };
        
        // Optimización de renderizado
        this.renderQueue = [];
        this.batchedUpdates = {};
        
        console.log("⚡ Optimizaciones de rendimiento aplicadas");
    }
    
    getCachedValue(key, calculator) {
        const now = Date.now();
        const cached = this.calculationCache[key];
        
        if (cached && (now - cached.lastUpdate) < cached.ttl) {
            return cached.value;
        }
        
        const newValue = calculator();
        this.calculationCache[key] = {
            value: newValue,
            lastUpdate: now,
            ttl: cached ? cached.ttl : 1000
        };
        
        return newValue;
    }
    
    batchUpdate(elementId, property, value) {
        if (!this.batchedUpdates[elementId]) {
            this.batchedUpdates[elementId] = {};
        }
        this.batchedUpdates[elementId][property] = value;
    }
    
    applyBatchedUpdates() {
        Object.keys(this.batchedUpdates).forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                const updates = this.batchedUpdates[elementId];
                Object.keys(updates).forEach(property => {
                    if (property === 'textContent') {
                        element.textContent = updates[property];
                    } else if (property === 'className') {
                        element.className = updates[property];
                    } else {
                        element.style[property] = updates[property];
                    }
                });
            }
        });
        this.batchedUpdates = {};
    }
    
    // Versión optimizada del cálculo de producción
    calculateProductionPerSecondOptimized() {
        return this.getCachedValue('productionPerSecond', () => {
            let production = 0;
            
            // Usar forEach optimizado para evitar recrear arrays
            Object.keys(this.gameState.units).forEach(unitId => {
                const unit = this.gameState.units[unitId];
                const unitData = GameData.PRODUCTION_UNITS[unitId];
                
                if (unit && unitData && unit.owned > 0) {
                    const unitProduction = unitData.baseProduction * unit.owned * unit.efficiency;
                    production += unitProduction;
                }
            });
            
            return production * this.globalMultipliers.production;
        });
    }
    
    // Versión optimizada del cálculo de poder de clic
    calculateClickPowerOptimized() {
        return this.getCachedValue('clickPower', () => {
            let power = 1;
            
            // Agregar bonificaciones de upgrades
            Object.keys(this.gameState.upgrades).forEach(upgradeId => {
                const upgrade = this.gameState.upgrades[upgradeId];
                const upgradeData = GameData.UPGRADES[upgradeId];
                
                if (upgrade.purchased && upgradeData && upgradeData.effect.type === 'click_power') {
                    power += upgradeData.effect.value;
                }
            });
            
            return power * this.globalMultipliers.clickPower;
        });
    }
    
    // Sistema de actualizaciones escalonadas para reducir carga
    useStaggeredUpdates() {
        const updateStages = {
            0: () => this.updateProduction(this.lastDeltaTime),
            1: () => this.updateResearch(this.lastDeltaTime),
            2: () => this.updateEventSystem(this.lastDeltaTime),
            3: () => this.updatePlayerStats(this.lastDeltaTime),
            4: () => this.applyBatchedUpdates()
        };
        
        const currentStage = this.frameCount % 5;
        if (updateStages[currentStage]) {
            updateStages[currentStage]();
        }
    }
    
    // Monitoreo de FPS y ajuste dinámico
    monitorPerformance(currentTime) {
        if (this.lastFrameTime === 0) {
            this.lastFrameTime = currentTime;
            return;
        }
        
        const deltaTime = currentTime - this.lastFrameTime;
        this.fps = 1000 / deltaTime;
        this.frameCount++;
        this.lastFrameTime = currentTime;
        
        // Ajustar frecuencia de actualización si el FPS es bajo
        if (this.fps < 30 && this.config.updateFrequency < 100) {
            this.config.updateFrequency += 10;
            console.warn(`⚠️ Rendimiento bajo detectado. Ajustando frecuencia a ${this.config.updateFrequency}ms`);
        } else if (this.fps > 55 && this.config.updateFrequency > 50) {
            this.config.updateFrequency -= 5;
        }
    }
    
    // Limpieza de memoria para evitar memory leaks
    cleanupMemory() {
        // Limpiar cache viejo
        const now = Date.now();
        Object.keys(this.calculationCache).forEach(key => {
            const cached = this.calculationCache[key];
            if ((now - cached.lastUpdate) > cached.ttl * 5) {
                delete this.calculationCache[key];
            }
        });
        
        // Limpiar eventos procesados
        this.eventSystem.activeEvents = this.eventSystem.activeEvents.filter(event => 
            event.endTime > now
        );
        
        // Forzar garbage collection si está disponible
        if (window.gc && this.frameCount % 1000 === 0) {
            window.gc();
        }
    }
    
    // ==========================================
    // DESTRUCTOR
    // ==========================================
    
    destroy() {
        this.isRunning = false;
        
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        
        this.saveGame();
    }
}

// Hacer el motor accesible globalmente
window.GameEngine = GameEngine;