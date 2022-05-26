import axios from "axios";

// Forwarding URL from ngrok to allow other users access to your localhost
// Add ngrok url to .env file (not sure how to access .env outside router.js)
export default axios.create({
    baseURL: 'http://a38a-2001-569-7ef4-6100-e8dd-a3a4-57e5-a340.ngrok.io'
})