import { couchDB } from "@/helper/Database";
import crypto from "crypto";

export default async function handler(req, res) {

    if (req.method === "POST") {

        const userData = req.body;

        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto
            .pbkdf2Sync(userData.password, salt, 1000, 64, "sha512")
            .toString("hex");
        const hashedPassword = `${salt} ${hash}`;

        const data = {
            doc_type: 'user',
            firstName: userData.firstName,
            lastName: userData.lastName,
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            account_type: userData.account_type,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await couchDB
            .insert(process.env.COUCH_DB_NAME, data)
            .then((data) => {
                return res.status(201).json({
                    status: 201,
                    ok: true,
                    message: 'success',
                    data: data
                })
            }).catch((error) => {
                console.log(error);

                return res.status(201).json({
                    status: 400,
                    ok: false,
                    message: "Something went wrong",
                    error
                })
            })
    }
}