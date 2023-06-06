# Articles

There are 2 types of article endpoints, they are public endpoints and private endpoints (for admin), currently this documentation only covers public endpoints.

## Public endpoints for articles

Public endpoints doesn't have authentication bearer

### List of articles

Request Method **GET**

URL: `https://api.giziwise.my.id/articles?sort=createdAt&order=asc&page=1&limit=10`

### Query strings

There are 4 required query strings, which is `sort`, `order`, `page`, and `limit`.

`sort` is the field that you want to sort, you can sort by 
- `createdAt` (time of the article is inserted)
- `updatedAt` (time of the article is updated)
- `title`
- `authorId`

`order` is the order of the sort, you can sort by `asc` (from the earlier time or the lowest number) or `desc` (from the latest time or the highest number).

`page` is the page of the data that you want to get.

`limit` is the limit of the data that you want to get.

`page` and `limit` are used for pagination, so you can limit the data that you want to get. For examples, if there are 1000 data and there is not limit and page, you will get all of the data, which resulted in heavy load for the system. But if you set the limit to 10 and page to 1, you will get 10 data from the first page. If you set the limit to 10 and page to 2, you will get 10 data from the second page.

`title` is the title of the article, you can search the article by title.

`isFeatured` (boolean, either `true` or `false`) is the featured status of the article, when provided, you will get only articles with the provided featured status.

Example response:
```json
{
  "statusCode": 200,
  "messages": [],
  "data": {
    "articles": [
      {
        "id": 2,
        "title": "Bagaimana hidup sehat",
        "summary": "string",
        "image": "https://storage.googleapis.com/gizi-wise/images/articles/1685955916363-images--18-_jpg.rf.18ffc84f219e36e935e57529f19e6a31.jpg",
        "isFeatured": true,
        "authorId": "fea7b1f2-a9dd-41da-9a80-3b61eb8cb07c",
        "createdAt": "2023-06-05T09:06:22.993Z",
        "updatedAt": "2023-06-05T22:53:33.020Z",
        "articleTags": [
          {
            "tagId": 2,
            "tag": {
              "name": "Rendah Kalori"
            }
          }
        ],
        "author": {
          "name": "Admon"
        }
      },
      {
        "id": 1,
        "title": "title",
        "summary": "string",
        "image": null,
        "isFeatured": false,
        "authorId": "fea7b1f2-a9dd-41da-9a80-3b61eb8cb07c",
        "createdAt": "2023-06-05T06:10:13.372Z",
        "updatedAt": "2023-06-05T07:07:37.249Z",
        "articleTags": [
          {
            "tagId": 2,
            "tag": {
              "name": "Rendah Kalori"
            }
          }
        ],
        "author": {
          "name": "Admon"
        }
      }
    ],
    "page": 1,
    "limit": 2,
    "totalData": 2,
    "totalPage": 1
  }
}
```

### Get an article

Request Method **GET**

URL: `https://api.giziwise.my.id/articles/{id}`

`id` is the id of the article that you want to get.

Example response:

```json
{
  "statusCode": 200,
  "messages": [],
  "data": {
    "id": 2,
    "title": "Bagaimana hidup sehat",
    "summary": "string",
    "image": "https://storage.googleapis.com/gizi-wise/images/articles/1685955916363-images--18-_jpg.rf.18ffc84f219e36e935e57529f19e6a31.jpg",
    "content": "hai",
    "isFeatured": true,
    "authorId": "fea7b1f2-a9dd-41da-9a80-3b61eb8cb07c",
    "createdAt": "2023-06-05T09:06:22.993Z",
    "updatedAt": "2023-06-05T22:53:33.020Z",
    "articleTags": [
      {
        "tagId": 2,
        "tag": {
          "name": "Rendah Kalori"
        }
      }
    ],
    "author": {
      "name": "Admon"
    }
  }
}
```

### The different between list of articles and get an article

The different between list of articles and get an article is that list of articles doesn't have `content` field, while get an article has `content` field.

### Possible Errors & status codes:

- Status code 404 (Not Found): if the article is not found.

If you find any other errors, please contact me.