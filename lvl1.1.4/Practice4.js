function f1(CSV){
    let map = CSV.split("\n")
                .filter(a => !/^#*$/.test(a))
                .filter(a => /^\d+\.\d+,\d+\.\d+,[А-ЯҐЄІЇа-яґєії\s]+,\d+,?$/.test(a))
                .map(a=>a.split(",")).map(([x, y, name, population]) => ({ 
                                                        x: parseFloat(x), 
                                                        y: parseFloat(y), 
                                                        name, 
                                                        population: parseInt(population) 
                                                        }))
                .sort((a, b) => (b.population || 0) - (a.population || 0))
                .slice(0,10)
                .reduce((acc, city, index)=>{
                             acc[city.name] = { population: city.population, rating: index+1 };
                             return acc;
                }, {});
    return (str)=>{
        Object.entries(map).forEach(([key,value])=>{
            str = str.replace(key, `${key} (${value.rating} місце в ТОП-10 найбільших міст України, населення ${value.population} чоловік)`);
        })
        return str;
    }
}

const data = `
49.15,28.41,Вінниця,356665,
44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
#

#45.40,34.29,Джанкой,43343,`;
let f2 = f1(data);
console.log(f2("Біла Церква це класне місто"));