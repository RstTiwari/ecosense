const JWT = require("jsonwebtoken");
exports.validate = (req, res, next) => {
    try {
        let token = req.headers.token;
        if (!token || token == null) {
            return res
                .status(401)
                .json({ msg: "No token, authorization denied" });
        }

        let tempData = JWT.verify(token, "shhhhh"); // this value are stored at time of login
        if (!tempData || tempData == null || tempData == undefined) {
            return res.status(401).json({ msg: "Token is not valid" });
        }

        if (tempData.role !== "Admin") {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        req.session = {
            userId: tempData.userId,
            name: tempData.name,
            phone: tempData.phone,
            email: tempData.email,
            team: tempData.team,
            role: tempData.role,
        };

        return req.session && next();
    } catch (error) {
        return res.status(401).json({ msg: error.message });
    }
};
