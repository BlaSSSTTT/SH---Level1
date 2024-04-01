class AbstractProduct{
    #ID
    #name
    #description
    #price
    #amount
    #reviews
    #images
    #date
    #brand

    constructor(id,name,description,price,amount,review,images,date,brand){
        this.#ID = id;
        this.#name = name;
        this.#description = description;
        this.#price = price;
        this.#amount =amount;
        this.#reviews = review;
        this.#images = images;
        this.#date = date;
        this.#brand = brand;

    }


    propertyAccessor(propertyName, value) {
        if (typeof value !== 'undefined') {
            this[propertyName] = value;
        } else {
            return this[propertyName];
        }
    }
    getFullInformation(){
        let info = "";
        info+="ID: "+this.#ID+"\n";
        info+="Name: "+this.#name+"\n";
        info+="Brand: "+this.#brand+"\n";
        info+="Description: "+this.#description+"\n";
        info+="Price: "+this.#price+"\n";
        info+="Amount: "+this.#amount+"\n";
        info+="Date: "+this.#date+"\n";
        
        return info;
    }
    getPriceForQuantity(number){
        if(number>this.#amount){
            return "Not so many";
        }
        return "$"+number*this.#price;
    }
}



class Clothes extends AbstractProduct{
    #material
    #color
    constructor(id,name,description,price,amount,review,images,date,brand,material, color){
        super(id,name,description,price,amount,review,images,date,brand);
        this.#material = material;
        this.#color = color;
    }
    getColor(){
        return this.#color;
    }
    getMaterial(){
        return this.#material;
    }
    setMaterial(material){
        this.#material = material;
    }
    setColor(color){
        this.#color = color;
    }
    getReviewByID(id){
        for (const element of super.propertyAccessor("reviews")) {
            if (element.id === id) {
                return element;
            }
        }
        return null; 
    }
    addReview(review){
        super.propertyAccessor("reviews")[super.propertyAccessor("reviews").length] = review;
    }
    deleteReview(id){
        let i = 0;
        for(;i<super.propertyAccessor("reviews").length;i++){
            if(super.propertyAccessor("reviews")[i].id == id){
                break;
            }
        }
        super.propertyAccessor("reviews").splice(i,1);
    }
    getAverageRating(){
        let sum = 0;
        for (const element of super.propertyAccessor("reviews")) {
            sum+=element.rating['service'];
            sum+=element.rating['price'];
            sum+=element.rating['value'];
            sum+=element.rating['quality'];
        }
        return sum/super.propertyAccessor("reviews").length/4;
    }

}

class Electronics{
    #warranty
    #power
    constructor(id,name,description,price,amount,review,images,date,brand,warranty, power){
        super(id,name,description,price,amount,review,images,date,brand);
        this.#warranty = warranty;
        this.#power = power;
    }
    getWarranty(){
        return this.#warranty;
    }
    setWarranty(warranty){
        this.#warranty=warranty;
    }
    getPower(){
        return this.#power;
    }
    setPower(power){
        this.#power=power;
    }
}



class Review{
    id;
    author;
    data;
    comment;
    rating;
    constructor(id,author,data,comment,rating){
        id = id;
        author = author;
        data = data;
        comment = comment;
        rating = rating;
    }
}