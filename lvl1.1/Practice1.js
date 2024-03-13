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
    this.reviews;
    this.images;
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
        reviews.forEach(element => {
            if(element.getID === id){
                return element;
            }
            return null;
        });
    }
    this.addSize = function(size){
        this.sizes.push(size);
    }
    this.deleteSize = function(id){
        this.sizes.slice(id,1);
    }
    this.addReview = function(review){
        this.reviews.push(review);
    }
    this.deleteReview = function(id){
        let i = 0;
        for(;i<reviews.size;i++){
            if(element.getID === id){
                break;
            }
        }
        this.reviews.slice(i,1);
    }
    this.getAverageRating = function(){
        let sum = 0;
        reviews.forEach(element => {
            sum+=element.rating['service'];
            sum+=element.rating['price'];
            sum+=element.rating['value'];
            sum+=element.rating['quality'];
        });
        return sum/reviews.size/4;
    }
}
