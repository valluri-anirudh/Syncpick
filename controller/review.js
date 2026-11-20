const listing = require("../models/listing.js");
const review = require("../models/review.js");

module.exports.newReview = async (req, res) => {
  let list = await listing.findById(req.params.id);
  if (!list) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let newRev = new review(req.body.review);
  newRev.author = req.user._id;
  list.reviews.push(newRev);
  await newRev.save();
  await list.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${list.id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
