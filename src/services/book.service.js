import createApiClient from "./api.service";

class BookService {
    constructor(baseUrl = "/api/book") {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        const response = await this.api.post("/", data)
        return response.data
    }

    async getAll(number, name) {
        const response = await this.api.get(`/?name=${name}&number=${number}&show=10`)
        console.log(response.data)
        return response.data
    }

    async deleteBook(id) {
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

export default new BookService();