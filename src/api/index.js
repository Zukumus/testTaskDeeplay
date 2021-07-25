import { infoData } from "../data";

class ApiService {
   async apiCall(url, method = 'GET') {
      return new Promise((resolved, rejected) => {
         if (url) {
            setTimeout(() => {
               resolved({ data: infoData });
            }, 2000);
         } else {
            rejected();
         }
      });
   }
   async getTasks() {
      const res = await this.apiCall("api/infoTask", "GET");
      return res.data;
   }
}

export default new ApiService();
