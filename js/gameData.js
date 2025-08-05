/**
 * AGRO-EMPIRE: DATOS DEL JUEGO
 * Configuraciones, unidades, tecnologías y contenido del juego
 */

// ==========================================
// CONFIGURACIÓN DE ERAS
// ==========================================

const ERAS = {
    1: {
        id: 1,
        name: "Granja Familiar",
        description: "Comienza tu imperio agrícola con una pequeña parcela familiar",
        minLevel: 1,
        maxLevel: 10,
        requiredCredits: 0,
        theme: "rural",
        backgroundGradient: "linear-gradient(135deg, #2a4a2a, #1a3a1a)",
        mainResource: "credits",
        nextEra: 2
    },
    2: {
        id: 2,
        name: "Cooperativa Regional",
        description: "Expande tu operación y forma alianzas con granjas vecinas",
        minLevel: 11,
        maxLevel: 25,
        requiredCredits: 100000,
        theme: "cooperative",
        backgroundGradient: "linear-gradient(135deg, #2a3a4a, #1a2a3a)",
        mainResource: "credits",
        nextEra: 3
    },
    3: {
        id: 3,
        name: "Corporación Estatal",
        description: "Domina el mercado regional y expande a múltiples estados",
        minLevel: 26,
        maxLevel: 45,
        requiredCredits: 10000000,
        theme: "corporate",
        backgroundGradient: "linear-gradient(135deg, #3a3a4a, #2a2a3a)",
        mainResource: "credits",
        nextEra: 4
    },
    4: {
        id: 4,
        name: "Conglomerado Nacional",
        description: "Control nacional del mercado alimentario",
        minLevel: 46,
        maxLevel: 70,
        requiredCredits: 1000000000,
        theme: "national",
        backgroundGradient: "linear-gradient(135deg, #4a3a2a, #3a2a1a)",
        mainResource: "credits",
        nextEra: 5
    },
    5: {
        id: 5,
        name: "Multinacional Global",
        description: "Presencia en todos los continentes del planeta",
        minLevel: 71,
        maxLevel: 100,
        requiredCredits: 100000000000,
        theme: "global",
        backgroundGradient: "linear-gradient(135deg, #2a4a5a, #1a3a4a)",
        mainResource: "credits",
        nextEra: 6
    }
};

// ==========================================
// UNIDADES DE PRODUCCIÓN
// ==========================================

