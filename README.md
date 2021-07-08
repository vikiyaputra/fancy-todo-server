# fancy-todo-server

**Base URL**

http://localhost:3000

# users

----
***Regsiter***
---
  Register new user.

  * **URL**

     /register

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Data Params**

   **Required:**
  ````
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      type: req.body.type
    }
  ````

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {email: "macdup@gmail.com"}
    ```


* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```
    {
      message : "SequelizeValidationError",
      errDev: {}
    }
    ```

  OR

  * **Code:** 500 <br />


----
***Login***
---
Login to user

* **URL**

  /login

* **Method:**

  `POST`

*  **URL Params**

    None

* **Data Params**

   **Required:**
  ````
    {
      email: req.body.email,
      password: req.body.password
    }
  ````

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibmFtZSI6Ik51bnVuZyIsImVtYWlsIjoibnVudW5nLndhbmdzYXB1dHJpQGdtYWlsLmNvbSIsInR5cGUiOiJub3JtYWwiLCJpYXQiOjE2MjU0NTU2NTR9.OCXAxUJ5A8nKMu9ctoN1AnsrvWgJMo0jXkz9xOisyXM",
      "name": "Nunung"
    }
    ```


* **Error Response:**
  * **Code:** 401 <br />
      **Content:** 
      ```
      {
        message : "Email / Password Salah",
        errDev: {}
      }
      ```

    OR

    * **Code:** 500 <br />


----
***OAuth Login***
---
Login to user with Google

* **URL**

  /googleLogin

* **Method:**

  `POST`

* **URL Params**

    None

* **Data Params**

    None
 
* **Sample Call**

    ```javascript
     $.ajax({
        url: "http://localhost:3000/googleLogin",
        method: "post",
        data: {
            token:id_token
        }
    })
  ```
 
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwibmFtZSI6Ik51bnVuZyIsImVtYWlsIjoibnVudW5nLndhbmdzYXB1dHJpQGdtYWlsLmNvbSIsInR5cGUiOiJub3JtYWwiLCJpYXQiOjE2MjU0NTU2NTR9.OCXAxUJ5A8nKMu9ctoN1AnsrvWgJMo0jXkz9xOisyXM",
      "name": "Nunung"
    }
    ```


* **Error Response:**
  * **Code:** 401 <br />
      **Content:** 
      ```
      {
        message : "Email / Password Salah",
        errDev: {}
      }
      ```

    OR

    * **Code:** 500 <br />


----



# todos

----
***Add Todo***
----
  Returns new todo.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

    None

* **Headers**

    **Required:**
  ````
  {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno}
  ````

* **Data Params**

   **Required:**
  ````
    {
      "title": req.body.title,
      "description": req.body.description,
      "status": req.body.status,
      "due_date": req.body.due_date
    }
  ````

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
    {
        "id": 1,
        "title": "<Todo title>",
        "description": "<Todo description>",
        "status": "<Todo status>",
        "due_date": "<Todo due_date>",
        "updatedAt": "2020-03-30T06:02:31.794Z",
        "createdAt": "2020-03-30T06:02:31.794Z"
    }
    ```


* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```
    { error : "SequelizeValidationError" }
    ```

  OR

  * **Code:** 500 <br />


----
***Display Todos***
----
  Returns all todos.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Headers**

    **Required:**
  ````
  {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno}
  ````

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
    {
        "id": 1,
        "title": "Makan ngemil",
        "description": "Jangan kebanyakan tidak sehat",
        "status": "Done",
        "due_date": "2022-06-30T18:25:43.511Z",
        "createdAt": "2021-06-21T05:23:01.303Z",
        "updatedAt": "2021-06-21T07:47:02.778Z"
    },
    {
        "id": 2,
        "title": "Makan Malam",
        "description": "Buah aja biar kurus",
        "status": "Done",
        "due_date": "2012-04-27T18:25:43.511Z",
        "createdAt": "2021-06-21T05:23:01.303Z",
        "updatedAt": "2021-06-21T07:47:16.056Z"
    },
    {
        "id": 10,
        "title": "Tidur",
        "description": "Tidur sangat penting untuk konsentrasi",
        "status": "Not Done",
        "due_date": "2021-07-01T00:00:00.000Z",
        "createdAt": "2021-06-21T07:37:52.820Z",
        "updatedAt": "2021-06-21T07:37:52.820Z"
    }
]
    ```


* **Error Response:**

  * **Code:** 500 <br />

----
***Find Todo***
----
  Returns 1 todo.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params** <br/>

    **Required:**
 
    `id=[integer]`
    

* **Data Params**<br/>

    None

* **Headers**

    **Required:**
  ````
  {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno}
  ````
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "id": 1,
        "title": "Makan ngemil",
        "description": "Jangan kebanyakan tidak sehat",
        "status": "Done",
        "due_date": "2022-06-30T18:25:43.511Z",
        "createdAt": "2021-06-21T05:23:01.303Z",
        "updatedAt": "2021-06-21T07:47:02.778Z"
    }
    ```


