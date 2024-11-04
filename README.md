# Description

This is a simple website for uploading and viewing images following Neumorphism for the UI. It allows you to upload, comment on, and search for images. Most of the website is built using templating, with minimal client-side Javascript for updating comments.

## Homepage:

![5.png](README_assets/62f37f514d4f24a850740e538c12bff755e14ec7.png)

## Registering and Uploading:

![1.png](README_assets/01aae9bbfe69e43ae32c7177167830f64057cdeb.png)

![2.png](README_assets/862ad02139d4bb2e746bda9fbd66269a89491a4a.png)

## Searching

![4.png](README_assets/dc05ed23075fa12062bdcff1ae04d2aa6d5c579f.png)

## Viewing and Image's Details

![3.png](README_assets/ba89e01f4a494dd4f982bf0b12f9bca8f819815f.png)

# Build Instructions

1. Use npm to install dependencies via `npm install`

2. Install MySQL and MySQL Workbench for the database.
   
   - Create a .env file in the `application\` directory that includes the following information about your database:
     
     - ```bash
       DB_HOST='host ip for db'
       DB_USER='username for your db'
       DB_PASSWORD='password for db user'
       DATABASE='photoapp'
       DB_PORT='3306'
       ```
   
   - Use the `application\config\useme.sql` file to import the database into MySQL. Ensure database is selected by double clicking on it in the schemas tab.

# Run Instructions

1. Start database.
2. Start app using `npm start` in the `application` directory.
3. Visit `localhost:3000` to view page.
