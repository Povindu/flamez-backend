const mongoose = require("mongoose");

const ServiceItem = require("../Models/ServiceItem.Model");


const createServiceItem = async (req, res) => {
  const { title, description, photoArray } = req.body;

  if (!title) {
    return res
      .status(400)
      .send({ error: "Must provide a title" });
  }

  try {
    const serviceItem = new ServiceItem({ title, description, photoArray });
    await serviceItem.save();
    res.status(200).send({ msg: "Service Item Created" });

  } catch (err) {

    return res.status(401).send(err.message);
  }

};

const getOneServiceItem = async (req, res) => {
  const { id } = req.params;

  try {
    const serviceItem = await ServiceItem.findById(id);
    if (!serviceItem) {
      return res.status(404).send({ error: "Service Item not found" });
    }
    res.status(200).send(serviceItem);
  } catch (err) {
    return res.status(401).send(err.message);
  }
}

const editServiceItem = async (req, res) => {
  const { id } = req.params;
  const { title, description, photoArray } = req.body;

  // console.log(id, title, description, photoArray);

  if (!title, !description, !photoArray) {
    return res
      .status(400)
      .send({ error: "Must provide a title, description & PhotoArray" });
  }

  try {
    const service = await ServiceItem.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
        photoArray,
      }
    );

    if (!service) {
      return res.status(400).json({ error: "No such Service Item" });
    }
    res.status(200).send({ msg: "Service Item Updated" });
  }
  catch (err) {
    return res.status(401).send(err.message);
  }
}

const getAllServiceItems = async (req, res) => {
  try {
    const serviceItems = await ServiceItem.find();

    res.status(200).send(serviceItems);
  } catch (err) {
    return res.status(401).send(err.message);
  }
}

const deleteServiceItem = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const serviceItem = await ServiceItem.findByIdAndDelete(id);
    if (!serviceItem) {
      return res.status(404).send({ error: "Service Item not found" });
    }
    res.status(200).send({ msg: "Service Item Deleted" });
  } catch (err) {
    return res.status(401).send(err.message);
  }
}

module.exports = {
  createServiceItem,
  getOneServiceItem,
  getAllServiceItems,
  editServiceItem,
  deleteServiceItem,
};
