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
    },
    
    // ERAS AVANZADAS 6-12
    6: {
        id: 6,
        name: "Pionero Oceánico",
        description: "Domina los océanos y explora las profundidades",
        minLevel: 101,
        maxLevel: 130,
        requiredCredits: 1e18,
        theme: "oceanic",
        backgroundGradient: "linear-gradient(135deg, #0077be, #004d7a)",
        mainResource: "marine_biomass",
        nextEra: 7
    },
    7: {
        id: 7,
        name: "Arquitecto Vertical",
        description: "Granjas verticales en megaciudades",
        minLevel: 131,
        maxLevel: 165,
        requiredCredits: 1e24,
        theme: "vertical",
        backgroundGradient: "linear-gradient(135deg, #c0392b, #8b2c1a)",
        mainResource: "urban_space",
        nextEra: 8
    },
    8: {
        id: 8,
        name: "Señor del Clima",
        description: "Manipulación climática global",
        minLevel: 166,
        maxLevel: 200,
        requiredCredits: 1e29,
        theme: "climate",
        backgroundGradient: "linear-gradient(135deg, #8e44ad, #663399)",
        mainResource: "atmospheric_control",
        nextEra: 9
    },
    9: {
        id: 9,
        name: "Bioingeniería Extrema",
        description: "Crear nuevas formas de vida",
        minLevel: 201,
        maxLevel: 240,
        requiredCredits: 1e34,
        theme: "bioengineering",
        backgroundGradient: "linear-gradient(135deg, #e74c3c, #c0392b)",
        mainResource: "synthetic_dna",
        nextEra: 10
    },
    10: {
        id: 10,
        name: "Conquistador Orbital",
        description: "Agricultura en estaciones espaciales",
        minLevel: 241,
        maxLevel: 285,
        requiredCredits: 1e39,
        theme: "orbital",
        backgroundGradient: "linear-gradient(135deg, #2c3e50, #1a252f)",
        mainResource: "space_materials",
        nextEra: 11
    },
    11: {
        id: 11,
        name: "Colonizador Planetario",
        description: "Terraformación y agricultura planetaria",
        minLevel: 286,
        maxLevel: 335,
        requiredCredits: 1e44,
        theme: "planetary",
        backgroundGradient: "linear-gradient(135deg, #d35400, #a04000)",
        mainResource: "terraforming_tech",
        nextEra: 12
    },
    12: {
        id: 12,
        name: "Emperador Galáctico",
        description: "Control de la agricultura galáctica",
        minLevel: 336,
        maxLevel: 400,
        requiredCredits: 1e49,
        theme: "galactic",
        backgroundGradient: "linear-gradient(135deg, #f39c12, #d68910)",
        mainResource: "stellar_energy",
        nextEra: null
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
    },
    
    // ==========================================
    // ERAS AVANZADAS 6-12: UNIDADES MEGA
    // ==========================================
    
    // ERA 6: PIONERO OCEÁNICO
    "aquaculture_complex": {
        id: "aquaculture_complex",
        name: "Complejo Acuícola Masivo",
        description: "Granjas marinas de escala industrial en plataformas flotantes",
        icon: "🏭",
        era: 6,
        tier: 4,
        baseCost: 1e12,
        baseProduction: 25000000,
        costMultiplier: 1.35,
        unlocked: false,
        resourceType: "credits",
        buildTime: 1800,
        maxOwned: 200,
        requirements: {
            era: 6,
            technology: "oceanic_engineering"
        },
        produces: {
            credits: 25000000,
            marine_biomass: 10000,
            knowledge: 5000
        }
    },
    "deep_sea_harvester": {
        id: "deep_sea_harvester",
        name: "Cosechador de Aguas Profundas",
        description: "Extrae recursos del fondo oceánico y cultiva especies abisales",
        icon: "🌊",
        era: 6,
        tier: 4,
        baseCost: 5e12,
        baseProduction: 125000000,
        costMultiplier: 1.40,
        unlocked: false,
        resourceType: "credits",
        buildTime: 3600,
        maxOwned: 50,
        requirements: {
            era: 6,
            unitsOwned: { aquaculture_complex: 25 }
        },
        produces: {
            credits: 125000000,
            marine_biomass: 50000,
            exotic_materials: 100
        }
    },
    
    // ERA 7: ARQUITECTO VERTICAL
    "vertical_farm_tower": {
        id: "vertical_farm_tower",
        name: "Torre de Cultivo Vertical",
        description: "Rascacielos agrícola de 100 pisos con sistemas hidropónicos avanzados",
        icon: "🏗️",
        era: 7,
        tier: 4,
        baseCost: 1e17,
        baseProduction: 625000000,
        costMultiplier: 1.45,
        unlocked: false,
        resourceType: "credits",
        buildTime: 7200,
        maxOwned: 100,
        requirements: {
            era: 7,
            technology: "megastructure_engineering"
        },
        produces: {
            credits: 625000000,
            urban_space: 25000,
            construction_materials: 1000
        }
    },
    "atmospheric_processor": {
        id: "atmospheric_processor",
        name: "Procesador Atmosférico",
        description: "Convierte CO2 urbano en oxígeno y nutrientes para las plantas",
        icon: "🌪️",
        era: 7,
        tier: 4,
        baseCost: 5e17,
        baseProduction: 3125000000,
        costMultiplier: 1.50,
        unlocked: false,
        resourceType: "credits",
        buildTime: 14400,
        maxOwned: 25,
        requirements: {
            era: 7,
            unitsOwned: { vertical_farm_tower: 50 }
        },
        produces: {
            credits: 3125000000,
            fusion_energy: 100000,
            atmospheric_control: 500
        }
    },
    
    // ERA 8: SEÑOR DEL CLIMA
    "global_weather_controller": {
        id: "global_weather_controller",
        name: "Controlador Climático Global",
        description: "Red de satélites que modifica patrones climáticos planetarios",
        icon: "⛈️",
        era: 8,
        tier: 5,
        baseCost: 1e22,
        baseProduction: 15625000000,
        costMultiplier: 1.55,
        unlocked: false,
        resourceType: "credits",
        buildTime: 28800,
        maxOwned: 50,
        requirements: {
            era: 8,
            technology: "planetary_climate_control"
        },
        produces: {
            credits: 15625000000,
            climate_technology: 50000,
            satellite_network: 2500
        },
        globalEffect: {
            type: "all_production",
            multiplier: 2.0
        }
    },
    "storm_generator": {
        id: "storm_generator",
        name: "Generador de Tormentas",
        description: "Crea tormentas controladas para irrigación masiva y energía",
        icon: "⚡",
        era: 8,
        tier: 5,
        baseCost: 5e22,
        baseProduction: 78125000000,
        costMultiplier: 1.60,
        unlocked: false,
        resourceType: "credits",
        buildTime: 43200,
        maxOwned: 10,
        requirements: {
            era: 8,
            unitsOwned: { global_weather_controller: 25 }
        },
        produces: {
            credits: 78125000000,
            atmospheric_control: 250000,
            fusion_energy: 500000
        }
    },
    
    // ERA 9: BIOINGENIERÍA EXTREMA
    "life_genesis_chamber": {
        id: "life_genesis_chamber",
        name: "Cámara de Génesis Vital",
        description: "Laboratorio cuántico que diseña y crea formas de vida completamente nuevas",
        icon: "🧬",
        era: 9,
        tier: 5,
        baseCost: 1e27,
        baseProduction: 390625000000,
        costMultiplier: 1.65,
        unlocked: false,
        resourceType: "credits",
        buildTime: 86400,
        maxOwned: 25,
        requirements: {
            era: 9,
            technology: "quantum_biology"
        },
        produces: {
            credits: 390625000000,
            synthetic_dna: 125000,
            designed_organisms: 10000
        }
    },
    "reality_farm": {
        id: "reality_farm",
        name: "Granja de Realidades",
        description: "Cultiva universos de bolsillo donde las leyes de la biología son maleables",
        icon: "🌌",
        era: 9,
        tier: 5,
        baseCost: 1e28,
        baseProduction: 1953125000000,
        costMultiplier: 1.70,
        unlocked: false,
        resourceType: "credits",
        buildTime: 172800,
        maxOwned: 5,
        requirements: {
            era: 9,
            unitsOwned: { life_genesis_chamber: 15 }
        },
        produces: {
            credits: 1953125000000,
            artificial_ecosystems: 50000,
            quantum_time: 1000
        }
    },
    
    // ERA 10: CONQUISTADOR ORBITAL
    "orbital_agricultural_ring": {
        id: "orbital_agricultural_ring",
        name: "Anillo Agrícola Orbital",
        description: "Megaestructura que rodea planetas enteros con granjas espaciales",
        icon: "💍",
        era: 10,
        tier: 5,
        baseCost: 1e32,
        baseProduction: 9765625000000,
        costMultiplier: 1.75,
        unlocked: false,
        resourceType: "credits",
        buildTime: 345600,
        maxOwned: 10,
        requirements: {
            era: 10,
            technology: "megastructure_mastery"
        },
        produces: {
            credits: 9765625000000,
            space_materials: 250000,
            orbital_stations: 25000
        }
    },
    "dyson_sphere_agricultural": {
        id: "dyson_sphere_agricultural",
        name: "Esfera de Dyson Agrícola",
        description: "Aprovecha toda la energía de una estrella para agricultura cósmica",
        icon: "☀️",
        era: 10,
        tier: 5,
        baseCost: 1e34,
        baseProduction: 48828125000000,
        costMultiplier: 1.80,
        unlocked: false,
        resourceType: "credits",
        buildTime: 691200,
        maxOwned: 2,
        requirements: {
            era: 10,
            unitsOwned: { orbital_agricultural_ring: 5 }
        },
        produces: {
            credits: 48828125000000,
            stellar_energy: 1000000,
            artificial_gravity: 100000
        }
    },
    
    // ERA 11: COLONIZADOR PLANETARIO
    "planetary_terraformer": {
        id: "planetary_terraformer",
        name: "Terraformador Planetario",
        description: "Transforma mundos estériles en jardines agrícolas perfectos",
        icon: "🪐",
        era: 11,
        tier: 5,
        baseCost: 1e37,
        baseProduction: 244140625000000,
        costMultiplier: 1.85,
        unlocked: false,
        resourceType: "credits",
        buildTime: 1382400,
        maxOwned: 50,
        requirements: {
            era: 11,
            technology: "planetary_engineering"
        },
        produces: {
            credits: 244140625000000,
            terraforming_tech: 500000,
            planetary_ecosystems: 50000
        }
    },
    "galactic_seed_ship": {
        id: "galactic_seed_ship",
        name: "Nave Sembradora Galáctica",
        description: "Esparce vida y agricultura a través de sistemas estelares",
        icon: "🚀",
        era: 11,
        tier: 5,
        baseCost: 1e39,
        baseProduction: 1220703125000000,
        costMultiplier: 1.90,
        unlocked: false,
        resourceType: "credits",
        buildTime: 2764800,
        maxOwned: 10,
        requirements: {
            era: 11,
            unitsOwned: { planetary_terraformer: 25 }
        },
        produces: {
            credits: 1220703125000000,
            ftl_technology: 100000,
            quantum_time: 50000
        }
    },
    
    // ERA 12: EMPERADOR GALÁCTICO
    "universe_cultivator": {
        id: "universe_cultivator",
        name: "Cultivador de Universos",
        description: "Siembra galaxias enteras con ecosistemas agrícolas trascendentales",
        icon: "👑",
        era: 12,
        tier: 5,
        baseCost: 1e42,
        baseProduction: 6103515625000000,
        costMultiplier: 1.95,
        unlocked: false,
        resourceType: "credits",
        buildTime: 5529600,
        maxOwned: 25,
        requirements: {
            era: 12,
            technology: "universal_mastery"
        },
        produces: {
            credits: 6103515625000000,
            stellar_energy: 5000000,
            quantum_reality: 250000
        },
        globalEffect: {
            type: "all_production",
            multiplier: 10.0
        }
    },
    "entropy_manipulator": {
        id: "entropy_manipulator",
        name: "Manipulador de Entropía",
        description: "Controla la decadencia universal para preservar la vida eterna",
        icon: "♾️",
        era: 12,
        tier: 5,
        baseCost: 1e45,
        baseProduction: 30517578125000000,
        costMultiplier: 2.00,
        unlocked: false,
        resourceType: "credits",
        buildTime: 11059200,
        maxOwned: 5,
        requirements: {
            era: 12,
            unitsOwned: { universe_cultivator: 10 }
        },
        produces: {
            credits: 30517578125000000,
            alien_civilizations: 1000000,
            quantum_reality: 1000000
        },
        globalEffect: {
            type: "all_production",
            multiplier: 100.0
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
        influence: 0,
        // Recursos multiversales (desbloqueados en Era 12+)
        quantum_time: 0,
        genetic_data: 0,
        reality_essence: 0,
        dimensional_energy: 0,
        cosmic_knowledge: 0
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
        economic: { level: 0, currency: 0 },
        multiversal: { level: 0, currency: 0 } // Nuevo prestigio multiversal
    },
    multiverse: {
        nexusLevel: 0,
        connectedUniverses: {},
        quantumSeeds: {},
        technologies: {},
        ascensionTree: {},
        totalSeedsPlanted: 0,
        totalAnomaliesResolved: 0,
        multiversalProduction: 0,
        factionReputation: {}
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

// Nuevos recursos multiversales
const MULTIVERSAL_RESOURCES = {
    quantum_time: { id: "quantum_time", name: "Tiempo Cuántico", emoji: "⏰", description: "Energía temporal para manipular realidades" },
    genetic_data: { id: "genetic_data", name: "Datos Genéticos", emoji: "🧬", description: "Información biológica universal" },
    reality_essence: { id: "reality_essence", name: "Esencia de Realidad", emoji: "✨", description: "Moneda de prestigio multiversal" },
    dimensional_energy: { id: "dimensional_energy", name: "Energía Dimensional", emoji: "⚡", description: "Poder para conexiones interdimensionales" },
    cosmic_knowledge: { id: "cosmic_knowledge", name: "Conocimiento Cósmico", emoji: "📚", description: "Sabiduría del multiverso" }
};

// Tipos de universos multiversales
const UNIVERSE_TYPES = {
    elemental: {
        name: "Universos Elementales",
        types: {
            igneous: { 
                name: "Universo Ígneo", 
                description: "Altas temperaturas dominantes", 
                bonuses: { fusion_energy: 2.0 }, 
                penalties: { organic_crops: 0.5 },
                color: "#FF4500"
            },
            aquatic: { 
                name: "Universo Acuático", 
                description: "Mundos oceánicos", 
                bonuses: { marine_biomass: 2.0 }, 
                penalties: { terrestrial_farming: 0.5 },
                color: "#0080FF"
            },
            gaseous: { 
                name: "Universo Gaseoso", 
                description: "Gigantes gaseosos", 
                bonuses: { rare_gases: 2.0 }, 
                penalties: { solid_construction: 0.5 },
                color: "#8A2BE2"
            },
            crystalline: { 
                name: "Universo Cristalino", 
                description: "Formaciones cristalinas masivas", 
                bonuses: { exotic_materials: 2.0 }, 
                penalties: { biomass: 0.5 },
                color: "#40E0D0"
            },
            entropic: { 
                name: "Universo Entrópico", 
                description: "Decaimiento acelerado", 
                bonuses: { rapid_decomposition: 1.5 }, 
                penalties: { unit_durability: 0.3 },
                color: "#8B0000"
            }
        }
    },
    temporal: {
        name: "Universos Temporales",
        types: {
            accelerated: { 
                name: "Universo Acelerado", 
                description: "Tiempo acelerado", 
                bonuses: { production_speed: 3.0 }, 
                penalties: { resource_depletion: 2.0 },
                color: "#FFD700"
            },
            decelerated: { 
                name: "Universo Ralentizado", 
                description: "Tiempo ralentizado", 
                bonuses: { resource_preservation: 2.0 }, 
                penalties: { production_speed: 0.3 },
                color: "#4169E1"
            },
            cyclical: { 
                name: "Universo Cíclico", 
                description: "Tiempo en bucles", 
                bonuses: { permanent_upgrades: 1.5 }, 
                penalties: { periodic_reset: true },
                color: "#9370DB"
            },
            retrograde: { 
                name: "Universo Retrógrado", 
                description: "Tiempo inverso", 
                bonuses: { time_reversal: true }, 
                penalties: { negative_production: true },
                color: "#DC143C"
            }
        }
    },
    conceptual: {
        name: "Universos Conceptuales",
        types: {
            abundance: { 
                name: "Universo de la Abundancia", 
                description: "Recursos infinitos", 
                bonuses: { spontaneous_generation: 5.0 }, 
                penalties: { economic_instability: true },
                color: "#32CD32"
            },
            scarcity: { 
                name: "Universo de la Escasez", 
                description: "Recursos extremadamente raros", 
                bonuses: { extreme_efficiency: 5.0 }, 
                penalties: { resource_generation: 0.1 },
                color: "#2F4F4F"
            },
            dreams: { 
                name: "Universo de los Sueños", 
                description: "Energía onírica", 
                bonuses: { dream_energy: 3.0 }, 
                penalties: { reality_distortion: true },
                color: "#FF69B4"
            },
            inverted_logic: { 
                name: "Universo de Lógica Invertida", 
                description: "Efectos opuestos", 
                bonuses: { paradox_power: 2.0 }, 
                penalties: { inverted_actions: true },
                color: "#FF1493"
            }
        }
    },
    anomalous: {
        name: "Universos Anómalos",
        types: {
            variable_gravity: { 
                name: "Universo de Gravedad Variable", 
                description: "Gravedad cambiante", 
                bonuses: { gravity_manipulation: 1.5 }, 
                penalties: { unit_instability: true },
                color: "#B22222"
            },
            inverted_colors: { 
                name: "Universo de Colores Invertidos", 
                description: "Percepción alterada", 
                bonuses: { hidden_elements: true }, 
                penalties: { visual_confusion: true },
                color: "#000080"
            },
            resonance: { 
                name: "Universo de Resonancia", 
                description: "Amplificación interdimensional", 
                bonuses: { effect_amplification: 2.5 }, 
                penalties: { cross_universe_chaos: true },
                color: "#FF8C00"
            },
            paradox: { 
                name: "Universo Paradoja", 
                description: "Paradojas temporales", 
                bonuses: { temporal_power: 3.0 }, 
                penalties: { paradox_risk: true },
                color: "#9400D3"
            }
        }
    }
};

// Semillas Cuánticas
const QUANTUM_SEEDS = {
    basic_quantum_seed: {
        id: "basic_quantum_seed",
        name: "Semilla Cuántica Básica",
        description: "Permite acceso a universos elementales",
        cost: { quantum_time: 1000, genetic_data: 500 },
        universeAccess: ["elemental"],
        rarity: "common"
    },
    temporal_quantum_seed: {
        id: "temporal_quantum_seed",
        name: "Semilla Cuántica Temporal",
        description: "Permite acceso a universos temporales",
        cost: { quantum_time: 5000, genetic_data: 2000, cosmic_knowledge: 100 },
        universeAccess: ["temporal"],
        rarity: "rare"
    },
    conceptual_quantum_seed: {
        id: "conceptual_quantum_seed",
        name: "Semilla Cuántica Conceptual",
        description: "Permite acceso a universos conceptuales",
        cost: { quantum_time: 10000, genetic_data: 5000, cosmic_knowledge: 500 },
        universeAccess: ["conceptual"],
        rarity: "epic"
    },
    anomalous_quantum_seed: {
        id: "anomalous_quantum_seed",
        name: "Semilla Cuántica Anómala",
        description: "Permite acceso a universos anómalos",
        cost: { quantum_time: 25000, genetic_data: 10000, cosmic_knowledge: 1000, dimensional_energy: 100 },
        universeAccess: ["anomalous"],
        rarity: "legendary"
    },
    omniversal_quantum_seed: {
        id: "omniversal_quantum_seed",
        name: "Semilla Cuántica Omniversal",
        description: "Permite acceso a todos los tipos de universos",
        cost: { quantum_time: 100000, genetic_data: 50000, cosmic_knowledge: 5000, dimensional_energy: 1000, reality_essence: 10 },
        universeAccess: ["elemental", "temporal", "conceptual", "anomalous"],
        rarity: "mythic"
    }
};

// Árbol de Tecnología Multiversal
const MULTIVERSAL_TECHNOLOGY_TREE = {
    interdimensional_connection: {
        name: "Conexión Interdimensional",
        description: "Tecnologías para conectar y navegar el multiverso",
        icon: "🌀",
        technologies: {
            connection_stabilization: {
                id: "connection_stabilization",
                name: "Estabilización de Conexiones",
                description: "Mejora la estabilidad de las conexiones multiversales",
                cost: { cosmic_knowledge: 1000, dimensional_energy: 100 },
                effects: { connection_stability: 1.2 },
                prerequisites: [],
                unlocked: false
            },
            multiversal_cartography: {
                id: "multiversal_cartography",
                name: "Cartografía Multiversal",
                description: "Permite mapear y predecir nuevas conexiones",
                cost: { cosmic_knowledge: 2500, quantum_time: 500 },
                effects: { universe_discovery: 1.5, prediction_accuracy: 1.3 },
                prerequisites: ["connection_stabilization"],
                unlocked: false
            },
            reality_bridges: {
                id: "reality_bridges",
                name: "Puentes de Realidad",
                description: "Crea conexiones permanentes entre universos distantes",
                cost: { cosmic_knowledge: 5000, dimensional_energy: 1000, reality_essence: 2 },
                effects: { permanent_connections: true, distance_ignore: true },
                prerequisites: ["multiversal_cartography"],
                unlocked: false
            },
            quantum_entanglement_network: {
                id: "quantum_entanglement_network",
                name: "Red de Entrelazamiento Cuántico",
                description: "Conecta instantáneamente todos los universos",
                cost: { cosmic_knowledge: 10000, dimensional_energy: 5000, reality_essence: 10 },
                effects: { instant_communication: true, resource_sync: true },
                prerequisites: ["reality_bridges"],
                unlocked: false
            }
        }
    },
    physical_law_manipulation: {
        name: "Manipulación de Leyes Físicas",
        description: "Control sobre las fuerzas fundamentales del universo",
        icon: "⚛️",
        technologies: {
            gravitational_control: {
                id: "gravitational_control",
                name: "Control Gravitacional",
                description: "Permite ajustar la gravedad en universos conectados",
                cost: { cosmic_knowledge: 1500, dimensional_energy: 200 },
                effects: { gravity_manipulation: true, efficiency_bonus: 1.15 },
                prerequisites: [],
                unlocked: false
            },
            temporal_modulation: {
                id: "temporal_modulation",
                name: "Modulación Temporal",
                description: "Acelera o ralentiza el tiempo en universos específicos",
                cost: { cosmic_knowledge: 3000, quantum_time: 1000 },
                effects: { time_control: true, production_boost: 1.25 },
                prerequisites: ["gravitational_control"],
                unlocked: false
            },
            constant_reconfiguration: {
                id: "constant_reconfiguration",
                name: "Reconfiguración de Constantes",
                description: "Altera constantes fundamentales como eficiencia energética",
                cost: { cosmic_knowledge: 7500, dimensional_energy: 2000, reality_essence: 3 },
                effects: { fundamental_control: true, energy_efficiency: 1.5 },
                prerequisites: ["temporal_modulation"],
                unlocked: false
            },
            reality_programming: {
                id: "reality_programming",
                name: "Programación de la Realidad",
                description: "Controla completamente las leyes físicas de un universo",
                cost: { cosmic_knowledge: 15000, dimensional_energy: 10000, reality_essence: 15 },
                effects: { complete_control: true, custom_physics: true },
                prerequisites: ["constant_reconfiguration"],
                unlocked: false
            }
        }
    },
    multiversal_bioengineering: {
        name: "Bioingeniería Multiversal",
        description: "Evolución de la vida a través de las dimensiones",
        icon: "🧬",
        technologies: {
            adaptive_crops: {
                id: "adaptive_crops",
                name: "Cultivos Adaptativos",
                description: "Cultivos que prosperan en cualquier universo",
                cost: { genetic_data: 2000, cosmic_knowledge: 500 },
                effects: { universal_growth: true, yield_bonus: 1.3 },
                prerequisites: [],
                unlocked: false
            },
            interdimensional_creatures: {
                id: "interdimensional_creatures",
                name: "Criaturas Interdimensionales",
                description: "Animales que extraen recursos de múltiples realidades",
                cost: { genetic_data: 5000, dimensional_energy: 500 },
                effects: { multiversal_extraction: true, resource_bonus: 1.4 },
                prerequisites: ["adaptive_crops"],
                unlocked: false
            },
            universal_symbiosis: {
                id: "universal_symbiosis",
                name: "Simbiosis Universal",
                description: "Relaciones simbióticas entre unidades y universos",
                cost: { genetic_data: 10000, cosmic_knowledge: 2000, reality_essence: 5 },
                effects: { symbiotic_bonus: 2.0, universe_harmony: true },
                prerequisites: ["interdimensional_creatures"],
                unlocked: false
            },
            life_genesis_matrix: {
                id: "life_genesis_matrix",
                name: "Matriz de Génesis Vital",
                description: "Crea vida en universos estériles",
                cost: { genetic_data: 25000, dimensional_energy: 5000, reality_essence: 20 },
                effects: { life_creation: true, universe_transformation: true },
                prerequisites: ["universal_symbiosis"],
                unlocked: false
            }
        }
    },
    multiversal_defense: {
        name: "Defensa Multiversal",
        description: "Protección contra amenazas interdimensionales",
        icon: "🛡️",
        technologies: {
            reality_shields: {
                id: "reality_shields",
                name: "Escudos de Realidad",
                description: "Protege contra efectos adversos de anomalías",
                cost: { cosmic_knowledge: 1200, dimensional_energy: 300 },
                effects: { anomaly_resistance: 1.5, stability_bonus: 1.2 },
                prerequisites: [],
                unlocked: false
            },
            entity_repellents: {
                id: "entity_repellents",
                name: "Repelentes de Entidades",
                description: "Tecnologías para repeler criaturas interdimensionales",
                cost: { cosmic_knowledge: 2500, dimensional_energy: 800 },
                effects: { entity_protection: true, invasion_resistance: 2.0 },
                prerequisites: ["reality_shields"],
                unlocked: false
            },
            paradox_restoration: {
                id: "paradox_restoration",
                name: "Restauración de Paradojas",
                description: "Resuelve paradojas temporales y restaura estabilidad",
                cost: { cosmic_knowledge: 5000, quantum_time: 2000, reality_essence: 5 },
                effects: { paradox_immunity: true, temporal_stability: 2.0 },
                prerequisites: ["entity_repellents"],
                unlocked: false
            },
            dimensional_fortress: {
                id: "dimensional_fortress",
                name: "Fortaleza Dimensional",
                description: "Protección absoluta contra todas las amenazas multiversales",
                cost: { cosmic_knowledge: 12000, dimensional_energy: 5000, reality_essence: 25 },
                effects: { absolute_protection: true, threat_immunity: true },
                prerequisites: ["paradox_restoration"],
                unlocked: false
            }
        }
    },
    nexus_enhancement: {
        name: "Mejora del Nexus",
        description: "Expansión y optimización del Nexus Central",
        icon: "🏗️",
        technologies: {
            monitoring_enhancement: {
                id: "monitoring_enhancement",
                name: "Mejora de Monitorización",
                description: "Sistemas avanzados de monitoreo multiversal",
                cost: { cosmic_knowledge: 800, dimensional_energy: 150 },
                effects: { monitoring_range: 2.0, detection_accuracy: 1.5 },
                prerequisites: [],
                unlocked: false
            },
            quantum_storage_expansion: {
                id: "quantum_storage_expansion",
                name: "Expansión de Almacenamiento Cuántico",
                description: "Aumenta la capacidad del almacenamiento cuántico",
                cost: { cosmic_knowledge: 1500, dimensional_energy: 500 },
                effects: { storage_capacity: 2.0, storage_efficiency: 1.3 },
                prerequisites: ["monitoring_enhancement"],
                unlocked: false
            },
            temporal_synchronization: {
                id: "temporal_synchronization",
                name: "Sincronización Temporal",
                description: "Sincroniza el tiempo entre universos conectados",
                cost: { cosmic_knowledge: 3000, quantum_time: 1500 },
                effects: { time_sync: true, efficiency_harmony: 1.4 },
                prerequisites: ["quantum_storage_expansion"],
                unlocked: false
            },
            nexus_ascension: {
                id: "nexus_ascension",
                name: "Ascensión del Nexus",
                description: "Transforma el Nexus en una entidad multiversal",
                cost: { cosmic_knowledge: 20000, dimensional_energy: 10000, reality_essence: 50 },
                effects: { nexus_consciousness: true, multiversal_awareness: true },
                prerequisites: ["temporal_synchronization"],
                unlocked: false
            }
        }
    },
    reality_cultivation: {
        name: "Cultivo de Realidades",
        description: "El arte de sembrar y cultivar universos completos",
        icon: "🌱",
        technologies: {
            universe_seeding: {
                id: "universe_seeding",
                name: "Sembrado de Universos",
                description: "Introduce vida básica en universos estériles",
                cost: { genetic_data: 3000, cosmic_knowledge: 1000, reality_essence: 2 },
                effects: { basic_terraforming: true, life_introduction: 1.2 },
                prerequisites: [],
                unlocked: false
            },
            ecosystem_engineering: {
                id: "ecosystem_engineering",
                name: "Ingeniería de Ecosistemas",
                description: "Diseña ecosistemas complejos para universos",
                cost: { genetic_data: 8000, cosmic_knowledge: 3000, reality_essence: 8 },
                effects: { ecosystem_design: true, biodiversity_bonus: 1.5 },
                prerequisites: ["universe_seeding"],
                unlocked: false
            },
            civilization_cultivation: {
                id: "civilization_cultivation",
                name: "Cultivo de Civilizaciones",
                description: "Guía el desarrollo de civilizaciones inteligentes",
                cost: { genetic_data: 15000, cosmic_knowledge: 8000, reality_essence: 20 },
                effects: { civilization_guidance: true, intelligence_amplification: 2.0 },
                prerequisites: ["ecosystem_engineering"],
                unlocked: false
            },
            reality_garden_mastery: {
                id: "reality_garden_mastery",
                name: "Maestría del Jardín de Realidades",
                description: "Dominio completo sobre el cultivo multiversal",
                cost: { genetic_data: 50000, cosmic_knowledge: 25000, dimensional_energy: 15000, reality_essence: 100 },
                effects: { garden_mastery: true, infinite_cultivation: true },
                prerequisites: ["civilization_cultivation"],
                unlocked: false
            }
        }
    }
};

// Unidades Multiversales especializadas
const MULTIVERSAL_UNITS = {
    dimensional_harvester: {
        id: "dimensional_harvester",
        name: "Cosechador Dimensional",
        description: "Extrae recursos de un universo y los transporta a otro",
        era: 13, // Era Multiversal
        tier: 6,
        baseCost: { credits: 1e50, dimensional_energy: 1000, cosmic_knowledge: 500 },
        costMultiplier: 1.2,
        baseProduction: 1e12,
        productionType: "multiversal_transfer",
        globalEffect: { resource_transfer_rate: 1.3 },
        requirements: { technology: ["interdimensional_connection"] },
        universeTypes: ["all"]
    },
    adaptive_ecosystem_farm: {
        id: "adaptive_ecosystem_farm",
        name: "Granja de Ecosistemas Adaptativos",
        description: "Se adapta automáticamente a las leyes físicas del universo",
        era: 13,
        tier: 6,
        baseCost: { credits: 5e50, genetic_data: 5000, cosmic_knowledge: 1000 },
        costMultiplier: 1.25,
        baseProduction: 5e12,
        productionType: "adaptive_production",
        globalEffect: { universe_adaptation: 1.5 },
        requirements: { technology: ["adaptive_crops"] },
        universeTypes: ["all"]
    },
    temporal_synchronizer: {
        id: "temporal_synchronizer",
        name: "Sincronizador Temporal",
        description: "Alinea el flujo temporal entre universos conectados",
        era: 13,
        tier: 6,
        baseCost: { credits: 1e51, quantum_time: 10000, dimensional_energy: 2000 },
        costMultiplier: 1.3,
        baseProduction: 0, // No produce recursos directamente
        productionType: "temporal_alignment",
        globalEffect: { temporal_efficiency: 1.8 },
        requirements: { technology: ["temporal_modulation"] },
        universeTypes: ["temporal", "all"]
    },
    reality_constructor: {
        id: "reality_constructor",
        name: "Constructor de Realidades",
        description: "Siembra nuevas propiedades en universos existentes",
        era: 13,
        tier: 6,
        baseCost: { credits: 1e52, reality_essence: 50, cosmic_knowledge: 5000 },
        costMultiplier: 1.4,
        baseProduction: 0,
        productionType: "reality_modification",
        globalEffect: { universe_enhancement: 2.0 },
        requirements: { technology: ["reality_programming"] },
        universeTypes: ["all"]
    },
    nexus_expansion_module: {
        id: "nexus_expansion_module",
        name: "Módulo de Expansión del Nexus",
        description: "Expande las capacidades del Nexus Central",
        era: 13,
        tier: 6,
        baseCost: { credits: 5e52, dimensional_energy: 10000, cosmic_knowledge: 10000 },
        costMultiplier: 1.5,
        baseProduction: 0,
        productionType: "nexus_enhancement",
        globalEffect: { nexus_efficiency: 2.5 },
        requirements: { technology: ["nexus_ascension"] },
        universeTypes: ["nexus"]
    },
    multiversal_life_seeder: {
        id: "multiversal_life_seeder",
        name: "Sembrador de Vida Multiversal",
        description: "Introduce vida en universos estériles",
        era: 13,
        tier: 6,
        baseCost: { credits: 1e53, genetic_data: 25000, reality_essence: 100 },
        costMultiplier: 1.6,
        baseProduction: 0,
        productionType: "life_seeding",
        globalEffect: { universe_vitality: 3.0 },
        requirements: { technology: ["life_genesis_matrix"] },
        universeTypes: ["sterile", "dead"]
    }
};

// Sistema de Prestigio Multiversal
const MULTIVERSAL_PRESTIGE = {
    reality_essence_prestige: {
        id: "reality_essence_prestige",
        name: "Prestigio de Esencia de Realidad",
        description: "Trasciende las limitaciones de una sola realidad",
        currency: "reality_essence",
        requirements: {
            connected_universes: 10,
            total_seeds_planted: 100,
            multiversal_production: 1e60
        },
        rewards: {
            base_multiplier: 10,
            reality_essence_gain: 1000,
            permanent_bonuses: {
                multiversal_production: 1.5,
                universe_stability: 1.3,
                anomaly_resistance: 1.2
            }
        }
    }
};

// Árbol de Ascensión Multiversal
const MULTIVERSAL_ASCENSION_TREE = {
    interdimensional_production: {
        id: "interdimensional_production",
        name: "Producción Interdimensional",
        description: "Aumenta la producción en todos los universos conectados",
        cost: { reality_essence: 10 },
        maxLevel: 50,
        effect: (level) => ({ multiversal_production: 1 + (level * 0.1) }),
        unlocked: true
    },
    physical_law_cost_reduction: {
        id: "physical_law_cost_reduction",
        name: "Reducción de Costos MLF",
        description: "Disminuye el costo de manipular leyes físicas",
        cost: { reality_essence: 15 },
        maxLevel: 25,
        effect: (level) => ({ mlf_cost_reduction: 1 - (level * 0.02) }),
        prerequisites: ["interdimensional_production"],
        unlocked: false
    },
    anomaly_stabilization: {
        id: "anomaly_stabilization",
        name: "Estabilización de Anomalías",
        description: "Reduce la frecuencia y severidad de anomalías",
        cost: { reality_essence: 20 },
        maxLevel: 20,
        effect: (level) => ({ anomaly_reduction: 1 - (level * 0.03) }),
        prerequisites: ["physical_law_cost_reduction"],
        unlocked: false
    },
    permanent_connection_enhancement: {
        id: "permanent_connection_enhancement",
        name: "Mejora de Conexiones Permanentes",
        description: "Aumenta la velocidad de transferencia de recursos",
        cost: { reality_essence: 25 },
        maxLevel: 30,
        effect: (level) => ({ transfer_rate: 1 + (level * 0.05) }),
        prerequisites: ["anomaly_stabilization"],
        unlocked: false
    },
    quantum_seed_mastery: {
        id: "quantum_seed_mastery",
        name: "Maestría de Semillas Cuánticas",
        description: "Desbloquea nuevos tipos de semillas cuánticas",
        cost: { reality_essence: 50 },
        maxLevel: 10,
        effect: (level) => ({ new_seed_types: level }),
        prerequisites: ["permanent_connection_enhancement"],
        unlocked: false
    },
    prestige_synchronization: {
        id: "prestige_synchronization",
        name: "Sincronización de Prestigio",
        description: "Los beneficios de otros prestigios se aplican mejor en el multiverso",
        cost: { reality_essence: 100 },
        maxLevel: 5,
        effect: (level) => ({ prestige_amplification: 1 + (level * 0.2) }),
        prerequisites: ["quantum_seed_mastery"],
        unlocked: false
    }
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
    INITIAL_GAME_STATE,
    MULTIVERSAL_RESOURCES,
    UNIVERSE_TYPES,
    QUANTUM_SEEDS,
    MULTIVERSAL_TECHNOLOGY_TREE,
    MULTIVERSAL_UNITS,
    MULTIVERSAL_PRESTIGE,
    MULTIVERSAL_ASCENSION_TREE
};