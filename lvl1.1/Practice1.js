let Product = function(ID, name, description, price, brand, quantity){
    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    this.activeSize;
    this.quantity = quantity;
    this.date = Date();
    this.reviews = [];
    this.images = [];
    this.getID = function(){
        return ID;
    }
    this.getName = function(){
        return name;
    }
    this.getDescription = function(){
        return description;
    }
    this.getPrice = function(){
        return price;
    }
    this.getBrand = function(){
        return brand;
    }
    this.getActiveSize = function(){
        return activeSize;
    }
    this.getQuantity = function(){
        return quantity;
    }
    this.getDate = function(){
        return this.date;
    }
    this.getReviews = function(){
        return reviews;
    }
    this.getImages = function(param){
        if(param==null){
            return images[0];
        }
        return images[param];
    }
    this.setBrand = function(brand){
        this.brand = brand;
    }
    this.setName = function(name){
        this.name = name;
    }
    this.setDescription = function(description){
        this.description = description;
    }
    this.setPrice = function(price){
        this.price = price;
    }
    this.setActiveSize = function(activeSize){
        this.activeSize = activeSize;
    }
    this.setQuantity = function(quantity){
        this.quantity = quantity;
    }
    this.setDate = function(date){
        this.date = date;
    }
    this.setReviews = function(reviews){
        this.reviews = reviews;
    }
    this.setImages = function(images){
        this.images = images;
    }



    this.getReviewByID = function(id){
        for (const element of this.reviews) {
            console.log(element);
            if (element.id === id) {
                return element;
            }
        }
        return null; 
    }
    this.addSize = function(size){
        this.sizes[this.sizes.length]= size;
    }
    this.deleteSize = function(el){
        let id = this.sizes.indexOf(el);
        this.sizes.splice(id,1);
    }
    this.addReview = function(review){
        this.reviews[this.reviews.length] = review;
    }
    this.deleteReview = function(id){
        let i = 0;
        for(;i<this.reviews.length;i++){
            if(this.reviews[i].id == id){
                console.log(i);
                break;
            }
        }
        this.reviews.splice(i,1);
    }
    this.getAverageRating = function(){
        let sum = 0;
        for (const element of this.reviews) {
            sum+=element.rating['service'];
            sum+=element.rating['price'];
            sum+=element.rating['value'];
            sum+=element.rating['quality'];
        }
        return sum/this.reviews.length/4;
    }
}

let Review = function(ID, author,data, comment,rating){
    this.id = ID;
    this.author = author;
    this.data = data;
    this.comment = comment;
    this.rating = rating;
}



let pr = new Product(0,"name","description","price","brand",12);

pr.setDate(new Date);
pr.setActiveSize('S');
let rating = [];
rating['service'] = 5;
rating['price'] = 3;
rating['value'] = 4;
rating['quality'] = 1;

let review = new Review(0,"me",new Date,"blablabla",rating);
pr.addReview(review);
console.log(pr.reviews);
console.log("review "+pr.getReviewByID(0).comment);
pr.addSize("XXXL");
pr.deleteSize("XXL");
console.log("Everage: "+pr.getAverageRating());
console.log(pr.sizes);
pr.deleteReview(0);
console.log(pr.reviews);