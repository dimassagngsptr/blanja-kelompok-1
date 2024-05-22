package models

import (
	"errors"
	"server/src/configs"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name         string       `json:"name" validate:"required,min=3"`
	Email        string       `json:"email" validate:"required,email"`
	Password     string       `json:"password" validate:"required"`
	Image        string       `json:"image"`
	Gender       string       `json:"gender"`
	Birthday     string       `json:"birthday"`
	Phone_number string       `json:"phone_number" validate:"min=10,max=13"`
	Role         string       `json:"role" validate:"required"`
	Address      []APIAddress `json:"address"`
	Store        []APIStore   `json:"store"`
	Cart         []APICart    `json:"cart"`
}

type APIAddress struct {
	gorm.Model
	Label          string `json:"label"`
	ReceivedName   string `json:"received_name"`
	ContactNumber  string `json:"contact_number"`
	Address        string `json:"address" `
	PostalCode     string `json:"postal_code"`
	City           string `json:"city"`
	PrimaryAddress bool   `json:"primary" gorm:"default:0"`
	UserID         int    `json:"user_id"`
}

type APIStore struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"description"`
	Address     string `json:"address"`
	UserID      uint   `json:"user_id"`
}

type APICart struct {
	gorm.Model
	Quantity uint   `json:"quantity"`
	Status   string `json:"status"`
	UserID   string `json:"user_id"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	validRoles := map[string]bool{
		"seller":   true,
		"customer": true,
	}
	if !validRoles[u.Role] {
		return errors.New("invalid role")
	}
	return
}

func GetAllUser() []*User {
	var results []*User
	configs.DB.Preload("Address", func(db *gorm.DB) *gorm.DB {
		var items []*APIAddress
		return db.Model(&Address{}).Find(&items)
	}).Preload("Cart", func(db *gorm.DB) *gorm.DB {
		var items []*APICart
		return db.Model(&Cart{}).Find(&items)
	}).Preload("Store", func(db *gorm.DB) *gorm.DB {
		var items []*APIStore
		return db.Model(&Cart{}).Find(&items)
	}).Find(&results)
	return results
}

func GetDetailUser(id interface{}) *User {
	var user User
	configs.DB.Preload("Address", func(db *gorm.DB) *gorm.DB {
		var items []*APIAddress
		return db.Model(&Address{}).Find(&items)
	}).First(&user, "id = ?", id)
	return &user
}

func GetUserByEmail(email string) (*User, error) {
	var user User
	results := configs.DB.Preload("Address", func(db *gorm.DB) *gorm.DB {
		var items []*APIAddress
		return db.Model(&Address{}).Find(&items)
	}).First(&user, "email = ?", email)
	return &user, results.Error
}

func PostUser(newUser *User) error {
	results := configs.DB.Create(&newUser)
	return results.Error
}
func UpdateUser(id int, user *User) error {
	results := configs.DB.Model(&User{}).Where("id = ?", id).Updates(user)
	return results.Error
}

func DeleteUser(id int) error {
	results := configs.DB.Delete(&User{}, "id = ?", id)
	return results.Error
}
