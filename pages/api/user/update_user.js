import { couchDB } from "@/helper/Database";


export default async function handler(req, res) {

    if (req.method === "POST") {

        const { _id, _rev, firstName, lastName, username, email } = req.body;

        let olderData = await couchDB.get(
            process.env.COUCH_DB_NAME,
            _id
        )

        olderData = olderData.data;

        await couchDB
            .update(process.env.COUCH_DB_NAME, {
                ...olderData,
                _rev: _rev,
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                updatedAt: new Date()
            })
            .then((data) => {
                return res
                    .status(202)
                    .json({ status: 202, ok: true, message: "success", data })
            })
            .catch((error) => {
                return res.status(400).json({
                    status: 400,
                    ok: false,

                    message: error.message
                })
            })
    }
}