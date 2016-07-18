export class Article {

    constructor(public id?: Number, 
                public pzn?: String, 
                public name?: String, 
                public provider?: String, 
                public dosage?: String,
                public packaging?: String,
                public sellingPrice?: Number,
                public purchasingPrice?: Number,
                public narcotic?: Boolean,
                public stock?: Number) {
        
    }

}