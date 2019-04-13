import t001b from '../Images/tshirts/t001b.png';
import t001w from '../Images/tshirts/t001w.png';
import t001pur from '../Images/tshirts/t001pur.png';
import t001p from '../Images/tshirts/t001p.png';

import t002b from '../Images/tshirts/t002b.png';
import t002w from '../Images/tshirts/t002w.png';
import t002pur from '../Images/tshirts/t002pur.png';
import t002p from '../Images/tshirts/t002p.png';

import t003b from '../Images/tshirts/t003b.png';
import t003w from '../Images/tshirts/t003w.png';
import t003pur from '../Images/tshirts/t003pur.png';
import t003p from '../Images/tshirts/t003p.png';

import t004b from '../Images/tshirts/t004b.png';
import t004pur from '../Images/tshirts/t004pur.png';
import t004p from '../Images/tshirts/t004p.png';

import t005b from '../Images/tshirts/t005b.png';
import t005pur from '../Images/tshirts/t005pur.png';
import t005p from '../Images/tshirts/t005p.png';

import t006b from '../Images/tshirts/t006b.png';
import t006w from '../Images/tshirts/t006w.png';
import t006pur from '../Images/tshirts/t006pur.png';
import t006p from '../Images/tshirts/t006p.png';

import t007b from '../Images/tshirts/t007b.png';
import t007w from '../Images/tshirts/t007w.png';
import t007pur from '../Images/tshirts/t007pur.png';
import t007p from '../Images/tshirts/t007p.png';

import t008b from '../Images/tshirts/t008b.png';
import t008w from '../Images/tshirts/t008w.png';
import t008pur from '../Images/tshirts/t008pur.png';
import t008p from '../Images/tshirts/t008p.png';

import t009b from '../Images/tshirts/t009b.png';
import t009w from '../Images/tshirts/t009w.png';
import t009pur from '../Images/tshirts/t009pur.png';
import t009p from '../Images/tshirts/t009p.png';

import t010b from '../Images/tshirts/t010b.png';
import t010w from '../Images/tshirts/t010w.png';
import t010pur from '../Images/tshirts/t010pur.png';
import t010p from '../Images/tshirts/t010p.png';

import t011b from '../Images/tshirts/t011b.png';
import t011pur from '../Images/tshirts/t011pur.png';
import t011p from '../Images/tshirts/t011p.png';

import t012b from '../Images/tshirts/t012b.png';
import t012w from '../Images/tshirts/t012w.png';
import t012pur from '../Images/tshirts/t012pur.png';
import t012p from '../Images/tshirts/t012p.png';

import t013b from '../Images/tshirts/t013b.png';
import t013w from '../Images/tshirts/t013w.png';
import t013pur from '../Images/tshirts/t013pur.png';
import t013p from '../Images/tshirts/t013p.png';

import t014b from '../Images/tshirts/t014b.png';
import t014w from '../Images/tshirts/t014w.png';
import t014pur from '../Images/tshirts/t014pur.png';
import t014p from '../Images/tshirts/t014p.png';

import t015b from '../Images/tshirts/t015b.png';
import t015w from '../Images/tshirts/t015w.png';
import t015pur from '../Images/tshirts/t015pur.png';
import t015p from '../Images/tshirts/t015p.png';

import mouse from '../Images/gear/mouse.png';
import keyboard from '../Images/gear/keyboard.png';
import keyboard2 from '../Images/gear/keyboard2.jpg';
import keyboard3 from '../Images/gear/keyboard3.jpg';
import keyboard4 from '../Images/gear/keyboard4.jpg';

import LeagueRP from '../Images/rpmarket.png';
import fortVBUCKS from '../Images/vbucksmarket.png';
import tibiaMarket from '../Images/tibiamarket.png';

