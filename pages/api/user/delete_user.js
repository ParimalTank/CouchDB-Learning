import { couchDB } from "@/helper/Database";

export default async function handler(req, res) {

    const { _id, _rev } = req.body;
    console.log("_id, _rev: ", _id, _rev);

    return await couchDB
        .del(process.env.COUCH_DB_NAME, _id, _rev)
        .then((data) => {
            return res.status(202).json({ message: "Successfully Deleted" })
        })
        .catch((error) => {
            console.log("error: ", error);
            return res.status(400).json({ message: "Error in Delete" })
        })
}
