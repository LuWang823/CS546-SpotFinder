import _ from "lodash";

class ApiFeatures {
  constructor(queryPromise, queryObject) {
    this.queryPromise = queryPromise;
    this.queryObject = queryObject;
  }

  searchByName() {
    if ("name" in this.queryObject && typeof this.queryObject.name === "string")
      this.queryPromise.find({
        name: { $regex: this.queryObject.name, $options: "i" },
      });
    return this;
  }

  searchByHobby() {
    if (
      "hobby" in this.queryObject &&
      typeof this.queryObject.hobby === "string"
    )
      this.queryPromise.find({
        hobby: { $regex: this.queryObject.hobby, $options: "i" },
      });
    return this;
  }

  filter() {
    const excludeFields = ["page", "limit", "sort", "fields"];
    let queryObject = _.omit(this.queryObject, excludeFields);

    queryObject = JSON.parse(
      JSON.stringify(queryObject).replace(
        /\b(gt|gte|lt|lte)\b/g,
        (operator) => `$${operator}`,
      ),
    );

    this.queryPromise.find(queryObject);

    return this;
  }

  limitFields() {
    if (
      !("fields" in this.queryObject) ||
      typeof this.queryObject.fields !== "string"
    )
      return this;

    const selectedFields = this.queryObject.fields.split(",").join(" ");
    this.queryPromise.select(selectedFields);

    return this;
  }

  sort() {
    if (!("sort" in this.queryObject)) {
      this.queryPromise.sort("createdAt");
      return this;
    }

    if (typeof this.queryObject.sort === "string") {
      const sortBy = this.queryObject.sort.split(",").join(" ");
      this.queryPromise.sort(sortBy);
    }

    return this;
  }

  pagination() {
    const page = "page" in this.queryObject ? Number(this.queryObject.page) : 1;
    const limit =
      "limit" in this.queryObject ? Number(this.queryObject.limit) : 100;
    const skip = (page - 1) * limit;
    this.queryPromise.skip(skip).limit(limit);

    return this;
  }
}

export default ApiFeatures;
