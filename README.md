# Recipe APP

## API
The backend was created using Express and Mongo

You need a mongo server running. Can do it with docker:
```
docker run -d -p 27017:27017 --name mongodb mongo
```

Then, install the dependencies:
```
npm i
```

Create a `.env` file setting up the variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/recipe-db
```

...or whatever you want

Then you can run
```
npm run dev
```

### Front
The frontend was created using React, Vite and Tailwind

First create the .env.local file with the params
```
VITE_API_BASE_URL=http://localhost:5000/api
```

This will be the API URL you set on the Backend

Install dependencies:
```
npm i
```

Then you can run
```
npm run dev
```


