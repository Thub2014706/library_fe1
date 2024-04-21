import createApiClient from "./api.service";

class EmployeeService {
    constructor(baseUrl = "/api/employee") {
        this.api = createApiClient(baseUrl);
    }

    create = async (data) => {
        const response = (await this.api.post("/", data))
        return response.data
    }
}

export default new EmployeeService();