const PRODUCTION_UNITS = {
    // ERA 1: GRANJA FAMILIAR
    "chicken_coop": {
        id: "chicken_coop",
        name: "Gallinero Autónomo",
        description: "Gallinas que producen huevos automáticamente",
        icon: "🐔",
        era: 1,
        tier: 1,
        baseCost: 100,
        baseProduction: 5, // créditos/segundo
        costMultiplier: 1.15,
        unlocked: true,
        resourceType: "credits",
        buildTime: 0,
        maxOwned: -1, // -1 = ilimitado
        requirements: {}
    },
    "electric_tractor": {
        id: "electric_tractor",
        name: "Tractor Eléctrico",
        description: "Automatiza la siembra y cosecha básica",
        icon: "🚜",
        era: 1,
        tier: 1,
        baseCost: 500,
        baseProduction: 25,
        costMultiplier: 1.15,
        unlocked: true,
        resourceType: "credits",
        buildTime: 0,
        maxOwned: -1,
        requirements: {}
    },
    "hydroponic_greenhouse": {
        id: "hydroponic_greenhouse",
        name: "Invernadero Hidropónico",
        description: "Cultivo intensivo sin tierra, produce constantemente",
        icon: "🏠",
        era: 1,
        tier: 1,
        baseCost: 2500,
        baseProduction: 150,
        costMultiplier: 1.15,
        unlocked: false,
        resourceType: "credits",
        buildTime: 0,
        maxOwned: -1,
        requirements: {
            level: 3
        }
    },
    
    // ERA 2: COOPERATIVA REGIONAL
    "microbial_bioreactor": {
        id: "microbial_bioreactor",
        name: "Biorreactor Microbiano",
        description: "Cultiva microorganismos para alimento y combustible",
        icon: "🧪",
        era: 2,
        tier: 2,
        baseCost: 12500,
        baseProduction: 800,
        costMultiplier: 1.18,
        unlocked: false,
        resourceType: "credits",
        buildTime: 0,
        maxOwned: -1,
        requirements: {
            era: 2,
            technology: "basic_biotech"
        },
        produces: {
            credits: 800,
            biomass: 50
        }
    },
    "pollinator_drone_swarm": {
        id: "pollinator_drone_swarm",
        name: "Enjambre de Drones Polinizadores",
        description: "Drones que optimizan la polinización de todos los cultivos",
        icon: "🤖",
        era: 2,
        tier: 2,
        baseCost: 25000,
        baseProduction: 2000,
        costMultiplier: 1.18,
        unlocked: false,
        resourceType: "credits",
        buildTime: 0,
        maxOwned: -1,
        requirements: {
            era: 2,
            technology: "drone_automation"
        },
        synergyBonus: {
            type: "all_plants",
            multiplier: 1.25
        }
    },
    "genetic_lab": {
        id: "genetic_lab",
        name: "Laboratorio Genético",
        description: "Investiga y desarrolla nuevas variedades de cultivos",
        icon: "🔬",
        era: 2,
        tier: 2,
        baseCost: 50000,
        baseProduction: 5000,
        costMultiplier: 1.20,
        unlocked: false,
        resourceType: "credits",
        buildTime: 0,
        maxOwned: -1,
        requirements: {
            era: 2,
            technology: "genetic_engineering"
        },
        produces: {
            credits: 5000,
            knowledge: 25
        }
    },
    
    // ERA 3: CORPORACIÓN ESTATAL
    "agro_industrial_complex": {
        id: "agro_industrial_complex",
        name: "Complejo Agroindustrial",
        description: "Procesamiento completo desde semilla hasta producto final",
        icon: "🏭",
        era: 3,
        tier: 3,
        baseCost: 250000,
        baseProduction: 25000,
        costMultiplier: 1.22,
        unlocked: false,
        resourceType: "credits",
        buildTime: 0,
        maxOwned: -1,
        requirements: {
            era: 3,
            technology: "industrial_automation"
        },
        produces: {
            credits: 25000,
            biomass: 500,
            energy: 100
        }
    },
    "orbital_research_station": {
        id: "orbital_research_station",
        name: "Estación de Investigación Orbital",
        description: "Laboratorio espacial para agricultura de gravedad cero",
        icon: "🛰️",
        era: 3,
        tier: 3,
        baseCost: 1000000,
        baseProduction: 100000,
        costMultiplier: 1.25,
        unlocked: false,
        resourceType: "credits",
        buildTime: 300, // 5 minutos
        maxOwned: 10,
        requirements: {
            era: 3,
            technology: "space_agriculture"
        },
        produces: {
            credits: 100000,
            knowledge: 500,
            energy: 250
        }
    },
    "regional_climate_manipulator": {
        id: "regional_climate_manipulator",
        name: "Manipulador Climático Regional",
        description: "Controla el clima de regiones enteras para optimizar cultivos",
        icon: "🌦️",
        era: 3,
        tier: 3,
        baseCost: 2500000,
        baseProduction: 500000,
        costMultiplier: 1.30,
        unlocked: false,
        resourceType: "credits",
        buildTime: 600, // 10 minutos
        maxOwned: 5,
        requirements: {
            era: 3,
            technology: "weather_control"
        },
        produces: {
            credits: 500000,
            energy: 1000
        },
        globalEffect: {
            type: "all_production",
            multiplier: 1.15
        }
    }
};

// ==========================================
// MEJORAS (UPGRADES)
// ==========================================

