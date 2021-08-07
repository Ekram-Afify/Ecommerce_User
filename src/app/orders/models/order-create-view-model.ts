export class OrderCreateViewModel {
    constructor(public productId:number, public quantity: number){}
}

export class OrderViewModel {
    constructor(public productId:number, public quantity: number,public productName:string,public image:string,public price:number,public propductPrice:number,public status:string){}
}
