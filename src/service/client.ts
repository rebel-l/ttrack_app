import axios from "axios";

// TODO: create base url dynamic
export const client = axios.create({
    // baseURL: "http://localhost:3000", // development
    baseURL: "/api" // production
});