# Products

There are 2 types of product endpoints, they are public endpoints and private endpoints (for admin), currently this documentation only covers public endpoints.

## Public endpoints for products

Public endpoints doesn't have authentication bearer

### List of products

Request Method **GET**

URL: `https://api.giziwise.my.id/products?sort=createdAt&order=asc&page=1&limit=10`

### Query strings

There are 4 required query strings, which is `sort`, `order`, `page`, and `limit`.

`sort` is the field that you want to sort, you can sort by 
- `createdAt` (time of the product is inserted)
- `updatedAt` (time of the product is updated)
- `name`
- `code`
- `categoryId` (category id of the product)
- `type` (type of product which are `processed` or `raw`)

`order` is the order of the sort, you can sort by `asc` (from the earlier time or the lowest number) or `desc` (from the latest time or the highest number).

`page` is the page of the data that you want to get.

`limit` is the limit of the data that you want to get.

`page` and `limit` are used for pagination, so you can limit the data that you want to get. For examples, if there are 1000 data and there is not limit and page, you will get all of the data, which resulted in heavy load for the system. But if you set the limit to 10 and page to 1, you will get 10 data from the first page. If you set the limit to 10 and page to 2, you will get 10 data from the second page.

`name` is the name of the product, you can search the product by name.

`code` is the code of the product, you can search the product by code.

`categoryId` is the category id of the product, when provided, you will get only products with the provided category id.

`type` is the type of the product, when provided, you will get only products with the provided type.

Example response:
```json
{
  "statusCode": 200,
  "messages": [],
  "data": {
    "products": [
      {
        "id": 1146,
        "code": "JP011",
        "name": "Yoghurt, segar",
        "latinName": null,
        "origin": null,
        "categoryId": 11,
        "type": "processed",
        "description": null,
        "image": null,
        "servingSize": 100,
        "servingUnit": "g",
        "ediblePortion": 100,
        "category": {
          "id": 11,
          "name": "Susu"
        }
      },
      {
        "id": 1145,
        "code": "AP114",
        "name": "Yangko",
        "latinName": null,
        "origin": "Yogyakarta",
        "categoryId": 4,
        "type": "processed",
        "description": "Bahan dasar terdiri dari Tepung ketan, tepung maizena, santan, pewarna makanan. Bahan isi: kacang tanah, gula pasir. Diolah dengan cara dikukus lalu dibalut tepung gula. Berbentuk kotak dan kenyal",
        "image": null,
        "servingSize": 100,
        "servingUnit": "g",
        "ediblePortion": 100,
        "category": {
          "id": 4,
          "name": "Serealia"
        }
      }
    ],
    "page": 1,
    "limit": 2,
    "totalData": 1146,
    "totalPage": 573
  }
}
```

### Get a product

Request Method **GET**

URL: `https://api.giziwise.my.id/products/{id}`

`id` is the id of the product that you want to get.

Example response:

```json
{
  "statusCode": 200,
  "messages": [],
  "data": {
    "id": 500,
    "code": "CP003",
    "name": "Kacang bogor, rebus",
    "latinName": null,
    "origin": null,
    "categoryId": 5,
    "type": "processed",
    "description": null,
    "image": null,
    "servingSize": 100,
    "servingUnit": "g",
    "ediblePortion": 35,
    "category": {
      "id": 5,
      "name": "Kacang-Kacangan",
      "description": null,
      "image": null
    },
    "tkpis": [
      {
        "id": 9103,
        "name": "Air",
        "symbol": "Water",
        "value": 61.2,
        "unit": "g"
      },
      {
        "id": 9104,
        "name": "Energi",
        "symbol": "Energy",
        "value": 161,
        "unit": "Kal"
      },
      {
        "id": 9105,
        "name": "Protein",
        "symbol": "Protein",
        "value": 7.7,
        "unit": "g"
      },
      {
        "id": 9106,
        "name": "Lemak",
        "symbol": "Fat",
        "value": 2.8,
        "unit": "g"
      },
      {
        "id": 9107,
        "name": "Karbohidrat",
        "symbol": "CHO",
        "value": 27.1,
        "unit": "g"
      },
      {
        "id": 9108,
        "name": "Serat",
        "symbol": "Fibre",
        "value": 2,
        "unit": "g"
      },
      {
        "id": 9109,
        "name": "Abu",
        "symbol": "ASH",
        "value": 1.2,
        "unit": "g"
      },
      {
        "id": 9110,
        "name": "Kalsium",
        "symbol": "Ca",
        "value": 56,
        "unit": "mg"
      },
      {
        "id": 9111,
        "name": "Fosfor",
        "symbol": "P",
        "value": 134,
        "unit": "mg"
      },
      {
        "id": 9112,
        "name": "Besi",
        "symbol": "Fe",
        "value": 1.4,
        "unit": "mg"
      },
      {
        "id": 9113,
        "name": "Kalsium",
        "symbol": "Ca",
        "value": 56,
        "unit": "mg"
      },
      {
        "id": 9114,
        "name": "Fosfor",
        "symbol": "P",
        "value": 134,
        "unit": "mg"
      },
      {
        "id": 9115,
        "name": "Besi",
        "symbol": "Fe",
        "value": 1.4,
        "unit": "mg"
      }
    ]
  }
}
```

