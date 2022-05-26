import axios from "axios";

// Forwarding URL from ngrok to allow other users access to your localhost
// Add ngrok url to .env file (not sure how to access .env outside router.js)
export default axios.create({
    baseURL: 'http://e9aa-2001-569-7fb1-c400-714b-f962-cc3-c5d1.ngrok.io/'
})