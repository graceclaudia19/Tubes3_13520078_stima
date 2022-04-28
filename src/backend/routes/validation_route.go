package routes

import (
	"main/controllers"

	"github.com/labstack/echo/v4"
)

func ValidationRoute(e *echo.Echo) {
	e.POST("/validation/inputDNASequence", controllers.CheckInputForDisease)
	e.POST("/validation/inputQuery", controllers.CheckInputForQuery)
}
