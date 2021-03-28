Stack used technologies: JS, JQuery, PHP

This calculator I'm writed for my website of print studio.
It get data about user from form and return required oversize for size of client.

oversize-calc.js - it get data from form and send to backend. Later it get result in DIV from backend and show it user.
In this script used Ajax for showing calculated result without page reload.

handler-height.php - this script on backend which calculated required oversize based on array values.
The array contains size values humans and their respective oversizes.
When script searched required size, it will assemble HTML and send to frontend.
