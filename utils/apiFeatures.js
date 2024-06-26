class ApiFeatures {
    constructor(mongooseQuery , queryString){
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    filter(){
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
        const queryObject = { ...this.queryString};
        const excludeFields =  ["page","sort","limit","fields"];
        excludeFields.forEach((field) => delete queryObject[field]);
        // add $
        let queryStr = JSON.stringify(queryObject);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) =>`$${match}`);
        
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr))
    return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(",").join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        }else{
            this.mongooseQuery = this.mongooseQuery.sort('-createAT');
        }
    return this;
    }

    limitFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(",").join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
        }else{
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        }
    return this;
    }

    search(modelName){
        if(this.queryString.keyword){
            let query = {};
            if(modelName ==='Products'){
                query.$or  = [
                    {title: { $regex : this.queryString.keyword , $options: "i"}},
                    {description: { $regex : this.queryString.keyword , $options: "i"}}
                ];
            }else{
                query = {name: { $regex : this.queryString.keyword , $options: "i"}};
            }
            this.mongooseQuery = this.mongooseQuery.find(query);
        }
        return this;
    }

    pagination(countdocuments){
    const page = this.queryString.page * 1 || 1 ;
    const limit = this.queryString.limit * 1 || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countdocuments / limit) ;
    
    if(endIndex < countdocuments ){ 
        pagination.next = page + 1;
    }
    if(skip > 0){
        pagination.prev = page - 1;
    }

    this.mongooseQuery = this.mongooseQuery
        .skip(skip)
        .limit(limit);

        this.paginationResault = pagination;
        return this;
    }

}

module.exports = ApiFeatures;