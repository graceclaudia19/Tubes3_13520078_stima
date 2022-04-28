// database logic
package models

type UserTest struct {
	Name        string `json:"name,omitempty" validate:"required"`
	DNASequence string `json:"dnasequence,omitempty" validate:"required"`
	DiseaseName string `json:"diseasename,omitempty" validate:"required"`
	Method      bool   `json:"method,omitempty"`
}