const UPGRADES = {
    // Mejoras de clic
    "better_tools": {
        id: "better_tools",
        name: "Herramientas Mejoradas",
        description: "Duplica la eficiencia de cada clic manual",
        icon: "🔨",
        cost: 1000,
        effect: {
            type: "click_multiplier",
            value: 2
        },
        oneTime: true,
        unlocked: true,
        requirements: {
            totalClicks: 100
        }
    },
    "precision_farming": {
        id: "precision_farming",
        name: "Agricultura de Precisión",
        description: "+50% eficiencia a todas las unidades básicas",
        icon: "🎯",
        cost: 5000,
        effect: {
            type: "unit_multiplier",
            target: "tier_1",
            value: 1.5
        },
        oneTime: true,
        unlocked: false,
        requirements: {
            era: 1,
            unitsOwned: 10
        }
    },
    "automation_protocols": {
        id: "automation_protocols",
        name: "Protocolos de Automatización",
        description: "Reduce el costo de todas las unidades en 10%",
        icon: "⚙️",
        cost: 25000,
        effect: {
            type: "cost_reduction",
            target: "all",
            value: 0.9
        },
        oneTime: true,
        unlocked: false,
        requirements: {
            era: 2,
            technology: "basic_automation"
        }
    },
    "synergy_optimization": {
        id: "synergy_optimization",
        name: "Optimización de Sinergias",
        description: "Las unidades de la misma era se benefician mutuamente (+25%)",
        icon: "🔗",
        cost: 100000,
        effect: {
            type: "era_synergy",
            value: 1.25
        },
        oneTime: true,
        unlocked: false,
        requirements: {
            era: 2,
            unitsOwned: 50
        }
    },
    "quantum_efficiency": {
        id: "quantum_efficiency",
        name: "Eficiencia Cuántica",
        description: "Cada 10 unidades de cualquier tipo otorgan +5% producción global",
        icon: "⚛️",
        cost: 1000000,
        effect: {
            type: "mass_production_bonus",
            value: 0.05,
            per: 10
        },
        oneTime: true,
        unlocked: false,
        requirements: {
            era: 3,
            technology: "quantum_computing"
        }
    }
};

// ==========================================
// ÁRBOL DE TECNOLOGÍAS
// ==========================================

