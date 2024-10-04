const mongoose = require("mongoose");

const TestiItem = require("../Models/Testi.Model");

const createTestiItem = async (req, res) => {
  const { name, position, description, imageLink } = req.body;

  console.log(name, position, description, imageLink);

  if (!name) {
    return res.status(400).send({ error: "Must provide a name" });
  }
  if (!description) {
    return res.status(400).send({ error: "Must provide a description" });
  }

  try {
    const testiItem = new TestiItem({ name, position, description, imageLink });
    await testiItem.save();
    res.status(200).send({ msg: "Testimonial Item Created" });
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

const getOneTestiItem = async (req, res) => {
  const { id } = req.params;

  try {
    const testiItem = await TestiItem.findById(id);
    if (!testiItem) {
      return res.status(404).send({ error: "Testimonial Item not found" });
    }
    res.status(200).send(testiItem);
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

const editTestiItem = async (req, res) => {
  const { id } = req.params;
  const { name, position, description, imageLink } = req.body;

  // console.log(id, title, description, photoArray);

  // if ((!name, position, description, imageLink )) {
  //   return res
  //     .status(400)
  //     .send({ error: "Must provide a title, description & PhotoArray" });
  // }

  try {
    const testi = await TestiItem.findOneAndUpdate(
      { _id: id },
      {
        name,
        position,
        description,
        imageLink,
      }
    );

    if (!testi) {
      return res.status(400).json({ error: "No such Testimonial Item" });
    }
    res.status(200).send({ msg: "Testimonial Item Updated" });
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

const getAllTestiItems = async (req, res) => {
  try {
    const testiItems = await TestiItem.find();

    res.status(200).send(testiItems);
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

const deleteTestiItem = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ error: "Must provide an ID" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send({ error: "Invalid ID" });
  console.log(id);
  try {
    const testiItem = await TestiItem.findByIdAndDelete(id);
    if (!testiItem) {
      return res.status(404).send({ error: "Testimonial Item not found" });
    }
    res.status(200).send({ msg: "Testimonial Item Deleted" });
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

module.exports = {
  createTestiItem,
  getOneTestiItem,
  getAllTestiItems,
  editTestiItem,
  deleteTestiItem,
};
