// Creating a Class for Product Features That Contains all Additional Features that 
// needed for the Products like Search, Filter
class ProductFeatures {
    // Creating a Parameterised Constructor to get both Products and Query String and Store in Global Accessable
    constructor(products, queryString) {
        this.products = products;
        this.queryString = queryString;
    }
    // Creating a Search method to make search Fuctionalities;
    search() {
        // Check the Query parameter is present or not and make the regex opertion for the product name
        let keyword = this.queryString.keyword ? {
            productName: {
                $regex: this.queryString.keyword,
                $options: 'i',
            }
        } : {}
        // finding the product with the specific regex
        this.products.find({ ...keyword });
        // return the instance of the class for the further operations
        return this;
    }

    filter() {
        // Coping the Query String
        const queryStringCopy = { ...this.queryString };

        // Removing UnNessary Fields
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(field => delete queryStringCopy[field])

        // Find the Products with the keyword
        this.products.find({ ...queryStringCopy });
        return this;
    }
}
export default ProductFeatures;