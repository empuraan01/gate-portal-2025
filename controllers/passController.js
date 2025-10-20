import xlsx from "xlsx";
import { v4 as uuidv4 } from "uuid";
import bwipjs from "bwip-js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Pass from "../models/pass.js";
import { deleteFile } from "../utils/fileUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadPasses = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(403).send("You are not authorized to upload passes.");
  }

  if (req.file) {
    const file = req.file;

    if (!file) {
      return res.status(400).send("Please upload a file");
    }

    try {
      const wb = xlsx.readFile(file.path);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(ws);

      const passes = data.map((pass) => ({
        id: uuidv4(),
        name: pass.name,
        college: pass.college,
        email: pass.email,
        type: pass.type,
        photo: pass.photo,
        uploadedBy: req.user.emails[0].value,
      }));

      const result = await Pass.bulkWrite(
        passes.map((pass) => ({
          updateOne: {
            filter: { email: pass.email },
            update: { $set: pass },
            upsert: true,
          },
        }))
      );

      res.status(201).json({
        message: `Created passes. New passes: ${result.upsertedCount} | Updated passes: ${result.modifiedCount}`,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }

    deleteFile(file.path);
  } else {
    const { name, college, email, type, photo } = req.body;

    if (!name || !college || !email || !type || !photo) {
      return res.status(400).send("Please provide all fields");
    }

    try {
      const pass = {
        id: uuidv4(),
        name,
        college,
        email,
        type,
        photo,
        uploadedBy: req.user.emails[0].value,
      };

      const result = await Pass.updateOne(
        { email: pass.email },
        { $set: pass },
        { upsert: true }
      );

      res.status(201).json({ message: `Pass added successfully for ${name}.` });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
};

export const getPass = async (req, res) => {
  try {
    const { email } = req.query;
    const pass = await Pass.findOne({ email });
    if (!pass || pass.college === "BITSG") {
      return res.status(404).json("User not found");
    }
    res.json(pass);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

export const viewPass = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/google");
  }

  const email = req.user.emails[0].value;

  Pass.findOne({ email })
    .then((pass) => {
      if (!pass) {
        return res.status(404).send("Pass not found for this user.");
      }

      bwipjs
        .toBuffer({
          bcid: "code128",
          text: pass.id.toString(),
          includetext: true,
          textxalign: "center",
        })
        .then((barcodeBuffer) => {
          res.json({
            pass,
            barcode: `data:image/png;base64,${barcodeBuffer.toString("base64")}`,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Server error generating barcode");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Server error fetching pass");
    });
};

// export const viewPassByEmail = (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).send("Email is required");
//   }

//   Pass.findOne({ email })
//     .then((pass) => {
//       if (!pass) {
//         return res.status(404).send("Pass not found for this user.");
//       }

//       bwipjs
//         .toBuffer({
//           bcid: "code128",
//           text: pass.id.toString(),
//           includetext: true,
//           textxalign: "center",
//         })
//         .then((barcodeBuffer) => {
//           res.json({
//             pass,
//             barcode: `data:image/png;base64,${barcodeBuffer.toString("base64")}`,
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).send("Server error generating barcode");
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send("Server error fetching pass");
//     });
// };

