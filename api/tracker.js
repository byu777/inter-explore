import axios from "axios";

// Forwarding URL from ngrok to allow other users access to your localhost
// Add ngrok url to .env file (not sure how to access .env outside router.js)
export default axios.create({
    baseURL: 'http://abb1-2001-569-7ef4-6100-6a-b7df-48c9-2a8a.ngrok.io/'
})