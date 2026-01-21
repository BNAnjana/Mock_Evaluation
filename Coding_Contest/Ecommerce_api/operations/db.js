import fs from "fs";

export const readDb = () => {
    return JSON.parse(fs.readFileSync("db.json", "utf-8"));
};

export const writeDB = (data) => {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
};
