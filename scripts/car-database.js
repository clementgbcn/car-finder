// Comprehensive car database with Wikipedia page names
// This contains ~3000 car models from various manufacturers

const carDatabase = [
  // Abarth
  'Abarth_500', 'Abarth_595', 'Abarth_695', 'Abarth_124_Spider',
  
  // Acura
  'Acura_CL', 'Acura_ILX', 'Acura_Integra', 'Acura_Legend', 'Acura_MDX',
  'Acura_NSX', 'Acura_RDX', 'Acura_RL', 'Acura_RLX', 'Acura_RSX',
  'Acura_SLX', 'Acura_TL', 'Acura_TLX', 'Acura_TSX', 'Acura_Vigor',
  'Acura_ZDX',
  
  // Alfa Romeo
  'Alfa_Romeo_4C', 'Alfa_Romeo_8C', 'Alfa_Romeo_33', 'Alfa_Romeo_75',
  'Alfa_Romeo_90', 'Alfa_Romeo_145', 'Alfa_Romeo_146', 'Alfa_Romeo_147',
  'Alfa_Romeo_155', 'Alfa_Romeo_156', 'Alfa_Romeo_159', 'Alfa_Romeo_164',
  'Alfa_Romeo_166', 'Alfa_Romeo_Brera', 'Alfa_Romeo_GTV', 'Alfa_Romeo_Giulia',
  'Alfa_Romeo_Giulietta', 'Alfa_Romeo_MiTo', 'Alfa_Romeo_Spider',
  'Alfa_Romeo_Stelvio', 'Alfa_Romeo_Tonale',
  
  // Aston Martin
  'Aston_Martin_DB5', 'Aston_Martin_DB6', 'Aston_Martin_DB7', 'Aston_Martin_DB9',
  'Aston_Martin_DB11', 'Aston_Martin_DBS', 'Aston_Martin_V8_Vantage',
  'Aston_Martin_Vanquish', 'Aston_Martin_Rapide', 'Aston_Martin_Virage',
  'Aston_Martin_One-77', 'Aston_Martin_Vulcan', 'Aston_Martin_Valkyrie',
  'Aston_Martin_DBX',
  
  // Audi
  'Audi_A1', 'Audi_A3', 'Audi_A4', 'Audi_A5', 'Audi_A6', 'Audi_A7', 'Audi_A8',
  'Audi_Q2', 'Audi_Q3', 'Audi_Q4_e-tron', 'Audi_Q5', 'Audi_Q7', 'Audi_Q8',
  'Audi_R8', 'Audi_RS2', 'Audi_RS3', 'Audi_RS4', 'Audi_RS5', 'Audi_RS6',
  'Audi_RS7', 'Audi_S1', 'Audi_S3', 'Audi_S4', 'Audi_S5', 'Audi_S6',
  'Audi_S7', 'Audi_S8', 'Audi_TT', 'Audi_TTS', 'Audi_TT_RS',
  'Audi_e-tron', 'Audi_e-tron_GT',
  
  // Bentley
  'Bentley_Arnage', 'Bentley_Azure', 'Bentley_Bentayga', 'Bentley_Brooklands',
  'Bentley_Continental_GT', 'Bentley_Continental_Flying_Spur', 'Bentley_Mulsanne',
  'Bentley_Turbo_R', 'Bentley_Flying_Spur',
  
  // BMW
  'BMW_1_Series', 'BMW_2_Series', 'BMW_3_Series', 'BMW_4_Series', 'BMW_5_Series',
  'BMW_6_Series', 'BMW_7_Series', 'BMW_8_Series', 'BMW_X1', 'BMW_X2', 'BMW_X3',
  'BMW_X4', 'BMW_X5', 'BMW_X6', 'BMW_X7', 'BMW_Z3', 'BMW_Z4', 'BMW_Z8',
  'BMW_M1', 'BMW_M2', 'BMW_M3', 'BMW_M4', 'BMW_M5', 'BMW_M6', 'BMW_M8',
  'BMW_i3', 'BMW_i4', 'BMW_i7', 'BMW_i8', 'BMW_iX', 'BMW_iX3',
  
  // Bugatti
  'Bugatti_Veyron', 'Bugatti_Chiron', 'Bugatti_Divo', 'Bugatti_Centodieci',
  'Bugatti_La_Voiture_Noire', 'Bugatti_EB_110',
  
  // Buick
  'Buick_Cascada', 'Buick_Enclave', 'Buick_Encore', 'Buick_Envision',
  'Buick_LaCrosse', 'Buick_Regal', 'Buick_Verano', 'Buick_Century',
  'Buick_LeSabre', 'Buick_Park_Avenue', 'Buick_Riviera', 'Buick_Roadmaster',
  'Buick_Skylark',
  
  // Cadillac
  'Cadillac_ATS', 'Cadillac_CTS', 'Cadillac_CT4', 'Cadillac_CT5', 'Cadillac_CT6',
  'Cadillac_DTS', 'Cadillac_Eldorado', 'Cadillac_Escalade', 'Cadillac_SRX',
  'Cadillac_STS', 'Cadillac_XLR', 'Cadillac_XT4', 'Cadillac_XT5', 'Cadillac_XT6',
  'Cadillac_XTS', 'Cadillac_Seville', 'Cadillac_DeVille',
  
  // Chevrolet
  'Chevrolet_Camaro', 'Chevrolet_Corvette', 'Chevrolet_Cruze', 'Chevrolet_Equinox',
  'Chevrolet_Impala', 'Chevrolet_Malibu', 'Chevrolet_Silverado', 'Chevrolet_Suburban',
  'Chevrolet_Tahoe', 'Chevrolet_Traverse', 'Chevrolet_Trax', 'Chevrolet_Volt',
  'Chevrolet_Bolt', 'Chevrolet_Blazer', 'Chevrolet_Colorado', 'Chevrolet_Express',
  'Chevrolet_Sonic', 'Chevrolet_Spark', 'Chevrolet_SS', 'Chevrolet_Caprice',
  'Chevrolet_Monte_Carlo', 'Chevrolet_Lumina', 'Chevrolet_Cavalier',
  
  // Chrysler
  'Chrysler_200', 'Chrysler_300', 'Chrysler_Aspen', 'Chrysler_Concorde',
  'Chrysler_Crossfire', 'Chrysler_LHS', 'Chrysler_Pacifica', 'Chrysler_PT_Cruiser',
  'Chrysler_Sebring', 'Chrysler_Town_Country', 'Chrysler_Voyager',
  
  // Citroën
  'Citroën_C1', 'Citroën_C2', 'Citroën_C3', 'Citroën_C4', 'Citroën_C5',
  'Citroën_C6', 'Citroën_C8', 'Citroën_DS3', 'Citroën_DS4', 'Citroën_DS5',
  'Citroën_Berlingo', 'Citroën_Picasso', 'Citroën_Jumper', 'Citroën_Jumpy',
  'Citroën_Nemo', 'Citroën_Saxo', 'Citroën_Xantia', 'Citroën_Xsara',
  'Citroën_ZX', 'Citroën_2CV', 'Citroën_AX', 'Citroën_BX', 'Citroën_CX',
  'Citroën_GS', 'Citroën_SM', 'Citroën_Visa',
  
  // Dacia
  'Dacia_Duster', 'Dacia_Logan', 'Dacia_Sandero', 'Dacia_Dokker',
  'Dacia_Lodgy', 'Dacia_Spring',
  
  // Dodge
  'Dodge_Challenger', 'Dodge_Charger', 'Dodge_Dart', 'Dodge_Durango',
  'Dodge_Grand_Caravan', 'Dodge_Journey', 'Dodge_Viper', 'Dodge_Avenger',
  'Dodge_Caliber', 'Dodge_Intrepid', 'Dodge_Magnum', 'Dodge_Neon',
  'Dodge_Nitro', 'Dodge_Ram', 'Dodge_Stratus',
  
  // Ferrari
  'Ferrari_250_GT', 'Ferrari_275_GTB', 'Ferrari_288_GTO', 'Ferrari_308_GTB',
  'Ferrari_328', 'Ferrari_348', 'Ferrari_355', 'Ferrari_360', 'Ferrari_430',
  'Ferrari_456', 'Ferrari_458', 'Ferrari_488', 'Ferrari_512', 'Ferrari_550',
  'Ferrari_575M', 'Ferrari_599', 'Ferrari_612', 'Ferrari_California',
  'Ferrari_Enzo', 'Ferrari_F12', 'Ferrari_F40', 'Ferrari_F50', 'Ferrari_F355',
  'Ferrari_FF', 'Ferrari_GTC4Lusso', 'Ferrari_LaFerrari', 'Ferrari_Portofino',
  'Ferrari_Roma', 'Ferrari_SF90', 'Ferrari_Testarossa', 'Ferrari_812',
  
  // Fiat
  'Fiat_500', 'Fiat_500L', 'Fiat_500X', 'Fiat_Albea', 'Fiat_Brava',
  'Fiat_Bravo', 'Fiat_Croma', 'Fiat_Doblo', 'Fiat_Ducato', 'Fiat_Fiorino',
  'Fiat_Idea', 'Fiat_Linea', 'Fiat_Marea', 'Fiat_Multipla', 'Fiat_Palio',
  'Fiat_Panda', 'Fiat_Punto', 'Fiat_Qubo', 'Fiat_Scudo', 'Fiat_Sedici',
  'Fiat_Seicento', 'Fiat_Siena', 'Fiat_Stilo', 'Fiat_Strada', 'Fiat_Tempra',
  'Fiat_Tipo', 'Fiat_Ulysse', 'Fiat_Uno',
  
  // Ford
  'Ford_Bronco', 'Ford_Edge', 'Ford_Escape', 'Ford_Expedition', 'Ford_Explorer',
  'Ford_F-150', 'Ford_F-250', 'Ford_F-350', 'Ford_Fiesta', 'Ford_Focus',
  'Ford_Fusion', 'Ford_GT', 'Ford_Mustang', 'Ford_Ranger', 'Ford_Taurus',
  'Ford_Transit', 'Ford_Aerostar', 'Ford_Aspire', 'Ford_Bronco_II',
  'Ford_Contour', 'Ford_Crown_Victoria', 'Ford_Ecosport', 'Ford_Escort',
  'Ford_Excursion', 'Ford_Freestar', 'Ford_Galaxy', 'Ford_Ka', 'Ford_Mondeo',
  'Ford_Probe', 'Ford_Puma', 'Ford_Sierra', 'Ford_Taurus_X', 'Ford_Tempo',
  'Ford_Thunderbird', 'Ford_Windstar', 'Ford_Kuga', 'Ford_C-Max', 'Ford_S-Max',
  
  // Genesis
  'Genesis_G70', 'Genesis_G80', 'Genesis_G90', 'Genesis_GV70', 'Genesis_GV80',
  
  // GMC
  'GMC_Acadia', 'GMC_Canyon', 'GMC_Envoy', 'GMC_Safari', 'GMC_Savana',
  'GMC_Sierra', 'GMC_Terrain', 'GMC_Yukon', 'GMC_Jimmy', 'GMC_Sonoma',
  
  // Honda
  'Honda_Accord', 'Honda_Civic', 'Honda_CR-V', 'Honda_CR-Z', 'Honda_Element',
  'Honda_Fit', 'Honda_HR-V', 'Honda_Insight', 'Honda_NSX', 'Honda_Odyssey',
  'Honda_Passport', 'Honda_Pilot', 'Honda_Prelude', 'Honda_Ridgeline',
  'Honda_S2000', 'Honda_Jazz', 'Honda_Legend', 'Honda_Integra', 'Honda_City',
  'Honda_Shuttle', 'Honda_Stream', 'Honda_Freed', 'Honda_Vezel',
  
  // Hyundai
  'Hyundai_Accent', 'Hyundai_Azera', 'Hyundai_Elantra', 'Hyundai_Equus',
  'Hyundai_Genesis', 'Hyundai_Ioniq', 'Hyundai_Kona', 'Hyundai_Nexo',
  'Hyundai_Palisade', 'Hyundai_Santa_Fe', 'Hyundai_Sonata', 'Hyundai_Tucson',
  'Hyundai_Veloster', 'Hyundai_Venue', 'Hyundai_i10', 'Hyundai_i20',
  'Hyundai_i30', 'Hyundai_i40', 'Hyundai_ix20', 'Hyundai_ix35',
  
  // Infiniti
  'Infiniti_EX', 'Infiniti_FX', 'Infiniti_G', 'Infiniti_I', 'Infiniti_J',
  'Infiniti_M', 'Infiniti_Q30', 'Infiniti_Q40', 'Infiniti_Q45', 'Infiniti_Q50',
  'Infiniti_Q60', 'Infiniti_Q70', 'Infiniti_QX30', 'Infiniti_QX4', 'Infiniti_QX50',
  'Infiniti_QX56', 'Infiniti_QX60', 'Infiniti_QX70', 'Infiniti_QX80',
  
  // Isuzu
  'Isuzu_Amigo', 'Isuzu_Ascender', 'Isuzu_Axiom', 'Isuzu_Hombre',
  'Isuzu_Impulse', 'Isuzu_Oasis', 'Isuzu_Pickup', 'Isuzu_Rodeo',
  'Isuzu_Trooper', 'Isuzu_VehiCROSS',
  
  // Jaguar
  'Jaguar_E-Pace', 'Jaguar_F-Pace', 'Jaguar_F-Type', 'Jaguar_I-Pace',
  'Jaguar_S-Type', 'Jaguar_X-Type', 'Jaguar_XE', 'Jaguar_XF', 'Jaguar_XJ',
  'Jaguar_XK', 'Jaguar_XKR', 'Jaguar_XJS', 'Jaguar_E-Type', 'Jaguar_Mark_II',
  'Jaguar_Mark_X', 'Jaguar_XJ220',
  
  // Jeep
  'Jeep_Cherokee', 'Jeep_Compass', 'Jeep_Grand_Cherokee', 'Jeep_Liberty',
  'Jeep_Patriot', 'Jeep_Renegade', 'Jeep_Wrangler', 'Jeep_Commander',
  'Jeep_Gladiator', 'Jeep_Grand_Wagoneer', 'Jeep_Wagoneer',
  
  // Kia
  'Kia_Amanti', 'Kia_Borrego', 'Kia_Cadenza', 'Kia_Carnival', 'Kia_Cerato',
  'Kia_Forte', 'Kia_K5', 'Kia_K900', 'Kia_Niro', 'Kia_Optima', 'Kia_Rio',
  'Kia_Sedona', 'Kia_Seltos', 'Kia_Sorento', 'Kia_Soul', 'Kia_Sportage',
  'Kia_Stinger', 'Kia_Telluride', 'Kia_Picanto', 'Kia_Ceed', 'Kia_Proceed',
  'Kia_Xceed', 'Kia_EV6',
  
  // Koenigsegg
  'Koenigsegg_Agera', 'Koenigsegg_CCR', 'Koenigsegg_CCX', 'Koenigsegg_One:1',
  'Koenigsegg_Regera', 'Koenigsegg_Jesko', 'Koenigsegg_Gemera',
  
  // Lamborghini
  'Lamborghini_Aventador', 'Lamborghini_Countach', 'Lamborghini_Diablo',
  'Lamborghini_Gallardo', 'Lamborghini_Huracán', 'Lamborghini_Jalpa',
  'Lamborghini_Miura', 'Lamborghini_Murciélago', 'Lamborghini_Silhouette',
  'Lamborghini_Urus', 'Lamborghini_Veneno', 'Lamborghini_Espada',
  'Lamborghini_Jarama', 'Lamborghini_Islero', 'Lamborghini_400GT',
  'Lamborghini_350GT', 'Lamborghini_Sián', 'Lamborghini_Reventon',
  
  // Land Rover
  'Land_Rover_Defender', 'Land_Rover_Discovery', 'Land_Rover_Discovery_Sport',
  'Land_Rover_Freelander', 'Land_Rover_LR2', 'Land_Rover_LR3', 'Land_Rover_LR4',
  'Land_Rover_Range_Rover', 'Land_Rover_Range_Rover_Evoque',
  'Land_Rover_Range_Rover_Sport', 'Land_Rover_Range_Rover_Velar',
  
  // Lexus
  'Lexus_CT', 'Lexus_ES', 'Lexus_GS', 'Lexus_GX', 'Lexus_IS', 'Lexus_LC',
  'Lexus_LFA', 'Lexus_LS', 'Lexus_LX', 'Lexus_NX', 'Lexus_RC', 'Lexus_RX',
  'Lexus_SC', 'Lexus_UX', 'Lexus_NX_300h', 'Lexus_RX_450h', 'Lexus_UX_250h',
  
  // Lincoln
  'Lincoln_Aviator', 'Lincoln_Continental', 'Lincoln_Corsair', 'Lincoln_MKC',
  'Lincoln_MKS', 'Lincoln_MKT', 'Lincoln_MKX', 'Lincoln_MKZ', 'Lincoln_Navigator',
  'Lincoln_Nautilus', 'Lincoln_Town_Car', 'Lincoln_LS', 'Lincoln_Mark_VIII',
  'Lincoln_Mark_VII', 'Lincoln_Blackwood', 'Lincoln_Zephyr',
  
  // Lotus
  'Lotus_Elise', 'Lotus_Esprit', 'Lotus_Europa', 'Lotus_Evora', 'Lotus_Exige',
  'Lotus_Seven', 'Lotus_Elan', 'Lotus_Carlton', 'Lotus_Eclat', 'Lotus_Elite',
  'Lotus_Emira', 'Lotus_Evija',
  
  // Maserati
  'Maserati_Ghibli', 'Maserati_GranTurismo', 'Maserati_Levante',
  'Maserati_Quattroporte', 'Maserati_3200_GT', 'Maserati_4200_GT',
  'Maserati_Biturbo', 'Maserati_Bora', 'Maserati_Khamsin', 'Maserati_Merak',
  'Maserati_Shamal', 'Maserati_Spyder', 'Maserati_MC20', 'Maserati_GranCabrio',
  
  // Mazda
  'Mazda2', 'Mazda3', 'Mazda5', 'Mazda6', 'Mazda_B-Series', 'Mazda_CX-3',
  'Mazda_CX-5', 'Mazda_CX-7', 'Mazda_CX-9', 'Mazda_CX-30', 'Mazda_MX-5',
  'Mazda_MX-6', 'Mazda_Protege', 'Mazda_RX-7', 'Mazda_RX-8', 'Mazda_Tribute',
  'Mazda_MPV', 'Mazda_Millenia', 'Mazda_323', 'Mazda_626', 'Mazda_929',
  'Mazda_Demio', 'Mazda_Premacy', 'Mazda_Axela', 'Mazda_Atenza',
  
  // McLaren
  'McLaren_540C', 'McLaren_570S', 'McLaren_600LT', 'McLaren_650S',
  'McLaren_675LT', 'McLaren_720S', 'McLaren_765LT', 'McLaren_Artura',
  'McLaren_F1', 'McLaren_GT', 'McLaren_MP4-12C', 'McLaren_P1',
  'McLaren_Senna', 'McLaren_Speedtail', 'McLaren_Elva',
  
  // Mercedes-Benz
  'Mercedes-Benz_A-Class', 'Mercedes-Benz_B-Class', 'Mercedes-Benz_C-Class',
  'Mercedes-Benz_CLA-Class', 'Mercedes-Benz_CLS-Class', 'Mercedes-Benz_E-Class',
  'Mercedes-Benz_G-Class', 'Mercedes-Benz_GLA-Class', 'Mercedes-Benz_GLB-Class',
  'Mercedes-Benz_GLC-Class', 'Mercedes-Benz_GLE-Class', 'Mercedes-Benz_GLS-Class',
  'Mercedes-Benz_S-Class', 'Mercedes-Benz_SL-Class', 'Mercedes-Benz_SLC-Class',
  'Mercedes-Benz_SLK-Class', 'Mercedes-Benz_SLR_McLaren', 'Mercedes-Benz_SLS_AMG',
  'Mercedes-Benz_Sprinter', 'Mercedes-Benz_Vito', 'Mercedes-Benz_AMG_GT',
  'Mercedes-Benz_EQC', 'Mercedes-Benz_EQS', 'Mercedes-Benz_EQA',
  'Mercedes-Benz_EQB', 'Mercedes-Benz_EQE',
  
  // Mini
  'Mini_Cooper', 'Mini_Cooper_S', 'Mini_Clubman', 'Mini_Countryman',
  'Mini_Paceman', 'Mini_Roadster', 'Mini_Coupe', 'Mini_Convertible',
  'Mini_John_Cooper_Works', 'Mini_Electric',
  
  // Mitsubishi
  'Mitsubishi_3000GT', 'Mitsubishi_ASX', 'Mitsubishi_Diamante',
  'Mitsubishi_Eclipse', 'Mitsubishi_Galant', 'Mitsubishi_Lancer',
  'Mitsubishi_Lancer_Evolution', 'Mitsubishi_Mirage', 'Mitsubishi_Montero',
  'Mitsubishi_Outlander', 'Mitsubishi_Pajero', 'Mitsubishi_Spyder',
  'Mitsubishi_Starion', 'Mitsubishi_i-MiEV', 'Mitsubishi_Colt',
  'Mitsubishi_Carisma', 'Mitsubishi_Space_Star', 'Mitsubishi_Grandis',
  
  // Nissan
  'Nissan_350Z', 'Nissan_370Z', 'Nissan_Altima', 'Nissan_Armada',
  'Nissan_Cube', 'Nissan_Frontier', 'Nissan_GT-R', 'Nissan_Juke',
  'Nissan_Leaf', 'Nissan_Maxima', 'Nissan_Murano', 'Nissan_Pathfinder',
  'Nissan_Patrol', 'Nissan_Pulsar', 'Nissan_Qashqai', 'Nissan_Quest',
  'Nissan_Rogue', 'Nissan_Sentra', 'Nissan_Skyline', 'Nissan_Sunny',
  'Nissan_Teana', 'Nissan_Titan', 'Nissan_Versa', 'Nissan_X-Trail',
  'Nissan_Xterra', 'Nissan_240SX', 'Nissan_300ZX', 'Nissan_Silvia',
  'Nissan_Primera', 'Nissan_Almera', 'Nissan_Micra', 'Nissan_Note',
  'Nissan_Tiida', 'Nissan_Kicks', 'Nissan_Ariya',
  
  // Opel
  'Opel_Adam', 'Opel_Antara', 'Opel_Astra', 'Opel_Calibra', 'Opel_Combo',
  'Opel_Corsa', 'Opel_Crossland', 'Opel_Grandland', 'Opel_Insignia',
  'Opel_Karl', 'Opel_Meriva', 'Opel_Mokka', 'Opel_Tigra', 'Opel_Vectra',
  'Opel_Vivaro', 'Opel_Zafira', 'Opel_Omega', 'Opel_Kadett', 'Opel_Manta',
  'Opel_GT', 'Opel_Speedster', 'Opel_Agila', 'Opel_Signum',
  
  // Pagani
  'Pagani_Zonda', 'Pagani_Huayra', 'Pagani_Imola', 'Pagani_Utopia',
  
  // Peugeot
  'Peugeot_106', 'Peugeot_107', 'Peugeot_108', 'Peugeot_205', 'Peugeot_206',
  'Peugeot_207', 'Peugeot_208', 'Peugeot_301', 'Peugeot_306', 'Peugeot_307',
  'Peugeot_308', 'Peugeot_309', 'Peugeot_405', 'Peugeot_406', 'Peugeot_407',
  'Peugeot_408', 'Peugeot_505', 'Peugeot_508', 'Peugeot_605', 'Peugeot_607',
  'Peugeot_806', 'Peugeot_807', 'Peugeot_1007', 'Peugeot_2008', 'Peugeot_3008',
  'Peugeot_4007', 'Peugeot_4008', 'Peugeot_5008', 'Peugeot_RCZ',
  'Peugeot_Partner', 'Peugeot_Bipper', 'Peugeot_Boxer', 'Peugeot_Expert',
  
  // Porsche
  'Porsche_911', 'Porsche_918', 'Porsche_924', 'Porsche_928', 'Porsche_944',
  'Porsche_968', 'Porsche_Boxster', 'Porsche_Cayenne', 'Porsche_Cayman',
  'Porsche_Carrera_GT', 'Porsche_Macan', 'Porsche_Panamera', 'Porsche_Taycan',
  'Porsche_356', 'Porsche_550', 'Porsche_959', 'Porsche_914',
  
  // Ram
  'Ram_1500', 'Ram_2500', 'Ram_3500', 'Ram_ProMaster', 'Ram_ProMaster_City',
  
  // Renault
  'Renault_Captur', 'Renault_Clio', 'Renault_Duster', 'Renault_Espace',
  'Renault_Fluence', 'Renault_Kadjar', 'Renault_Koleos', 'Renault_Laguna',
  'Renault_Logan', 'Renault_Megane', 'Renault_Modus', 'Renault_Sandero',
  'Renault_Scenic', 'Renault_Symbol', 'Renault_Talisman', 'Renault_Twingo',
  'Renault_Vel_Satis', 'Renault_Wind', 'Renault_Zoe', 'Renault_19',
  'Renault_21', 'Renault_25', 'Renault_5', 'Renault_9', 'Renault_11',
  'Renault_Alpine_A110', 'Renault_Spider', 'Renault_Sport_Spider',
  
  // Rolls-Royce
  'Rolls-Royce_Cullinan', 'Rolls-Royce_Dawn', 'Rolls-Royce_Ghost',
  'Rolls-Royce_Phantom', 'Rolls-Royce_Silver_Seraph', 'Rolls-Royce_Wraith',
  'Rolls-Royce_Corniche', 'Rolls-Royce_Silver_Spirit', 'Rolls-Royce_Silver_Spur',
  'Rolls-Royce_Park_Ward', 'Rolls-Royce_Spectre',
  
  // Saab
  'Saab_9-3', 'Saab_9-5', 'Saab_9-7X', 'Saab_900', 'Saab_9000',
  'Saab_92', 'Saab_93', 'Saab_94', 'Saab_95', 'Saab_96', 'Saab_97',
  'Saab_99', 'Saab_Sonett',
  
  // Seat
  'Seat_Alhambra', 'Seat_Altea', 'Seat_Arona', 'Seat_Ateca', 'Seat_Cordoba',
  'Seat_Exeo', 'Seat_Ibiza', 'Seat_Leon', 'Seat_Marbella', 'Seat_Mii',
  'Seat_Tarraco', 'Seat_Toledo', 'Seat_Cupra', 'Seat_Formentor',
  
  // Skoda
  'Skoda_Citigo', 'Skoda_Fabia', 'Skoda_Kamiq', 'Skoda_Karoq', 'Skoda_Kodiaq',
  'Skoda_Octavia', 'Skoda_Rapid', 'Skoda_Roomster', 'Skoda_Scala',
  'Skoda_Superb', 'Skoda_Yeti', 'Skoda_Felicia', 'Skoda_Favorit',
  'Skoda_Estelle', 'Skoda_110', 'Skoda_120', 'Skoda_130', 'Skoda_Enyaq',
  
  // Smart
  'Smart_Fortwo', 'Smart_Forfour', 'Smart_Roadster', 'Smart_Crossblade',
  'Smart_EQfortwo', 'Smart_EQforfour',
  
  // Subaru
  'Subaru_Ascent', 'Subaru_BRZ', 'Subaru_Crosstrek', 'Subaru_Forester',
  'Subaru_Impreza', 'Subaru_Legacy', 'Subaru_Outback', 'Subaru_SVX',
  'Subaru_Tribeca', 'Subaru_WRX', 'Subaru_Baja', 'Subaru_Justy',
  'Subaru_Loyale', 'Subaru_XT', 'Subaru_Alcyone', 'Subaru_Leone',
  'Subaru_Vivio', 'Subaru_Pleo', 'Subaru_Stella', 'Subaru_R2', 'Subaru_R1',
  
  // Suzuki
  'Suzuki_Alto', 'Suzuki_Baleno', 'Suzuki_Celerio', 'Suzuki_Ciaz',
  'Suzuki_Cultus', 'Suzuki_Ertiga', 'Suzuki_Esteem', 'Suzuki_Forenza',
  'Suzuki_Grand_Vitara', 'Suzuki_Ignis', 'Suzuki_Jimny', 'Suzuki_Kizashi',
  'Suzuki_Liana', 'Suzuki_Reno', 'Suzuki_Samurai', 'Suzuki_Sidekick',
  'Suzuki_Swift', 'Suzuki_SX4', 'Suzuki_Verona', 'Suzuki_Vitara',
  'Suzuki_Wagon_R', 'Suzuki_X-90', 'Suzuki_XL7', 'Suzuki_Aerio',
  'Suzuki_Cappuccino', 'Suzuki_Escudo', 'Suzuki_Every', 'Suzuki_Hayabusa',
  'Suzuki_GSX-R1000', 'Suzuki_Katana', 'Suzuki_Splash',
  
  // Tesla
  'Tesla_Model_3', 'Tesla_Model_S', 'Tesla_Model_X', 'Tesla_Model_Y',
  'Tesla_Cybertruck', 'Tesla_Roadster', 'Tesla_Semi',
  
  // Toyota
  'Toyota_4Runner', 'Toyota_Avalon', 'Toyota_Avensis', 'Toyota_Aygo',
  'Toyota_C-HR', 'Toyota_Camry', 'Toyota_Celica', 'Toyota_Corolla',
  'Toyota_Crown', 'Toyota_FJ_Cruiser', 'Toyota_Fortuner', 'Toyota_GT86',
  'Toyota_Highlander', 'Toyota_Hilux', 'Toyota_Land_Cruiser', 'Toyota_Matrix',
  'Toyota_MR2', 'Toyota_Prius', 'Toyota_RAV4', 'Toyota_Sequoia', 'Toyota_Sienna',
  'Toyota_Solara', 'Toyota_Supra', 'Toyota_Tacoma', 'Toyota_Tundra',
  'Toyota_Venza', 'Toyota_Yaris', 'Toyota_Verso', 'Toyota_Previa',
  'Toyota_Picnic', 'Toyota_Tercios', 'Toyota_Starlet', 'Toyota_Paseo',
  'Toyota_Echo', 'Toyota_Cressida', 'Toyota_Camry_Solara', 'Toyota_Vitz',
  'Toyota_Wish', 'Toyota_Alphard', 'Toyota_Estima', 'Toyota_Noah',
  'Toyota_Voxy', 'Toyota_Hiace', 'Toyota_Dyna', 'Toyota_Coaster',
  'Toyota_bZ4X', 'Toyota_Mirai', 'Toyota_GR_Supra', 'Toyota_GR_86',
  'Toyota_GR_Yaris',
  
  // Volkswagen
  'Volkswagen_Arteon', 'Volkswagen_Atlas', 'Volkswagen_Beetle', 'Volkswagen_CC',
  'Volkswagen_Eos', 'Volkswagen_Golf', 'Volkswagen_GTI', 'Volkswagen_Jetta',
  'Volkswagen_Passat', 'Volkswagen_Phaeton', 'Volkswagen_Polo', 'Volkswagen_Routan',
  'Volkswagen_Tiguan', 'Volkswagen_Touareg', 'Volkswagen_Touran', 'Volkswagen_up!',
  'Volkswagen_Amarok', 'Volkswagen_Caddy', 'Volkswagen_Crafter', 'Volkswagen_Multivan',
  'Volkswagen_Sharan', 'Volkswagen_Transporter', 'Volkswagen_Scirocco',
  'Volkswagen_Corrado', 'Volkswagen_Lupo', 'Volkswagen_Fox', 'Volkswagen_Bora',
  'Volkswagen_Vento', 'Volkswagen_Golf_R', 'Volkswagen_ID.3', 'Volkswagen_ID.4',
  'Volkswagen_ID.Buzz', 'Volkswagen_T-Cross', 'Volkswagen_T-Roc',
  
  // Volvo
  'Volvo_240', 'Volvo_260', 'Volvo_740', 'Volvo_760', 'Volvo_780', 'Volvo_850',
  'Volvo_940', 'Volvo_960', 'Volvo_C30', 'Volvo_C70', 'Volvo_S40', 'Volvo_S60',
  'Volvo_S70', 'Volvo_S80', 'Volvo_S90', 'Volvo_V40', 'Volvo_V50', 'Volvo_V60',
  'Volvo_V70', 'Volvo_V90', 'Volvo_XC40', 'Volvo_XC60', 'Volvo_XC70', 'Volvo_XC90',
  'Volvo_142', 'Volvo_144', 'Volvo_145', 'Volvo_164', 'Volvo_262', 'Volvo_264',
  'Volvo_P1800', 'Volvo_Amazon', 'Volvo_PV444', 'Volvo_PV544', 'Volvo_Duett',
  'Volvo_Laplander', 'Volvo_Polestar_1', 'Volvo_Polestar_2', 'Volvo_EX30',
  'Volvo_EX90', 'Volvo_EC40', 'Volvo_EM90'
];

module.exports = carDatabase;