export default function() {
    return {
      items: [
        {
          soldBy: "GG-Egypt",
          Name: "Tibia Premium / Ingame-Cash / All Worlds",
          price: 0,
          options: [{option: "1-month premium", price: 170}, 
                    {option: "3-month premium", price: 480}, 
                    {option: "6-month premium", price: 900},
                    {option: "1-year premium", price: 1600},
                    {option: "100cc In-Game", price: 50},
                    {option: "500cc In-Game", price: 230}],
          defaultOpt: "",
          desc: "Tibia MMORPG Premium/In-game Cash, Fast and secure transactions, 2 hours delivery because we have big in-game stock, You only need to provide your character name.",
          rarity: "rare",
          img:[tibiaMarket],
          defaultImage: tibiaMarket
        },
        {
          soldBy: "GG-Egypt",
          Name: "League of legends RP",
          price: 0,
          options: [{option: "310RP", price: 52.50}, {option: "650RP", price: 105}, {option: "1380RP", price: 205}],
          defaultOpt: "",
          desc: "League of legends | Riot Points, Add us in-game 24-hours before buying for instant delivery, EUW: Kimox",
          rarity: "legendary",
          img:[LeagueRP],
          defaultImage: LeagueRP
        },
        {
          soldBy: "GG-Egypt",
          Name: "Fortnite V-Bucks",
          price: 0,
          options: [{option: "1,000 V-Bucks", price: 190}, {option: "2,800 V-bucks", price: 475}, {option: "7,500 V-Bucks", price: 1140}, {option: "13,500 V-Bucks", price: 1900}],
          defaultOpt: "",
          desc: "Fortnite | V-Bucks, PC AND MOBILE ONLY, 24-hours delivery at max, You will need to add us ingame 24 hours before your purchase for instant delivery",
          rarity: "epic",
          img:[fortVBUCKS],
          defaultImage: fortVBUCKS
        },
        {
          soldBy: "GG-Egypt",
          Name: "A4tech Bloody A60",
          price: 550,
          category: "Gaming Accessories",
          color: "black",
          desc: "Sensor: AVAGO A3050 Gaming Engine., Adjustable resolution 800/1000/1200/1600/4000 CPI., Instant upgrade sniping techniques by applying 6 powerful sniping modes.",
          defaultImage: mouse,
          img: [mouse],
          info: "Gaming Mouse",
          rarity: "legendary",
        },
        {
          soldBy: "GG-Egypt",
          Name: "Mercury MK59",
          price: 300,
          discount: 10,
          category: "Gaming Accessories",
          color: "black",
          desc: "Connectivity : USB, Keyboard Language : English & Arabic, Model Number : MK59, Brand : Mercury, Compatible with : All",
          defaultImage: keyboard,
          img: [keyboard, keyboard2, keyboard3, keyboard4],
          info: "Gaming Keyboard",
          rarity: "epic"
        },
        {
          soldBy: "GG-Egypt",
          Name: "Dab on them",
          price: 100,
          rarity: "rare",
          discount: 50,
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t001b, t001w, t001pur, t001p],
          defaultImage: t001b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t001b}, {label: "White", value: t001w}, {label: "Purple", value: t001pur}, {label: "Petroleum", value: t001p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "Spitfire",
          price: 100,
          rarity: "legendary",
          discount: 10,
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t002b, t002w, t002pur, t002p],
          defaultImage: t002b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t002b}, {label: "White", value: t002w}, {label: "Purple", value: t002pur}, {label: "Petroleum", value: t002p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "LLamaaaa",
          price: 100,
          rarity: "epic",
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t003b, t003w, t003pur, t003p],
          defaultImage: t003b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t003b}, {label: "White", value: t003w}, {label: "Purple", value: t003pur}, {label: "Petroleum", value: t003p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "Chicken Dinner",
          price: 100,
          rarity: "legendary",
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t004b, t004pur, t004p],
          defaultImage: t004b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t004b}, {label: "Purple", value: t004pur}, {label: "Petroleum", value: t004p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "Sanhok",
          price: 100,
          rarity: "rare",
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t005b, t005pur, t005p],
          defaultImage: t005b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t005b}, {label: "Purple", value: t005pur}, {label: "Petroleum", value: t005p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "Draaaaaaaaaaaven",
          price: 100,
          rarity: "epic",
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t006b, t006w, t006pur, t006p],
          defaultImage: t006b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t006b}, {label: "White", value: t006w}, {label: "Purple", value: t006pur}, {label: "Petroleum", value: t006p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "Iron Tryhard",
          price: 100,
          rarity: "uncommon",
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t007b, t007w, t007pur, t007p],
          defaultImage: t007b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t007b}, {label: "White", value: t007w}, {label: "Purple", value: t007pur}, {label: "Petroleum", value: t007p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "Challenger",
          price: 100,
          rarity: "legendary",
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t008b, t008w, t008pur, t008p],
          defaultImage: t008b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t008b}, {label: "White", value: t008w}, {label: "Purple", value: t008pur}, {label: "Petroleum", value: t008p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "Bronze Noob",
          price: 100,
          rarity: "rare",
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t009b, t009w, t009pur, t009p],
          defaultImage: t009b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t009b}, {label: "White", value: t009w}, {label: "Purple", value: t009pur}, {label: "Petroleum", value: t009p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "Take the L",
          price: 100,
          rarity: "legendary",
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t010b, t010w, t010pur, t010p],
          defaultImage: t010b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t010b}, {label: "White", value: t010w}, {label: "Purple", value: t010pur}, {label: "Petroleum", value: t010p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "Waterworks",
          price: 100,
          rarity: "rare",
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t011b, t011pur, t011p],
          defaultImage: t011b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t011b}, {label: "Purple", value: t011pur}, {label: "Petroleum", value: t011p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "Winner Winner v2",
          price: 100,
          rarity: "rare",
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t012b, t012w, t012pur, t012p],
          defaultImage: t012b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t012b}, {label: "White", value: t012w}, {label: "Purple", value: t012pur}, {label: "Petroleum", value: t012p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "#Rip",
          price: 100,
          rarity: "epic",
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t013b, t013w, t013pur, t013p],
          defaultImage: t013b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t013b}, {label: "White", value: t013w}, {label: "Purple", value: t013pur}, {label: "Petroleum", value: t013p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "Pubg Warrior",
          price: 100,
          rarity: "epic",
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t014b, t014w, t014pur, t014p],
          defaultImage: t014b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t014b}, {label: "White", value: t014w}, {label: "Purple", value: t014pur}, {label: "Petroleum", value: t014p}]
        },
        {
          soldBy: "GG-Egypt",
          Name: "Love Ranger",
          price: 100,
          rarity: "legendary",
          desc: "Printed on 'Heavy Cotton'., 80% Cotton/20% Polyester T-shirt.",
          img: [t015b, t015w, t015pur, t015p],
          defaultImage: t015b,
          category: "merch",
          sizes: ["Small", "Medium", "Large", "X-large"],
          colors: [{label: "Black", value: t015b}, {label: "White", value: t015w}, {label: "Purple", value: t015pur}, {label: "Petroleum", value: t015p}]
        }
      ]
  }
}