// database logic
package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type UserRecord struct {
	Id                primitive.ObjectID `json:"id,omitempty"`
	Date              string             `json:"date,omitempty"`
	PersonName        string             `json:"personname,omitempty" validate:"required"`
	DiseasePrediction string             `json:"diseaseprediction,omitempty" validate:"required"`
	Similarity        float64            `json:"similarity,omitempty" validate:"required"`
	PredictionStatus  bool               `json:"predictionstatus"`
}
