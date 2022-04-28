package routes

import (
	"main/controllers"

	"github.com/labstack/echo/v4"
)

func UserRecordRoute(e *echo.Echo) {
	e.POST("/userRecord/get", controllers.GetRecordByDateAndDiseaseName)
	e.POST("/userRecord", controllers.AddUserRecord)
}
