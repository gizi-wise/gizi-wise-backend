# Recipes

There are 2 types of recipe endpoints, they are public endpoints and private endpoints (for admin), currently this documentation only covers public endpoints.

## Public endpoints for recipes

Public endpoints doesn't have authentication bearer

### List of recipes

Request Method **GET**

URL: `https://api.giziwise.my.id/recipes?sort=createdAt&order=asc&page=1&limit=10`

### Query strings

There are 4 required query strings, which is `sort`, `order`, `page`, and `limit`.

`sort` is the field that you want to sort, you can sort by 
- `createdAt` (time of the recipe is inserted)
- `updatedAt` (time of the recipe is updated)
- `title`
- `authorId`

`order` is the order of the sort, you can sort by `asc` (from the earlier time or the lowest number) or `desc` (from the latest time or the highest number).

`page` is the page of the data that you want to get.

`limit` is the limit of the data that you want to get.

`page` and `limit` are used for pagination, so you can limit the data that you want to get. For examples, if there are 1000 data and there is not limit and page, you will get all of the data, which resulted in heavy load for the system. But if you set the limit to 10 and page to 1, you will get 10 data from the first page. If you set the limit to 10 and page to 2, you will get 10 data from the second page.

`title` is the title of the recipe, you can search the recipe by title.

`isFeatured` (boolean, either `true` or `false`) is the featured status of the recipe, when provided, you will get only recipes with the provided featured status.

Example response:
```json
{
  "statusCode": 200,
  "messages": [],
  "data": {
    "recipes": [
      {
        "id": 1,
        "title": "Cap cay diet",
        "summary": "Cap cay 335 kalori",
        "image": "https://storage.googleapis.com/gizi-wise/images/recipes/1686015894836-cap-cay-diet-335-kalori-foto-resep-utama.webp",
        "isFeatured": true,
        "authorId": "fea7b1f2-a9dd-41da-9a80-3b61eb8cb07c",
        "createdAt": "2023-06-06T01:51:09.717Z",
        "updatedAt": "2023-06-06T01:51:09.717Z",
        "recipeTags": [
          {
            "tagId": 4,
            "tag": {
              "name": "Sayuran"
            }
          }
        ],
        "author": {
          "name": "Admon"
        }
      }
    ],
    "page": 1,
    "limit": 10,
    "totalData": 1,
    "totalPage": 1
  }
}
```

### Get an recipe

Request Method **GET**

URL: `https://api.giziwise.my.id/recipes/{id}`

`id` is the id of the recipe that you want to get.

Example response:

```json
{
  "statusCode": 200,
  "messages": [],
  "data": {
    "id": 1,
    "title": "Cap cay diet",
    "summary": "Cap cay 335 kalori",
    "image": "https://storage.googleapis.com/gizi-wise/images/recipes/1686015894836-cap-cay-diet-335-kalori-foto-resep-utama.webp",
    "isFeatured": true,
    "ingredients": "<ol><li><p>200 gr dada ayam<li><p>1 buah wortel ukuran sedang<li><p>50 gram jagung acar/putren<li><p>100 gram pak choy<li><p>50 gram jamur champignon<li><p>50 gram jamur merang<li><p>60 gram jamur shitake<li><p>1 butir telur<li><p>1 bungkus saori saos tiram<li><p>2 gram minyak<li><p>2 bawang putih<li><p>80 gram bombay</ol>",
    "instructions": "<ol><li><p>Langkah 1<p>Cuci bersih sayur mayur kemudian potong potong sesuai selera. Cincang bawang putih dan iris tipis bombay<li><p>Langkah 2<p>Bilas ayam (sebenernya gak disarankan) dan potong dadu<li><p>Langkah 3<p>Masukan minyak dan bawang putih kemudian tumis hingga mulai cokelat baru masukan bombay dan diamkan sampe agak gosong agar wangi.<li><p>Langkah 4<p>Masukan dada ayam dan tumis sebentar<li><p>Langkah 5<p>Tambahkan air sedikit kemudian cemplung semua sayur yang sudah dipotong<li><p>Langkah 6<p>Tunggu sampai sayuran matang kemudian masukan telur yang sudah dikocok. Tambahkan saori dan garam sesuai selera.<li><p>Langkah 7<p>Siap dihidangkan dengan nasi</ol>",
    "tips": "string",
    "authorId": "fea7b1f2-a9dd-41da-9a80-3b61eb8cb07c",
    "createdAt": "2023-06-06T01:51:09.717Z",
    "updatedAt": "2023-06-06T01:51:09.717Z",
    "recipeTags": [
      {
        "tagId": 4,
        "tag": {
          "name": "Sayuran"
        }
      }
    ],
    "author": {
      "name": "Admon"
    }
  }
}
```

### The different between list of recipes and get an recipe

The different between list of recipes and get an recipe is that list of recipes doesn't have `ingredients` and `instructions` field, while get an recipe has them.

### Possible Errors & status codes:

- Status code 404 (Not Found): if the recipe is not found.

If you find any other errors, please contact me.
