package main

import (
 "main/configs"
 "main/routes"
 "os"

 "github.com/labstack/echo/v4"
 "github.com/labstack/echo/v4/middleware"
)

func main() {
 e := echo.New()
 e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
  AllowOrigins: []string{"https://localhost:3000", "https://dna-matching-npg.herokuapp.com"},
  AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
  AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
 }))
 //run database
 configs.ConnectDB()

 //routes
 // routes.UserRoute(e) //add this
 routes.DiseaseRoute(e)
 routes.UserRecordRoute(e)
 routes.ValidationRoute(e)

 port := os.Getenv("PORT")
 e.Logger.Fatal(e.Start(":" + port))
}