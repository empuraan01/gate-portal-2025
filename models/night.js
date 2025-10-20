import mongoose from "mongoose";

const NightSchema = mongoose.Schema(
  {
    id: String,
    college: String,
  },
  {
    timestamps: true,
  }
);

const Night1 = mongoose.model("Night1", NightSchema);
const Night2 = mongoose.model("Night2", NightSchema);
const Night3 = mongoose.model("Night3", NightSchema);
const ComedyNight = mongoose.model("ComedyNight", NightSchema);

export { Night1, Night2, Night3, ComedyNight };