* **Error Response:**

  * **Code:** 500 <br />

----
***Replace Todo (entire)***
----
  Replace 1 todo (all fields).

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params** <br/>

    **Required:**
 
    `id=[integer]`
    

* **Headers**

    **Required:**
  ````
  {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno}
  ````
  

* **Data Params**<br/>

    ```json
    {
        "title": "Makan ngemil",
        "description": "Jangan kebanyakan tidak sehat",
        "status": "Not Done",
        "due_date": "2021-06-30T18:25:43.511Z"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "Todo": {
            "id": 1,
            "title": "Makan ngemil",
            "description": "Jangan kebanyakan tidak sehat",
            "status": "Not Done",
            "due_date": "2021-06-30T18:25:43.511Z",
            "createdAt": "2021-06-21T05:23:01.303Z",
            "updatedAt": "2021-06-21T08:36:25.189Z"
        }
    }
    ```


* **Error Response:**
    * **Code:** 400<br />   
    **Content:** 
        ```json
        {"message": "Validation Error"} 
        ```

    * **Code:** 404<br />
    **Content:** 
        ```json
        {"message": "Todo not Found"}   
        ```
    
    * **Code:** 500 <br />


----
***Update Todo Status***
----
  Update 1 todo (status).

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params** <br/>

    **Required:**
 
    `id=[integer]`
    

* **Data Params**<br/>

    ```json
    {
        "status": "Done"
    }
    ```

* **Headers**

    **Required:**
  ````
  {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno}
  ````
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
        "Todo": {
            "id": 1,
            "title": "Makan ngemil",
            "description": "Jangan kebanyakan tidak sehat",
            "status": "Done",
            "due_date": "2021-06-30T18:25:43.511Z",
            "createdAt": "2021-06-21T05:23:01.303Z",
            "updatedAt": "2021-06-21T08:43:52.988Z"
        }
    }
    ```


* **Error Response:**
    * **Code:** 400<br />   
    **Content:** 
        ```json
        {"message": "Validation Error"} 
        ```

    * **Code:** 404<br />
    **Content:** 
        ```json
        {"message": "Todo not Found"}   
        ```
    
    * **Code:** 500 <br />

----
***Delete Todo***
----
  Delete 1 todo.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params** <br/>

    **Required:**
 
    `id=[integer]`
    

* **Data Params**<br/>

   None

* **Headers**

    **Required:**
  ````
  {token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFyaWEiLCJlbWFpbCI6ImFyaWEud2FuZ3NhcHV0cmlAZ21haWwuY29tIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNDYwMjMyMH0.EhvcjomzDRwBiHIwNPTQlRPdYUkPmo7fwBiK76ERDno}
  ````
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        {
            "message": "succesfully deleted"
        },
        {
            "id": 10,
            "title": "Tidur",
            "description": "Tidur sangat penting untuk konsentrasi",
            "status": "Not Done",
            "due_date": "2021-07-01T00:00:00.000Z",
            "createdAt": "2021-06-21T07:37:52.820Z",
            "updatedAt": "2021-06-21T07:37:52.820Z"
        }
    ]
    ```


* **Error Response:**
    * **Code:** 404<br />
    **Content:** 
        ```json
        {"message": "Todo not Found"}   
        ```
    
    * **Code:** 500 <br />


# weathers

----
***Weather***
---
  Get weather data.

  * **URL**

     /api/weather

* **Method:**

  `GET`
  
*  **URL Params**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200<br />
    **Content:** 
    ```
    { city: 'Jakarta', temp: 30.81, weather: 'Clouds' }
    ```


* **Error Response:**


  * **Code:** 500 <br />


----