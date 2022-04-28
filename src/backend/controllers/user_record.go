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

var userRecordCollection *mongo.Collection = configs.GetCollectionDNA(configs.DB, "user_record")
var Validate = validator.New()

func AddUserRecord(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	// var userRecord models.UserRecord

	var userInputReq models.UserTest
	defer cancel()

	//validate the request body
	if err := c.Bind(&userInputReq); err != nil {
		return c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": err.Error()}})
	}

	//use the validator library to validate required fields
	if validationErr := Validate.Struct(&userInputReq); validationErr != nil {
		return c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": validationErr.Error()}})
	}

	_, DNAdisease := getADiseaseInfo(c, userInputReq.DiseaseName)
	status := false
	// true for KMP
	if userInputReq.Method {
		status = models.KMP(DNAdisease.DNASequence, userInputReq.DNASequence)
	} else {
		status = models.BoyerMoore(DNAdisease.DNASequence, userInputReq.DNASequence)
	}
	similarity := models.MovingPatternSimilarity(DNAdisease.DNASequence, userInputReq.DNASequence)
	if similarity >= 80.0 {
		status = true
	}

	newUserRecord := models.UserRecord{
		Id:                primitive.NewObjectID(),
		Date:              time.Now().Format("02-January-2006"),
		PersonName:        userInputReq.Name,
		DiseasePrediction: userInputReq.DiseaseName,
		PredictionStatus:  status,
		Similarity:        similarity,
	}
	if DNAdisease.Name != "" {
		_, err := userRecordCollection.InsertOne(ctx, newUserRecord)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "error", Data: &echo.Map{"data": err.Error()}})
		}
	}

	return c.JSON(http.StatusCreated, responses.Response{Status: http.StatusCreated, Message: "success", Data: &echo.Map{"data": newUserRecord}})
}

func GetAllUsersRecord(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var users []models.UserRecord
	defer cancel()

	results, err := userRecordCollection.Find(ctx, bson.M{})

	if err != nil {
		return c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "error", Data: &echo.Map{"data": err.Error()}})
	}

	//reading from the db in an optimal way
	defer results.Close(ctx)
	for results.Next(ctx) {
		var singleUser models.UserRecord
		if err = results.Decode(&singleUser); err != nil {
			return c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "error", Data: &echo.Map{"data": err.Error()}})
		}

		users = append(users, singleUser)
	}

	return c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "success", Data: &echo.Map{"data": users}})
}

func GetRecordByDateAndDiseaseName(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var searchRecordField models.SearchTest

	if err := c.Bind(&searchRecordField); err != nil {
		return c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": err.Error()}})
	}

	var userRecords []models.UserRecord
	defer cancel()

	query := bson.M{}

	if searchRecordField.Date != "" {
		query["date"] = searchRecordField.Date
	}
	if searchRecordField.DiseasePrediction != "" {
		query["diseaseprediction"] = searchRecordField.DiseasePrediction
	}

	results, err := userRecordCollection.Find(ctx, query)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "error", Data: &echo.Map{"data": err.Error()}})
	}

	//reading from the db in an optimal way
	defer results.Close(ctx)
	for results.Next(ctx) {
		var userRecord models.UserRecord
		if err = results.Decode(&userRecord); err != nil {
			return c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "error", Data: &echo.Map{"data": err.Error()}})
		}
		userRecords = append(userRecords, userRecord)

	}

	return c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "success", Data: &echo.Map{"data": userRecords}})
}
