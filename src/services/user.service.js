import createApiClient from "./api.service";

class UserService {
    constructor(baseUrl = "/api/user") {
        this.api = createApiClient(baseUrl);
    }

    create = async (data) => {
        const response = (await this.api.post("/", data))
        return response.data
    }
}

export default UserService();