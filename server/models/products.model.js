import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Please enter product name"],
        tirm: true,
        max: [100, "Product name cannot exceed 30 characters"]
    },
    productDescription: {
        type: String,
        required: [true, "Please enter product description"],
    },
    productPrice: {
        type: Number,
        default: 0.0
    },
    productRatings: {
        type: String,
        default: 0
    },
    productImages: [
        {
            image: {
                type: String,
                required: true,
            }
        }
    ],
    productCategory: {
        type: String,
        required: [true, "Please enter product Category"],
        enum: {
            values: [
                "Electronics",
                "Mobile Phones",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Clothes",
                "Shoes",
                "Beauty",
                "Health",
                "Sports",
            ],
            message: "Please Select Correct Category"
        }
    },
    productSeller: {
        type: String,
        required: [true, "Please enter product seller"]
    },
    productStock: {
        type: Number,
        required: [true, "Please enter product stocks"],
        max: [20, "Product stock cannot exceed 20"]
    },
    productReviewCount: {
        type: Number,
        default: 0
    },
    productReview: [
        {
            userName: {
                type: String,
                required: [true],
            },
            userRating: {
                type: String,
                required: true,
            },
            userComment: {
                type: String,
                required: true,
            }
        }
    ],
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);