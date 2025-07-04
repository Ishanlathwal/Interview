class APIFeatures {
  constructor(query, reqQuery) {
    this.query = query;
    this.reqQuery = reqQuery;
  }

  search() {
    const keyWord = this.reqQuery.keyword
      ? {
          category: {
            $regex: this.reqQuery.keyword,
            $options: "i",
          },
        }
      : {};
    console.log(keyWord);
    this.query = this.query.find({ ...keyWord });
    return this;
  }

  filter() {
    const queryCopy = { ...this.reqQuery };

    const excludedFields = ["page", "keyword", "limit", "sort", "skip"];
    excludedFields.forEach((key) => delete queryCopy[key]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
}

module.exports = APIFeatures;
