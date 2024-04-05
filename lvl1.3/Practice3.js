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
            // Встановлення значення властивості
            switch (propertyName){
                case 'name':this.#name = value;break;
                case 'description':this.#description = value;break;
                case 'amount':this.#amount = value;break;
                case 'price':this.#price = value;break;
                case 'brand':this.#brand = value;break;
            }
        } else {
            switch (propertyName){
                case 'name': return this.#name;
                case 'description':return this.#description
                case 'amount': return this.#amount 
                case 'price':return this.#price 
                case 'brand':return this.#brand
                case 'reviews':return this.#reviews
                case 'images':return this.#images
                case 'date':return this.#date
                case 'id': return this.#ID;
            }
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

class Electronics extends AbstractProduct{
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

function sort(products,sortRule){
    return products.sort(function(a, b) {
        if (a.propertyAccessor(sortRule) < b.propertyAccessor(sortRule)) {
            return -1;
        }
        if (a.propertyAccessor(sortRule) > b.propertyAccessor(sortRule)) {
            return 1;
        }
        return 0; 
    });
}

function getStart(products, search){
    let pr =[];
    products.forEach(product => {
        if(product.propertyAccessor("name").startsWith(search)){
            pr.push(product);
            return;
        }
        let words = product.propertyAccessor("description").split(" ");
        
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
        if(product.propertyAccessor("name") == search){
            pr.push(product);
            return;
        }        
        let description = product.propertyAccessor("description") ;
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


function searchProduct(products, search){
    
    if(search.endsWith("*")){
      search = search.slice(0,-1);
      return getStart(products,search);
    }
    return getFull(products, search);
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




let products =[];
products[0] = new Clothes(0,"name","description",1000,"brand",12);
products[1] = new Clothes(2,"футбол","123 123 name",3,"brand",12);
products[2] = new Clothes(7,"футболка","description",5,"brand",12);
products[3] = new Clothes(1,"123","123 123 футболка",6666666666,"brand",12);
products[4] = new Clothes(4,"name","1 футбол ",1,"brand",12);

console.log(products[0].propertyAccessor('name'));
console.log(searchProduct(products,"футбол*"));

console.log(sort(products,"id"));


function Hello() {
    this.message = "world";
    return "hey"
  }
  
  // не запускай, спочатку подумай)
  console.log(Hello())
  console.log(new Hello())
