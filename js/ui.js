/**
 * AGRO-EMPIRE: INTERFAZ DE USUARIO
 * Gestión de la interfaz y conexión con el motor del juego
 */

class GameUI {
    constructor(gameEngine) {
        this.game = gameEngine;
        this.elements = {};
        this.activeTab = 'units';
        this.updateInterval = null;
        this.lastUpdate = 0;
        
        this.initialize();
    }
    
    // ==========================================
    // INICIALIZACIÓN
    // ==========================================
    
    initialize() {
        console.log("🎨 Inicializando interfaz de usuario...");
        
        // Obtener referencias a elementos del DOM
        this.cacheElements();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Configurar canvas de la granja
        this.setupFarmCanvas();
        
        // Actualización inicial de la UI
        this.updateUI();
        
        // Configurar intervalo de actualización
        this.setupUpdateInterval();
        
        console.log("✅ Interfaz de usuario inicializada");
    }
    
    cacheElements() {
        // Header elements
        this.elements.eraTitle = document.getElementById('era-title');
        this.elements.eraProgress = document.getElementById('era-progress');
        this.elements.eraLevel = document.getElementById('era-level');
        
        // Resource displays
        this.elements.credits = document.getElementById('credits');
        this.elements.biomass = document.getElementById('biomass');
        this.elements.energy = document.getElementById('energy');
        this.elements.knowledge = document.getElementById('knowledge');
        
        // Main click button and canvas
        this.elements.mainClickBtn = document.getElementById('main-click-btn');
        this.elements.farmCanvas = document.getElementById('farm-canvas');
        
        // Stats panel
        this.elements.productionRate = document.getElementById('production-rate');
        this.elements.totalProduced = document.getElementById('total-produced');
        this.elements.totalClicks = document.getElementById('total-clicks');
        
        // Narrative panel
        this.elements.narrativeText = document.getElementById('narrative-text');
        
        // Tab navigation
        this.elements.tabs = document.querySelectorAll('.tab');
        this.elements.tabPanels = document.querySelectorAll('.tab-panel');
        
        // Tab content containers
        this.elements.unitsList = document.getElementById('units-list');
        this.elements.upgradesList = document.getElementById('upgrades-list');
        this.elements.techTree = document.getElementById('tech-tree');
        this.elements.achievementsList = document.getElementById('achievements-list');
        
        // Branch selectors for research
        this.elements.branchButtons = document.querySelectorAll('.branch-btn');
        this.elements.achievementFilters = document.querySelectorAll('.achievement-filter');
        
        // Settings elements
        this.elements.soundEnabled = document.getElementById('sound-enabled');
        this.elements.musicEnabled = document.getElementById('music-enabled');
        this.elements.autoSave = document.getElementById('auto-save');
        this.elements.notifications = document.getElementById('notifications');
        this.elements.scientificNotation = document.getElementById('scientific-notation');
        
        // Settings buttons
        this.elements.saveGameBtn = document.getElementById('save-game');
        this.elements.loadGameBtn = document.getElementById('load-game');
        this.elements.exportSaveBtn = document.getElementById('export-save');
        this.elements.importSaveBtn = document.getElementById('import-save');
        this.elements.resetGameBtn = document.getElementById('reset-game');
        
        // Modal elements
        this.elements.eventModal = document.getElementById('event-modal');
        this.elements.eventTitle = document.getElementById('event-title');
        this.elements.eventDescription = document.getElementById('event-description');
        this.elements.eventActions = document.getElementById('event-actions');
    }
    
