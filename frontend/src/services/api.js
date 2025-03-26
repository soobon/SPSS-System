import axiosInstance from "../axios/axios";

export const apiService = {
  getInfo: (ID) => axiosInstance.get("/student/info/" + ID),
  getStatistic: (ID, year) =>
    axiosInstance.get("/student/statistic/" + ID + "/" + year),
  getFileList: (ID) => axiosInstance.get("/student/file_list/" + ID),
  getHistory: (ID) => axiosInstance.get("/student/history/" + ID),

  deleteFile: (file_id) =>
    axiosInstance.delete("/student/deleteFile/" + file_id),
  login: (username, password) =>
    axiosInstance.post("/auth/authen", { username, password }),
  getID: () => axiosInstance.get("/auth/userId"),
  getAllPrinter: () => axiosInstance.get("/student/getAllPrinter"),
  sendPrintRequest: (info) =>
    axiosInstance.post(
      "/student/printRequest/" + localStorage.getItem("id"),
      null,
      {
        params: {
          ...info,
        },
      }
    ),
  updatePageAfterBuy: (std_id, nb_of_page) =>
    axiosInstance.put("/payment", null, {
      params: {
        std_id,
        nb_of_page,
      },
    }),
  deleteRequest: (order_num, file_id) =>
    axiosInstance.delete(
      `/student/deleteRequest?order_num=${order_num}&file_id=${file_id}`
    ),
  sendMail: () =>
    axiosInstance.post(`/mail/${localStorage.getItem("id")}`),
};

export default apiService;
