/**
 * Product Image Service
 * Provides precise, high-quality images for all products using exact name matching
 */

interface ImageMapping {
  [key: string]: string;
}

// Exact product name to image mappings for precise matching
const EXACT_PRODUCT_IMAGES: ImageMapping = {
  // APPLES - Specific varieties
  'Apple Gala': 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80',
  'Apple Golden': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80',
  'Apple Granny Smith': 'https://images.unsplash.com/photo-1590005354167-6da97870c757?w=800&q=80',
  'Apple Red': 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80',
  'Apple USA': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&q=80',

  // AVOCADOS
  'Avocados Mix': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80',

  // BANANAS - Different types
  'Banana Leaf': 'https://images.unsplash.com/photo-1603833797131-3c0a18fcb6b1?w=800&q=80',
  'Banana Green': 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&q=80',
  'Banana Plantain': 'https://images.unsplash.com/photo-1587132104942-08f950e832a0?w=800&q=80',
  'Banana Premium': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80',

  // BEETS
  'Beets Bunch': 'https://images.unsplash.com/photo-1590934742191-555084632c19?w=800&q=80',
  'Beets Loose': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80',

  // CABBAGE
  'Cabbage Green': 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=800&q=80',
  'Cabbage Pol': 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=800&q=80',
  'Cabbage Sack': 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=800&q=80',

  // CALABAZA (Mexican Squash)
  'Calabaza Mexicana': 'https://images.unsplash.com/photo-1600454343775-8e0ca49fdb36?w=800&q=80',
  'Calabaza De Lasco': 'https://images.unsplash.com/photo-1600454343775-8e0ca49fdb36?w=800&q=80',

  // CANTALOUPE
  'Cantaloupe Cholame': 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800&q=80',
  'Cantaloupe Japa': 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800&q=80',

  // CARROTS
  'Carrots Baby': 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&q=80',
  'Carrots Cello': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80',
  'Carrots Jumbo': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80',

  // CELERY
  'Celery Mexicana': 'https://images.unsplash.com/photo-1625536183117-b65cdb281f59?w=800&q=80',

  // CHAYOTE
  'Chayote Con Espinas': 'https://images.unsplash.com/photo-1626525849322-7c58c55f989b?w=800&q=80',
  'Chayote Liso': 'https://images.unsplash.com/photo-1626525849322-7c58c55f989b?w=800&q=80',

  // CILANTRO
  'Cilantro': 'https://images.unsplash.com/photo-1583327112048-9cbe3e650069?w=800&q=80',

  // COCONUT
  'Coco Cayo': 'https://images.unsplash.com/photo-1589606743769-2e4f0a0c9e0e?w=800&q=80',
  'Coco Green': 'https://images.unsplash.com/photo-1599889953133-484e28ea42b3?w=800&q=80',
  'Coco Hairy': 'https://images.unsplash.com/photo-1589606743769-2e4f0a0c9e0e?w=800&q=80',

  // CORN
  'Corn BiColor': 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&q=80',
  'Corn White': 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&q=80',

  // CUCUMBERS
  'Cucumber Fresh': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800&q=80',
  'Cucumber America': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800&q=80',

  // DRAGON FRUIT
  'Dragon Fruit': 'https://images.unsplash.com/photo-1602162388085-ef5fd0d3b4e2?w=800&q=80',

  // EGGPLANT
  'Eggplant': 'https://images.unsplash.com/photo-1603113797551-c2a16c128b01?w=800&q=80',

  // GARLIC
  'Garlic Loose': 'https://images.unsplash.com/photo-1599003160627-f8e58a2867e5?w=800&q=80',
  'Garlic Peeled': 'https://images.unsplash.com/photo-1599003160627-f8e58a2867e5?w=800&q=80',
  'Garlic Sleeved': 'https://images.unsplash.com/photo-1599003160627-f8e58a2867e5?w=800&q=80',
  'Garlic Cayo': 'https://images.unsplash.com/photo-1599003160627-f8e58a2867e5?w=800&q=80',

  // GINGER
  'Ginger Root': 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80',

  // GRAPEFRUIT
  'Grapefruit': 'https://images.unsplash.com/photo-1609160524979-6fcca5b62726?w=800&q=80',

  // GRAPES - Specific varieties
  'Grapes Red Globe': 'https://images.unsplash.com/photo-1601275371020-0c8e7331f9d2?w=800&q=80',
  'Grapes Red Seedless': 'https://images.unsplash.com/photo-1601275371020-0c8e7331f9d2?w=800&q=80',
  'Grapes White Seedless': 'https://images.unsplash.com/photo-1599819177795-2d35924e5d50?w=800&q=80',
  'Grapes White Cotton Candy': 'https://images.unsplash.com/photo-1599819177795-2d35924e5d50?w=800&q=80',

  // GUAVA
  'Guayaba': 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=800&q=80',

  // HERBS
  'Hierbas Buena': 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=800&q=80',
  'Parsley Curly': 'https://images.unsplash.com/photo-1616398174522-f6a5e5b41f8e?w=800&q=80',
  'Parsley Italian': 'https://images.unsplash.com/photo-1616398174522-f6a5e5b41f8e?w=800&q=80',

  // HONEYDEW
  'Honeydew': 'https://images.unsplash.com/photo-1629827401980-924a2d431f83?w=800&q=80',

  // JICAMA
  'Jicama Root': 'https://images.unsplash.com/photo-1618495464442-62adf17c3485?w=800&q=80',

  // KEY LIMES
  'Key Limes': 'https://images.unsplash.com/photo-1588195945345-4d2c9d9cf052?w=800&q=80',

  // KIWI
  'Kiwi Fruit': 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=800&q=80',

  // LETTUCE - Specific varieties
  'Lettuce Chollo': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&q=80',
  'Lettuce Green Leaf': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&q=80',
  'Lettuce Iceberg': 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=800&q=80',
  'Lettuce Romaine': 'https://images.unsplash.com/photo-1627182994797-9a096c7c7db6?w=800&q=80',
  'Lettuce Shredded': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&q=80',

  // LIMES
  'Limes': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&q=80',

  // MALANGA (Root vegetable)
  'Malanga Blanca': 'https://images.unsplash.com/photo-1594158623359-1c29f572c6a0?w=800&q=80',
  'Malanga Coco': 'https://images.unsplash.com/photo-1594158623359-1c29f572c6a0?w=800&q=80',

  // MANDARIN
  'Mandarina Loose': 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&q=80',

  // MANGO
  'Mango Cholo': 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80',
  'Mango Verde': 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80',

  // MUSHROOMS
  'Mushrooms Sliced': 'https://images.unsplash.com/photo-1580013759032-c96505e24c1f?w=800&q=80',
  'Mushrooms Whole': 'https://images.unsplash.com/photo-1580013759032-c96505e24c1f?w=800&q=80',

  // NOPALES (Cactus)
  'Nopal Con Espinas': 'https://images.unsplash.com/photo-1626525849322-7c58c55f989b?w=800&q=80',
  'Nopal Pelado': 'https://images.unsplash.com/photo-1626525849322-7c58c55f989b?w=800&q=80',

  // ONIONS - Different colors
  'Onion Red': 'https://images.unsplash.com/photo-1587486937788-b09c9c89efb4?w=800&q=80',
  'Onion White': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80',
  'Onion Yellow': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80',

  // ORANGES
  'Orange Midnight': 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=800&q=80',
  'Orange Navel': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&q=80',
  'Orange USA': 'https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=80',

  // PAPAYA
  'Papaya Maradol': 'https://images.unsplash.com/photo-1583487964312-0a9e7b5b1f84?w=800&q=80',

  // PASSION FRUIT
  'Passion Fruit': 'https://images.unsplash.com/photo-1602102820426-e68c9f45e325?w=800&q=80',

  // PEARS
  'Pears Bosc': 'https://images.unsplash.com/photo-1568526381923-caf3fd520382?w=800&q=80',

  // PENCA
  'Penca De Maguey': 'https://images.unsplash.com/photo-1626525849322-7c58c55f989b?w=800&q=80',

  // PEPPERS - Specific varieties
  'Pepper Anaheim': 'https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=800&q=80',
  'Pepper Banana': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80',
  'Pepper Bell Gold': 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80',
  'Pepper Bell Yellow': 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80',
  'Pepper Bell Green': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80',
  'Pepper Bell Orange': 'https://images.unsplash.com/photo-1594486248664-c9c460e4d62f?w=800&q=80',
  'Pepper Bell Red': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80',
  'Pepper Caribe': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80',
  'Pepper Habanero': 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&q=80',
  'Pepper Jalapeno': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',
  'Pepper Manzano': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80',
  'Pepper Poblano': 'https://images.unsplash.com/photo-1567461854304-9bd33f6c4951?w=800&q=80',
  'Pepper Serrano': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',
  'Green Chili Ama': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',

  // PINEAPPLES
  'Pineapples': 'https://images.unsplash.com/photo-1550828483-bb5f92f6e561?w=800&q=80',

  // POTATOES - Different varieties
  'Potatoe Baker Idaho': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80',
  'Potatoe 10 Oz Idaho': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80',
  'Potatoe Bag': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80',
  'Potatoe Red': 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=800&q=80',
  'Potatoe White': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80',

  // RADISH
  'Radish Bulk': 'https://images.unsplash.com/photo-1614961362674-0ab4e994c6fa?w=800&q=80',
  'Radish Bunch': 'https://images.unsplash.com/photo-1614961362674-0ab4e994c6fa?w=800&q=80',
  'Radish Cello': 'https://images.unsplash.com/photo-1614961362674-0ab4e994c6fa?w=800&q=80',

  // SALAD MIX
  'Salad Mix': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',

  // SAVILA (Aloe)
  'Savila': 'https://images.unsplash.com/photo-1596430969106-3aaf9a1d1a34?w=800&q=80',

  // SPINACH
  'Spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80',

  // SQUASH
  'Squash Yellow': 'https://images.unsplash.com/photo-1599743478115-e81d4e6d2f4b?w=800&q=80',
  'Squash Zucchini': 'https://images.unsplash.com/photo-1598004432133-a8aa96ccab02?w=800&q=80',

  // STRAWBERRY
  'Strawberry': 'https://images.unsplash.com/photo-1543528176-61b239494933?w=800&q=80',

  // SUGAR CANE
  'Sugar Cane': 'https://images.unsplash.com/photo-1597090464950-5f6fd5be89c2?w=800&q=80',

  // TATLUMA
  'Tatluma Squash': 'https://images.unsplash.com/photo-1600454343775-8e0ca49fdb36?w=800&q=80',

  // TOMATILLOS
  'Tomatillo Con Cascara': 'https://images.unsplash.com/photo-1591206369811-4eeb2f18e110?w=800&q=80',
  'Tomatillo Peeled': 'https://images.unsplash.com/photo-1591206369811-4eeb2f18e110?w=800&q=80',

  // TOMATOES - Different varieties
  'Tomato 4x5': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80',
  'Tomato 5x6': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80',
  'Tomato Grape': 'https://images.unsplash.com/photo-1574652213019-8a4beefb2d89?w=800&q=80',
  'Tomato Roma': 'https://images.unsplash.com/photo-1546470427-e26264823baa?w=800&q=80',
  'Tomato Salsa': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80',

  // TUNAS (Prickly Pear)
  'Tunas Amarillas': 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&q=80',
  'Tunas Rojas': 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&q=80',
  'Tunas Verdes': 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800&q=80',

  // VERDOLAGA (Purslane)
  'Verdolaga Fresh': 'https://images.unsplash.com/photo-1588417616568-16d7966061b6?w=800&q=80',

  // YUCA (Cassava)
  'Yuca Root': 'https://images.unsplash.com/photo-1606044466411-207a9a49711f?w=800&q=80',

  // ADDITIONAL CITRUS
  'Lemons Fancy': 'https://images.unsplash.com/photo-1587486937018-e9f9b1e47cdd?w=800&q=80',
  'Lemons Choice': 'https://images.unsplash.com/photo-1587486937018-e9f9b1e47cdd?w=800&q=80',
  'Tangerines': 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&q=80',
  'Blood Oranges': 'https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=80',
  'Clementines': 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=800&q=80',

  // BERRIES - Fresh
  'Blueberries': 'https://images.unsplash.com/photo-1596543225162-27748609fffb?w=800&q=80',
  'Raspberries': 'https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?w=800&q=80',
  'Blackberries': 'https://images.unsplash.com/photo-1598032896435-79482c27b7c5?w=800&q=80',
  'Strawberries Organic': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80',

  // STONE FRUITS
  'Peaches Yellow': 'https://images.unsplash.com/photo-1629828874514-b1f0cc5cd90f?w=800&q=80',
  'Peaches White': 'https://images.unsplash.com/photo-1629828874514-b1f0cc5cd90f?w=800&q=80',
  'Nectarines': 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80',
  'Plums Red': 'https://images.unsplash.com/photo-1509973340e91-b3a7a4a008f1?w=800&q=80',
  'Plums Black': 'https://images.unsplash.com/photo-1509973340e91-b3a7a4a008f1?w=800&q=80',
  'Cherries Bing': 'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&q=80',
  'Apricots': 'https://images.unsplash.com/photo-1604002081489-cacc37e4ba6d?w=800&q=80',

  // WATERMELON VARIETIES
  'Watermelon Seedless': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80',
  'Watermelon Mini': 'https://images.unsplash.com/photo-1621583832264-e72a0e44f498?w=800&q=80',
  'Honeydew Jumbo': 'https://images.unsplash.com/photo-1629827401980-924a2d431f83?w=800&q=80',
  'Cantaloupe Premium': 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800&q=80',

  // FRESH HERBS - Expanded
  'Basil Fresh': 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=800&q=80',
  'Mint Fresh': 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=800&q=80',
  'Oregano Fresh': 'https://images.unsplash.com/photo-1509963159-185af8f60f05?w=800&q=80',
  'Thyme Fresh': 'https://images.unsplash.com/photo-1609170906829-1e0f2e3243dd?w=800&q=80',
  'Rosemary Fresh': 'https://images.unsplash.com/photo-1616697396184-3fc6c6a0b633?w=800&q=80',
  'Dill Fresh': 'https://images.unsplash.com/photo-1584363844973-9b539b2e8c9e?w=800&q=80',
  'Sage Fresh': 'https://images.unsplash.com/photo-1591352242919-feb554b14472?w=800&q=80',
  'Thai Basil': 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=800&q=80',
  'Lemongrass': 'https://images.unsplash.com/photo-1609699513065-3f24f2feeb97?w=800&q=80',

  // LEAFY GREENS - Additional
  'Kale Curly': 'https://images.unsplash.com/photo-1541414779316-956a5084c0d4?w=800&q=80',
  'Kale Lacinato': 'https://images.unsplash.com/photo-1541414779316-956a5084c0d4?w=800&q=80',
  'Swiss Chard': 'https://images.unsplash.com/photo-1598030882427-c40ba442c9d1?w=800&q=80',
  'Collard Greens': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80',
  'Mustard Greens': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80',
  'Arugula': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',
  'Watercress': 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=800&q=80',

  // CRUCIFEROUS VEGETABLES
  'Broccoli Crowns': 'https://images.unsplash.com/photo-1628773822990-202c20f9e27b?w=800&q=80',
  'Broccoli Bunch': 'https://images.unsplash.com/photo-1628773822990-202c20f9e27b?w=800&q=80',
  'Cauliflower White': 'https://images.unsplash.com/photo-1568584711636-fdbc71d48ce0?w=800&q=80',
  'Cauliflower Purple': 'https://images.unsplash.com/photo-1568584711636-fdbc71d48ce0?w=800&q=80',
  'Brussels Sprouts': 'https://images.unsplash.com/photo-1616485601862-7f17a1c6e1ce?w=800&q=80',
  'Broccolini': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80',

  // SPECIALTY VEGETABLES
  'Artichokes': 'https://images.unsplash.com/photo-1625686999172-18c0da0cd6c6?w=800&q=80',
  'Fennel Bulb': 'https://images.unsplash.com/photo-1634141393134-7e5ffef5bb37?w=800&q=80',
  'Leeks': 'https://images.unsplash.com/photo-1623691906844-f9c86f4e1d4f?w=800&q=80',
  'Shallots': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80',
  'Rhubarb': 'https://images.unsplash.com/photo-1571942676516-bcab84649e44?w=800&q=80',

  // ASIAN VEGETABLES
  'Bok Choy Baby': 'https://images.unsplash.com/photo-1598030882427-c40ba442c9d1?w=800&q=80',
  'Bok Choy Regular': 'https://images.unsplash.com/photo-1598030882427-c40ba442c9d1?w=800&q=80',
  'Daikon Radish': 'https://images.unsplash.com/photo-1614961362674-0ab4e994c6fa?w=800&q=80',
  'Napa Cabbage': 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=800&q=80',

  // TROPICAL FRUITS - Additional
  'Coconut Young': 'https://images.unsplash.com/photo-1599889953133-484e28ea42b3?w=800&q=80',
  'Starfruit': 'https://images.unsplash.com/photo-1590562976558-38fc8c04c9f0?w=800&q=80',
  'Lychee': 'https://images.unsplash.com/photo-1610383237246-e8c4743d2e24?w=800&q=80',
  'Longan': 'https://images.unsplash.com/photo-1610383237246-e8c4743d2e24?w=800&q=80',
  'Rambutan': 'https://images.unsplash.com/photo-1609160524979-6fcca5b62726?w=800&q=80',
  'Pomegranate': 'https://images.unsplash.com/photo-1615485290097-7ad3b6ba9c7f?w=800&q=80',
  'Persimmon': 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80',

  // ADDITIONAL ROOT VEGETABLES
  'Sweet Potatoes Orange': 'https://images.unsplash.com/photo-1556617708-fb0bd1beaa12?w=800&q=80',
  'Sweet Potatoes Purple': 'https://images.unsplash.com/photo-1556617708-fb0bd1beaa12?w=800&q=80',
  'Turnips': 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800&q=80',
  'Parsnips': 'https://images.unsplash.com/photo-1599021419962-9883af2ced60?w=800&q=80',
  'Rutabaga': 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800&q=80',
  'Horseradish': 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80',

  // ADDITIONAL SQUASH VARIETIES
  'Butternut Squash': 'https://images.unsplash.com/photo-1570301099009-9b56f2e3d8b0?w=800&q=80',
  'Acorn Squash': 'https://images.unsplash.com/photo-1570301099009-9b56f2e3d8b0?w=800&q=80',
  'Spaghetti Squash': 'https://images.unsplash.com/photo-1570301099009-9b56f2e3d8b0?w=800&q=80',
  'Delicata Squash': 'https://images.unsplash.com/photo-1570301099009-9b56f2e3d8b0?w=800&q=80',
  'Kabocha Squash': 'https://images.unsplash.com/photo-1570301099009-9b56f2e3d8b0?w=800&q=80',

  // SPECIALTY SALAD GREENS
  'Spring Mix': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  'Mixed Baby Greens': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
};

