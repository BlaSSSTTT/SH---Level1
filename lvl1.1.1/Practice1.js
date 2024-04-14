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
        return this.description;
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


let products =[];
products[0] = new Product(0,"name","description",1000,"brand",12);
products[1] = new Product(2,"футбол","123 123 name",3,"brand",12);
products[2] = new Product(7,"футболка","description",5,"brand",12);
products[3] = new Product(1,"123","123 123 футболка",6666666666,"brand",12);
products[4] = new Product(4,"name","1 футбол ",1,"brand",12);


function searchProduct(products, search){
    
    if(search.endsWith("*")){
      search = search.slice(0,-1);
      return getStart(products,search);
    }
    return getFull(products, search);
}
function getStart(products, search){
    let pr =[];
    products.forEach(product => {
        if(product.getName().startsWith(search)){
            pr.push(product);
            return;
        }
        let words = product.getDescription().split(" ");
        
        for(let id in words){
            if(words[id].startsWith(search)){
                pr.push(product);
                break;
            }
        }
    });
    return pr;
}
function getFull(products, search){
    let pr =[];
    products.forEach(product => {
        if(product.getName() == search){
            pr.push(product);
            return;
        }        
        let description = product.getDescription();
        let words = description.split(" ");
        for(let id in words){
            if(words[id] == search){
                pr.push(product);
                break;
            }
        }
    });
    return pr;
}
console.log(searchProduct(products,"футбол*"));


function sort(products,sortRule){
    return products.sort(function(a, b) {
        if (a[sortRule] < b[sortRule]) {
            return -1;
        }
        if (a[sortRule] > b[sortRule]) {
            return 1;
        }
        return 0; 
    });
}
console.log(sort(products,"name"));
console.log(sort(products,"name"));

