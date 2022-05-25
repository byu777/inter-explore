import axios from "axios";

// Forwarding URL from ngrok to allow other users access to your localhost
// Add ngrok url to .env file (not sure how to access .env outside router.js)
export default axios.create({
    baseURL: 'http://10a3-2001-569-7ef4-6100-2da0-f572-f062-34aa.ngrok.io/'
})