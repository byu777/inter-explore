import axios from "axios";

// Forwarding URL from ngrok to allow other users access to your localhost
// Add ngrok url to .env file (not sure how to access .env outside router.js)
export default axios.create({
    baseURL: 'http://4c9f-2001-569-7ef4-6100-e965-25c1-2a90-f70d.ngrok.io'
})