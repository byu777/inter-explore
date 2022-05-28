Install Expo CLI
	npm install -g expo-cli
	npm audit fix

Install ngrok
	brew install ngrok/ngrok/ngrok

Start ngrok to put local web server to the internet
	ngrok http 3000

Download project, cd to folder

Change address in api/tracker.js to ngrok address

Start Express router to connect to Mongodb
	node router/router.js
		
Start application
	npm start
	click 'd'
	
Install Expo Go on iPhone
Settings - privacy - enable Local Network
	scan QR code 
	
Access MongoDB on cloud using google id
	http://mongodb.com
	Mongodb google id 347COMP38002022@gmail.com
	Password pickleball347
		Browse Collections