const TECHNOLOGY_TREE = {
    // RAMA BIOLÓGICA
    biology: {
        name: "🧬 Biología",
        description: "Tecnologías relacionadas con la vida y los organismos",
        technologies: {
            "basic_genetics": {
                id: "basic_genetics",
                name: "Genética Básica",
                description: "Comprende los fundamentos de la herencia genética",
                icon: "🧬",
                cost: { knowledge: 100 },
                researchTime: 30,
                unlocked: true,
                unlocks: ["genetic_engineering", "selective_breeding"],
                effects: {
                    cropYieldBonus: 1.1
                }
            },
            "genetic_engineering": {
                id: "genetic_engineering",
                name: "Ingeniería Genética",
                description: "Modifica organismos a nivel genético",
                icon: "🔬",
                cost: { knowledge: 500, credits: 50000 },
                researchTime: 120,
                unlocked: false,
                prerequisites: ["basic_genetics"],
                unlocks: ["synthetic_biology", "designer_crops"],
                effects: {
                    unlocksUnits: ["genetic_lab"],
                    cropVarietyBonus: 1.25
                }
            },
            "synthetic_biology": {
                id: "synthetic_biology",
                name: "Biología Sintética",
                description: "Crea organismos completamente artificiales",
                icon: "🧪",
                cost: { knowledge: 2000, credits: 500000, energy: 1000 },
                researchTime: 300,
                unlocked: false,
                prerequisites: ["genetic_engineering"],
                unlocks: ["artificial_life"],
                effects: {
                    bioReactorEfficiency: 2.0,
                    newResourceType: "synthetic_organisms"
                }
            },
            "selective_breeding": {
                id: "selective_breeding",
                name: "Cría Selectiva",
                description: "Mejora organismos mediante selección dirigida",
                icon: "🐄",
                cost: { knowledge: 200, credits: 10000 },
                researchTime: 60,
                unlocked: false,
                prerequisites: ["basic_genetics"],
                unlocks: ["animal_husbandry_advanced"],
                effects: {
                    animalProductionBonus: 1.3,
                    breedingTimeReduction: 0.7
                }
            }
        }
    },
    
    // RAMA TECNOLÓGICA
    technology: {
        name: "🤖 Tecnología",
        description: "Automatización, inteligencia artificial y sistemas avanzados",
        technologies: {
            "basic_automation": {
                id: "basic_automation",
                name: "Automatización Básica",
                description: "Sistemas simples de control automático",
                icon: "⚙️",
                cost: { knowledge: 150 },
                researchTime: 45,
                unlocked: true,
                unlocks: ["drone_automation", "ai_assistance"],
                effects: {
                    automationEfficiency: 1.15,
                    maintenanceCostReduction: 0.9
                }
            },
            "drone_automation": {
                id: "drone_automation",
                name: "Automatización con Drones",
                description: "Drones para tareas agrícolas complejas",
                icon: "🛸",
                cost: { knowledge: 750, credits: 75000 },
                researchTime: 180,
                unlocked: false,
                prerequisites: ["basic_automation"],
                unlocks: ["swarm_intelligence"],
                effects: {
                    unlocksUnits: ["pollinator_drone_swarm"],
                    fieldCoverageBonus: 1.5
                }
            },
            "ai_assistance": {
                id: "ai_assistance",
                name: "Asistencia por IA",
                description: "Inteligencia artificial para optimización agrícola",
                icon: "🧠",
                cost: { knowledge: 1000, credits: 100000 },
                researchTime: 240,
                unlocked: false,
                prerequisites: ["basic_automation"],
                unlocks: ["machine_learning_agriculture"],
                effects: {
                    decisionOptimization: 1.25,
                    predictiveAnalytics: true
                }
            },
            "quantum_computing": {
                id: "quantum_computing",
                name: "Computación Cuántica",
                description: "Procesamientos de datos imposibles para computadoras clásicas",
                icon: "⚛️",
                cost: { knowledge: 5000, credits: 2000000, energy: 5000 },
                researchTime: 600,
                unlocked: false,
                prerequisites: ["ai_assistance", "advanced_physics"],
                unlocks: ["quantum_agriculture"],
                effects: {
                    computationalPowerMultiplier: 1000,
                    enablesQuantumEffects: true
                }
            }
        }
    },
    
    // RAMA ESPACIAL
    space: {
        name: "🚀 Espacial",
        description: "Tecnologías para la expansión más allá de la Tierra",
        technologies: {
            "space_agriculture": {
                id: "space_agriculture",
                name: "Agricultura Espacial",
                description: "Cultivos en gravedad cero y ambientes extraterrestres",
                icon: "🛰️",
                cost: { knowledge: 1000, credits: 250000 },
                researchTime: 300,
                unlocked: false,
                prerequisites: ["basic_genetics", "basic_automation"],
                unlocks: ["orbital_farming", "martian_agriculture"],
                effects: {
                    unlocksUnits: ["orbital_research_station"],
                    spaceEnvironmentBonus: 1.3
                }
            },
            "orbital_farming": {
                id: "orbital_farming",
                name: "Agricultura Orbital",
                description: "Estaciones espaciales dedicadas a la producción alimentaria",
                icon: "🌌",
                cost: { knowledge: 3000, credits: 1000000, energy: 2000 },
                researchTime: 450,
                unlocked: false,
                prerequisites: ["space_agriculture"],
                unlocks: ["space_colonies"],
                effects: {
                    orbitalProductionMultiplier: 2.0,
                    unlocksSpaceUnits: true
                }
            },
            "martian_agriculture": {
                id: "martian_agriculture",
                name: "Agricultura Marciana",
                description: "Adaptación de cultivos para el ambiente de Marte",
                icon: "🔴",
                cost: { knowledge: 4000, credits: 1500000, energy: 3000 },
                researchTime: 600,
                unlocked: false,
                prerequisites: ["space_agriculture"],
                unlocks: ["planetary_terraforming"],
                effects: {
                    martianEnvironmentAdaptation: true,
                    extremeEnvironmentBonus: 1.5
                }
            }
        }
    },
    
    // RAMA ECONÓMICA
    economy: {
        name: "💼 Economía",
        description: "Sistemas financieros, comercio y optimización económica",
        technologies: {
            "market_analysis": {
                id: "market_analysis",
                name: "Análisis de Mercado",
                description: "Comprende las fluctuaciones del mercado agrícola",
                icon: "📊",
                cost: { knowledge: 300, credits: 25000 },
                researchTime: 90,
                unlocked: true,
                unlocks: ["futures_trading", "supply_chain_optimization"],
                effects: {
                    priceOptimizationBonus: 1.15,
                    marketPrediction: true
                }
            },
            "supply_chain_optimization": {
                id: "supply_chain_optimization",
                name: "Optimización de Cadena de Suministro",
                description: "Mejora la eficiencia de distribución",
                icon: "🚚",
                cost: { knowledge: 800, credits: 100000 },
                researchTime: 180,
                unlocked: false,
                prerequisites: ["market_analysis"],
                unlocks: ["global_logistics"],
                effects: {
                    distributionEfficiency: 1.25,
                    transportCostReduction: 0.8
                }
            },
            "futures_trading": {
                id: "futures_trading",
                name: "Comercio de Futuros",
                description: "Especula con precios futuros de commodities",
                icon: "📈",
                cost: { knowledge: 1200, credits: 200000 },
                researchTime: 240,
                unlocked: false,
                prerequisites: ["market_analysis"],
                unlocks: ["derivatives_market"],
                effects: {
                    tradingProfitMultiplier: 1.5,
                    priceVolatilityReduction: 0.8
                }
            }
        }
    }
};

