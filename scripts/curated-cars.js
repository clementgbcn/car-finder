// Curated list of well-known cars with confirmed Wikipedia pages
const curatedCars = [
  // Popular sports cars
  'Ferrari_F40', 'Ferrari_F50', 'Ferrari_Enzo', 'Ferrari_LaFerrari',
  'Lamborghini_Countach', 'Lamborghini_Diablo', 'Lamborghini_Gallardo', 'Lamborghini_Aventador',
  'Porsche_911', 'Porsche_Boxster', 'Porsche_Cayman', 'Porsche_Cayenne',
  'McLaren_F1', 'McLaren_P1', 'McLaren_720S', 'McLaren_Senna',
  'Bugatti_Veyron', 'Bugatti_Chiron',
  'Koenigsegg_Agera', 'Koenigsegg_Regera',
  'Pagani_Zonda', 'Pagani_Huayra',
  
  // German luxury
  'BMW_M3', 'BMW_M5', 'BMW_X5', 'BMW_i8',
  'Mercedes-Benz_SLS_AMG', 'Mercedes-Benz_G-Class', 'Mercedes-Benz_S-Class',
  'Audi_R8', 'Audi_A4', 'Audi_Q7', 'Audi_TT',
  
  // British cars
  'Aston_Martin_DB11', 'Aston_Martin_Vantage', 'Aston_Martin_DBS',
  'Bentley_Continental_GT', 'Bentley_Mulsanne',
  'Rolls-Royce_Phantom', 'Rolls-Royce_Ghost',
  'Jaguar_F-Type', 'Jaguar_XE', 'Jaguar_XF',
  'Land_Rover_Range_Rover', 'Land_Rover_Defender',
  'Lotus_Elise', 'Lotus_Exige', 'Lotus_Evora',
  'Mini_Cooper',
  
  // American muscle/classics
  'Ford_Mustang', 'Ford_GT', 'Ford_F-150',
  'Chevrolet_Camaro', 'Chevrolet_Corvette', 'Chevrolet_Silverado',
  'Dodge_Challenger', 'Dodge_Charger', 'Dodge_Viper',
  'Cadillac_Escalade', 'Cadillac_CTS',
  
  // Japanese performance
  'Nissan_GT-R', 'Nissan_350Z', 'Nissan_Skyline',
  'Toyota_Supra', 'Toyota_86', 'Toyota_Prius',
  'Honda_NSX', 'Honda_Civic_Type_R', 'Honda_Accord',
  'Subaru_Impreza_WRX', 'Subaru_BRZ',
  'Mitsubishi_Lancer_Evolution',
  'Mazda_MX-5', 'Mazda_RX-7', 'Mazda_RX-8',
  'Lexus_LFA', 'Lexus_LS', 'Lexus_RX',
  'Infiniti_G37', 'Infiniti_Q50',
  'Acura_NSX', 'Acura_TLX',
  
  // Italian classics
  'Alfa_Romeo_4C', 'Alfa_Romeo_Giulia', 'Alfa_Romeo_Spider',
  'Fiat_500', 'Fiat_Panda',
  'Maserati_GranTurismo', 'Maserati_Quattroporte',
  
  // Electric/Modern
  'Tesla_Model_S', 'Tesla_Model_3', 'Tesla_Model_X', 'Tesla_Model_Y',
  'Tesla_Roadster',
  'Rimac_Nevera',
  'Lotus_Evija',
  'Porsche_Taycan',
  
  // European mainstream
  'Volkswagen_Golf', 'Volkswagen_Beetle', 'Volkswagen_Passat',
  'BMW_3_Series', 'BMW_5_Series', 'BMW_X3',
  'Mercedes-Benz_C-Class', 'Mercedes-Benz_E-Class',
  'Audi_A3', 'Audi_Q5',
  'Volvo_XC90', 'Volvo_S60', 'Volvo_V60',
  'Saab_9-3', 'Saab_9-5',
  
  // French cars
  'Peugeot_208', 'Peugeot_308', 'Peugeot_508',
  'Citroën_C3', 'Citroën_C4', 'Citroën_DS3',
  'Renault_Clio', 'Renault_Megane', 'Renault_Scenic',
  
  // Korean cars
  'Hyundai_Elantra', 'Hyundai_Sonata', 'Hyundai_Tucson',
  'Kia_Optima', 'Kia_Sorento', 'Kia_Soul',
  'Genesis_G90', 'Genesis_G80',
  
  // Additional popular models
  'Jeep_Wrangler', 'Jeep_Grand_Cherokee',
  'Range_Rover_Evoque', 'Range_Rover_Sport',
  'Porsche_Macan', 'Porsche_Panamera',
  'Maserati_Levante',
  'Alfa_Romeo_Stelvio',
  'Jaguar_I-Pace', 'Jaguar_E-Pace',
  'Volvo_XC40', 'Volvo_XC60',
  'Mercedes-Benz_GLA-Class', 'Mercedes-Benz_GLC-Class',
  'BMW_X1', 'BMW_X6',
  'Audi_Q3', 'Audi_Q8',
  
  // Classic icons
  'Ford_Escort', 'Ford_Focus', 'Ford_Fiesta',
  'Vauxhall_Corsa', 'Vauxhall_Astra',
  'Opel_Corsa', 'Opel_Astra',
  'Škoda_Octavia', 'Škoda_Superb', 'Škoda_Fabia',
  'Seat_Leon', 'Seat_Ibiza',
  'Toyota_Camry', 'Toyota_Corolla', 'Toyota_RAV4',
  'Honda_Civic', 'Honda_CR-V', 'Honda_Pilot',
  'Nissan_Altima', 'Nissan_Sentra', 'Nissan_Rogue',
  'Mazda_3', 'Mazda_6', 'Mazda_CX-5',
  'Subaru_Outback', 'Subaru_Forester', 'Subaru_Legacy',
  'Mitsubishi_Outlander', 'Mitsubishi_Eclipse',
  
  // Trucks and SUVs
  'Ford_F-Series', 'Chevrolet_Tahoe', 'GMC_Sierra',
  'Ram_1500', 'Toyota_Tundra', 'Nissan_Titan',
  'Toyota_4Runner', 'Toyota_Highlander',
  'Honda_Ridgeline', 'Honda_Passport',
  'Jeep_Cherokee', 'Jeep_Compass',
  'Hyundai_Santa_Fe', 'Kia_Telluride',
  'Mazda_CX-9', 'Subaru_Ascent',
  
  // Luxury sedans
  'BMW_7_Series', 'Mercedes-Benz_S-Class', 'Audi_A8',
  'Lexus_LS', 'Genesis_G90', 'Cadillac_CT6',
  'Lincoln_Continental', 'Volvo_S90',
  'Jaguar_XJ', 'Maserati_Ghibli',
  
  // Convertibles
  'BMW_Z4', 'Mercedes-Benz_SL-Class', 'Audi_A5_Cabriolet',
  'Porsche_Boxster', 'Jaguar_F-Type_Convertible',
  'Chevrolet_Camaro_Convertible', 'Ford_Mustang_Convertible',
  'Mazda_MX-5_Miata', 'Fiat_124_Spider',
  
  // Hatchbacks
  'Volkswagen_Golf_GTI', 'Honda_Civic_Hatchback',
  'Mazda_3_Hatchback', 'Hyundai_Veloster',
  'Ford_Focus_ST', 'Subaru_Impreza_Hatchback',
  'Toyota_Yaris', 'Nissan_Versa_Note',
  
  // Wagons
  'Volvo_V90', 'Mercedes-Benz_E-Class_Wagon',
  'BMW_3_Series_Touring', 'Audi_A4_Allroad',
  'Subaru_Outback', 'Volkswagen_Golf_SportWagen'
];

module.exports = curatedCars;