# Libanga Dedicace API

Libanga Dedicace is a Node.js API that allows **sellers** (artists, clubs, journalists, events) to offer dedication options, which Internet users can then order.

---

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Sellers](#sellers-api-endpoints)
  - [Options](#options-api-endpoints)
  - [Dedications](#dedications-api-endpoints)
---

## Requirements

* Node.js v14.20.1 or later
* MongoDB Atlas
* Mongoose

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Eliel512/libanga-dedicace.git
   cd libanga-dedicace
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```
## Configuration

1. Create a .env file and add the following environment variables:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>
TOKEN_KEY=<JWT_TOKEN_KEY>
NODE_ENV=<NODE_ENV>
```

---

## Usage

After installing the dependencies and configuring the environment, you can run the API locally or deploy it on a server.

Base URL: `http://localhost:<PORT>/api`

---

## API Endpoints

### Users

#### Registration

To register a new user, send a POST request to the `/api/users/signup` endpoint with the following JSON body:

```
{
  "fname": "John",
  "lname": "Doe",
  "email": "johndoe@example.com",
  "password": "password"
}
```

The response will be a JSON object with the following properties:

* `_id`: The user ID
* `fname`: The user firstname
* `lname`: The user lastname
* `email`: The user email
* `token`: The JWT token

#### Login

To login, send a POST request to the `/api/users/signin` endpoint with the following JSON body:

```
{
  "email": "johndoe@example.com",
  "password": "password"
}
```

The response will be a JSON object with the following properties:

* `_id`: The user ID
* `fname`: The user firstname
* `lname`: The user lastname
* `email`: The user email
* `token`: The JWT token

#### Authentication

To authenticate a user, send a GET request to the `/api/users` endpoint with the following headers:

* Authorization: Bearer <token>

The response will be a JSON object with the following properties:

* `_id`: The user ID
* `fname`: The user firstname
* `lname`: The user lastname
* `email`: The user email
* `token`: The JWT token

#### Check

To check if a email exists or a token is still valid, send a POST request to the `/api/users` endpoint with the following body:

* `type`: The type of check. Takes as value either `email` or `token`
* `token!`: If `type == token`, put a `token` key containing the token
* `email!`: If `type == email`, put a `email` key containing the email

The response will be a JSON object with the following properties:

* `found`: A boolean indicating whether the property was found or not

#### Edit

To edit an existing user, send a POST request to the `/api/users/edit` endpoint with the following form-data body (None of these fields are required but the request body cannot be empty):

```
{
  "fname": "John",
  "lname": "Doe",
  "email": "johndoe@example.com",
  "password": "password",
  "file": The user profile picture
}
```

The response will be a JSON object with the following properties:

* `_id`: The user ID
* `fname`: The user firstname
* `lname`: The user lastname
* `email`: The user email
* `imageUrl`: The user profile picture url

---

### Sellers API Endpoints

These routes allow administrators to create, retrieve, and delete sellers (Artist, Journalist, Club, Event) and their associated options.
**Note**: Each Seller (Artist, Club, Journalist except Event) contains all the associated User details. This includes fields like name, email, and other user-specific information, depending on the context.

#### 1. **Create a Seller**

- **URL:** `/api/stuff/seller`
- **Method:** `POST`
- **Headers:** 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Middleware:**
  - `auth`: Checks if the user is authenticated.
  - `isAdmin`: Ensures the user has admin privileges to create sellers.
- **Request Body:**

  ```json
  {
    "kind": "artist",  // or 'journalist', 'club', 'event'
    "name": "Artist Name",
    "type": "artist",  // or dj
    "genres": ["Pop", "Jazz"],  // For artists: optional
    "media": "Media Name",  // For journalists
    "location": "Club Address",  // For clubs
    "events": ["event_id1", "event_id2"],  // For clubs or artists
    "date": "2024-01-15",  // For events
    "ticketPrice": 50.0,  // For events
    "options": ["option_id1", "option_id2"]  // Dedication options offered
  }
  ```

- **Response:**

  ```json
  {
    "_id": "seller_id",
    "name": "Artist Name",
    "options": ["option_id1", "option_id2"],
    "type": "Singer",
    "genres": ["Pop", "Jazz"]
  }
  ```

- **Errors:**
  - `400`: Invalid request body (e.g., wrong `kind`)
  - `401`: Unauthorized (missing or invalid JWT)
  - `403`: Access denied (admin privileges required)
  - `500`: Internal server error (database issues)

---

#### 2. **Get All Sellers**

- **URL:** `/api/stuff/seller`
- **Method:** `GET`
- **Request Query Parameters:**
  - `page`: (Optional) The page number for pagination. Default is `1`.
  - `limit`: (Optional) Number of results per page. Default is `0` (no limit).
  - `kind`: (Optional) The type of seller to retrieve. Can be `artist`, `journalist`, `club`, `event`, or `all`.
  - `seller`: (Optional) The ID of a specific seller to retrieve.

- **Response:**

  ```json
  [
    {
      "_id": "seller_id",
      "name": "Seller Name",
      "options": ["option_id1", "option_id2"],
      "location": "Club Address"  // For clubs or events
    }
  ]
  ```

- **Errors:**
  - `500`: Internal server error (issues with fetching data)

---

#### 3. **Delete a Seller**

- **URL:** `/api/stuff/seller`
- **Method:** `DELETE`
- **Headers:** 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Middleware:**
  - `auth`: Checks if the user is authenticated.
  - `isAdmin`: Ensures the user has admin privileges to delete sellers.
- **Request Query Parameters:**
  - `id`: The ID of the seller to delete.
  - `kind`: The type of the seller (artist, journalist, club, event).

- **Response:**

  ```json
  {
    "_id": "seller_id",
    "message": "Seller deleted successfully."
  }
  ```

- **Errors:**
  - `404`: Seller not found
  - `401`: Unauthorized (missing or invalid JWT)
  - `500`: Internal server error

---

### Middlewares

#### 1. **`auth` Middleware**
This middleware checks the JWT in the request's `Authorization` header and verifies the token. If valid, it extracts the `userId` from the token and attaches it to the `req` object for further use. If invalid or missing, it responds with:

- **Error Responses:**
  - `401`: Unauthorized, token missing or invalid.

#### 2. **`isAdmin` Middleware**
This middleware ensures that the authenticated user has administrative privileges for the `kind` of seller they want to manage (e.g., artist, journalist, club). It checks if the user's privileges allow creating, updating, or deleting sellers. If the user lacks the required permissions, the request is denied.

- **Error Responses:**
  - `403`: Access denied, admin privileges required.
  - `500`: Internal server error (privilege checking issues).

---

### Error Handling

- **401 Unauthorized:** If the JWT is invalid or missing.
- **403 Forbidden:** If the user lacks admin privileges.
- **404 Not Found:** If the seller to delete is not found.
- **500 Internal Server Error:** For general errors with the database or other issues.

---

### Options API Endpoints

These routes allow **sellers** (artists, clubs, journalists, or events) to create, retrieve, and manage dedication options.

#### 1. **Get All Options for a Seller**

- **URL:** `/api/stuff/option/all`
- **Method:** `GET`
- **Query Parameters:**
  - `seller`: The ID of the seller (e.g., artist, event, club) whose options you want to retrieve.

- **Response:**

  ```json
  [
    {
      "_id": "option_id",
      "name": "Custom Dedication",
      "price": 50.0,
      "seller": {
        "_id": "seller_id",
        "name": "Artist Name"
      }
    }
  ]
  ```

- **Errors:**
  - `500`: Internal server error

---

#### 2. **Get a Specific Option**

- **URL:** `/api/stuff/option`
- **Method:** `GET`
- **Query Parameters:**
  - `id`: The ID of the option you want to retrieve.

- **Response:**

  ```json
  {
    "_id": "option_id",
    "name": "Custom Dedication",
    "price": 50.0,
    "seller": {
      "_id": "seller_id",
      "name": "Artist Name"
    }
  }
  ```

- **Errors:**
  - `500`: Internal server error

---

#### 3. **Create a New Option**

- **URL:** `/api/stuff/option`
- **Method:** `POST`
- **Headers:** 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Middleware:**
  - `isSeller`: Checks if the user has permission to create options (must be a seller).
  - `postOneMiddleware`: Validates the request body.
- **Request Body:**

  ```json
  {
    "name": "Custom Dedication",
    "description": "A unique, personal dedication",
    "price": 50.0,
    "seller": {
      "model": "user",  // or 'event'
      "infos": "seller_id"
    },
    "options": ["sub_option_id1", "sub_option_id2"]
  }
  ```

- **Response:**

  ```json
  {
    "_id": "option_id",
    "name": "Custom Dedication",
    "description": "A unique, personal dedication",
    "price": 50.0,
    "seller": {
      "_id": "seller_id",
      "name": "Artist Name"
    }
  }
  ```

- **Errors:**
  - `400`: Invalid request data (e.g., missing required fields).
  - `403`: Access denied (only sellers can create options).
  - `500`: Internal server error

---

### Middlewares

#### 1. **`postOneMiddleware`**

This middleware validates the incoming request body when creating a new option using `Joi`. It checks that required fields like `name`, `price`, and `seller` are present and correctly formatted.

- **Error Responses:**
  - `400`: If validation fails (invalid or missing fields).

---

#### 2. **`isSeller` Middleware**

This middleware checks if the authenticated user has seller privileges. It verifies whether the user has a `kind` field (indicating they are a seller) or event writing privileges. Without these, access is denied.

- **Error Responses:**
  - `403`: If the user is not a seller.
  - `500`: If there is an error verifying privileges.

---

### Error Handling

- **400 Bad Request:** If the request body is invalid or missing required fields.
- **403 Forbidden:** If the user is not a seller and lacks permission to create options.
- **500 Internal Server Error:** For server-side errors during database operations.

---

### Dedications API Endpoints

These routes allow **users** to create and manage dedications. A dedication is generated when a user orders an option offered by a seller (artist, club, journalist, event).

#### 1. **Create a Dedication**

- **URL:** `/api/stuff/dedication`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "dedicationText": "This is a special dedication",
    "option": "option_id"  // The ID of the option being ordered
  }
  ```

- **Response:**

  ```json
  {
    "_id": "dedication_id",
    "dedicationText": "This is a special dedication",
    "user": {
      "_id": "user_id",
      "name": "User Name"
    },
    "option": {
      "_id": "option_id",
      "name": "Option Name",
      "seller": {
        "_id": "seller_id",
        "name": "Seller Name"
      }
    }
  }
  ```

- **Errors:**
  - `500`: Internal server error (e.g., issues with saving the dedication)

---

#### 2. **Get All Dedications for a User**

- **URL:** `/api/stuff/dedication/all`
- **Method:** `GET`
- **Headers:** 
  - `Authorization: Bearer <JWT_TOKEN>`

- **Response:**

  ```json
  [
    {
      "_id": "dedication_id",
      "dedicationText": "This is a special dedication",
      "user": {
        "_id": "user_id",
        "name": "User Name"
      },
      "option": {
        "_id": "option_id",
        "name": "Option Name",
        "seller": {
          "_id": "seller_id",
          "name": "Seller Name"
        }
      }
    }
  ]
  ```

- **Errors:**
  - `500`: Internal server error

---

#### 3. **Get a Specific Dedication**

- **URL:** `/api/stuff/dedication`
- **Method:** `GET`
- **Headers:** 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Query Parameters:**
  - `id`: The ID of the dedication to retrieve.

- **Response:**

  ```json
  {
    "_id": "dedication_id",
    "dedicationText": "This is a special dedication",
    "user": {
      "_id": "user_id",
      "name": "User Name"
    },
    "option": {
      "_id": "option_id",
      "name": "Option Name",
      "seller": {
        "_id": "seller_id",
        "name": "Seller Name"
      }
    }
  }
  ```

- **Errors:**
  - `500`: Internal server error

---

### Error Handling

- **500 Internal Server Error:** For general errors during saving or retrieving dedications (e.g., issues with database operations).

---

### Comments API Endpoints
This API allows managing comments associated with posts and their authors. **POST**, **PUT**, and **DELETE** operations require authentication, while **GET** operations are public.

#### 1. Create Comment

- **URL**: `api/stuff/comments`
- **Method**: `POST`
- **Auth**: Required
- **Request Body**:
  ```json
  {
    "content": "Comment content",
    "author": "Author ID",
    "post": "Post ID"
  }

- **Success Response (201)**:
  ```json
  {
    "message": "Comment created successfully",
    "comment": {
      "_id": "Comment ID",
      "content": "Comment content",
      "author": {
        "_id": "Author ID",
        "name": "Author name"
      },
      "post": {
        "infos": "Post ID",
        "model": "Post model name"
      },
      "createdAt": "Creation date",
      "updatedAt": "Update date"
    }
  }

#### 2. Get Comments

- **URL**: `api/stuff/comments`
- **Method**: `GET`
- **Auth**: Not required
- **Query Parameters**:
  - `type`: Specifies the query type (`id`, `author`, `post`)
  - For `type=id`:
    - `id`: ID of the comment
  - For `type=author`:
    - `author`: ID of the author
  - For `type=post`:
    - `post`: ID of the post
- Success Response (200):
  - For `type=id`:
    ```json
    {
      "comment": {
        "_id": "Comment ID",
        "content": "Comment content",
        "author": {
          "_id": "Author ID",
          "name": "Author name"
        },
        "post": {
          "infos": "Post ID",
          "model": "Post model name"
        },
        "createdAt": "Creation date",
        "updatedAt": "Update date"
      }
    }
  ```
  - For `type=author`:
    ```json
    {
      "comments": [
        {
          "_id": "Comment ID",
          "content": "Comment content",
          "author": {
            "_id": "Author ID",
            "name": "Author name"
          },
          "post": {
            "infos": "Post ID",
            "model": "Post model name"
          },
          "createdAt": "Creation date",
          "updatedAt": "Update date"
        }
      ]
    }
  ```
  - For `type=post`:
    ```json
    {
      "comments": [
        {
          "_id": "Comment ID",
          "content": "Comment content",
          "author": {
            "_id": "Author ID",
            "name": "Author name"
          },
          "post": {
            "infos": "Post ID",
            "model": "Post model name"
          },
          "createdAt": "Creation date",
          "updatedAt": "Update date"
        }
      ]
    }

- **Error Responses**:
  - `400 Bad Request` for missing or incorrect parameters
  - `404 Not Found` if the comment or comments are not found
  - `500 Internal Server Error` for server issues

#### 3. Update Comment

- **URL**: `api/stuff/comments`
- **Method**: `PUT`
- **Auth**: Required (Author must match)
- **Request Body**:
  ```json
  {
    "id": "ID of the comment",
    "content": "Updated comment content"
  }
- **Success Response**:
  ```json
  {
    "message": "Comment updated successfully",
    "comment": {
      "_id": "Comment ID",
      "content": "Updated comment content",
      "author": {
        "_id": "Author ID",
        "name": "Author name"
      },
      "post": {
        "infos": "Post ID",
        "model": "Post model name"
      },
      "createdAt": "Creation date",
      "updatedAt": "Update date"
    }
  }

#### 4. Delete Comment

- **URL**: `api/stuff/comments`
- **Method**: `DELETE`
- **Auth**: Required (Author must match)
- **Query Parameters**:
  - **id**: `ID` of the comment
- **Success Response (200)**:
  ```json
  {
  "message": "Commentaire supprimé avec succès"
  }