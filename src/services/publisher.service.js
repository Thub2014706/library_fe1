import createApiClient from "./api.service";

class PublisherService {
    constructor(baseUrl = "/api/publisher") {
        this.api = createApiClient(baseUrl);
    }

    async create(data) {
        const response = await this.api.post("/", data)
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