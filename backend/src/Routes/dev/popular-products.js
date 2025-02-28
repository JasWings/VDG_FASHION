import express from "express"


const PopularProducts = async (req,res) => {
    res.send([
        {
            "id": 1,
            "name": "Apples",
            "slug": "apples",
            "description": "An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.",
            "type_id": 1,
            "price": 2,
            "shop_id": 6,
            "sale_price": 1.6,
            "language": "en",
            "min_price": 2,
            "max_price": 2,
            "sku": "1",
            "quantity": 18,
            "in_stock": 1,
            "is_taxable": 0,
            "shipping_class_id": null,
            "status": "publish",
            "product_type": "simple",
            "unit": "1lb",
            "height": null,
            "width": null,
            "length": null,
            "image": {
                "id": "1",
                "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1/Apples.jpg",
                "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/1/conversions/Apples-thumbnail.jpg"
            },
            "video": null,
            "gallery": [
                {
                    "id": "573",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/572/apple-1.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/572/conversions/apple-1-thumbnail.jpg"
                },
                {
                    "id": "574",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/573/apple-2.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/573/conversions/apple-2-thumbnail.jpg"
                },
                {
                    "id": "575",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/574/apple.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/574/conversions/apple-thumbnail.jpg"
                },
                {
                    "id": "737",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/736/apple-2.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/736/conversions/apple-2-thumbnail.jpg"
                }
            ],
            "deleted_at": null,
            "created_at": "2021-03-08T10:24:53.000Z",
            "updated_at": "2021-12-23T18:16:06.000Z",
            "author_id": null,
            "manufacturer_id": null,
            "is_digital": 0,
            "is_external": 0,
            "external_product_url": null,
            "external_product_button_text": null,
            "ratings": 4.67,
            "total_reviews": 3,
            "rating_count": [
                {
                    "rating": 5,
                    "total": 2,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                },
                {
                    "rating": 4,
                    "total": 1,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                }
            ],
            "my_review": null,
            "in_wishlist": false,
            "blocked_dates": [],
            "translated_languages": [
                "en"
            ],
            "categories": [
                {
                    "id": 1,
                    "name": "Fruits & Vegetables",
                    "slug": "fruits-vegetables",
                    "language": "en",
                    "icon": "FruitsVegetable",
                    "image": [],
                    "details": null,
                    "parent": null,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:21:31.000000Z",
                    "updated_at": "2021-03-08T07:21:31.000000Z",
                    "deleted_at": null,
                    "parent_id": null,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 1,
                        "category_id": 1
                    }
                },
                {
                    "id": 2,
                    "name": "Fruits",
                    "slug": "fruits",
                    "language": "en",
                    "icon": null,
                    "image": [],
                    "details": null,
                    "parent": 1,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:22:04.000000Z",
                    "updated_at": "2021-03-08T07:22:04.000000Z",
                    "deleted_at": null,
                    "parent_id": 1,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 1,
                        "category_id": 2
                    }
                }
            ],
            "shop": {
                "id": 6,
                "owner_id": 1,
                "name": "Grocery Shop",
                "slug": "grocery-shop",
                "description": "The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
                "cover_image": {
                    "id": "894",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/Untitled-2.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/conversions/Untitled-2-thumbnail.jpg"
                },
                "logo": {
                    "id": "893",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/Group-36321.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/conversions/Group-36321-thumbnail.jpg"
                },
                "is_active": 1,
                "address": {
                    "zip": "61032",
                    "city": "Freeport",
                    "state": "Illinois",
                    "country": "USA",
                    "street_address": "1986  Spinnaker Lane"
                },
                "settings": {
                    "contact": "018927525111",
                    "socials": [
                        {
                            "url": "https://www.facebook.com/",
                            "icon": "FacebookIcon"
                        },
                        {
                            "url": "https://www.instagram.com/",
                            "icon": "InstagramIcon"
                        },
                        {
                            "url": "https://www.twitter.com/",
                            "icon": "TwitterIcon"
                        }
                    ],
                    "website": "https://redq.io/",
                    "location": {
                        "lat": 38.9032325,
                        "lng": -77.0211068,
                        "city": "Washington",
                        "state": "DC",
                        "country": "United States",
                        "formattedAddress": "New York Ave NW, Washington, DC, USA"
                    }
                },
                "created_at": "2021-06-27T03:48:23.000000Z",
                "updated_at": "2021-07-08T09:22:38.000000Z"
            },
            "type": {
                "id": 1,
                "name": "Grocery",
                "settings": {
                    "isHome": true,
                    "layoutType": "classic",
                    "productCard": "neon"
                },
                "slug": "grocery",
                "language": "en",
                "icon": "FruitsVegetable",
                "promotional_sliders": [
                    {
                        "id": "902",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg"
                    },
                    {
                        "id": "903",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg"
                    },
                    {
                        "id": "904",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg"
                    },
                    {
                        "id": "905",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg"
                    },
                    {
                        "id": "906",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg"
                    }
                ],
                "created_at": "2021-03-08T07:18:25.000000Z",
                "updated_at": "2021-09-26T15:23:32.000000Z",
                "translated_languages": [
                    "en"
                ]
            },
            "variations": [],
            "metas": [],
            "manufacturer": null,
            "variation_options": [],
            "tags": [],
            "author": null
        },
        {
            "id": 2,
            "name": "Baby Spinach",
            "slug": "baby-spinach",
            "description": "Spinach (Spinacia oleracea) is a leafy green flowering plant native to central and western Asia. It is of the order Caryophyllales, family Amaranthaceae, subfamily Chenopodioideae. Its leaves are a common edible vegetable consumed either fresh.",
            "type_id": 1,
            "price": 0.6,
            "shop_id": 6,
            "sale_price": null,
            "language": "en",
            "min_price": 0.6,
            "max_price": 0.6,
            "sku": "2",
            "quantity": 10,
            "in_stock": 1,
            "is_taxable": 0,
            "shipping_class_id": null,
            "status": "publish",
            "product_type": "simple",
            "unit": "2Pfund",
            "height": null,
            "width": null,
            "length": null,
            "image": {
                "id": "2",
                "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/2/BabySpinach.jpg",
                "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/2/conversions/BabySpinach-thumbnail.jpg"
            },
            "video": null,
            "gallery": [
                {
                    "id": "576",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/575/baby-spinach-1.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/575/conversions/baby-spinach-1-thumbnail.jpg"
                },
                {
                    "id": "577",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/576/baby-spinach-2.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/576/conversions/baby-spinach-2-thumbnail.jpg"
                },
                {
                    "id": "578",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/577/baby-spinach.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/577/conversions/baby-spinach-thumbnail.jpg"
                },
                {
                    "id": "738",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/737/BabySpinach_xronqz.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/737/conversions/BabySpinach_xronqz-thumbnail.jpg"
                }
            ],
            "deleted_at": null,
            "created_at": "2021-03-08T10:26:13.000Z",
            "updated_at": "2022-07-02T06:44:09.000Z",
            "author_id": null,
            "manufacturer_id": null,
            "is_digital": 0,
            "is_external": 0,
            "external_product_url": null,
            "external_product_button_text": null,
            "ratings": 3.33,
            "total_reviews": 3,
            "rating_count": [
                {
                    "rating": 4,
                    "total": 1,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                },
                {
                    "rating": 3,
                    "total": 2,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                }
            ],
            "my_review": null,
            "in_wishlist": false,
            "blocked_dates": [],
            "translated_languages": [
                "en"
            ],
            "categories": [
                {
                    "id": 1,
                    "name": "Fruits & Vegetables",
                    "slug": "fruits-vegetables",
                    "language": "en",
                    "icon": "FruitsVegetable",
                    "image": [],
                    "details": null,
                    "parent": null,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:21:31.000000Z",
                    "updated_at": "2021-03-08T07:21:31.000000Z",
                    "deleted_at": null,
                    "parent_id": null,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 2,
                        "category_id": 1
                    }
                },
                {
                    "id": 3,
                    "name": "Vegetables",
                    "slug": "vegetables",
                    "language": "en",
                    "icon": null,
                    "image": {
                        "id": null,
                        "original": null,
                        "thumbnail": null
                    },
                    "details": null,
                    "parent": 1,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:57:48.000000Z",
                    "updated_at": "2021-03-09T11:51:24.000000Z",
                    "deleted_at": null,
                    "parent_id": 1,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 2,
                        "category_id": 3
                    }
                }
            ],
            "shop": {
                "id": 6,
                "owner_id": 1,
                "name": "Grocery Shop",
                "slug": "grocery-shop",
                "description": "The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
                "cover_image": {
                    "id": "894",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/Untitled-2.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/conversions/Untitled-2-thumbnail.jpg"
                },
                "logo": {
                    "id": "893",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/Group-36321.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/conversions/Group-36321-thumbnail.jpg"
                },
                "is_active": 1,
                "address": {
                    "zip": "61032",
                    "city": "Freeport",
                    "state": "Illinois",
                    "country": "USA",
                    "street_address": "1986  Spinnaker Lane"
                },
                "settings": {
                    "contact": "018927525111",
                    "socials": [
                        {
                            "url": "https://www.facebook.com/",
                            "icon": "FacebookIcon"
                        },
                        {
                            "url": "https://www.instagram.com/",
                            "icon": "InstagramIcon"
                        },
                        {
                            "url": "https://www.twitter.com/",
                            "icon": "TwitterIcon"
                        }
                    ],
                    "website": "https://redq.io/",
                    "location": {
                        "lat": 38.9032325,
                        "lng": -77.0211068,
                        "city": "Washington",
                        "state": "DC",
                        "country": "United States",
                        "formattedAddress": "New York Ave NW, Washington, DC, USA"
                    }
                },
                "created_at": "2021-06-27T03:48:23.000000Z",
                "updated_at": "2021-07-08T09:22:38.000000Z"
            },
            "type": {
                "id": 1,
                "name": "Grocery",
                "settings": {
                    "isHome": true,
                    "layoutType": "classic",
                    "productCard": "neon"
                },
                "slug": "grocery",
                "language": "en",
                "icon": "FruitsVegetable",
                "promotional_sliders": [
                    {
                        "id": "902",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg"
                    },
                    {
                        "id": "903",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg"
                    },
                    {
                        "id": "904",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg"
                    },
                    {
                        "id": "905",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg"
                    },
                    {
                        "id": "906",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg"
                    }
                ],
                "created_at": "2021-03-08T07:18:25.000000Z",
                "updated_at": "2021-09-26T15:23:32.000000Z",
                "translated_languages": [
                    "en"
                ]
            },
            "variations": [],
            "metas": [],
            "manufacturer": null,
            "variation_options": [],
            "tags": [],
            "author": null
        },
        {
            "id": 3,
            "name": "Blueberries",
            "slug": "blueberries",
            "description": "Blueberries are perennial flowering plants with blue or purple berries. They are classified in the section Cyanococcus within the genus Vaccinium. Vaccinium also includes cranberries, bilberries, huckleberries and Madeira blueberries. Commercial blueberries—both wild and cultivated —are all native to North America.",
            "type_id": 1,
            "price": 3,
            "shop_id": 6,
            "sale_price": null,
            "language": "en",
            "min_price": 3,
            "max_price": 3,
            "sku": "3",
            "quantity": 30,
            "in_stock": 1,
            "is_taxable": 0,
            "shipping_class_id": null,
            "status": "publish",
            "product_type": "simple",
            "unit": "1lb",
            "height": null,
            "width": null,
            "length": null,
            "image": {
                "id": "3",
                "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/3/blueberries.jpg",
                "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/3/conversions/blueberries-thumbnail.jpg"
            },
            "video": null,
            "gallery": [
                {
                    "id": "580",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/579/Bluberries-2.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/579/conversions/Bluberries-2-thumbnail.jpg"
                },
                {
                    "id": "581",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/580/Bluberries.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/580/conversions/Bluberries-thumbnail.jpg"
                },
                {
                    "id": "740",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/739/blueberries_relyfn.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/739/conversions/blueberries_relyfn-thumbnail.jpg"
                }
            ],
            "deleted_at": null,
            "created_at": "2021-03-08T10:40:00.000Z",
            "updated_at": "2021-12-23T18:16:00.000Z",
            "author_id": null,
            "manufacturer_id": null,
            "is_digital": 0,
            "is_external": 0,
            "external_product_url": null,
            "external_product_button_text": null,
            "ratings": 4.67,
            "total_reviews": 3,
            "rating_count": [
                {
                    "rating": 5,
                    "total": 2,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                },
                {
                    "rating": 4,
                    "total": 1,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                }
            ],
            "my_review": null,
            "in_wishlist": false,
            "blocked_dates": [],
            "translated_languages": [
                "en"
            ],
            "categories": [
                {
                    "id": 1,
                    "name": "Fruits & Vegetables",
                    "slug": "fruits-vegetables",
                    "language": "en",
                    "icon": "FruitsVegetable",
                    "image": [],
                    "details": null,
                    "parent": null,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:21:31.000000Z",
                    "updated_at": "2021-03-08T07:21:31.000000Z",
                    "deleted_at": null,
                    "parent_id": null,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 3,
                        "category_id": 1
                    }
                },
                {
                    "id": 2,
                    "name": "Fruits",
                    "slug": "fruits",
                    "language": "en",
                    "icon": null,
                    "image": [],
                    "details": null,
                    "parent": 1,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:22:04.000000Z",
                    "updated_at": "2021-03-08T07:22:04.000000Z",
                    "deleted_at": null,
                    "parent_id": 1,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 3,
                        "category_id": 2
                    }
                }
            ],
            "shop": {
                "id": 6,
                "owner_id": 1,
                "name": "Grocery Shop",
                "slug": "grocery-shop",
                "description": "The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
                "cover_image": {
                    "id": "894",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/Untitled-2.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/conversions/Untitled-2-thumbnail.jpg"
                },
                "logo": {
                    "id": "893",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/Group-36321.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/conversions/Group-36321-thumbnail.jpg"
                },
                "is_active": 1,
                "address": {
                    "zip": "61032",
                    "city": "Freeport",
                    "state": "Illinois",
                    "country": "USA",
                    "street_address": "1986  Spinnaker Lane"
                },
                "settings": {
                    "contact": "018927525111",
                    "socials": [
                        {
                            "url": "https://www.facebook.com/",
                            "icon": "FacebookIcon"
                        },
                        {
                            "url": "https://www.instagram.com/",
                            "icon": "InstagramIcon"
                        },
                        {
                            "url": "https://www.twitter.com/",
                            "icon": "TwitterIcon"
                        }
                    ],
                    "website": "https://redq.io/",
                    "location": {
                        "lat": 38.9032325,
                        "lng": -77.0211068,
                        "city": "Washington",
                        "state": "DC",
                        "country": "United States",
                        "formattedAddress": "New York Ave NW, Washington, DC, USA"
                    }
                },
                "created_at": "2021-06-27T03:48:23.000000Z",
                "updated_at": "2021-07-08T09:22:38.000000Z"
            },
            "type": {
                "id": 1,
                "name": "Grocery",
                "settings": {
                    "isHome": true,
                    "layoutType": "classic",
                    "productCard": "neon"
                },
                "slug": "grocery",
                "language": "en",
                "icon": "FruitsVegetable",
                "promotional_sliders": [
                    {
                        "id": "902",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg"
                    },
                    {
                        "id": "903",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg"
                    },
                    {
                        "id": "904",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg"
                    },
                    {
                        "id": "905",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg"
                    },
                    {
                        "id": "906",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg"
                    }
                ],
                "created_at": "2021-03-08T07:18:25.000000Z",
                "updated_at": "2021-09-26T15:23:32.000000Z",
                "translated_languages": [
                    "en"
                ]
            },
            "variations": [],
            "metas": [],
            "manufacturer": null,
            "variation_options": [],
            "tags": [],
            "author": null
        },
        {
            "id": 4,
            "name": "Brussels Sprout",
            "slug": "brussels-sprout",
            "description": "The Brussels sprout is a member of the Gemmifera Group of cabbages, grown for its edible buds. The leaf vegetables are typically 1.5–4.0 cm in diameter and look like miniature cabbages. The Brussels sprout has long been popular in Brussels, Belgium, and may have gained its name there.",
            "type_id": 1,
            "price": 5,
            "shop_id": 6,
            "sale_price": 3,
            "language": "en",
            "min_price": 5,
            "max_price": 5,
            "sku": "4",
            "quantity": 17,
            "in_stock": 1,
            "is_taxable": 0,
            "shipping_class_id": null,
            "status": "publish",
            "product_type": "simple",
            "unit": "1lb",
            "height": null,
            "width": null,
            "length": null,
            "image": {
                "id": "4",
                "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/4/BrusselsSprouts.jpg",
                "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/4/conversions/BrusselsSprouts-thumbnail.jpg"
            },
            "video": null,
            "gallery": [
                {
                    "id": "582",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/581/Brussels-Sprout-1.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/581/conversions/Brussels-Sprout-1-thumbnail.jpg"
                },
                {
                    "id": "583",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/582/Brussels-Sprout-2.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/582/conversions/Brussels-Sprout-2-thumbnail.jpg"
                },
                {
                    "id": "584",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/583/Brussels-Sprout.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/583/conversions/Brussels-Sprout-thumbnail.jpg"
                },
                {
                    "id": "741",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/740/BrusselsSprouts_adwhet.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/740/conversions/BrusselsSprouts_adwhet-thumbnail.jpg"
                }
            ],
            "deleted_at": null,
            "created_at": "2021-03-08T10:42:32.000Z",
            "updated_at": "2021-12-23T18:15:57.000Z",
            "author_id": null,
            "manufacturer_id": null,
            "is_digital": 0,
            "is_external": 0,
            "external_product_url": null,
            "external_product_button_text": null,
            "ratings": 5,
            "total_reviews": 3,
            "rating_count": [
                {
                    "rating": 5,
                    "total": 3,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                }
            ],
            "my_review": null,
            "in_wishlist": false,
            "blocked_dates": [],
            "translated_languages": [
                "en"
            ],
            "categories": [
                {
                    "id": 1,
                    "name": "Fruits & Vegetables",
                    "slug": "fruits-vegetables",
                    "language": "en",
                    "icon": "FruitsVegetable",
                    "image": [],
                    "details": null,
                    "parent": null,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:21:31.000000Z",
                    "updated_at": "2021-03-08T07:21:31.000000Z",
                    "deleted_at": null,
                    "parent_id": null,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 4,
                        "category_id": 1
                    }
                },
                {
                    "id": 3,
                    "name": "Vegetables",
                    "slug": "vegetables",
                    "language": "en",
                    "icon": null,
                    "image": {
                        "id": null,
                        "original": null,
                        "thumbnail": null
                    },
                    "details": null,
                    "parent": 1,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:57:48.000000Z",
                    "updated_at": "2021-03-09T11:51:24.000000Z",
                    "deleted_at": null,
                    "parent_id": 1,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 4,
                        "category_id": 3
                    }
                }
            ],
            "shop": {
                "id": 6,
                "owner_id": 1,
                "name": "Grocery Shop",
                "slug": "grocery-shop",
                "description": "The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
                "cover_image": {
                    "id": "894",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/Untitled-2.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/conversions/Untitled-2-thumbnail.jpg"
                },
                "logo": {
                    "id": "893",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/Group-36321.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/conversions/Group-36321-thumbnail.jpg"
                },
                "is_active": 1,
                "address": {
                    "zip": "61032",
                    "city": "Freeport",
                    "state": "Illinois",
                    "country": "USA",
                    "street_address": "1986  Spinnaker Lane"
                },
                "settings": {
                    "contact": "018927525111",
                    "socials": [
                        {
                            "url": "https://www.facebook.com/",
                            "icon": "FacebookIcon"
                        },
                        {
                            "url": "https://www.instagram.com/",
                            "icon": "InstagramIcon"
                        },
                        {
                            "url": "https://www.twitter.com/",
                            "icon": "TwitterIcon"
                        }
                    ],
                    "website": "https://redq.io/",
                    "location": {
                        "lat": 38.9032325,
                        "lng": -77.0211068,
                        "city": "Washington",
                        "state": "DC",
                        "country": "United States",
                        "formattedAddress": "New York Ave NW, Washington, DC, USA"
                    }
                },
                "created_at": "2021-06-27T03:48:23.000000Z",
                "updated_at": "2021-07-08T09:22:38.000000Z"
            },
            "type": {
                "id": 1,
                "name": "Grocery",
                "settings": {
                    "isHome": true,
                    "layoutType": "classic",
                    "productCard": "neon"
                },
                "slug": "grocery",
                "language": "en",
                "icon": "FruitsVegetable",
                "promotional_sliders": [
                    {
                        "id": "902",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg"
                    },
                    {
                        "id": "903",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg"
                    },
                    {
                        "id": "904",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg"
                    },
                    {
                        "id": "905",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg"
                    },
                    {
                        "id": "906",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg"
                    }
                ],
                "created_at": "2021-03-08T07:18:25.000000Z",
                "updated_at": "2021-09-26T15:23:32.000000Z",
                "translated_languages": [
                    "en"
                ]
            },
            "variations": [],
            "metas": [],
            "manufacturer": null,
            "variation_options": [],
            "tags": [],
            "author": null
        },
        {
            "id": 5,
            "name": "Celery Stick",
            "slug": "celery-stick",
            "description": "celery stick - celery stalks cut into small sticks. crudites - raw vegetables cut into bite-sized strips and served with a dip. celery - stalks eaten raw or cooked or used as seasoning.",
            "type_id": 1,
            "price": 6,
            "shop_id": 6,
            "sale_price": 5,
            "language": "en",
            "min_price": 6,
            "max_price": 6,
            "sku": "5",
            "quantity": 18,
            "in_stock": 1,
            "is_taxable": 0,
            "shipping_class_id": null,
            "status": "publish",
            "product_type": "simple",
            "unit": "1lb",
            "height": null,
            "width": null,
            "length": null,
            "image": {
                "id": "5",
                "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/5/CelerySticks.jpg",
                "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/5/conversions/CelerySticks-thumbnail.jpg"
            },
            "video": null,
            "gallery": [
                {
                    "id": "585",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/584/Celery-Stick-1.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/584/conversions/Celery-Stick-1-thumbnail.jpg"
                },
                {
                    "id": "586",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/585/Celery-Stick-2.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/585/conversions/Celery-Stick-2-thumbnail.jpg"
                },
                {
                    "id": "587",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/586/Celery-Stick.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/586/conversions/Celery-Stick-thumbnail.jpg"
                },
                {
                    "id": "742",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/741/CelerySticks_ulljfz.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/741/conversions/CelerySticks_ulljfz-thumbnail.jpg"
                }
            ],
            "deleted_at": null,
            "created_at": "2021-03-08T10:44:09.000Z",
            "updated_at": "2021-12-23T18:15:54.000Z",
            "author_id": null,
            "manufacturer_id": null,
            "is_digital": 0,
            "is_external": 0,
            "external_product_url": null,
            "external_product_button_text": null,
            "ratings": 1.67,
            "total_reviews": 3,
            "rating_count": [
                {
                    "rating": 3,
                    "total": 1,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                },
                {
                    "rating": 1,
                    "total": 2,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                }
            ],
            "my_review": null,
            "in_wishlist": false,
            "blocked_dates": [],
            "translated_languages": [
                "en"
            ],
            "categories": [
                {
                    "id": 3,
                    "name": "Vegetables",
                    "slug": "vegetables",
                    "language": "en",
                    "icon": null,
                    "image": {
                        "id": null,
                        "original": null,
                        "thumbnail": null
                    },
                    "details": null,
                    "parent": 1,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:57:48.000000Z",
                    "updated_at": "2021-03-09T11:51:24.000000Z",
                    "deleted_at": null,
                    "parent_id": 1,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 5,
                        "category_id": 3
                    }
                }
            ],
            "shop": {
                "id": 6,
                "owner_id": 1,
                "name": "Grocery Shop",
                "slug": "grocery-shop",
                "description": "The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
                "cover_image": {
                    "id": "894",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/Untitled-2.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/conversions/Untitled-2-thumbnail.jpg"
                },
                "logo": {
                    "id": "893",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/Group-36321.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/conversions/Group-36321-thumbnail.jpg"
                },
                "is_active": 1,
                "address": {
                    "zip": "61032",
                    "city": "Freeport",
                    "state": "Illinois",
                    "country": "USA",
                    "street_address": "1986  Spinnaker Lane"
                },
                "settings": {
                    "contact": "018927525111",
                    "socials": [
                        {
                            "url": "https://www.facebook.com/",
                            "icon": "FacebookIcon"
                        },
                        {
                            "url": "https://www.instagram.com/",
                            "icon": "InstagramIcon"
                        },
                        {
                            "url": "https://www.twitter.com/",
                            "icon": "TwitterIcon"
                        }
                    ],
                    "website": "https://redq.io/",
                    "location": {
                        "lat": 38.9032325,
                        "lng": -77.0211068,
                        "city": "Washington",
                        "state": "DC",
                        "country": "United States",
                        "formattedAddress": "New York Ave NW, Washington, DC, USA"
                    }
                },
                "created_at": "2021-06-27T03:48:23.000000Z",
                "updated_at": "2021-07-08T09:22:38.000000Z"
            },
            "type": {
                "id": 1,
                "name": "Grocery",
                "settings": {
                    "isHome": true,
                    "layoutType": "classic",
                    "productCard": "neon"
                },
                "slug": "grocery",
                "language": "en",
                "icon": "FruitsVegetable",
                "promotional_sliders": [
                    {
                        "id": "902",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg"
                    },
                    {
                        "id": "903",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg"
                    },
                    {
                        "id": "904",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg"
                    },
                    {
                        "id": "905",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg"
                    },
                    {
                        "id": "906",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg"
                    }
                ],
                "created_at": "2021-03-08T07:18:25.000000Z",
                "updated_at": "2021-09-26T15:23:32.000000Z",
                "translated_languages": [
                    "en"
                ]
            },
            "variations": [],
            "metas": [],
            "manufacturer": null,
            "variation_options": [],
            "tags": [],
            "author": null
        },
        {
            "id": 6,
            "name": "Clementines",
            "slug": "clementines",
            "description": "clementine is a tangor, a citrus fruit hybrid between a willowleaf mandarin orange and a sweet orange, named for its late 19th-century discoverer. The exterior is a deep orange colour with a smooth, glossy appearance.",
            "type_id": 1,
            "price": 3,
            "shop_id": 6,
            "sale_price": 2.5,
            "language": "en",
            "min_price": 3,
            "max_price": 3,
            "sku": "6",
            "quantity": 50,
            "in_stock": 1,
            "is_taxable": 0,
            "shipping_class_id": null,
            "status": "publish",
            "product_type": "simple",
            "unit": "1lb",
            "height": null,
            "width": null,
            "length": null,
            "image": {
                "id": "6",
                "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/6/clementines.jpg",
                "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/6/conversions/clementines-thumbnail.jpg"
            },
            "video": null,
            "gallery": [
                {
                    "id": "590",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/589/Clementines-1.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/589/conversions/Clementines-1-thumbnail.jpg"
                },
                {
                    "id": "591",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/590/Clementines.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/590/conversions/Clementines-thumbnail.jpg"
                },
                {
                    "id": "592",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/591/Clementines-2.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/591/conversions/Clementines-2-thumbnail.jpg"
                },
                {
                    "id": "743",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/742/clementines_h74qrp.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/742/conversions/clementines_h74qrp-thumbnail.jpg"
                }
            ],
            "deleted_at": null,
            "created_at": "2021-03-08T10:45:18.000Z",
            "updated_at": "2021-12-23T18:15:52.000Z",
            "author_id": null,
            "manufacturer_id": null,
            "is_digital": 0,
            "is_external": 0,
            "external_product_url": null,
            "external_product_button_text": null,
            "ratings": 2,
            "total_reviews": 3,
            "rating_count": [
                {
                    "rating": 3,
                    "total": 1,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                },
                {
                    "rating": 2,
                    "total": 1,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                },
                {
                    "rating": 1,
                    "total": 1,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                }
            ],
            "my_review": null,
            "in_wishlist": false,
            "blocked_dates": [],
            "translated_languages": [
                "en"
            ],
            "categories": [
                {
                    "id": 1,
                    "name": "Fruits & Vegetables",
                    "slug": "fruits-vegetables",
                    "language": "en",
                    "icon": "FruitsVegetable",
                    "image": [],
                    "details": null,
                    "parent": null,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:21:31.000000Z",
                    "updated_at": "2021-03-08T07:21:31.000000Z",
                    "deleted_at": null,
                    "parent_id": null,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 6,
                        "category_id": 1
                    }
                },
                {
                    "id": 2,
                    "name": "Fruits",
                    "slug": "fruits",
                    "language": "en",
                    "icon": null,
                    "image": [],
                    "details": null,
                    "parent": 1,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:22:04.000000Z",
                    "updated_at": "2021-03-08T07:22:04.000000Z",
                    "deleted_at": null,
                    "parent_id": 1,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 6,
                        "category_id": 2
                    }
                }
            ],
            "shop": {
                "id": 6,
                "owner_id": 1,
                "name": "Grocery Shop",
                "slug": "grocery-shop",
                "description": "The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
                "cover_image": {
                    "id": "894",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/Untitled-2.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/conversions/Untitled-2-thumbnail.jpg"
                },
                "logo": {
                    "id": "893",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/Group-36321.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/conversions/Group-36321-thumbnail.jpg"
                },
                "is_active": 1,
                "address": {
                    "zip": "61032",
                    "city": "Freeport",
                    "state": "Illinois",
                    "country": "USA",
                    "street_address": "1986  Spinnaker Lane"
                },
                "settings": {
                    "contact": "018927525111",
                    "socials": [
                        {
                            "url": "https://www.facebook.com/",
                            "icon": "FacebookIcon"
                        },
                        {
                            "url": "https://www.instagram.com/",
                            "icon": "InstagramIcon"
                        },
                        {
                            "url": "https://www.twitter.com/",
                            "icon": "TwitterIcon"
                        }
                    ],
                    "website": "https://redq.io/",
                    "location": {
                        "lat": 38.9032325,
                        "lng": -77.0211068,
                        "city": "Washington",
                        "state": "DC",
                        "country": "United States",
                        "formattedAddress": "New York Ave NW, Washington, DC, USA"
                    }
                },
                "created_at": "2021-06-27T03:48:23.000000Z",
                "updated_at": "2021-07-08T09:22:38.000000Z"
            },
            "type": {
                "id": 1,
                "name": "Grocery",
                "settings": {
                    "isHome": true,
                    "layoutType": "classic",
                    "productCard": "neon"
                },
                "slug": "grocery",
                "language": "en",
                "icon": "FruitsVegetable",
                "promotional_sliders": [
                    {
                        "id": "902",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg"
                    },
                    {
                        "id": "903",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg"
                    },
                    {
                        "id": "904",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg"
                    },
                    {
                        "id": "905",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg"
                    },
                    {
                        "id": "906",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg"
                    }
                ],
                "created_at": "2021-03-08T07:18:25.000000Z",
                "updated_at": "2021-09-26T15:23:32.000000Z",
                "translated_languages": [
                    "en"
                ]
            },
            "variations": [],
            "metas": [],
            "manufacturer": null,
            "variation_options": [],
            "tags": [],
            "author": null
        },
        {
            "id": 7,
            "name": "Sweet Corn",
            "slug": "sweet-corn",
            "description": "Maize, also known as corn, is a cereal grain first domesticated by indigenous peoples in southern Mexico about 10,000 years ago. The leafy stalk of the plant produces pollen inflorescences and separate ovuliferous inflorescences called ears that yield kernels or seeds, which are fruits.",
            "type_id": 1,
            "price": 5,
            "shop_id": 6,
            "sale_price": 4,
            "language": "en",
            "min_price": 5,
            "max_price": 5,
            "sku": "7",
            "quantity": 50,
            "in_stock": 1,
            "is_taxable": 0,
            "shipping_class_id": null,
            "status": "publish",
            "product_type": "simple",
            "unit": "1lb",
            "height": null,
            "width": null,
            "length": null,
            "image": {
                "id": "7",
                "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/7/Corn.jpg",
                "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/7/conversions/Corn-thumbnail.jpg"
            },
            "video": null,
            "gallery": [
                {
                    "id": "593",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/592/Sweet-Corn-1.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/592/conversions/Sweet-Corn-1-thumbnail.jpg"
                },
                {
                    "id": "594",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/593/Sweet-Corn-2.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/593/conversions/Sweet-Corn-2-thumbnail.jpg"
                },
                {
                    "id": "595",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/594/Sweet-Corn.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/594/conversions/Sweet-Corn-thumbnail.jpg"
                },
                {
                    "id": "744",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/743/Corn_dlrtbv.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/743/conversions/Corn_dlrtbv-thumbnail.jpg"
                }
            ],
            "deleted_at": null,
            "created_at": "2021-03-08T10:48:20.000Z",
            "updated_at": "2021-12-23T18:15:49.000Z",
            "author_id": null,
            "manufacturer_id": null,
            "is_digital": 0,
            "is_external": 0,
            "external_product_url": null,
            "external_product_button_text": null,
            "ratings": 5,
            "total_reviews": 3,
            "rating_count": [
                {
                    "rating": 5,
                    "total": 3,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                }
            ],
            "my_review": null,
            "in_wishlist": false,
            "blocked_dates": [],
            "translated_languages": [
                "en"
            ],
            "categories": [
                {
                    "id": 1,
                    "name": "Fruits & Vegetables",
                    "slug": "fruits-vegetables",
                    "language": "en",
                    "icon": "FruitsVegetable",
                    "image": [],
                    "details": null,
                    "parent": null,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:21:31.000000Z",
                    "updated_at": "2021-03-08T07:21:31.000000Z",
                    "deleted_at": null,
                    "parent_id": null,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 7,
                        "category_id": 1
                    }
                },
                {
                    "id": 3,
                    "name": "Vegetables",
                    "slug": "vegetables",
                    "language": "en",
                    "icon": null,
                    "image": {
                        "id": null,
                        "original": null,
                        "thumbnail": null
                    },
                    "details": null,
                    "parent": 1,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:57:48.000000Z",
                    "updated_at": "2021-03-09T11:51:24.000000Z",
                    "deleted_at": null,
                    "parent_id": 1,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 7,
                        "category_id": 3
                    }
                }
            ],
            "shop": {
                "id": 6,
                "owner_id": 1,
                "name": "Grocery Shop",
                "slug": "grocery-shop",
                "description": "The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
                "cover_image": {
                    "id": "894",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/Untitled-2.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/conversions/Untitled-2-thumbnail.jpg"
                },
                "logo": {
                    "id": "893",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/Group-36321.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/conversions/Group-36321-thumbnail.jpg"
                },
                "is_active": 1,
                "address": {
                    "zip": "61032",
                    "city": "Freeport",
                    "state": "Illinois",
                    "country": "USA",
                    "street_address": "1986  Spinnaker Lane"
                },
                "settings": {
                    "contact": "018927525111",
                    "socials": [
                        {
                            "url": "https://www.facebook.com/",
                            "icon": "FacebookIcon"
                        },
                        {
                            "url": "https://www.instagram.com/",
                            "icon": "InstagramIcon"
                        },
                        {
                            "url": "https://www.twitter.com/",
                            "icon": "TwitterIcon"
                        }
                    ],
                    "website": "https://redq.io/",
                    "location": {
                        "lat": 38.9032325,
                        "lng": -77.0211068,
                        "city": "Washington",
                        "state": "DC",
                        "country": "United States",
                        "formattedAddress": "New York Ave NW, Washington, DC, USA"
                    }
                },
                "created_at": "2021-06-27T03:48:23.000000Z",
                "updated_at": "2021-07-08T09:22:38.000000Z"
            },
            "type": {
                "id": 1,
                "name": "Grocery",
                "settings": {
                    "isHome": true,
                    "layoutType": "classic",
                    "productCard": "neon"
                },
                "slug": "grocery",
                "language": "en",
                "icon": "FruitsVegetable",
                "promotional_sliders": [
                    {
                        "id": "902",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg"
                    },
                    {
                        "id": "903",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg"
                    },
                    {
                        "id": "904",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg"
                    },
                    {
                        "id": "905",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg"
                    },
                    {
                        "id": "906",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg"
                    }
                ],
                "created_at": "2021-03-08T07:18:25.000000Z",
                "updated_at": "2021-09-26T15:23:32.000000Z",
                "translated_languages": [
                    "en"
                ]
            },
            "variations": [],
            "metas": [],
            "manufacturer": null,
            "variation_options": [],
            "tags": [],
            "author": null
        },
        {
            "id": 8,
            "name": "Cucumber",
            "slug": "cucumber",
            "description": "Cucumber is a widely cultivated plant in the gourd family, Cucurbitaceae. It is a creeping vine that bears cucumiform fruits that are used as vegetables. There are three main varieties of cucumber: slicing, pickling, and seedless. Within these varieties, several cultivars have been created.",
            "type_id": 1,
            "price": 2.5,
            "shop_id": 6,
            "sale_price": null,
            "language": "en",
            "min_price": 2.5,
            "max_price": 2.5,
            "sku": "8",
            "quantity": 25,
            "in_stock": 1,
            "is_taxable": 0,
            "shipping_class_id": null,
            "status": "publish",
            "product_type": "simple",
            "unit": "2.5lb",
            "height": null,
            "width": null,
            "length": null,
            "image": {
                "id": "8",
                "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/8/Cucumber.jpg",
                "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/8/conversions/Cucumber-thumbnail.jpg"
            },
            "video": null,
            "gallery": [
                {
                    "id": "596",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/595/Cucumber-1.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/595/conversions/Cucumber-1-thumbnail.jpg"
                },
                {
                    "id": "597",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/596/Cucumber-2.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/596/conversions/Cucumber-2-thumbnail.jpg"
                },
                {
                    "id": "598",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/597/Cucumber.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/597/conversions/Cucumber-thumbnail.jpg"
                },
                {
                    "id": "745",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/744/Cucumber_w6hlxr.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/744/conversions/Cucumber_w6hlxr-thumbnail.jpg"
                }
            ],
            "deleted_at": null,
            "created_at": "2021-03-08T10:49:18.000Z",
            "updated_at": "2021-12-23T18:15:46.000Z",
            "author_id": null,
            "manufacturer_id": null,
            "is_digital": 0,
            "is_external": 0,
            "external_product_url": null,
            "external_product_button_text": null,
            "ratings": 5,
            "total_reviews": 3,
            "rating_count": [
                {
                    "rating": 5,
                    "total": 3,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                }
            ],
            "my_review": null,
            "in_wishlist": false,
            "blocked_dates": [],
            "translated_languages": [
                "en"
            ],
            "categories": [
                {
                    "id": 1,
                    "name": "Fruits & Vegetables",
                    "slug": "fruits-vegetables",
                    "language": "en",
                    "icon": "FruitsVegetable",
                    "image": [],
                    "details": null,
                    "parent": null,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:21:31.000000Z",
                    "updated_at": "2021-03-08T07:21:31.000000Z",
                    "deleted_at": null,
                    "parent_id": null,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 8,
                        "category_id": 1
                    }
                },
                {
                    "id": 3,
                    "name": "Vegetables",
                    "slug": "vegetables",
                    "language": "en",
                    "icon": null,
                    "image": {
                        "id": null,
                        "original": null,
                        "thumbnail": null
                    },
                    "details": null,
                    "parent": 1,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:57:48.000000Z",
                    "updated_at": "2021-03-09T11:51:24.000000Z",
                    "deleted_at": null,
                    "parent_id": 1,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 8,
                        "category_id": 3
                    }
                }
            ],
            "shop": {
                "id": 6,
                "owner_id": 1,
                "name": "Grocery Shop",
                "slug": "grocery-shop",
                "description": "The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
                "cover_image": {
                    "id": "894",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/Untitled-2.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/conversions/Untitled-2-thumbnail.jpg"
                },
                "logo": {
                    "id": "893",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/Group-36321.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/conversions/Group-36321-thumbnail.jpg"
                },
                "is_active": 1,
                "address": {
                    "zip": "61032",
                    "city": "Freeport",
                    "state": "Illinois",
                    "country": "USA",
                    "street_address": "1986  Spinnaker Lane"
                },
                "settings": {
                    "contact": "018927525111",
                    "socials": [
                        {
                            "url": "https://www.facebook.com/",
                            "icon": "FacebookIcon"
                        },
                        {
                            "url": "https://www.instagram.com/",
                            "icon": "InstagramIcon"
                        },
                        {
                            "url": "https://www.twitter.com/",
                            "icon": "TwitterIcon"
                        }
                    ],
                    "website": "https://redq.io/",
                    "location": {
                        "lat": 38.9032325,
                        "lng": -77.0211068,
                        "city": "Washington",
                        "state": "DC",
                        "country": "United States",
                        "formattedAddress": "New York Ave NW, Washington, DC, USA"
                    }
                },
                "created_at": "2021-06-27T03:48:23.000000Z",
                "updated_at": "2021-07-08T09:22:38.000000Z"
            },
            "type": {
                "id": 1,
                "name": "Grocery",
                "settings": {
                    "isHome": true,
                    "layoutType": "classic",
                    "productCard": "neon"
                },
                "slug": "grocery",
                "language": "en",
                "icon": "FruitsVegetable",
                "promotional_sliders": [
                    {
                        "id": "902",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg"
                    },
                    {
                        "id": "903",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg"
                    },
                    {
                        "id": "904",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg"
                    },
                    {
                        "id": "905",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg"
                    },
                    {
                        "id": "906",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg"
                    }
                ],
                "created_at": "2021-03-08T07:18:25.000000Z",
                "updated_at": "2021-09-26T15:23:32.000000Z",
                "translated_languages": [
                    "en"
                ]
            },
            "variations": [],
            "metas": [],
            "manufacturer": null,
            "variation_options": [],
            "tags": [],
            "author": null
        },
        {
            "id": 9,
            "name": "Dates",
            "slug": "dates",
            "description": "Phoenix dactylifera, commonly known as date or date palm, is a flowering plant species in the palm family, Arecaceae, cultivated for its edible sweet fruit.",
            "type_id": 1,
            "price": 10,
            "shop_id": 6,
            "sale_price": 8,
            "language": "en",
            "min_price": 10,
            "max_price": 10,
            "sku": "9",
            "quantity": 50,
            "in_stock": 1,
            "is_taxable": 0,
            "shipping_class_id": null,
            "status": "publish",
            "product_type": "simple",
            "unit": "1.5lb",
            "height": null,
            "width": null,
            "length": null,
            "image": {
                "id": "10",
                "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/10/Dates.jpg",
                "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/10/conversions/Dates-thumbnail.jpg"
            },
            "video": null,
            "gallery": [
                {
                    "id": "599",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/598/Dates-1.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/598/conversions/Dates-1-thumbnail.jpg"
                },
                {
                    "id": "600",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/599/Dates-2.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/599/conversions/Dates-2-thumbnail.jpg"
                },
                {
                    "id": "601",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/600/Dates.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/600/conversions/Dates-thumbnail.jpg"
                },
                {
                    "id": "746",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/745/Dates_pq4oad.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/745/conversions/Dates_pq4oad-thumbnail.jpg"
                }
            ],
            "deleted_at": null,
            "created_at": "2021-03-08T10:50:41.000Z",
            "updated_at": "2021-12-23T18:15:43.000Z",
            "author_id": null,
            "manufacturer_id": null,
            "is_digital": 0,
            "is_external": 0,
            "external_product_url": null,
            "external_product_button_text": null,
            "ratings": 3.67,
            "total_reviews": 3,
            "rating_count": [
                {
                    "rating": 5,
                    "total": 1,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                },
                {
                    "rating": 4,
                    "total": 1,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                },
                {
                    "rating": 2,
                    "total": 1,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                }
            ],
            "my_review": null,
            "in_wishlist": false,
            "blocked_dates": [],
            "translated_languages": [
                "en"
            ],
            "categories": [
                {
                    "id": 1,
                    "name": "Fruits & Vegetables",
                    "slug": "fruits-vegetables",
                    "language": "en",
                    "icon": "FruitsVegetable",
                    "image": [],
                    "details": null,
                    "parent": null,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:21:31.000000Z",
                    "updated_at": "2021-03-08T07:21:31.000000Z",
                    "deleted_at": null,
                    "parent_id": null,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 9,
                        "category_id": 1
                    }
                },
                {
                    "id": 2,
                    "name": "Fruits",
                    "slug": "fruits",
                    "language": "en",
                    "icon": null,
                    "image": [],
                    "details": null,
                    "parent": 1,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:22:04.000000Z",
                    "updated_at": "2021-03-08T07:22:04.000000Z",
                    "deleted_at": null,
                    "parent_id": 1,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 9,
                        "category_id": 2
                    }
                }
            ],
            "shop": {
                "id": 6,
                "owner_id": 1,
                "name": "Grocery Shop",
                "slug": "grocery-shop",
                "description": "The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
                "cover_image": {
                    "id": "894",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/Untitled-2.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/conversions/Untitled-2-thumbnail.jpg"
                },
                "logo": {
                    "id": "893",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/Group-36321.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/conversions/Group-36321-thumbnail.jpg"
                },
                "is_active": 1,
                "address": {
                    "zip": "61032",
                    "city": "Freeport",
                    "state": "Illinois",
                    "country": "USA",
                    "street_address": "1986  Spinnaker Lane"
                },
                "settings": {
                    "contact": "018927525111",
                    "socials": [
                        {
                            "url": "https://www.facebook.com/",
                            "icon": "FacebookIcon"
                        },
                        {
                            "url": "https://www.instagram.com/",
                            "icon": "InstagramIcon"
                        },
                        {
                            "url": "https://www.twitter.com/",
                            "icon": "TwitterIcon"
                        }
                    ],
                    "website": "https://redq.io/",
                    "location": {
                        "lat": 38.9032325,
                        "lng": -77.0211068,
                        "city": "Washington",
                        "state": "DC",
                        "country": "United States",
                        "formattedAddress": "New York Ave NW, Washington, DC, USA"
                    }
                },
                "created_at": "2021-06-27T03:48:23.000000Z",
                "updated_at": "2021-07-08T09:22:38.000000Z"
            },
            "type": {
                "id": 1,
                "name": "Grocery",
                "settings": {
                    "isHome": true,
                    "layoutType": "classic",
                    "productCard": "neon"
                },
                "slug": "grocery",
                "language": "en",
                "icon": "FruitsVegetable",
                "promotional_sliders": [
                    {
                        "id": "902",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg"
                    },
                    {
                        "id": "903",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg"
                    },
                    {
                        "id": "904",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg"
                    },
                    {
                        "id": "905",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg"
                    },
                    {
                        "id": "906",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg"
                    }
                ],
                "created_at": "2021-03-08T07:18:25.000000Z",
                "updated_at": "2021-09-26T15:23:32.000000Z",
                "translated_languages": [
                    "en"
                ]
            },
            "variations": [],
            "metas": [],
            "manufacturer": null,
            "variation_options": [],
            "tags": [],
            "author": null
        },
        {
            "id": 10,
            "name": "French Green Beans",
            "slug": "french-green-beans",
            "description": "Green beans are the unripe, young fruit and protective pods of various cultivars of the common bean. Immature or young pods of the runner bean, yardlong bean, and hyacinth bean are used in a similar way.",
            "type_id": 1,
            "price": 1.5,
            "shop_id": 6,
            "sale_price": 1.2,
            "language": "en",
            "min_price": 1.5,
            "max_price": 1.5,
            "sku": "10",
            "quantity": 50,
            "in_stock": 1,
            "is_taxable": 0,
            "shipping_class_id": null,
            "status": "publish",
            "product_type": "simple",
            "unit": "0.5lb",
            "height": null,
            "width": null,
            "length": null,
            "image": {
                "id": "11",
                "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/11/FrenchGreenBeans.jpg",
                "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/11/conversions/FrenchGreenBeans-thumbnail.jpg"
            },
            "video": null,
            "gallery": [
                {
                    "id": "602",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/601/French-Green-Beans-1.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/601/conversions/French-Green-Beans-1-thumbnail.jpg"
                },
                {
                    "id": "603",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/602/French-Green-Beans-2.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/602/conversions/French-Green-Beans-2-thumbnail.jpg"
                },
                {
                    "id": "604",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/603/French-Green-Beans.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/603/conversions/French-Green-Beans-thumbnail.jpg"
                },
                {
                    "id": "747",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/746/FrenchGreenBeans_azivow.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/746/conversions/FrenchGreenBeans_azivow-thumbnail.jpg"
                }
            ],
            "deleted_at": null,
            "created_at": "2021-03-08T10:51:28.000Z",
            "updated_at": "2021-12-23T18:15:40.000Z",
            "author_id": null,
            "manufacturer_id": null,
            "is_digital": 0,
            "is_external": 0,
            "external_product_url": null,
            "external_product_button_text": null,
            "ratings": 3.33,
            "total_reviews": 3,
            "rating_count": [
                {
                    "rating": 5,
                    "total": 1,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                },
                {
                    "rating": 3,
                    "total": 1,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                },
                {
                    "rating": 2,
                    "total": 1,
                    "positive_feedbacks_count": 0,
                    "negative_feedbacks_count": 0,
                    "my_feedback": null,
                    "abusive_reports_count": 0
                }
            ],
            "my_review": null,
            "in_wishlist": false,
            "blocked_dates": [],
            "translated_languages": [
                "en"
            ],
            "categories": [
                {
                    "id": 1,
                    "name": "Fruits & Vegetables",
                    "slug": "fruits-vegetables",
                    "language": "en",
                    "icon": "FruitsVegetable",
                    "image": [],
                    "details": null,
                    "parent": null,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:21:31.000000Z",
                    "updated_at": "2021-03-08T07:21:31.000000Z",
                    "deleted_at": null,
                    "parent_id": null,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 10,
                        "category_id": 1
                    }
                },
                {
                    "id": 2,
                    "name": "Fruits",
                    "slug": "fruits",
                    "language": "en",
                    "icon": null,
                    "image": [],
                    "details": null,
                    "parent": 1,
                    "type_id": 1,
                    "created_at": "2021-03-08T07:22:04.000000Z",
                    "updated_at": "2021-03-08T07:22:04.000000Z",
                    "deleted_at": null,
                    "parent_id": 1,
                    "translated_languages": [
                        "en"
                    ],
                    "pivot": {
                        "product_id": 10,
                        "category_id": 2
                    }
                }
            ],
            "shop": {
                "id": 6,
                "owner_id": 1,
                "name": "Grocery Shop",
                "slug": "grocery-shop",
                "description": "The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
                "cover_image": {
                    "id": "894",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/Untitled-2.jpg",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/892/conversions/Untitled-2-thumbnail.jpg"
                },
                "logo": {
                    "id": "893",
                    "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/Group-36321.png",
                    "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/891/conversions/Group-36321-thumbnail.jpg"
                },
                "is_active": 1,
                "address": {
                    "zip": "61032",
                    "city": "Freeport",
                    "state": "Illinois",
                    "country": "USA",
                    "street_address": "1986  Spinnaker Lane"
                },
                "settings": {
                    "contact": "018927525111",
                    "socials": [
                        {
                            "url": "https://www.facebook.com/",
                            "icon": "FacebookIcon"
                        },
                        {
                            "url": "https://www.instagram.com/",
                            "icon": "InstagramIcon"
                        },
                        {
                            "url": "https://www.twitter.com/",
                            "icon": "TwitterIcon"
                        }
                    ],
                    "website": "https://redq.io/",
                    "location": {
                        "lat": 38.9032325,
                        "lng": -77.0211068,
                        "city": "Washington",
                        "state": "DC",
                        "country": "United States",
                        "formattedAddress": "New York Ave NW, Washington, DC, USA"
                    }
                },
                "created_at": "2021-06-27T03:48:23.000000Z",
                "updated_at": "2021-07-08T09:22:38.000000Z"
            },
            "type": {
                "id": 1,
                "name": "Grocery",
                "settings": {
                    "isHome": true,
                    "layoutType": "classic",
                    "productCard": "neon"
                },
                "slug": "grocery",
                "language": "en",
                "icon": "FruitsVegetable",
                "promotional_sliders": [
                    {
                        "id": "902",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/offer-5.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/902/conversions/offer-5-thumbnail.jpg"
                    },
                    {
                        "id": "903",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/offer-4.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/903/conversions/offer-4-thumbnail.jpg"
                    },
                    {
                        "id": "904",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/offer-3.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/conversions/offer-3-thumbnail.jpg"
                    },
                    {
                        "id": "905",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/offer-2.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/905/conversions/offer-2-thumbnail.jpg"
                    },
                    {
                        "id": "906",
                        "original": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/offer-1.png",
                        "thumbnail": "https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/906/conversions/offer-1-thumbnail.jpg"
                    }
                ],
                "created_at": "2021-03-08T07:18:25.000000Z",
                "updated_at": "2021-09-26T15:23:32.000000Z",
                "translated_languages": [
                    "en"
                ]
            },
            "variations": [],
            "metas": [],
            "manufacturer": null,
            "variation_options": [],
            "tags": [],
            "author": null
        }
    ])
}

const PopularProductRouter = express.Router()

PopularProductRouter.get("/",PopularProducts)

export default PopularProductRouter