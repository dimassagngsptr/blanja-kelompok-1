package models

import (
	"server/src/configs"

	"gorm.io/gorm"
)

type Category struct {
	gorm.Model
	Name    string       `json:"name" validate:"required,min=3"`
	Image   string       `json:"image"`
	Product []APIProduct `json:"product"`
}

type APIProduct struct {
	gorm.Model
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Size        string  `json:"size"`
	Condition   string  `json:"condition"`
	Color       string  `json:"color"`
	StoreID     string  `json:"store_id"`
	CategoryID  string  `json:"category_id"`
}

func GetAllCategories() []*Category {
	var results []*Category
	configs.DB.Preload("Product", func(db *gorm.DB) *gorm.DB {
		var items []*APIProduct
		return configs.DB.Model(&Product{}).Find(&items)
	}).Find(&results)
	return results
}

func GetDetailCategory(id int) *Category {
	var results Category
	configs.DB.Preload("Product", func(db *gorm.DB) *gorm.DB {
		var items []*APIProduct
		return configs.DB.Model(&Product{}).Find(&items)
	}).First(&results, "id = ?", id)
	return &results
}

func CreateCategory(newCategory *Category) error {
	results := configs.DB.Create(&newCategory)
	return results.Error
}

func UpdateCategory(id int, newCategory *Category) error {
	results := configs.DB.Model(&Category{}).Where("id = ?", id).Updates(newCategory)
	return results.Error
}

func DeleteCategory(id int) error {
	results := configs.DB.Delete(&Category{}, "id = ?", id)
	return results.Error
}

func UploadPhotoCategory(id int, image map[string]interface{}) error {
	results := configs.DB.Model(&Category{}).Where("id = ?", id).Updates(image)
	return results.Error
}