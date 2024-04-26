import createApiClient from "./api.service";

class BorrowService {
    constructor(baseUrl = "/api/borrow") {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        const response = (await this.api.post("/", data))
        return response.data
    }

    async getAll(number, name, column1, column2) {
        const response = await this.api.get(`/?name=${name}&number=${number}&column1=${column1}&column2=${column2}`)
        console.log(response.data)
        return response.data
    }

    // async getDetail(id) {
    //     const response = await this.api.get(`/${id}`)
    //     return response.data
    // }

    async update(id) {
        console.log('ggg')
        const response = await this.api.put(`/${id}`)
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