// ==========================================
// SISTEMA DE LOGROS
// ==========================================

const ACHIEVEMENTS = {
    // Logros de Progresión
    "first_click": {
        id: "first_click",
        name: "Primer Paso",
        description: "Realiza tu primer clic",
        icon: "👆",
        category: "progress",
        condition: { type: "clicks", value: 1 },
        reward: { credits: 10 },
        completed: false
    },
    "hundred_clicks": {
        id: "hundred_clicks",
        name: "Trabajador Incansable",
        description: "Realiza 100 clics",
        icon: "💪",
        category: "progress",
        condition: { type: "clicks", value: 100 },
        reward: { credits: 500, clickMultiplier: 1.1 },
        completed: false
    },
    "first_unit": {
        id: "first_unit",
        name: "Automatización Inicial",
        description: "Compra tu primera unidad de producción",
        icon: "🏭",
        category: "progress",
        condition: { type: "units_owned", value: 1 },
        reward: { credits: 100 },
        completed: false
    },
    "millionaire": {
        id: "millionaire",
        name: "Millonario Agrícola",
        description: "Acumula 1 millón de créditos",
        icon: "💰",
        category: "progress",
        condition: { type: "total_credits", value: 1000000 },
        reward: { productionMultiplier: 1.05 },
        completed: false
    },
    "era_2_unlock": {
        id: "era_2_unlock",
        name: "Expansión Regional",
        description: "Desbloquea la Era 2: Cooperativa Regional",
        icon: "🌾",
        category: "progress",
        condition: { type: "era_reached", value: 2 },
        reward: { prestigePoints: 1 },
        completed: false
    },
    
    // Logros de Desafío
    "speed_buyer": {
        id: "speed_buyer",
        name: "Comprador Veloz",
        description: "Compra 10 unidades en menos de 10 segundos",
        icon: "⚡",
        category: "challenge",
        condition: { type: "rapid_purchases", count: 10, timeLimit: 10 },
        reward: { clickMultiplier: 1.2 },
        completed: false
    },
    "efficiency_master": {
        id: "efficiency_master",
        name: "Maestro de la Eficiencia",
        description: "Alcanza 90% de eficiencia en todas las unidades",
        icon: "⚙️",
        category: "challenge",
        condition: { type: "efficiency_threshold", value: 0.9 },
        reward: { efficiencyBonus: 1.1 },
        completed: false
    },
    "crisis_survivor": {
        id: "crisis_survivor",
        name: "Superviviente de Crisis",
        description: "Supera un evento de crisis sin pérdidas",
        icon: "🛡️",
        category: "challenge",
        condition: { type: "crisis_survived", perfect: true },
        reward: { resilienceBonus: 1.15 },
        completed: false
    },
    
    // Logros de Colección
    "tech_pioneer": {
        id: "tech_pioneer",
        name: "Pionero Tecnológico",
        description: "Investiga tu primera tecnología",
        icon: "🔬",
        category: "collection",
        condition: { type: "technologies_researched", value: 1 },
        reward: { knowledgeMultiplier: 1.1 },
        completed: false
    },
    "polymath": {
        id: "polymath",
        name: "Polímata",
        description: "Investiga tecnologías en todas las ramas",
        icon: "🧠",
        category: "collection",
        condition: { type: "tech_branches_explored", value: 4 },
        reward: { knowledgeMultiplier: 1.5 },
        completed: false
    },
    "unit_collector": {
        id: "unit_collector",
        name: "Coleccionista de Unidades",
        description: "Posee al menos una unidad de cada tipo disponible",
        icon: "📦",
        category: "collection",
        condition: { type: "unique_units_owned", percentage: 1.0 },
        reward: { synergyBonus: 1.25 },
        completed: false
    }
};

