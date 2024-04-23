import createApiClient from "./api.service";

class BorrowService {
    constructor(baseUrl = "/api/borrow") {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        const response = (await this.api.post("/", data))
        return response.data
    }

    async getAll(params) {
        let url = '/';
    
        if (params.number) {
            url += `?name=${params.name}&number=${params.number}`;
        } else if (params.name && !params.number) {
            url += `?name=${params.name}`;
        }
    
        const response = await this.api.get(url);
        return response.data;
    }

    // async getDetail(id) {
    //     const response = await this.api.get(`/${id}`)
    //     return response.data
    // }

    async returnTheBook(id) {
        const response = await this.api.put(`/${id}`, {})
        return response.data
    }

    async findReader(reader) {
        const response = await this.api.get(`/find-reader?reader=${reader}`)
        return response.data
    }

    async findBook(book) {
        const response = await this.api.get(`/find-book?book=${book}`)
        return response.data
    }

    // async deleteReader(id) {
    //     const response = await this.api.delete(`/${id}`)
    //     return response.data
    // }
}

export default new BorrowService();