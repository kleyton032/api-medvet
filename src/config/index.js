module.exports = {
    secret: process.env.NODE_ENV === "production" ? process.env.SECRET:"d41d8cd98f00b204e9800998ecf8427f",
    api:process.env.NODE_ENV === "production" ? "#my-dominio-para-api" : "http://localhost:4000",
    loja:process.env.NODE_ENV === "production" ? "#my-dominio-para-loja": "http://localhost:8000"
}