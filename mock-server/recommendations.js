module.exports = {
    "horizontal": {
        "layout": {
            "src": "http://localhost:4201/templates/default.dot",
            "format": "js"
        },
        "configuration": {
            "header": {
                "alignment": "left",
                "type": "text",
                "text": {
                    "size": {
                        "unit": "px",
                        "value": "16"
                    },
                    "style": "bold",
                    "colour": "black"
                }
            },
            "products": {
                "max_products": 12,
                "visible_products": 4,
                "max_fields": 6,
                "fields": [
                    {
                        "display_name": "Image",
                        "sequence_number": 1,
                        "unbxd_dimension_key": "imageUrl",
                        "catalog_key": "image_url"
                    },
                    {
                        "display_name": "Title",
                        "sequence_number": 3,
                        "unbxd_dimension_key": "title",
                        "catalog_key": "product_title"
                    },
                    {
                        "display_name": "Rating",
                        "sequence_number": 2,
                        "unbxd_dimension_key": "rating",
                        "catalog_key": "product_rating"
                    }             
                ]
            }
        },
        "assets": [
            {
                "tag": "next_arrow",
                "src": "http://localhost:4201/images/recs-slider-next.png"
            },
            {
                "tag": "prev_arrow",
                "src": "http://localhost:4201/images/recs-slider-prev.png"
            },
            {
                "tag": "empty_rating",
                "src": "http://localhost:4201/images/empty-star.png"
            },
            {
                "tag": "half_rating",
                "src": "http://localhost:4201/images/half-star.png"
            },
            {
                "tag": "full_rating",
                "src": "http://localhost:4201/images/full-star.png"
            }
        ]
    },
    "vertical": {
        "layout": {
            "src": "http://localhost:4201/templates/vertical.dot",
            "format": "js"
        },
        "configuration": {
            "header": {
                "alignment": "left",
                "type": "text",
                "text": {
                    "size": {
                        "unit": "px",
                        "value": "16"
                    },
                    "style": "bold",
                    "colour": "black"
                }
            },
            "products": {
                "max_products": 12,
                "visible_products": 3,
                "max_fields": 6,
                "fields": [
                    {
                        "display_name": "Image",
                        "sequence_number": 1,
                        "unbxd_dimension_key": "imageUrl",
                        "catalog_key": "image_url"
                    },
                    {
                        "display_name": "Rating",
                        "sequence_number": 2,
                        "unbxd_dimension_key": "rating",
                        "catalog_key": "product_rating"
                    },
                    {
                        "display_name": "Title",
                        "sequence_number": 3,
                        "unbxd_dimension_key": "title",
                        "catalog_key": "product_title"
                    }
                ]
            }
        },
        "assets": [
            {
                "tag": "next_arrow",
                "src": "http://localhost:4201/images/recs-slider-next.png"
            },
            {
                "tag": "prev_arrow",
                "src": "http://localhost:4201/images/recs-slider-prev.png"
            },
            {
                "tag": "empty_rating",
                "src": "http://localhost:4201/images/empty-star.png"
            },
            {
                "tag": "half_rating",
                "src": "http://localhost:4201/images/half-star.png"
            },
            {
                "tag": "full_rating",
                "src": "http://localhost:4201/images/full-star.png"
            }
        ]
    },
    "rex_data": {
        "widget1": {
            "count": 2,
            "title": "Widget 1 Title",
            "recommendations": [
                {
                    title: 'Product 1 with a very long title. This should be shown with ellipsis',
                    imageUrl: [
                        "http://images.express.com/is/image/expressfashion/0028_04602604_1709_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 1.5,
                },
                {
                    title: 'Product 2',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0028_04602434_1822_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0028_04602434_1822_b?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 5
                },
                {
                    title: 'Product 3',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0022_05326519_0058_f04?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0022_05326519_0058_f30?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0022_05326519_0058_b57?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 3
                },
                {
                    title: 'Product 4',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0021_03984819_1981_f56?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0021_03984819_1981_b83?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 2.5
                },
                {
                    title: 'Product 5',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0021_03984819_0566_f30?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0021_03984819_0566_f38?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0021_03984819_0566_b58?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 4.5
                },
                {
                    title: 'Product 6',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0034_04584003_0302_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04584003_0302_a?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 5
                },
                {
                    title: 'Product 7',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0028_04601554_0058_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 1
                },
                {
                    title: 'Product 8',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0028_04601550_1709_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 0
                },
                {
                    title: 'Product 9',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0028_04601550_0010_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 4.5
                },
                {
                    title: 'Product 10',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0020_01692318_1701_f50?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0020_01692318_1701_f62?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 2.5
                },
                {
                    title: 'Product 11',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0034_04584001_0807_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04584001_0807_a?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 2
                },
                {
                    title: 'Product 12',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0034_04534553_0058_a?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04534553_0058_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04534553_0058_b?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04534553_0058_a2?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 3.5
                }
            ]
        },
        "widget2": {
            "count": 2,
            "title": "Widget 2 Title",
            "recommendations": [
                {
                    title: 'Product 10',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0020_01692318_1701_f50?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0020_01692318_1701_f62?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 2.5
                },
                {
                    title: 'Product 11',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0034_04584001_0807_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04584001_0807_a?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 2
                },
                {
                    title: 'Product 12',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0034_04534553_0058_a?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04534553_0058_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04534553_0058_b?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04534553_0058_a2?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 3.5
                }
            ]
        },
        "widget3": {
            count:12,
            "title":"widget 3 title",
            "recommendations": [
                {
                    title: 'Product 1 with a very long title. This should be shown with ellipsis',
                    imageUrl: [
                        "http://images.express.com/is/image/expressfashion/0028_04602604_1709_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 1.5,
                },
                {
                    title: 'Product 2',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0028_04602434_1822_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0028_04602434_1822_b?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 5
                },
                {
                    title: 'Product 3',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0022_05326519_0058_f04?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0022_05326519_0058_f30?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0022_05326519_0058_b57?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 3
                },
                {
                    title: 'Product 4',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0021_03984819_1981_f56?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0021_03984819_1981_b83?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 2.5
                },
                {
                    title: 'Product 5',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0021_03984819_0566_f30?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0021_03984819_0566_f38?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0021_03984819_0566_b58?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 4.5
                },
                {
                    title: 'Product 6',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0034_04584003_0302_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04584003_0302_a?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 5
                },
                {
                    title: 'Product 7',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0028_04601554_0058_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 1
                },
                {
                    title: 'Product 8',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0028_04601550_1709_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 0
                },
                {
                    title: 'Product 9',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0028_04601550_0010_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 4.5
                },
                {
                    title: 'Product 10',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0020_01692318_1701_f50?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0020_01692318_1701_f62?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 2.5
                },
                {
                    title: 'Product 11',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0034_04584001_0807_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04584001_0807_a?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 2
                },
                {
                    title: 'Product 12',
                    "imageUrl": [
                        "http://images.express.com/is/image/expressfashion/0034_04534553_0058_a?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04534553_0058_f?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04534553_0058_b?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon",
                        "http://images.express.com/is/image/expressfashion/0034_04534553_0058_a2?cache=on&wid=361&fmt=jpeg&qlt=75,1&resmode=sharp2&op_usm=1,1,5,0&defaultImage=Photo-Coming-Soon"
                    ],
                    rating: 3.5
                }
            ]
        }
    }
}
