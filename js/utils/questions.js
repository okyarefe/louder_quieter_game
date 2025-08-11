const questions = [
    {
        "itemName": "Ambulance Siren",
        "dB": "114",
        "imagePath": "/assets/images/Ambulance_Siren_114.png"
    },
    {
        "itemName": "Bagpipe",
        "dB": "103",
        "imagePath": "assets/images/Bagpipe_103.png"
    },
    {
        "itemName": "Balloon Popping",
        "dB": "114",
        "imagePath": "assets/images/Balloon_Popping_114.png"
    },
    {
        "itemName": "Blue Whale",
        "dB": "188",
        "imagePath": "assets/images/Blue_Whale_188.png"
    },
    {
        "itemName": "Boeing 747  (Takeoff) ",
        "dB": "140",
        "imagePath": "assets/images/Boeing_747_(Takeoff)_140.png"
    },
    {
        "itemName": "Bumblebee  (Buzzing) ",
        "dB": "40",
        "imagePath": "assets/images/Bumblebee_(Buzzing)_40.png"
    },
    {
        "itemName": "Car Horn",
        "dB": "109",
        "imagePath": "assets/images/Car_Horn_109.png"
    },
    {
        "itemName": "Chainsaw",
        "dB": "118",
        "imagePath": "assets/images/Chainsaw_118.png"
    },
    {
        "itemName": "Chameleon Hissing",
        "dB": "38",
        "imagePath": "assets/images/Chameleon_Hissing_38.png"
    },
    {
        "itemName": "Cicada  (Loudest Insect) ",
        "dB": "120",
        "imagePath": "assets/images/Cicada_(Loudest Insect)_120.png"
    },
    {
        "itemName": "Conventional Locomotive",
        "dB": "108",
        "imagePath": "assets/images/Conventional_Locomotive_108.png"
    },
    {
        "itemName": "Coquí Frog  (Loudest Frog Croak) ",
        "dB": "90",
        "imagePath": "assets/images/Coquí_Frog_(Loudest Frog Croak)_90.png"
    },
    {
        "itemName": "Cow Mooing",
        "dB": "88",
        "imagePath": "assets/images/Cow_Mooing_88.png"
    },
    {
        "itemName": "Crying Baby",
        "dB": "111",
        "imagePath": "assets/images/Crying_Baby_111.png"
    },
    {
        "itemName": "Drum Set",
        "dB": "116",
        "imagePath": "assets/images/Drum_Set_116.png"
    },
    {
        "itemName": "Electric Car",
        "dB": "62",
        "imagePath": "assets/images/Electric_Car_62.png"
    },
    {
        "itemName": "Electric Toothbrush",
        "dB": "62",
        "imagePath": "assets/images/Electric_Toothbrush_62.png"
    },
    {
        "itemName": "Elephant Trumpet",
        "dB": "110",
        "imagePath": "assets/images/Elephant_Trumpet_110.png"
    },
    {
        "itemName": "F16 In Flight",
        "dB": "140",
        "imagePath": "assets/images/F16_In_Flight_140.png"
    },
    {
        "itemName": "Finger Snap",
        "dB": "68",
        "imagePath": "assets/images/Finger_Snap_68.png"
    },
    {
        "itemName": "Formula 1 Crowd",
        "dB": "123",
        "imagePath": "assets/images/Formula_1_Crowd_123.png"
    },
    {
        "itemName": "Formula E Crowd",
        "dB": "92",
        "imagePath": "assets/images/Formula_E_Crowd_92.png"
    },
    {
        "itemName": "Grasshopper Rustling",
        "dB": "41",
        "imagePath": "assets/images/Grasshopper_Rustling_41.png"
    },
    {
        "itemName": "Hair Dryer",
        "dB": "86",
        "imagePath": "assets/images/Hair_Dryer_86.png"
    },
    {
        "itemName": "Howler Mokey  (Loudest Primate) ",
        "dB": "140",
        "imagePath": "assets/images/Howler_Mokey_(Loudest_Primate)_140.png"
    },
    {
        "itemName": "Jetski",
        "dB": "93",
        "imagePath": "assets/images/Jetski_93.png"
    },
    {
        "itemName": "Kalimba",
        "dB": "53",
        "imagePath": "assets/images/Kalimba_53.png"
    },
    {
        "itemName": "Kitchen Mixer",
        "dB": "87",
        "imagePath": "assets/images/Kitchen_Mixer_87.png"
    },
    {
        "itemName": "Lawn Mower",
        "dB": "85",
        "imagePath": "assets/images/Lawn_Mower_85.png"
    },
    {
        "itemName": "Leaf Blower",
        "dB": "99",
        "imagePath": "assets/images/Leaf_Blower_99.png"
    },
    {
        "itemName": "Leaves  (Rustling) ",
        "dB": "20",
        "imagePath": "assets/images/Leaves_(Rustling)_20.png"
    },
    {
        "itemName": "Lightning Strike",
        "dB": "130",
        "imagePath": "assets/images/Lightning_Strike_130.png"
    },
    {
        "itemName": "Lion  (Roaring) ",
        "dB": "114",
        "imagePath": "assets/images/Lion_(Roaring)_114.png"
    },
    {
        "itemName": "Loudest Burp",
        "dB": "109",
        "imagePath": "assets/images/Loudest_Burp_109.png"
    },
    {
        "itemName": "Loudest Cat",
        "dB": "68",
        "imagePath": "assets/images/Loudest_Cat_68.png"
    },
    {
        "itemName": "Loudest Dog",
        "dB": "113",
        "imagePath": "assets/images/Loudest_Dog_113.png"
    },
    {
        "itemName": "Loudest Fart",
        "dB": "118",
        "imagePath": "assets/images/Loudest_Fart_118.png"
    },
    {
        "itemName": "Loudest Football Stadium  (Ali Sami Yen Istanbul) ",
        "dB": "131",
        "imagePath": "assets/images/Loudest_Football_Stadium_(Ali_Sami_Yen_Istanbul)_131.png"
    },
    {
        "itemName": "Loudest Human Scream",
        "dB": "129",
        "imagePath": "assets/images/Loudest_Human_Scream_129.png"
    },
    {
        "itemName": "Loudest Snore",
        "dB": "93",
        "imagePath": "assets/images/Loudest_Snore_93.png"
    },
    {
        "itemName": "Mars Rover  (On Mars) ",
        "dB": "20",
        "imagePath": "assets/images/Mars_Rover_(On_Mars)_20.png"
    },
    {
        "itemName": "Mosquito Buzzing",
        "dB": "34",
        "imagePath": "assets/images/Mosquito_Buzzing_34.png"
    },
    {
        "itemName": "Niagara Falls",
        "dB": "95",
        "imagePath": "assets/images/Niagara_Falls_95.png"
    },
    {
        "itemName": "Pig  (Squeal) ",
        "dB": "115",
        "imagePath": "assets/images/Pig_(Squeal)_115.png"
    },
    {
        "itemName": "PistolShot",
        "dB": "160",
        "imagePath": "assets/images/PistolShot_160.png"
    },
    {
        "itemName": "Pistol Shrimp Snap",
        "dB": "210",
        "imagePath": "assets/images/Pistol_Shrimp_Snap_210.png"
    },
    {
        "itemName": "Popcorn Machine",
        "dB": "91",
        "imagePath": "assets/images/Popcorn_Machine_91.png"
    },
    {
        "itemName": "Rain On Asphalt",
        "dB": "50",
        "imagePath": "assets/images/Rain_On_Asphalt_50.png"
    },
    {
        "itemName": "Refrigerator",
        "dB": "42",
        "imagePath": "assets/images/Refrigerator_42.png"
    },
    {
        "itemName": "Rocket Launch",
        "dB": "181",
        "imagePath": "assets/images/Rocket_Launch_181.png"
    },
    {
        "itemName": "Rock Concert",
        "dB": "123",
        "imagePath": "assets/images/Rock_Concert_123.png"
    },
    {
        "itemName": "Rooster Crow",
        "dB": "130",
        "imagePath": "assets/images/Rooster_Crow_130.png"
    },
    {
        "itemName": "Shinkansen  (Japanese High-Speed Bullet Train) ",
        "dB": "85",
        "imagePath": "assets/images/Shinkansen_(Japanese_High-Speed_Bullet_Train)_85.png"
    },
    {
        "itemName": "Slurping",
        "dB": "55",
        "imagePath": "assets/images/Slurping_55.png"
    },
    {
        "itemName": "Sneeze",
        "dB": "97",
        "imagePath": "assets/images/Sneeze_97.png"
    },
    {
        "itemName": "Snowflakes",
        "dB": "0",
        "imagePath": "assets/images/Snowflakes_0.png"
    },
    {
        "itemName": "Sparkler Fizz",
        "dB": "61",
        "imagePath": "assets/images/Sparkler_Fizz_61.png"
    },
    {
        "itemName": "Suppressed Pistol",
        "dB": "120",
        "imagePath": "assets/images/Suppressed_Pistol_120.png"
    },
    {
        "itemName": "Toilet Flush",
        "dB": "70",
        "imagePath": "assets/images/Toilet_Flush_70.png"
    },
    {
        "itemName": "Tornado",
        "dB": "115",
        "imagePath": "assets/images/Tornado_115.png"
    },
    {
        "itemName": "Tractor",
        "dB": "92",
        "imagePath": "assets/images/Tractor_92.png"
    },
    {
        "itemName": "Trumpet",
        "dB": "109",
        "imagePath": "assets/images/Trumpet_109.png"
    },
    {
        "itemName": "Vacuum Cleaner",
        "dB": "78",
        "imagePath": "assets/images/Vacuum_Cleaner_78.png"
    },
    {
        "itemName": "Volcano Eruption  (Krakatau) ",
        "dB": "189",
        "imagePath": "assets/images/Volcano_Eruption_(Krakatau)_189.png"
    },
    {
        "itemName": "Wall Clock Ticking",
        "dB": "33",
        "imagePath": "assets/images/Wall_Clock_Ticking_33.png"
    },
    {
        "itemName": "Washing Machine",
        "dB": "74",
        "imagePath": "assets/images/Washing_Machine_74.png"
    },
    {
        "itemName": "Wolf  (Howl) ",
        "dB": "115",
        "imagePath": "assets/images/Wolf_(Howl)_115.png"
    }
];