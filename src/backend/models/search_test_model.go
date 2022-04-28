package models

type SearchTest struct {
	Date        string `json:"date,omitempty" validate:"required"`
	DiseasePrediction string `json:"diseaseprediction,omitempty" validate:"required"`
}
