package routes

import (
	"main/controllers"

	"github.com/labstack/echo/v4"
)

func DiseaseRoute(e *echo.Echo) {
	e.POST("/disease", controllers.AddDisease)
	e.GET("/disease", controllers.GetAllDisease)
}