// ==========================================
// EVENTOS DINÁMICOS
// ==========================================

const DYNAMIC_EVENTS = {
    "global_drought": {
        id: "global_drought",
        name: "🌵 Sequía Global",
        description: "Una severa sequía afecta la producción mundial",
        type: "crisis",
        duration: 300, // 5 minutos
        probability: 0.05, // 5% por hora
        effects: {
            productionMultiplier: 0.7,
            waterCostIncrease: 2.0
        },
        playerActions: [
            {
                name: "Implementar Riego de Emergencia",
                cost: { credits: 100000, energy: 500 },
                effect: { productionMultiplier: 0.9 }
            },
            {
                name: "Investigar Cultivos Resistentes",
                cost: { knowledge: 1000 },
                effect: { futureResistance: "drought" }
            }
        ]
    },
    "alien_contact": {
        id: "alien_contact",
        name: "👽 Primer Contacto",
        description: "Una civilización alienígena ofrece intercambio tecnológico",
        type: "opportunity",
        duration: 600, // 10 minutos
        probability: 0.01, // 1% por hora en eras avanzadas
        requirements: { era: 5 },
        effects: {
            newTechAvailable: "alien_agriculture",
            tradeOpportunity: true
        },
        playerActions: [
            {
                name: "Aceptar Intercambio",
                cost: { credits: 10000000, knowledge: 5000 },
                effect: { 
                    unlocksUnits: ["alien_symbiont_farm"],
                    knowledgeMultiplier: 2.0 
                }
            },
            {
                name: "Rechazar Contacto",
                cost: {},
                effect: { humanityBonus: 1.1 }
            }
        ]
    },
    "market_boom": {
        id: "market_boom",
        name: "📈 Boom del Mercado",
        description: "Súbito aumento en la demanda de productos agrícolas",
        type: "opportunity",
        duration: 180, // 3 minutos
        probability: 0.1, // 10% por hora
        effects: {
            sellPriceMultiplier: 2.0,
            demandIncrease: 1.5
        },
        playerActions: [
            {
                name: "Vender Reservas",
                cost: {},
                effect: { instantCredits: "stored_products_value * 3" }
            },
            {
                name: "Aumentar Producción",
                cost: { energy: 1000 },
                effect: { temporaryProductionBoost: 2.0 }
            }
        ]
    }
};