    setupEventListeners() {
        // Main click button
        this.elements.mainClickBtn.addEventListener('click', (e) => {
            this.handleMainClick(e);
        });
        
        // Tab navigation
        this.elements.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab.dataset.tab);
            });
        });
        
        // Research branch selection
        this.elements.branchButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchResearchBranch(btn.dataset.branch);
            });
        });
        
        // Achievement filters
        this.elements.achievementFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                this.switchAchievementFilter(filter.dataset.filter);
            });
        });
        
        // Settings
        this.elements.soundEnabled?.addEventListener('change', (e) => {
            this.game.gameState.settings.soundEnabled = e.target.checked;
        });
        
        this.elements.musicEnabled?.addEventListener('change', (e) => {
            this.game.gameState.settings.musicEnabled = e.target.checked;
        });
        
        this.elements.autoSave?.addEventListener('change', (e) => {
            this.game.gameState.settings.autoSave = e.target.checked;
        });
        
        this.elements.notifications?.addEventListener('change', (e) => {
            this.game.gameState.settings.notifications = e.target.checked;
        });
        
        this.elements.scientificNotation?.addEventListener('change', (e) => {
            this.game.gameState.settings.scientificNotation = e.target.checked;
            this.updateUI(); // Refresh numbers display
        });
        
        // Settings buttons
        this.elements.saveGameBtn?.addEventListener('click', () => {
            this.game.saveGame();
        });
        
        this.elements.exportSaveBtn?.addEventListener('click', () => {
            this.exportGameData();
        });
        
        this.elements.importSaveBtn?.addEventListener('click', () => {
            this.importGameData();
        });
        
        this.elements.resetGameBtn?.addEventListener('click', () => {
            this.game.resetGame();
        });
        
        // Close modal on click outside
        this.elements.eventModal?.addEventListener('click', (e) => {
            if (e.target === this.elements.eventModal) {
                this.hideEventModal();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }
    
    setupFarmCanvas() {
        if (!this.elements.farmCanvas) return;
        
        const ctx = this.elements.farmCanvas.getContext('2d');
        this.farmContext = ctx;
        
        // Set canvas size
        const rect = this.elements.farmCanvas.getBoundingClientRect();
        this.elements.farmCanvas.width = rect.width;
        this.elements.farmCanvas.height = rect.height;
        
        // Initial farm drawing
        this.drawFarm();
    }
    
    setupUpdateInterval() {
        // Update UI every 100ms
        this.updateInterval = setInterval(() => {
            this.updateUI();
        }, 100);
    }
    
    // ==========================================
    // ACTUALIZACIÓN DE UI
    // ==========================================
    
    updateUI() {
        const gameState = this.game.getGameState();
        
        // Update header
        this.updateHeader(gameState);
        
        // Update resources
        this.updateResources(gameState);
        
        // Update stats
        this.updateStats(gameState);
        
        // Update active tab content
        this.updateActiveTabContent(gameState);
        
        // Update main click button
        this.updateClickButton();
        
        // Update farm canvas
        this.updateFarmCanvas();
    }
    
    updateHeader(gameState) {
        const currentEra = this.game.getCurrentEra();
        
        if (this.elements.eraTitle) {
            this.elements.eraTitle.textContent = `Era ${currentEra.id}: ${currentEra.name}`;
        }
        
        if (this.elements.eraLevel) {
            this.elements.eraLevel.textContent = `Nivel ${gameState.player.level}`;
        }
        
        if (this.elements.eraProgress) {
            const progress = this.game.getProgressToNextEra();
            this.elements.eraProgress.style.width = `${progress * 100}%`;
        }
    }
    
    updateResources(gameState) {
        const useScientific = gameState.settings.scientificNotation;
        
        if (this.elements.credits) {
            this.elements.credits.textContent = GameUtils.formatNumber(
                gameState.resources.credits, 
                2, 
                useScientific
            );
        }
        
        if (this.elements.biomass) {
            this.elements.biomass.textContent = GameUtils.formatNumber(
                gameState.resources.biomass || 0, 
                2, 
                useScientific
            );
        }
        
        if (this.elements.energy) {
            this.elements.energy.textContent = GameUtils.formatNumber(
                gameState.resources.energy || 0, 
                2, 
                useScientific
            );
        }
        
        if (this.elements.knowledge) {
            this.elements.knowledge.textContent = GameUtils.formatNumber(
                gameState.resources.knowledge || 0, 
                2, 
                useScientific
            );
        }
    }
    
    updateStats(gameState) {
        const productionPerSecond = this.game.calculateProductionPerSecond();
        
        if (this.elements.productionRate) {
            this.elements.productionRate.textContent = GameUtils.formatNumber(productionPerSecond);
        }
        
        if (this.elements.totalProduced) {
            this.elements.totalProduced.textContent = GameUtils.formatNumber(gameState.stats.totalCreditsEarned);
        }
        
        if (this.elements.totalClicks) {
            this.elements.totalClicks.textContent = GameUtils.formatNumber(gameState.stats.totalClicks);
        }
    }
    
    updateActiveTabContent(gameState) {
        switch (this.activeTab) {
            case 'units':
                this.updateUnitsTab(gameState);
                break;
            case 'upgrades':
                this.updateUpgradesTab(gameState);
                break;
            case 'research':
                this.updateResearchTab(gameState);
                break;
            case 'achievements':
                this.updateAchievementsTab(gameState);
                break;
            case 'prestige':
                this.updatePrestigeTab(gameState);
                break;
        }
    }
    
    updateClickButton() {
        const clickPower = this.game.calculateClickPower();
        const clickValue = this.elements.mainClickBtn?.querySelector('.click-value');
        
        if (clickValue) {
            clickValue.textContent = `+${GameUtils.formatNumber(clickPower)} Crédito${clickPower !== 1 ? 's' : ''}`;
        }
    }
    
    updateFarmCanvas() {
        // Update farm visualization based on current state
        this.drawFarm();
    }
    
    // ==========================================
    // PESTAÑAS DE CONTENIDO
    // ==========================================
    
    updateUnitsTab(gameState) {
        if (!this.elements.unitsList) return;
        
        // Clear existing content
        this.elements.unitsList.innerHTML = '';
        
        // Get available units for current era
        const availableUnits = Object.entries(GameData.PRODUCTION_UNITS)
            .filter(([unitId, unitConfig]) => {
                const unitData = gameState.units[unitId];
                return unitData && (unitData.unlocked || unitConfig.era <= gameState.player.currentEra);
            })
            .sort((a, b) => a[1].baseCost - b[1].baseCost);
        
        availableUnits.forEach(([unitId, unitConfig]) => {
            const unitData = gameState.units[unitId];
            const unitElement = this.createUnitElement(unitId, unitConfig, unitData);
            this.elements.unitsList.appendChild(unitElement);
        });
    }
    
    createUnitElement(unitId, unitConfig, unitData) {
        const isUnlocked = unitData.unlocked;
        const canAfford = this.game.canAffordUnit(unitId);
        const cost = this.game.getUnitCost(unitId);
        
        const unitElement = GameUtils.createElement('div', ['unit-item', !isUnlocked ? 'locked' : '']);
        
        const unitInfo = GameUtils.createElement('div', 'unit-info');
        
        const unitName = GameUtils.createElement('div', 'unit-name');
        unitName.innerHTML = `${unitConfig.icon} ${unitConfig.name}`;
        
        const unitDescription = GameUtils.createElement('div', 'unit-description', {}, unitConfig.description);
        
        const unitStats = GameUtils.createElement('div', 'unit-stats');
        
        const ownedSpan = GameUtils.createElement('span', 'unit-owned', {}, `Posees: ${unitData.owned}`);
        const productionSpan = GameUtils.createElement('span', 'unit-production', {}, 
            `Producción: ${GameUtils.formatNumber(unitConfig.baseProduction)}/s`);
        
        unitStats.appendChild(ownedSpan);
        unitStats.appendChild(productionSpan);
        
        unitInfo.appendChild(unitName);
        unitInfo.appendChild(unitDescription);
        unitInfo.appendChild(unitStats);
        
        // Buy button
        const buyButton = GameUtils.createElement('button', ['unit-buy-btn'], {}, 
            GameUtils.formatCurrency(cost));
        
        if (!isUnlocked) {
            buyButton.disabled = true;
            buyButton.textContent = 'Bloqueado';
        } else if (!canAfford) {
            buyButton.disabled = true;
        }
        
        // Buy button event
        buyButton.addEventListener('click', () => {
            if (isUnlocked && canAfford) {
                this.game.buyUnit(unitId);
            }
        });
        
        // Max buy button
        const maxButton = GameUtils.createElement('button', ['unit-buy-btn'], {}, 'Max');
        maxButton.addEventListener('click', () => {
            if (isUnlocked) {
                this.game.buyMaxUnits(unitId);
            }
        });
        
        if (!isUnlocked || !canAfford) {
            maxButton.disabled = true;
        }
        
        const buttonContainer = GameUtils.createElement('div', 'unit-buttons');
        buttonContainer.appendChild(buyButton);
        buttonContainer.appendChild(maxButton);
        
        unitElement.appendChild(unitInfo);
        unitElement.appendChild(buttonContainer);
        
        return unitElement;
    }
    
    updateUpgradesTab(gameState) {
        if (!this.elements.upgradesList) return;
        
        this.elements.upgradesList.innerHTML = '';
        
        // Get available upgrades
        const availableUpgrades = Object.entries(GameData.UPGRADES)
            .filter(([upgradeId, upgrade]) => {
                return upgrade.unlocked && !gameState.upgrades[upgradeId]?.purchased;
            })
            .sort((a, b) => a[1].cost - b[1].cost);
        
        availableUpgrades.forEach(([upgradeId, upgrade]) => {
            const upgradeElement = this.createUpgradeElement(upgradeId, upgrade);
            this.elements.upgradesList.appendChild(upgradeElement);
        });
        
        if (availableUpgrades.length === 0) {
            const noUpgrades = GameUtils.createElement('div', 'no-content', {}, 
                'No hay mejoras disponibles en este momento');
            this.elements.upgradesList.appendChild(noUpgrades);
        }
    }
    
    createUpgradeElement(upgradeId, upgrade) {
        const canAfford = this.game.canAffordUpgrade(upgradeId);
        
        const upgradeElement = GameUtils.createElement('div', 'upgrade-item');
        
        const upgradeInfo = GameUtils.createElement('div', 'upgrade-info');
        
        const upgradeName = GameUtils.createElement('div', 'upgrade-name');
        upgradeName.innerHTML = `${upgrade.icon} ${upgrade.name}`;
        
        const upgradeDescription = GameUtils.createElement('div', 'upgrade-description', {}, upgrade.description);
        
        upgradeInfo.appendChild(upgradeName);
        upgradeInfo.appendChild(upgradeDescription);
        
        const buyButton = GameUtils.createElement('button', ['upgrade-buy-btn'], {}, 
            GameUtils.formatCurrency(upgrade.cost));
        
        if (!canAfford) {
            buyButton.disabled = true;
        }
        
        buyButton.addEventListener('click', () => {
            if (canAfford) {
                this.game.buyUpgrade(upgradeId);
            }
        });
        
        upgradeElement.appendChild(upgradeInfo);
        upgradeElement.appendChild(buyButton);
        
        return upgradeElement;
    }
    
    updateResearchTab(gameState) {
        // This will be implemented when research system is added
        if (!this.elements.techTree) return;
        
        const activeBranch = document.querySelector('.branch-btn.active')?.dataset.branch || 'biology';
        const branch = GameData.TECHNOLOGY_TREE[activeBranch];
        
        if (!branch) return;
        
        this.elements.techTree.innerHTML = '';
        
        Object.entries(branch.technologies).forEach(([techId, tech]) => {
            const techData = gameState.technologies[techId];
            const techElement = this.createTechElement(techId, tech, techData);
            this.elements.techTree.appendChild(techElement);
        });
    }
    
    createTechElement(techId, tech, techData) {
        const classes = ['tech-item'];
        
        if (techData.researched) {
            classes.push('researched');
        } else if (!techData.unlocked) {
            classes.push('locked');
        }
        
        const techElement = GameUtils.createElement('div', classes);
        
        const techIcon = GameUtils.createElement('div', 'tech-icon', {}, tech.icon);
        const techName = GameUtils.createElement('div', 'tech-name', {}, tech.name);
        const techDescription = GameUtils.createElement('div', 'tech-description', {}, tech.description);
        
        const costText = Object.entries(tech.cost)
            .map(([resource, amount]) => `${GameUtils.formatNumber(amount)} ${resource}`)
            .join(', ');
        const techCost = GameUtils.createElement('div', 'tech-cost', {}, costText);
        
        techElement.appendChild(techIcon);
        techElement.appendChild(techName);
        techElement.appendChild(techDescription);
        techElement.appendChild(techCost);
        
        // Add click handler for research
        if (techData.unlocked && !techData.researched) {
            techElement.addEventListener('click', () => {
                this.startResearch(techId);
            });
        }
        
        return techElement;
    }
    
    updateAchievementsTab(gameState) {
        if (!this.elements.achievementsList) return;
        
        const activeFilter = document.querySelector('.achievement-filter.active')?.dataset.filter || 'all';
        
        this.elements.achievementsList.innerHTML = '';
        
        const filteredAchievements = Object.entries(GameData.ACHIEVEMENTS)
            .filter(([achievementId, achievement]) => {
                if (activeFilter === 'all') return true;
                return achievement.category === activeFilter;
            })
            .sort((a, b) => {
                const aCompleted = gameState.achievements[a[0]]?.completed || false;
                const bCompleted = gameState.achievements[b[0]]?.completed || false;
                
                if (aCompleted && !bCompleted) return 1;
                if (!aCompleted && bCompleted) return -1;
                return 0;
            });
        
        filteredAchievements.forEach(([achievementId, achievement]) => {
            const achievementData = gameState.achievements[achievementId];
            const achievementElement = this.createAchievementElement(achievementId, achievement, achievementData);
            this.elements.achievementsList.appendChild(achievementElement);
        });
    }
    
    createAchievementElement(achievementId, achievement, achievementData) {
        const isCompleted = achievementData?.completed || false;
        const classes = ['achievement-item'];
        
        if (isCompleted) {
            classes.push('completed');
        }
        
        const achievementElement = GameUtils.createElement('div', classes);
        
        const achievementIcon = GameUtils.createElement('div', 'achievement-icon', {}, achievement.icon);
        
        const achievementInfo = GameUtils.createElement('div', 'achievement-info');
        
        const achievementName = GameUtils.createElement('div', 'achievement-name', {}, achievement.name);
        const achievementDescription = GameUtils.createElement('div', 'achievement-description', {}, achievement.description);
        
        achievementInfo.appendChild(achievementName);
        achievementInfo.appendChild(achievementDescription);
        
        // Progress bar for incomplete achievements
        if (!isCompleted) {
            const progress = this.calculateAchievementProgress(achievement, this.game.getGameState());
            const progressBar = GameUtils.createElement('div', 'achievement-progress');
            const progressFill = GameUtils.createElement('div', 'achievement-progress-bar');
            progressFill.style.width = `${progress * 100}%`;
            progressBar.appendChild(progressFill);
            achievementInfo.appendChild(progressBar);
        }
        
        achievementElement.appendChild(achievementIcon);
        achievementElement.appendChild(achievementInfo);
        
        return achievementElement;
    }
    
    calculateAchievementProgress(achievement, gameState) {
        const condition = achievement.condition;
        
        switch (condition.type) {
            case 'clicks':
                return Math.min(gameState.stats.totalClicks / condition.value, 1);
            case 'total_credits':
                return Math.min(gameState.stats.totalCreditsEarned / condition.value, 1);
            case 'units_owned':
                const totalUnits = Object.values(gameState.units)
                    .reduce((sum, unit) => sum + unit.owned, 0);
                return Math.min(totalUnits / condition.value, 1);
            default:
                return 0;
        }
    }
    
    updatePrestigeTab(gameState) {
        if (!this.elements.prestige || !this.game.prestigeSystem) return;
        
        // Limpiar contenido existente
        const prestigeContainer = document.querySelector('.prestige-options');
        if (!prestigeContainer) return;
        
        prestigeContainer.innerHTML = '';
        
        // Obtener información de prestigio
        const prestigeInfo = this.game.prestigeSystem.getAllPrestigeInfo();
        const currencies = this.game.prestigeSystem.getPrestigeCurrencies();
        
        // Mostrar monedas de prestigio disponibles
        const currencyDisplay = GameUtils.createElement('div', 'prestige-currencies');
        currencyDisplay.innerHTML = `
            <h4>💰 Monedas de Prestigio</h4>
            <div class="currency-grid">
                <div class="prestige-currency">
                    <span class="currency-icon">⏰</span>
                    <span class="currency-amount">${GameUtils.formatNumber(currencies.temporal_essence)}</span>
                    <span class="currency-label">Esencia Temporal</span>
                </div>
                <div class="prestige-currency">
                    <span class="currency-icon">🌌</span>
                    <span class="currency-amount">${GameUtils.formatNumber(currencies.stellar_fragments)}</span>
                    <span class="currency-label">Fragmentos Estelares</span>
                </div>
                <div class="prestige-currency">
                    <span class="currency-icon">🧬</span>
                    <span class="currency-amount">${GameUtils.formatNumber(currencies.primordial_sequences)}</span>
                    <span class="currency-label">Secuencias Primordiales</span>
                </div>
                <div class="prestige-currency">
                    <span class="currency-icon">💰</span>
                    <span class="currency-amount">${GameUtils.formatNumber(currencies.cosmic_bonds)}</span>
                    <span class="currency-label">Bonos Cósmicos</span>
                </div>
            </div>
        `;
        prestigeContainer.appendChild(currencyDisplay);
        
        // Mostrar opciones de prestigio
        prestigeInfo.forEach(prestige => {
            const prestigeElement = this.createPrestigeElement(prestige);
            prestigeContainer.appendChild(prestigeElement);
        });
        
        // Mostrar árbol de prestigio global si hay monedas
        const totalCurrencies = Object.values(currencies).reduce((sum, val) => sum + val, 0);
        if (totalCurrencies > 0) {
            this.addGlobalPrestigeTree(prestigeContainer);
        }
    }
    
    createPrestigeElement(prestige) {
        const prestigeElement = GameUtils.createElement('div', ['prestige-type', prestige.available ? 'available' : 'locked']);
        
        const header = GameUtils.createElement('div', 'prestige-header');
        header.innerHTML = `
            <h4>${prestige.icon} ${prestige.name}</h4>
            <span class="prestige-level">Nivel ${prestige.currentLevel}</span>
        `;
        
        const description = GameUtils.createElement('p', 'prestige-description', {}, prestige.description);
        
        const rewards = GameUtils.createElement('div', 'prestige-rewards');
        if (prestige.available && prestige.nextRewards) {
            const rewardsList = Object.entries(prestige.nextRewards)
                .filter(([key, value]) => typeof value === 'number' && value > 0)
                .map(([key, value]) => {
                    const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    return `<li>${formattedKey}: ${GameUtils.formatNumber(value)}</li>`;
                })
                .join('');
            
            if (rewardsList) {
                rewards.innerHTML = `
                    <h5>Próximas Recompensas:</h5>
                    <ul>${rewardsList}</ul>
                `;
            }
        }
        
        const button = GameUtils.createElement('button', ['prestige-btn'], {}, 
            prestige.available ? `Realizar Prestigio` : this.getPrestigeRequirementText(prestige));
        
        if (prestige.available) {
            button.addEventListener('click', () => {
                this.performPrestige(prestige.type);
            });
        } else {
            button.disabled = true;
        }
        
        prestigeElement.appendChild(header);
        prestigeElement.appendChild(description);
        prestigeElement.appendChild(rewards);
        prestigeElement.appendChild(button);
        
        return prestigeElement;
    }
    
    getPrestigeRequirementText(prestige) {
        switch (prestige.type) {
            case 'temporal':
                return 'Requiere Era 12 o 1e50 créditos';
            case 'spatial':
                return 'Requiere 10 planetas o Era 10';
            case 'genetic':
                return 'Requiere biotecnología completa';
            case 'economic':
                return 'Requiere 75% control de mercado';
            default:
                return 'Requisitos no cumplidos';
        }
    }
    
    addGlobalPrestigeTree(container) {
        const treeHeader = GameUtils.createElement('h4', 'global-prestige-header', {}, '🌟 Árbol de Prestigio Global');
        container.appendChild(treeHeader);
        
        const treeInfo = this.game.prestigeSystem.getGlobalPrestigeTreeInfo();
        const treeContainer = GameUtils.createElement('div', 'global-prestige-tree');
        
        treeInfo.forEach(node => {
            const nodeElement = this.createGlobalPrestigeNode(node);
            treeContainer.appendChild(nodeElement);
        });
        
        container.appendChild(treeContainer);
    }
    
    createGlobalPrestigeNode(node) {
        const nodeElement = GameUtils.createElement('div', 
            ['global-prestige-node', node.canAfford ? 'affordable' : 'locked']);
        
        const header = GameUtils.createElement('div', 'node-header');
        header.innerHTML = `
            <h5>${node.name}</h5>
            <span class="node-level">${node.currentLevel}/${node.maxLevel}</span>
        `;
        
        const description = GameUtils.createElement('p', 'node-description', {}, node.description);
        
        const cost = GameUtils.createElement('div', 'node-cost');
        const costText = Object.entries(node.cost)
            .map(([currency, amount]) => {
                const formattedCurrency = currency.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                return `${GameUtils.formatNumber(amount)} ${formattedCurrency}`;
            })
            .join(', ');
        cost.textContent = `Costo: ${costText}`;
        
        const button = GameUtils.createElement('button', ['node-buy-btn'], {}, 
            node.currentLevel >= node.maxLevel ? 'Máximo' : 'Mejorar');
        
        if (node.canAfford && node.currentLevel < node.maxLevel) {
            button.addEventListener('click', () => {
                this.purchaseGlobalPrestigeNode(node.id);
            });
        } else {
            button.disabled = true;
        }
        
        nodeElement.appendChild(header);
        nodeElement.appendChild(description);
        nodeElement.appendChild(cost);
        nodeElement.appendChild(button);
        
        return nodeElement;
    }
    
    performPrestige(type) {
        if (this.game.prestigeSystem.performPrestige(type)) {
            // Actualizar toda la UI después del prestigio
            setTimeout(() => {
                this.updateUI();
            }, 500);
        }
    }
    
    purchaseGlobalPrestigeNode(nodeId) {
        if (this.game.prestigeSystem.purchaseGlobalPrestigeNode(nodeId)) {
            // Actualizar la pestaña de prestigio
            this.updatePrestigeTab(this.game.getGameState());
        }
    }
    
    // ==========================================
    // NAVEGACIÓN DE PESTAÑAS
    // ==========================================
    
    switchTab(tabName) {
        this.activeTab = tabName;
        
        // Update tab buttons
        this.elements.tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        // Update tab panels
        this.elements.tabPanels.forEach(panel => {
            panel.classList.toggle('active', panel.id === `${tabName}-tab`);
        });
        
        // Force immediate update of the active tab
        this.updateActiveTabContent(this.game.getGameState());
    }
    
    switchResearchBranch(branchName) {
        this.elements.branchButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.branch === branchName);
        });
        
        // Update research content
        this.updateResearchTab(this.game.getGameState());
    }
    
    switchAchievementFilter(filterName) {
        this.elements.achievementFilters.forEach(filter => {
            filter.classList.toggle('active', filter.dataset.filter === filterName);
        });
        
        // Update achievements content
        this.updateAchievementsTab(this.game.getGameState());
    }
    
    // ==========================================
    // EVENTOS DE INTERACCIÓN
    // ==========================================
    
    handleMainClick(event) {
        const rect = this.elements.mainClickBtn.getBoundingClientRect();
        const x = event.clientX;
        const y = event.clientY;
        
        this.game.performClick(x, y);
    }
    
    handleKeyboardShortcuts(event) {
        // Tab shortcuts
        if (event.ctrlKey || event.metaKey) {
            switch (event.key) {
                case '1':
                    this.switchTab('units');
                    event.preventDefault();
                    break;
                case '2':
                    this.switchTab('upgrades');
                    event.preventDefault();
                    break;
                case '3':
                    this.switchTab('research');
                    event.preventDefault();
                    break;
                case '4':
                    this.switchTab('achievements');
                    event.preventDefault();
                    break;
                case 's':
                    this.game.saveGame();
                    event.preventDefault();
                    break;
            }
        }
        
        // Spacebar for clicking
        if (event.code === 'Space') {
            event.preventDefault();
            this.game.performClick();
        }
    }
    
    // ==========================================
    // SISTEMA DE INVESTIGACIÓN
    // ==========================================
    
    startResearch(techId) {
        // This will be implemented when research system is added
        GameUtils.showNotification("Sistema de investigación en desarrollo", "warning");
    }
    
    // ==========================================
    // CANVAS DE LA GRANJA
    // ==========================================
    
    drawFarm() {
        if (!this.farmContext) return;
        
        const ctx = this.farmContext;
        const canvas = this.elements.farmCanvas;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#4a6741');
        gradient.addColorStop(1, '#2a3a1a');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw simple farm elements based on owned units
        this.drawFarmElements();
    }
    
    drawFarmElements() {
        const gameState = this.game.getGameState();
        const ctx = this.farmContext;
        const canvas = this.elements.farmCanvas;
        
        let xOffset = 20;
        let yOffset = canvas.height - 60;
        
        // Draw units as simple shapes
        Object.entries(gameState.units).forEach(([unitId, unitData]) => {
            if (unitData.owned > 0) {
                const unitConfig = GameData.PRODUCTION_UNITS[unitId];
                this.drawUnitOnFarm(ctx, unitConfig, unitData.owned, xOffset, yOffset);
                xOffset += 40;
                
                if (xOffset > canvas.width - 40) {
                    xOffset = 20;
                    yOffset -= 40;
                }
            }
        });
        
        // Draw some decorative elements
        this.drawDecorations(ctx, canvas);
    }
    
    drawUnitOnFarm(ctx, unitConfig, count, x, y) {
        // Draw a simple representation of the unit
        ctx.save();
        
        // Background circle
        ctx.fillStyle = '#3a4a2a';
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Unit icon (simplified)
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(unitConfig.icon, x, y);
        
        // Count badge
        if (count > 1) {
            ctx.fillStyle = '#00ff88';
            ctx.font = '10px sans-serif';
            ctx.fillText(count.toString(), x + 12, y - 12);
        }
        
        ctx.restore();
    }
    
    drawDecorations(ctx, canvas) {
        // Draw some grass
        ctx.strokeStyle = '#2a4a2a';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * canvas.width;
            const y = canvas.height - Math.random() * 20;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - 5);
            ctx.stroke();
        }
    }
    
    // ==========================================
    // SISTEMA DE MODALES
    // ==========================================
    
    showEventModal(event) {
        if (!this.elements.eventModal) return;
        
        this.elements.eventTitle.textContent = event.name;
        this.elements.eventDescription.textContent = event.description;
        
        // Clear existing actions
        this.elements.eventActions.innerHTML = '';
        
        // Add action buttons
        event.playerActions.forEach(action => {
            const button = GameUtils.createElement('button', 'event-action-btn', {}, action.name);
            
            button.addEventListener('click', () => {
                this.handleEventAction(event, action);
                this.hideEventModal();
            });
            
            this.elements.eventActions.appendChild(button);
        });
        
        // Add close button
        const closeButton = GameUtils.createElement('button', 'event-close-btn', {}, 'Cerrar');
        closeButton.addEventListener('click', () => {
            this.hideEventModal();
        });
        this.elements.eventActions.appendChild(closeButton);
        
        // Show modal
        this.elements.eventModal.classList.remove('hidden');
    }
    
    hideEventModal() {
        if (this.elements.eventModal) {
            this.elements.eventModal.classList.add('hidden');
        }
    }
    
    handleEventAction(event, action) {
        // Check if player can afford the action
        const gameState = this.game.getGameState();
        
        if (action.cost) {
            const canAfford = Object.entries(action.cost).every(([resource, amount]) => {
                return gameState.resources[resource] >= amount;
            });
            
            if (!canAfford) {
                GameUtils.showNotification("No tienes suficientes recursos", "error");
                return;
            }
            
            // Deduct costs
            Object.entries(action.cost).forEach(([resource, amount]) => {
                gameState.resources[resource] -= amount;
            });
        }
        
        // Apply effects
        if (action.effect) {
            // This would be implemented based on specific effects
            GameUtils.showNotification(`Acción ejecutada: ${action.name}`, "success");
        }
    }
    
    // ==========================================
    // IMPORTAR/EXPORTAR DATOS
    // ==========================================
    
    exportGameData() {
        const encodedData = this.game.exportSave();
        
        if (encodedData) {
            // Create a text area for the user to copy
            const textArea = document.createElement('textarea');
            textArea.value = encodedData;
            textArea.style.position = 'fixed';
            textArea.style.top = '50%';
            textArea.style.left = '50%';
            textArea.style.transform = 'translate(-50%, -50%)';
            textArea.style.width = '400px';
            textArea.style.height = '200px';
            textArea.style.zIndex = '9999';
            textArea.style.background = '#1a1a1a';
            textArea.style.color = '#ffffff';
            textArea.style.border = '2px solid #00ff88';
            textArea.style.padding = '10px';
            
            document.body.appendChild(textArea);
            textArea.select();
            
            // Auto-remove after 10 seconds
            setTimeout(() => {
                if (textArea.parentNode) {
                    textArea.parentNode.removeChild(textArea);
                }
            }, 10000);
            
            GameUtils.showNotification("Datos de guardado copiados. Guárdalos en un lugar seguro.", "success");
        }
    }
    
    importGameData() {
        const data = prompt("Introduce los datos de guardado exportados:");
        
        if (data) {
            const success = this.game.importSave(data);
            
            if (success) {
                // Refresh UI
                this.updateUI();
            }
        }
    }
    
    // ==========================================
    // DESTRUCTOR
    // ==========================================
    
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        // Remove event listeners if needed
        // (Most modern browsers handle this automatically)
    }
}

// Make UI accessible globally
window.GameUI = GameUI;