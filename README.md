# blogging-api

## Requirements

- Users should have a first_name, last_name, email, password
- A user should be able to sign up and sign in into the blog app
- Use JWT as authentication strategy and expire the token after 1 hour
- A blog can be in two states; draft and published
- Logged in and not logged in users should be able to get a list of published blogs created
- Logged in and not logged in users should be able to to get a published blog
- Logged in users should be able to create a blog.
- When a blog is created, it is in draft state
- The owner of the blog should be able to update the state of the blog to published
- The owner of a blog should be able to edit the blog in draft or published state
- The owner of the blog should be able to delete the blog in draft or published state
- The owner of the blog should be able to get a list of their blogs. 
- The endpoint should be paginated
- It should be filterable by state
- Blogs created should have title, description, tags, author, timestamp, state, read_count, reading_time and body.
- The list of blogs endpoint that can be accessed by both logged in and not logged in users should be paginated, default it to 20 blogs per page. 
- It should also be searchable by author, title and tags.
- It should also be orderable by read_count, reading_time and timestamp
- When a single blog is requested, the api should return the user information(the author) with the blog. The read_count of the blog too should be updated by 1

## Set Up
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run npm run start:dev

## Base URL


## Models

### User

|   Field       | data_type     | Constraint  |
| ------------- | ------------- | --------    |
| first_name    | string        | required    |  
| last_name     | string        | require     |
|               |               |             |
| username      | string        | Optional    |
| email         | string        | required    |
| password      | string        | required    |
|               |               |             |
| confirmedPass | string        | required    |


### Blog

|   Field       | data_type     | Constraint                  |
| ------------- | ------------- | --------                    |
| Title         | string        | required                    |  
| Author        | string        | required                    |
|               |               |                             |
| description   | string        | Optional                    |
| tags          | string        | Optional                    |
| Body          | string        | required                    |
|               |               |                             |
| state         | string        | required; default: 1        |
| timestamp     | Date          | Auto-generarted             |
| reading_time  | String        | required                    |
| read_count    | Number        | required                    |


## APIs

### Signup User

- Route: /signup
- Method: POST
- Body:
```
      {
      "email": "doe@example.com",
      "password": "Password1",
      "firstname": "jon",
      "lastname": "doe",
      "username": 'jon_doe",
    }
   ```
- Responses:
    Success
     ```
    {
        message: 'Signup successful',
        user: {
            "email": "doe@example.com",
            "password": "Password1",
            "firstname": "jon",
            "lastname": "doe",
            "username": 'jon_doe",
        }
      }
    ```

### Login User
- Route: /login
- Method: POST
- Body:
     ```
     {
        "password": "Password1",
        "username": 'jon_doe",
      }
      ```
- Responses:
    Success
```
    {
        message: 'Login successful',
        token: 'sjlkafjkldsfjsd'
    }
 ``` 
### Create Blog Post
- Route: /orders
- Method: POST
- Header
  -- Authorization: Bearer {token}
- Body:
   ```
    {
            Title: The Developer Experience,
            description: A behind the scence experience of the software developer experience,
            tags: Software, Experience,
            body: the experience of software development is not rosey as seen by others outside the tech world,
    }
   
    
- Responses:
    Success
         
            {
              state: 1,
              total_price: 900,
              created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
              items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
             }
         
### Get Blog Post
- Route: /orders/:id
- Method: GET
- Header
   -- Authorization: Bearer {token}
- Responses
    Success
          
            {
                state: 1,
                reading_time: 2 minutes read,
                createdAt: Mon Oct 31 2022 08:35:00 GMT+0100,
                author: Maxwell Ahmadu,
                Title: The Developer Experience,
                description: A behind the scence experience of the software developer experience,
                tags: Software, Experience,
                read_count: 2,
                body: the experience of software development is not rosey as seen by others outside the tech world,
                updatedAt: Mon Oct 31 2022 08:35:00 GMT+0100
             }
               
       
### Get All Post
- Route: /orders
- Method: GET
- Header:
  -- Authorization: Bearer {token}
- Query params:
- page (default: 1)
- per_page (default: 10)
- Post_by (default: created_at)
- Post (options: asc | desc, default: desc)
- state
- createdAt:
    Responses:
      Success
      
              {   
                state: 1,
                reading_time: 2 minutes read,
                createdAt: Mon Oct 31 2022 08:35:00 GMT+0100,
                author: Maxwell Ahmadu,
                Title: The Developer Experience,
                description: A behind the scence experience of the software developer experience,
                tags: Software, Experience,
                read_count: 2,
                body: the experience of software development is not rosey as seen by others outside the tech world,
                updatedAt: Mon Oct 31 2022 08:35:00 GMT+0100
              }
           









