import Pass from "../models/pass.js";
import { Night1, Night2, Night3, ComedyNight } from "../models/night.js";
import events from "../events.js";

export const registerNight = async (req, res) => {
  try {
    const nn = req.query.q;
    const { id } = req.body;
    const pass = await Pass.findOne({ id });
    console.log(pass);
    if (!pass) {
      return res.status(301).send("User does not exist");
    }
    const check =
      pass.email.endsWith("@goa.bits-pilani.ac.in") ||
      pass.college === "BITSG" ||
      (events[nn] && events[nn].includes(pass.type.toUpperCase()));

    if (!check) {
      return res.status(303).send("User is not registered for this event");
    }

    let Night;
    if (nn === "1") {
      Night = Night1;
    } else if (nn === "2") {
      Night = Night2;
    } else if (nn === "3") {
      Night = Night3;
    } else if (nn === "4") {
      Night = ComedyNight;
    }
    const nexist = await Night.findOne({ id });
    if (nexist) {
      return res.status(302).send("User already entered!");
    }
    const night = new Night({
      id,
      name: pass.name,
      college: pass.college,
      bitsID: pass.bitsID,
    });

    await night.save();
    res.send("success");
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

