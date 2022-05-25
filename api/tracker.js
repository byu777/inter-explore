import axios from "axios";

// Forwarding URL from ngrok to allow other users access to your localhost
// Add ngrok url to .env file (not sure how to access .env outside router.js)
export default axios.create({
    baseURL: 'http://3f45-2001-569-7ef4-6100-a029-2d38-3942-df6b.ngrok.io/'
})