let Product = function(ID,name,description,price, brand, quantity){
    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = price
    this.brand = brand;
    this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    this.activeSize;
    this.quantity = quantity;
    this.date = Date();
    this.reviews;
    this.images;
}