// const mongoose = require("mongoose");

const EventItem = require("../Models/Event.Model");

const createEventItem = async (req, res) => {
  const { title, date, description, photoArray } = req.body;

  if (!title) {
    return res.status(400).send({ error: "Must provide a title" });
  }

  try {
    const eventItem = new EventItem({ title, date, description, photoArray });
    await eventItem.save();
    res.status(200).send({ msg: "Event Item Created" });
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

const getOneEventItem = async (req, res) => {
  const { id } = req.params;

  try {
    const eventItem = await EventItem.findById(id);
    if (!eventItem) {
      return res.status(404).send({ error: "Event Item not found" });
    }
    res.status(200).send(eventItem);
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

const editEventItem = async (req, res) => {
  const { id } = req.params;
  const { title, date, description, photoArray } = req.body;

  if ((!title, !date, !description, !photoArray)) {
    return res
      .status(400)
      .send({ error: "Must provide a title, description & PhotoArray" });
  }

  try {
    const event = await EventItem.findOneAndUpdate(
      { _id: id },
      {
        title,
        date,
        description,
        photoArray,
      }
    );

    if (!event) {
      return res.status(400).json({ error: "No such Event Item" });
    }
    res.status(200).send({ msg: "Event Item Updated" });
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

const getAllEventItems = async (req, res) => {
  try {
    const eventItems = await EventItem.find();
    res.status(200).send(eventItems);
  } catch (err) {
    return res.status(404).send(err.message);
  }
};

const deleteEventItem = async (req, res) => {
  const { id } = req.params;
  try {
    const eventItem = await EventItem.findByIdAndDelete(id);
    if (!eventItem) {
      return res.status(404).send({ error: "Event Item not found" });
    }
    res.status(200).send({ msg: "Event Item Deleted" });
  } catch (err) {
    return res.status(404).send(err.message);
  }
};

module.exports = {
  createEventItem,
  getOneEventItem,
  getAllEventItems,
  editEventItem,
  deleteEventItem,
};