// ==========================================
// CONFIGURACIÓN DE PRESTIGIO
// ==========================================

const PRESTIGE_SYSTEMS = {
    "temporal": {
        id: "temporal",
        name: "Semillas del Tiempo",
        description: "Reinicia con conocimiento temporal acumulado",
        icon: "⏰",
        currency: "temporal_essence",
        requirements: {
            era: 12,
            or: { totalCredits: 1e50 }
        },
        rewards: {
            globalSpeedBonus: 0.05, // +5% por prestigio
            techCostReduction: 0.02, // -2% por prestigio
            startingBonus: "era_knowledge"
        }
    },
    "spatial": {
        id: "spatial",
        name: "Expansión Cósmica",
        description: "Comienza en un nuevo tipo de planeta",
        icon: "🌌",
        currency: "stellar_fragments",
        requirements: {
            planetsColonized: 10,
            or: { era: 10 }
        },
        rewards: {
            planetTypes: ["ocean", "desert", "frozen", "volcanic", "nebula"],
            uniqueBonuses: true,
            crossPlanetTrade: true
        }
    },
    "genetic": {
        id: "genetic",
        name: "Evolución Dirigida",
        description: "Mejora genética permanente de organismos",
        icon: "🧬",
        currency: "primordial_sequences",
        requirements: {
            biotechComplete: true,
            or: { mythicSpeciesCreated: 1 }
        },
        rewards: {
            baseEfficiencyBonus: 0.1, // +10% por prestigio
            newSpeciesUnlock: true,
            hybridCreation: true
        }
    },
    "economic": {
        id: "economic",
        name: "Monopolio Universal",
        description: "Conexiones comerciales permanentes",
        icon: "💰",
        currency: "cosmic_bonds",
        requirements: {
            marketControlPercentage: 75,
            or: { totalWealth: 1e100 }
        },
        rewards: {
            tradeRouteBonus: 0.15, // +15% por prestigio
            permanentContracts: true,
            interdimensionalTrade: true
        }
    }
};

// ==========================================
// CONFIGURACIÓN INICIAL DEL JUEGO
// ==========================================

const INITIAL_GAME_STATE = {
    version: "1.0.0",
    player: {
        name: "",
        level: 1,
        experience: 0,
        currentEra: 1,
        totalPlaytime: 0,
        lastSave: Date.now()
    },
    resources: {
        credits: 0,
        biomass: 0,
        energy: 0,
        knowledge: 0,
        influence: 0
    },
    stats: {
        totalClicks: 0,
        totalCreditsEarned: 0,
        totalUnitsBuilt: 0,
        totalTechnologiesResearched: 0,
        totalAchievementsUnlocked: 0
    },
    units: {},
    upgrades: {},
    technologies: {},
    achievements: {},
    prestige: {
        temporal: { level: 0, currency: 0 },
        spatial: { level: 0, currency: 0 },
        genetic: { level: 0, currency: 0 },
        economic: { level: 0, currency: 0 }
    },
    settings: {
        autoSave: true,
        notifications: true,
        soundEnabled: true,
        musicEnabled: true,
        scientificNotation: false,
        theme: "dark"
    },
    activeEvents: [],
    unlockedContent: []
};

// Exportar datos del juego
window.GameData = {
    ERAS,
    PRODUCTION_UNITS,
    UPGRADES,
    TECHNOLOGY_TREE,
    ACHIEVEMENTS,
    DYNAMIC_EVENTS,
    PRESTIGE_SYSTEMS,
    INITIAL_GAME_STATE
};