// Fallback category images for products not matched exactly
const CATEGORY_IMAGES: ImageMapping = {
  // Fruits
  'Apples': 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80',
  'Avocados': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=80',
  'Bananas': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=800&q=80',
  'Berries': 'https://images.unsplash.com/photo-1543528176-61b239494933?w=800&q=80',
  'Grapes': 'https://images.unsplash.com/photo-1601275371020-0c8e7331f9d2?w=800&q=80',
  'Kiwi': 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=800&q=80',
  'Mango': 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80',
  'Tropical Fruits': 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80',
  'Exotic Fruits': 'https://images.unsplash.com/photo-1602102820426-e68c9f45e325?w=800&q=80',
  'Pineapples': 'https://images.unsplash.com/photo-1550828483-bb5f92f6e561?w=800&q=80',
  'Pears': 'https://images.unsplash.com/photo-1568526381923-caf3fd520382?w=800&q=80',
  'Papaya': 'https://images.unsplash.com/photo-1583487964312-0a9e7b5b1f84?w=800&q=80',

  // Citrus
  'Citrus': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=800&q=80',
  'Oranges': 'https://images.unsplash.com/photo-1547514701-42782101795e?w=800&q=80',

  // Melons
  'Melons': 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800&q=80',

  // Vegetables - Leafy
  'Lettuce': 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&q=80',
  'Cabbage': 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=800&q=80',
  'Celery': 'https://images.unsplash.com/photo-1625536183117-b65cdb281f59?w=800&q=80',
  'Herbs': 'https://images.unsplash.com/photo-1509963159-185af8f60f05?w=800&q=80',
  'Greens': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80',
  'Salads': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',

  // Root Vegetables
  'Carrots': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80',
  'Beets': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80',
  'Root Vegetables': 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800&q=80',
  'Ginger': 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800&q=80',
  'Garlic': 'https://images.unsplash.com/photo-1599003160627-f8e58a2867e5?w=800&q=80',
  'Potatoes': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80',
  'Radish': 'https://images.unsplash.com/photo-1614961362674-0ab4e994c6fa?w=800&q=80',

  // Peppers
  'Peppers': 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=800&q=80',

  // Other Vegetables
  'Tomatoes': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80',
  'Tomatillos': 'https://images.unsplash.com/photo-1591206369811-4eeb2f18e110?w=800&q=80',
  'Cucumbers': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=800&q=80',
  'Eggplant': 'https://images.unsplash.com/photo-1603113797551-c2a16c128b01?w=800&q=80',
  'Squash': 'https://images.unsplash.com/photo-1570301099009-9b56f2e3d8b0?w=800&q=80',
  'Corn': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&q=80',
  'Mushrooms': 'https://images.unsplash.com/photo-1580013759032-c96505e24c1f?w=800&q=80',

  // Onions
  'Onions': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80',

  // Specialty
  'Coconut': 'https://images.unsplash.com/photo-1589606743769-2e4f0a0c9e0e?w=800&q=80',
  'Nopales': 'https://images.unsplash.com/photo-1626525849322-7c58c55f989b?w=800&q=80',
  'Specialty': 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&q=80',

  // New Categories
  'Stone Fruits': 'https://images.unsplash.com/photo-1629828874514-b1f0cc5cd90f?w=800&q=80',
  'Broccoli': 'https://images.unsplash.com/photo-1628773822990-202c20f9e27b?w=800&q=80',
  'Cauliflower': 'https://images.unsplash.com/photo-1568584711636-fdbc71d48ce0?w=800&q=80',
  'Brussels Sprouts': 'https://images.unsplash.com/photo-1616485601862-7f17a1c6e1ce?w=800&q=80',
  'Asian Vegetables': 'https://images.unsplash.com/photo-1598030882427-c40ba442c9d1?w=800&q=80',
  'Sweet Potatoes': 'https://images.unsplash.com/photo-1556617708-fb0bd1beaa12?w=800&q=80',

  // Tortillas & Bread
  'Mission/Guerrero': 'https://images.unsplash.com/photo-1566527802736-83f8bda2f5cf?w=800&q=80',
  'La Rancherita': 'https://images.unsplash.com/photo-1566527802736-83f8bda2f5cf?w=800&q=80',
  'El Mexicano': 'https://images.unsplash.com/photo-1566527802736-83f8bda2f5cf?w=800&q=80',
  'Azteca Foods': 'https://images.unsplash.com/photo-1566527802736-83f8bda2f5cf?w=800&q=80',

  // Default fallback
  'default': 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&q=80',
};

/**
 * Get image URL for a product based on its name or subcategory
 * Uses exact name matching first, then falls back to subcategory
 */
export function getProductImage(productName: string, subcategory?: string): string {
  // First, try exact product name match (case-insensitive partial match)
  for (const [key, imageUrl] of Object.entries(EXACT_PRODUCT_IMAGES)) {
    if (productName.toLowerCase().includes(key.toLowerCase())) {
      return imageUrl;
    }
  }

  // Fall back to subcategory
  if (subcategory && CATEGORY_IMAGES[subcategory]) {
    return CATEGORY_IMAGES[subcategory];
  }

  // Default fallback
  return CATEGORY_IMAGES['default'];
}

/**
 * Add images to all products in an array
 */
export function addImagesToProducts<T extends { name: string; subcategory?: string; image?: string }>(
  products: T[]
): T[] {
  return products.map(product => ({
    ...product,
    image: product.image || getProductImage(product.name, product.subcategory),
  }));
}
