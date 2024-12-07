
reviewSchema.pre('save', function(next) {
    this.timestamps = Date.now(); // update the date every time a review post is saved
    next();
  });