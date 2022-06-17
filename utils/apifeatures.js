class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    console.log("keyword: " + this.queryStr.keyword);
    const keyword = this.queryStr.keyword
      ? {
          pName: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  searchbyid() {
    console.log("id" + this.queryStr.id);
    const id = this.queryStr.id
      ? {
          sellerId: this.queryStr.id,
        }
      : {};
    this.query = this.query.find({ ...id });
    return this;
  }

  specificShopProductSearch() {
    console.log("Name" + this.queryStr.name);
    const name = this.queryStr.name
      ? {
          $or: [
            { pName: { $regex: this.queryStr.name, $options: "i" } },
            { pDescription: { $regex: this.queryStr.name, $options: "i" } },
          ],
          sellerId: this.queryStr.id,
        }
      : {};
    this.query = this.query.find({ ...name });
    return this;
  }

  category() {
    console.log("keyword" + this.queryStr.category);
    const category = this.queryStr.category
      ? {
          category: {
            $regex: this.queryStr.category,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...category });
    return this;
  }

  // categorybrand() {
  //   console.log("Api features: " + this.queryStr.categorybrand[0]);
  //   let findArgs = {};

  //   for (let key in this.queryStr.categorybrand) {
  //     if (this.queryStr.categorybrand[key].length > 0) {
  //       if (key === "brand") {
  //         findArgs[key] = this.queryStr.categorybrand[key];
  //         console.log("Api features: category: " + findArgs[key]);
  //         // console.log(findArgs);
  //       } else {
  //         findArgs[key] = this.queryStr.categorybrand[key];
  //         console.log("Api features: brand: " + findArgs[key]);
  //         // console.log(findArgs);
  //       }
  //     }
  //   }
  //   console.log("Api features: " + findArgs);

  //   this.query = this.query.find(findArgs);
  //   return this;
  // }

  filter() {
    const queryCopy = { ...this.queryStr };

    // console.log("api feature QueryString: " + queryCopy);
    //   Removing some fields for category
    const removeFields = ["keyword", "page", "limit", "category", "name", "id"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    // console.log("................From Api Features.........");
    console.log("QueryString: " + queryStr);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    console.log("QueryString: " + JSON.parse(queryStr));

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
