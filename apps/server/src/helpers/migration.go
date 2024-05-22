package helpers

import (
	"server/src/configs"
	"server/src/models"
)

func Migration() {
	configs.DB.AutoMigrate(
		&models.User{},
		&models.Address{},
		&models.Store{},
		&models.Cart{},
		&models.Category{},
		&models.Product{},
		&models.ProductImage{})
}