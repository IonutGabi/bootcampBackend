# Laboratorio MongoDB

Vamos a trabajar con el set de datos de Mongo Atlas _airbnb_. Lo puedes encontrar en este enlace: https://drive.google.com/drive/folders/1gAtZZdrBKiKioJSZwnShXskaKk6H_gCJ?usp=sharing

Para restaurarlo puede seguir las instrucciones de este videopost:
https://www.lemoncode.tv/curso/docker-y-mongodb/leccion/restaurando-backup-mongodb

> Acuerdate de mirar si en el directorio `/opt/app` del contenedor Mongo hay contenido de backups previos que haya que borrar

Para entregar las soluciones, añade un README.md a tu repositorio del bootcamp incluyendo enunciado y consulta (lo que pone '_Pega aquí tu consulta_').

## Introducción

En este base de datos puedes encontrar un montón de alojamientos y sus reviews, esto está sacado de hacer webscrapping.

**Pregunta**. Si montaras un sitio real, ¿Qué posibles problemas pontenciales les ves a como está almacenada la información?

```md
1. Dificultad para actualizar cualquier campo de la colección
2. Es un documento muy largo y por lo tanto dificil de leer
3. El desarrollador tendría que optimizar muchisimo las consultas
4. Mucho trabajo para el Working Set
5. Habría mucho trabajo a nivel de aplicación
```

## Obligatorio

Esta es la parte mínima que tendrás que entregar para superar este laboratorio.

### Consultas

- Saca en una consulta cuantos alojamientos hay en España.

```js
db.listingsAndReviews.countDocuments({ "address.country": "Spain" });
```

- Lista los 10 primeros:
  - Ordenados por precio de forma ascendente.
  - Sólo muestra: nombre, precio, camas y la localidad (`address.market`).

```js
db.listingsAndReviews
  .find({}, { _id: 0, name: 1, price: 1, beds: 1, "address.market": 1 })
  .limit(10)
  .sort({ price: 1 });
```

### Filtrando

- Queremos viajar cómodos, somos 4 personas y queremos:
  - 4 camas.
  - Dos cuartos de baño o más.
  - Sólo muestra: nombre, precio, camas y baños.

```js
db.listingsAndReviews.find(
  {
    beds: { $eq: 4 },
    bathrooms: { $gte: 2 },
  },
  { _id: 0, name: 1, price: 1, beds: 1, bathrooms: 1 }
);
```

- Aunque estamos de viaje no queremos estar desconectados, así que necesitamos que el alojamiento también tenga conexión wifi. A los requisitos anteriores, hay que añadir que el alojamiento tenga wifi.
  - Sólo muestra: nombre, precio, camas, baños y servicios (`amenities`).

```js
db.listingsAndReviews.find(
  {
    beds: { $eq: 4 },
    bathrooms: { $gte: 2 },
    amenities: "Wifi",
  },
  { _id: 0, name: 1, price: 1, beds: 1, bathrooms: 1, servicios: "$amenities" }
);
```

- Y bueno, un amigo trae a su perro, así que tenemos que buscar alojamientos que permitan mascota (_Pets allowed_).
  - Sólo muestra: nombre, precio, camas, baños y servicios (`amenities`).

```js
db.listingsAndReviews.find(
  {
    beds: { $eq: 4 },
    bathrooms: { $gte: 2 },
    amenities: "Pets allowed",
  },
  {
    _id: 0,
    name: 1,
    price: 1,
    beds: 1,
    bathrooms: 1,
    amenities: 1,
  }
);
```

- Estamos entre ir a Barcelona o a Portugal, los dos destinos nos valen. Pero queremos que el precio nos salga baratito (50 $), y que tenga buen rating de reviews (campo `review_scores.review_scores_rating` igual o superior a 88).
  - Sólo muestra: nombre, precio, camas, baños, rating y localidad.

```js
db.listingsAndReviews.find(
  {
    $or: [
      {
        "address.market": "Barcelona",
      },
      {
        "address.country": "Portugal",
      },
    ],

    $and: [
      {
        price: 50,
      },
      {
        "review_scores.review_scores_rating": { $gte: 88 },
      },
    ],
  },
  {
    _id: 0,
    name: 1,
    price: 1,
    beds: 1,
    bathrooms: 1,
    rating: "$review_scores.review_scores_rating",
    "address.market": 1,
  }
);
```

- También queremos que el huésped sea un superhost (`host.host_is_superhost`) y que no tengamos que pagar depósito de seguridad (`security_deposit`).
  - Sólo muestra: nombre, precio, camas, baños, rating, si el huésped es superhost, depósito de seguridad y localidad.

```js
db.listingsAndReviews.find(
  {
    $and: [{ "host.host_is_superhost": true }, { security_deposit: 0 }],
  },
  {
    _id: 0,
    name: 1,
    price: 1,
    beds: 1,
    bathrooms: 1,
    rating: "$review.scores.review_scores_rating",
    superHost: "$host.host_is_superhost",
    security_deposit: 1,
    place: "$address.market",
  }
);
```

### Agregaciones

- Queremos mostrar los alojamientos que hay en España, con los siguientes campos:
  - Nombre.
  - Localidad (no queremos mostrar un objeto, sólo el string con la localidad).
  - Precio

```js
db.listingsAndReviews.aggregate([
  {
    $match: {
      "address.country": "Spain",
    },
  },
  {
    $project: {
      _id: 0,
      name: 1,
      place: "$address.market",
      price: 1,
    },
  },
]);
```

- Queremos saber cuantos alojamientos hay disponibles por pais.

```js
db.listingsAndReviews.aggregate([
  {
    $group: {
      _id: "$address.country",
      availableLodgings: { $sum: 1 },
    },
  },
]);
```

## Opcional

- Queremos saber el precio medio de alquiler de airbnb en España.

```js
db.listingsAndReviews.aggregate([
  {
    $match: {
      "address.country": "Spain",
    },
  },
  {
    $group: {
      _id: "$address.country",
      averagePrice: { $avg: "$price" },
    },
  },
]);
```

- ¿Y si quisieramos hacer como el anterior, pero sacarlo por paises?

```js
db.listingsAndReviews.aggregate([
  {
    $group: {
      _id: "$address.country",
      averagePriceFromCountry: { $avg: "$price" },
    },
  },
]);
```

- Repite los mismos pasos pero agrupando también por numero de habitaciones.

```js
db.listingsAndReviews.aggregate([
  {
    $group: {
      _id: { country: "$address.country", bedrooms: "$bedrooms" },
      averagePriceFromCountry: { $avg: "$price" },
    },
  },
]);
```

## Desafio

Queremos mostrar el top 5 de alojamientos más caros en España, con los siguentes campos:

- Nombre.
- Precio.
- Número de habitaciones
- Número de camas
- Número de baños
- Ciudad.
- Servicios, pero en vez de un array, un string con todos los servicios incluidos.

```js
db.listingsAndReviews.aggregate([
  {
    $match: {
      $and: [{ "address.country": "Spain" }, { price: { $gt: 800 } }],
    },
  },
  {
    $project: {
      _id: 0,
      name: 1,
      price: 1,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      city: "$address.market",
      services: {
        $reduce: {
          input: "$amenities",
          initialValue: "",
          in: { $concat: ["$$value", "$$this", ", "] },
        },
      },
    },
  },
  {
    $limit: 5,
  },
]);
```
