import { stats_s } from "../services/stats.service.js"
import { ok, serverError } from "../utils/apiResponse.js";



export const stats = async (req, res) => {
    try {
        const data = await stats_s(req.supplier, req.user._id);
        ok(res, data)
    }catch(error) {
        serverError(res)
    }
}

