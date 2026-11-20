const listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mapToken
  ? mbxGeocoding({ accessToken: mapToken })
  : null;

// Returns a GeoJSON Point for a place name, or null if it can't be resolved.
async function geocode(location) {
  if (!geocodingClient) return null;
  try {
    const response = await geocodingClient
      .forwardGeocode({ query: location, limit: 1 })
      .send();
    const feature = response.body.features[0];
    return feature ? feature.geometry : null;
  } catch (e) {
    console.log("Geocoding failed:", e.message);
    return null;
  }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports.index = async (req, res) => {
  const listings = await listing.find({});
  res.render("./listings/index.ejs", { listings });
};

module.exports.category = async (req, res) => {
  const queryString = req.query.q || "";
  const listings = await listing.find({ category: queryString });
  if (listings.length == 0) {
    res.render("./listings/noServices.ejs", { queryString });
  } else {
    res.render("./listings/category.ejs", { listings, queryString });
  }
};

module.exports.search = async (req, res) => {
  const queryString = (req.query.q || "").trim();
  if (!queryString) {
    return res.redirect("/listings");
  }
  const rx = new RegExp(escapeRegex(queryString), "i");
  const listings = await listing.find({
    $or: [
      { title: rx },
      { description: rx },
      { location: rx },
      { category: rx },
    ],
  });
  if (listings.length == 0) {
    res.render("./listings/noServices.ejs", { queryString });
  } else {
    res.render("./listings/category.ejs", { listings, queryString });
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.createListing = async (req, res) => {
  if (!req.file) {
    throw new ExpressError(400, "Please upload an image for your listing");
  }
  const newpost = new listing(req.body.listing);
  newpost.owner = req.user._id;
  newpost.image = { url: req.file.path, filename: req.file.filename };

  const geometry = await geocode(newpost.location);
  if (!geometry) {
    throw new ExpressError(
      400,
      "Could not find that location. Please enter a valid place name."
    );
  }
  newpost.geometry = geometry;

  await newpost.save();
  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.showListings = async (req, res) => {
  const id = req.params.id;
  const post = await listing
    .findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!post) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { post });
};

module.exports.renderUpdateForm = async (req, res) => {
  const id = req.params.id;
  const post = await listing.findById(id);
  if (!post) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let originalUrl = post.image && post.image.url ? post.image.url : "";
  originalUrl = originalUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("./listings/edit.ejs", { post, originalUrl });
};

module.exports.update = async (req, res) => {
  const id = req.params.id;

  const temp = await listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true, runValidators: true }
  );
  if (!temp) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  // Update the image if a new one is provided
  if (req.file) {
    temp.image = { url: req.file.path, filename: req.file.filename };
  }

  // Re-geocode the location (keep old coordinates if lookup fails)
  if (req.body.listing.location) {
    const geometry = await geocode(req.body.listing.location);
    if (geometry) {
      temp.geometry = geometry;
    }
  }

  await temp.save();

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroy = async (req, res) => {
  const id = req.params.id;
  await listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
