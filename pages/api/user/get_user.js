import { couchDB } from "@/helper/Database";


export default async function handler(req, res) {

    if (req.method === "POST") {

        const userId = req.body;

        // If Need of Get All User Data use mango query

        // If Data get using user id use get method

        // await couchDB
        //     .get(process.env.COUCH_DB_NAME, userId._id)
        //     .then((data) => {

        //         return res
        //             .status(202)
        //             .json({ status: 201, ok: true, message: "success", data })
        //     })
        //     .catch((error) => {
        //         return res
        //             .status(400)
        //             .json({ status: 400, ok: false, message: "error" })
        //     })

        await couchDB
            .mango(process.env.COUCH_DB_NAME, {
                selector: {
                    doc_type: "user"
                },
                sort: [{ "firstName": "desc" }]     // first create index and after that use here
                // limit: 1,
                // fields: ["firstName", "lastName"], For get Specific Filed
                // bookmark: 'g1AAAABweJzLYWBgYMpgSmHgKy5JLCrJTq2MT8lPzkzJBYorJKaZpBlbmCRbJKUmJhukmJgkppoZGJmkJRsYGBimmhuA9HHA9BGlIwsAzXkfCQ'
                // skip: 1   // skip specific data
            })
            .then((data) => {
                console.log("data: ", data);

                return res
                    .status(202)
                    .json({ status: 201, ok: true, message: "success", data })
            })
            .catch((error) => {
                return res
                    .status(400)
                    .json({ status: 400, ok: false, message: "error" })
            })
    }
}