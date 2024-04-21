import createApiClient from "./api.service";

class PublisherService {
    constructor(baseUrl = "/api/publisher") {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        const response = await this.api.post("/", data)
        return response.data
    }

    async getAll() {
        const response = await this.api.get("/")
        return response.data
    }

    async deletePublisher(id) {
        const response = await this.api.delete(`/${id}`)
        return response.data
    }

    async getDetail(id) {
        const response = await this.api.get(`/${id}`)
        return response.data
    }

    async update(id, data) {
        const response = await this.api.put(`/${id}`, data)
        return response.data
    }
}

export default new PublisherService();