package controllers

import (
	"main/configs"
	"main/models"
	"main/responses"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/net/context"
)

var diseaseCollection *mongo.Collection = configs.GetCollectionDNA(configs.DB, "disease")
var validate = validator.New()

func AddDisease(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var disease models.Disease
	defer cancel()

	//validate the request body
	if err := c.Bind(&disease); err != nil {
		return c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": err.Error()}})
	}

	//use the validator library to validate required fields
	if validationErr := validate.Struct(&disease); validationErr != nil {
		return c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": validationErr.Error()}})
	}

	newDisease := models.Disease{
		Id:          primitive.NewObjectID(),
		Name:        disease.Name,
		DNASequence: disease.DNASequence,
	}
	result, err := diseaseCollection.InsertOne(ctx, newDisease)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "error", Data: &echo.Map{"data": err.Error()}})
	}

	return c.JSON(http.StatusCreated, responses.Response{Status: http.StatusCreated, Message: "success", Data: &echo.Map{"data": result}})
}

func getADiseaseInfo(c echo.Context, diseaseName string) (error, models.Disease) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var diseaseInfo models.Disease

	defer cancel()

	query := bson.M{
		"name": diseaseName,
	}

	err := diseaseCollection.FindOne(ctx, query).Decode(&diseaseInfo)

	if err != nil {
		return err, diseaseInfo
	}
	return nil, diseaseInfo
}