### Search product by image

Request Method **POST**

URL: `https://api.giziwise.my.id/products/search-by-image`

Request body:

`Content-type` must be `multipart/form-data`

Field part `image` with type `file` and value is the image file.

You can refer to this youtube videos for uploading image with retrofit: [https://www.youtube.com/watch?v=aY9xsGMlC5c](https://www.youtube.com/watch?v=aY9xsGMlC5c)

Example response:

```json
{
  "statusCode": 201,
  "messages": [],
  "data": {
    "id": 955,
    "code": "DP051",
    "name": "Sayur lilin-terubuk",
    "latinName": null,
    "origin": "Maluku Utara",
    "categoryId": 1,
    "type": "processed",
    "description": "Bahan dasar terdiri dari lilin/terubuk. Direbus dengan santan.",
    "image": "https://storage.googleapis.com/gizi-wise/images/product-searchs/1686007840237-images--18-_jpg.rf.18ffc84f219e36e935e57529f19e6a31.jpg",
    "servingSize": 100,
    "servingUnit": "g",
    "ediblePortion": 100,
    "category": {
      "id": 1,
      "name": "Sayuran",
      "description": null,
      "image": null
    },
    "tkpis": [
      {
        "id": 17300,
        "name": "Air",
        "symbol": "Water",
        "value": 90.4,
        "unit": "g"
      },
      {
        "id": 17301,
        "name": "Energi",
        "symbol": "Energy",
        "value": 36,
        "unit": "Kal"
      },
      {
        "id": 17302,
        "name": "Protein",
        "symbol": "Protein",
        "value": 2.7,
        "unit": "g"
      },
      {
        "id": 17303,
        "name": "Lemak",
        "symbol": "Fat",
        "value": 0.7,
        "unit": "g"
      },
      {
        "id": 17304,
        "name": "Karbohidrat",
        "symbol": "CHO",
        "value": 4.8,
        "unit": "g"
      },
      {
        "id": 17305,
        "name": "Serat",
        "symbol": "Fibre",
        "value": 1.4,
        "unit": "g"
      },
      {
        "id": 17306,
        "name": "Abu",
        "symbol": "ASH",
        "value": 1.4,
        "unit": "g"
      },
      {
        "id": 17307,
        "name": "Kalsium",
        "symbol": "Ca",
        "value": 10,
        "unit": "mg"
      },
      {
        "id": 17308,
        "name": "Fosfor",
        "symbol": "P",
        "value": 90,
        "unit": "mg"
      },
      {
        "id": 17309,
        "name": "Besi",
        "symbol": "Fe",
        "value": 0.1,
        "unit": "mg"
      },
      {
        "id": 17310,
        "name": "Natrium",
        "symbol": "Na",
        "value": 30,
        "unit": "mg"
      },
      {
        "id": 17311,
        "name": "Kalium",
        "symbol": "K",
        "value": 44,
        "unit": "mg"
      },
      {
        "id": 17312,
        "name": "Tembaga",
        "symbol": "Cu",
        "value": 0.2,
        "unit": "mg"
      },
      {
        "id": 17313,
        "name": "Seng",
        "symbol": "Zn",
        "value": 1,
        "unit": "mg"
      },
      {
        "id": 17314,
        "name": "Kalsium",
        "symbol": "Ca",
        "value": 10,
        "unit": "mg"
      },
      {
        "id": 17315,
        "name": "Fosfor",
        "symbol": "P",
        "value": 90,
        "unit": "mg"
      },
      {
        "id": 17316,
        "name": "Besi",
        "symbol": "Fe",
        "value": 0.1,
        "unit": "mg"
      },
      {
        "id": 17317,
        "name": "Natrium",
        "symbol": "Na",
        "value": 30,
        "unit": "mg"
      },
      {
        "id": 17318,
        "name": "Kalium",
        "symbol": "K",
        "value": 44,
        "unit": "mg"
      },
      {
        "id": 17319,
        "name": "Tembaga",
        "symbol": "Cu",
        "value": 0.2,
        "unit": "mg"
      },
      {
        "id": 17320,
        "name": "Seng",
        "symbol": "Zn",
        "value": 1,
        "unit": "mg"
      }
    ]
  }
}
```

Possible Errors & status codes:

- Status code 404 (Not Found): if the product is not found.
- Status code 415 (Unsupported Media Type): if the request body is not `multipart/form-data` or the field part `image` is not an image file.
- Status code 413 (Payload Too Large): if the image file is too large.

If you find any other errors, please contact me.