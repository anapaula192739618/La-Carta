// ============================================
// LA CARTA - BASE DE DATOS DE NEGOCIOS
// ============================================

const businesses = [
    // ========== NEGOCIO 1: BABA YAGA (DESTACADO) ==========
    {
        id: "baba-yaga",
        nombre: "Baba Yaga",
        categoria: "cafeteria",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Visítanos y no sabrás si vives o sueñas, disfrutando de nuestras exquisitas ofertas y coctelería. Con excelente música y animación en nuestro acogedor local, Coffee Baba Yaga, pensando en usted y sus amigos!",
        whatsapp: "5356715283",
        ubicacion: {
            direccion: "Luis Estevez entre Martí y Boulevard #358. Santa Clara, Villa Clara",
            ciudad: "Santa Clara",
            coordenadas: { lat: 22.4092321, lng: -79.9679881 }
        },
        horarios: {
            "Lunes a Jueves": "10:30 am - 10:30 pm",
            "Viernes a Sábado": "10:30 am - 12:00 am",
            "Domingo": "10:30 am - 12:00 am"
        },
        redes: {
            instagram: "@babayaga_coffee"
        },
        catalogo: [
            { id: 101, nombre: "Affogato", precio: 240.00, imagen: "imagenes/baba-yaga/affogato.webp", descripcion: "Delicioso café con helado" },
            { id: 102, nombre: "Cortadito", precio: 180.00, imagen: "imagenes/baba-yaga/cortadito.webp", descripcion: "Café cubano cortado con leche" },
            { id: 103, nombre: "Pastel de Guayaba", precio: 250.00, imagen: "imagenes/baba-yaga/pastel-guayaba.webp", descripcion: "Pastel casero de guayaba" },
            { id: 104, nombre: "Sandwich Cubano", precio: 500.00, imagen: "imagenes/baba-yaga/sandwich-cubano.webp", descripcion: "Sandwich cubano clásico" }
        ],
        visitas: 0,
        destacado: true,
        rating: 4.8,
        zona: "centro"
    },

    // ========== NEGOCIO 2: HELADOS COPA (DESTACADO) ==========
    {
        id: "helados-copa",
        nombre: "Helados Copa",
        categoria: "heladeria",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Helados artesanales con sabores únicos.",
        whatsapp: "5354445555",
        ubicacion: {
            direccion: "Malecón #222",
            ciudad: "La Habana"
        },
        horarios: {
            "Lunes a Domingo": "10:00 am - 9:00 pm"
        },
        catalogo: [
            { id: 201, nombre: "Helado de Mango", precio: 150.00, imagen: "imagenes/helados-copa/mango.webp", descripcion: "Crema de mango natural" },
            { id: 202, nombre: "Copa Loca", precio: 350.00, imagen: "imagenes/helados-copa/copa.webp", descripcion: "Con tres sabores y toppings" }
        ],
        destacado: true,
        rating: 4.6,
        zona: "vedado"
    },

    // ========== NEGOCIOS NORMALES (destacado: false) ==========
    {
        id: "cafe-mambi",
        nombre: "Café Mambí",
        categoria: "cafeteria",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Café cubano de especialidad. El mejor aroma y sabor de la isla.",
        whatsapp: "5351112222",
        ubicacion: { ciudad: "La Habana", direccion: "Calle 23 #456" },
        horarios: { "Lunes a Domingo": "8:00 am - 8:00 pm" },
        catalogo: [],
        destacado: false,
        rating: 4.2,
        zona: "plaza"
    },
    {
        id: "bar-el-canon",
        nombre: "Bar El Cañón",
        categoria: "bar",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Coctelería y música en vivo. El mejor ambiente de la ciudad.",
        whatsapp: "5353334444",
        ubicacion: { ciudad: "La Habana", direccion: "Calle Oficios #123" },
        horarios: { "Lunes a Domingo": "6:00 pm - 2:00 am" },
        catalogo: [],
        destacado: false,
        rating: 4.3,
        zona: "old-havana"
    },
    {
        id: "pizzeria-italia",
        nombre: "Pizzería Italia",
        categoria: "restaurante",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Las mejores pizzas al estilo italiano. Masa artesanal y horno de piedra.",
        whatsapp: "5355556666",
        ubicacion: { ciudad: "La Habana", direccion: "Calle 70 #789" },
        horarios: { "Lunes a Domingo": "12:00 pm - 11:00 pm" },
        catalogo: [],
        destacado: false,
        rating: 4.4,
        zona: "vedado"
    },
    {
        id: "cafeteria-el-parque",
        nombre: "Cafetería El Parque",
        categoria: "cafeteria",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "El mejor punto de encuentro en el centro de Santa Clara.",
        whatsapp: "5357778888",
        ubicacion: { ciudad: "Santa Clara", direccion: "Parque Vidal #12" },
        horarios: { "Lunes a Domingo": "7:00 am - 10:00 pm" },
        catalogo: [],
        destacado: false,
        rating: 4.1,
        zona: "centro"
    },
    {
        id: "la-bodeguita",
        nombre: "La Bodeguita",
        categoria: "bar",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Tradición y sabor en cada trago. El mojito más famoso de La Habana.",
        whatsapp: "5358889999",
        ubicacion: { ciudad: "La Habana", direccion: "Empedrado #207" },
        horarios: { "Lunes a Domingo": "12:00 pm - 12:00 am" },
        catalogo: [],
        destacado: false,
        rating: 4.5,
        zona: "old-havana"
    },
    {
        id: "heladeria-fresa",
        nombre: "Heladería Fresa",
        categoria: "heladeria",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Helados naturales sin conservantes ni colorantes artificiales.",
        whatsapp: "5359990000",
        ubicacion: { ciudad: "Miramar", direccion: "Calle 20 #567" },
        horarios: { "Lunes a Domingo": "11:00 am - 8:00 pm" },
        catalogo: [],
        destacado: false,
        rating: 4.3,
        zona: "miramar"
    },
    {
        id: "panaderia-el-bien",
        nombre: "Panadería El Bien",
        categoria: "panaderia",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Pan fresco cada mañana. Horneado artesanalmente.",
        whatsapp: "5350001111",
        ubicacion: { ciudad: "La Habana", direccion: "Infanta #425" },
        horarios: { "Lunes a Domingo": "6:00 am - 7:00 pm" },
        catalogo: [],
        destacado: false,
        rating: 4.2,
        zona: "plaza"
    },
    {
        id: "fast-food-cubano",
        nombre: "Fast Food Cubano",
        categoria: "comida-rapida",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Comida rápida con sabor cubano. Hamburguesas, perros calientes y más.",
        whatsapp: "5352223333",
        ubicacion: { ciudad: "La Habana", direccion: "Calzada #1234" },
        horarios: { "Lunes a Domingo": "12:00 pm - 10:00 pm" },
        catalogo: [],
        destacado: false,
        rating: 4.0,
        zona: "vedado"
    },
    {
        id: "cafe-son",
        nombre: "Café Son",
        categoria: "cafeteria",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Café con música y buena vibra. Son cubano en vivo los fines de semana.",
        whatsapp: "5354447777",
        ubicacion: { ciudad: "La Habana", direccion: "Calle 8 #321" },
        horarios: { "Lunes a Domingo": "9:00 am - 10:00 pm" },
        catalogo: [],
        destacado: false,
        rating: 4.4,
        zona: "old-havana"
    },
    {
        id: "restaurante-el-tamarindo",
        nombre: "Restaurante El Tamarindo",
        categoria: "restaurante",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Comida criolla y mariscos. Especialidad en pescados frescos.",
        whatsapp: "5355558888",
        ubicacion: { ciudad: "Miramar", direccion: "Calle 5ta B #45" },
        horarios: { "Lunes a Domingo": "12:00 pm - 11:00 pm" },
        catalogo: [],
        destacado: false,
        rating: 4.6,
        zona: "miramar"
    },
    {
        id: "bar-la-esquina",
        nombre: "Bar La Esquina",
        categoria: "bar",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "El punto de encuentro de Santa Clara. Buena música y mejores precios.",
        whatsapp: "5356669999",
        ubicacion: { ciudad: "Santa Clara", direccion: "Colón #56" },
        horarios: { "Lunes a Domingo": "4:00 pm - 12:00 am" },
        catalogo: [],
        destacado: false,
        rating: 4.1,
        zona: "centro"
    },
    {
        id: "heladeria-tropical",
        nombre: "Heladería Tropical",
        categoria: "heladeria",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Sabores del trópico en cada cucharada. Frutas naturales.",
        whatsapp: "5357770000",
        ubicacion: { ciudad: "La Habana", direccion: "23 y 12" },
        horarios: { "Lunes a Domingo": "10:00 am - 9:00 pm" },
        catalogo: [],
        destacado: false,
        rating: 4.3,
        zona: "plaza"
    },
    {
        id: "panaderia-dulce-vida",
        nombre: "Panadería Dulce Vida",
        categoria: "panaderia",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Dulces y panes artesanales. Repostería fina cubana.",
        whatsapp: "5358881111",
        ubicacion: { ciudad: "La Habana", direccion: "Calle 42 #789" },
        horarios: { "Lunes a Domingo": "7:00 am - 8:00 pm" },
        catalogo: [],
        destacado: false,
        rating: 4.2,
        zona: "vedado"
    },
    {
        id: "comida-rapida-el-bocadito",
        nombre: "El Bocadito",
        categoria: "comida-rapida",
        imagen: "../imagenes/LOGO.webp",
        descripcion: "Bocaditos y sándwiches rápidos para llevar.",
        whatsapp: "5359992222",
        ubicacion: { ciudad: "Santa Clara", direccion: "Boulevard #88" },
        horarios: { "Lunes a Domingo": "11:00 am - 9:00 pm" },
        catalogo: [],
        destacado: false,
        rating: 3.9,
        zona: "centro"
    },
    {
        id: "cafeteria-la-terraza",
        nombre: "Cafetería La Terraza",
        categoria: "cafeteria",
        imagen: "LOGO.webp",
        descripcion: "Café con vista a la ciudad. El lugar perfecto para relajarse.",
        whatsapp: "5350003333",
        ubicacion: { ciudad: "La Habana", direccion: "Edificio FOCSA, Piso 14" },
        horarios: { "Lunes a Domingo": "8:00 am - 9:00 pm" },
        catalogo: [],
        destacado: false,
        rating: 4.5,
        zona: "vedado"
    }
];

window.businessesData = businesses;