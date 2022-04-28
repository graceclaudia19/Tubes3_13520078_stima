// database logic
package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Disease struct {
	Id          primitive.ObjectID `json:"id,omitempty"`
	Name        string             `json:"name,omitempty"`
	DNASequence string             `json:"dnasequence,omitempty"`
}
