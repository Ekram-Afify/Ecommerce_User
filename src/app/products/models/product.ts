export class Product {
    constructor(public id: number,public  name: string,
        public  description: string, public price: number, public image: string,public newPrice:number,
        public discountPercentage:number,public addedtocart:boolean,public selectedQt:number,public stockQuantity:number){}
}
