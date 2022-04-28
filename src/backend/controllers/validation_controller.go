package controllers

import (
	"fmt"
	"main/models"
	"main/responses"
	"net/http"
	"regexp"
	"time"

	"github.com/labstack/echo/v4"
	"golang.org/x/net/context"
)

func CheckInputForDisease(c echo.Context) error {
	_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var diseaseInput models.Input
	defer cancel()

	//validate the request body
	if err := c.Bind(&diseaseInput); err != nil {
		return c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": err.Error()}})
	}

	//use the validator library to validate required fields
	if validationErr := validate.Struct(&diseaseInput); validationErr != nil {
		return c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": validationErr.Error()}})
	}

	dnaToCheck := diseaseInput.Input

	fmt.Println(dnaToCheck)

	//check if the dna sequence is valid
	matched, _ := regexp.MatchString("^[ATCG]+$", dnaToCheck)
	if !matched {
		return c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": "Invalid DNA sequence"}})
	}

	return c.JSON(http.StatusCreated, responses.Response{Status: http.StatusCreated, Message: "success", Data: &echo.Map{"data": matched}})
}

func CheckInputForQuery(c echo.Context) error {
	_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var query models.Input
	defer cancel()

	//validate the request body
	if err := c.Bind(&query); err != nil {
		return c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": err.Error()}})
	}

	//use the validator library to validate required fields
	if validationErr := validate.Struct(&query); validationErr != nil {
		return c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": validationErr.Error()}})
	}

	stringToCheck := query.Input

	// TODO: split the string into an array of strings for date and disease

	// TODO: check if valid, sementara pake punya DNA
	matched, _ := regexp.MatchString("^[ATCG]+$", stringToCheck)
	if !matched {
		return c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": "Invalid DNA sequence"}})
	}

	return c.JSON(http.StatusCreated, responses.Response{Status: http.StatusCreated, Message: "success", Data: &echo.Map{"data": matched}})
}
