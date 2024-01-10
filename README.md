My Activity Journal - a mobile app that allows the user to track all the events that he/she participated to.

Short description - "My Activity Journal" is built to simulate a digital diary in which a person can keep details about memorable moments in their lives. A simple and friendly mobile app, it helps the user to keep a detailed list of activities in which he took part. The user can easily add the activity name, what it was about, when it happened, where it happened, and even his thoughts about it. Whether it's a fun dinner with friends, a work meeting, a party, or an exciting adventure, "My Activity Journal" lets you keep a record of those.

Domain details - The main idea of the app is to store different activities, so the entity to be persisted is called "Activity" and has the following fields:
Name: The name or title of the activity, for example "John's Birthday Party"
Description: Details related to the activity. It should present the events that took place
Date and time: The date and time when the activity occured
Category: The type or category of the activity, for example "Work" or "Entertainment"
Location: The place or location associated with the activity, for example "The Cinema"
Feedback: A personal opinion regarding the activity. How the user feels about it, if he enjoyed it and so on

CRUD - For the above presented entity, CRUD operations work in the following way:
Create (Add Activity): When the user taps the "+" button on the main screen, a form with multiple input fields appears, allowing users to add a new activity. They can provide details such as the activity's name, description, date and time, category, location, and feedback. To add the activity, users simply press the "add" button, and it will be displayed on the main page.
Read (View Activity): Users can easily access a list of their recorded activities, with all associated details. All activities are displayed on the main page in a summarized format. To view comprehensive information about a particular activity, users can click on it, which opens a new page presenting all available details.
Update (Edit Activity): Users can edit and update any attribute of an existing activity. When accessing an activity, a user can edit its information by pressing the "update" button, located at the bottom of the page. After making the desired changes, the user can save or discard the modifications by selecting the corresponding buttons.
Delete (Remove Activity): Users can remove activities they no longer need. When viewing an activity, they'll find a "delete" button alongside the "update" button. Clicking on the "delete" button removes the current activity from the list of activities.

Persistence details - "My Activity Journal" would allow create, read and update operations to be persisted both on the server and on the local database. In this way, the app would be available both online and offline. When the user is offline, all the temporary data is taken from the local database and stored locally in case of creates and updates. When the user is online, the data is taken from the server and stored on the server, the updates being also reflected immediatly.

Details on what is happening when the device is offline - The create, read and update operations will work locally, meaning that the changes will persist locally. Also, the data that is to be read will be the data available in the local database.
Create: When the device is offline, and a user attempts to add a new activity, the app still allows them to complete the entire process. However, instead of instantaneously sending this data to the server, the app stores it locally on the device.
Read: Users can access their previously fetched list of activities from the local database.
Update: The app allows the users to update entities when the app is offline, but the modifications are saved only locally on the device.
Delete: A user can delete items when it's offline. The modifications will be saved locally on the device.
For each CRUD operation, the changes done when offline will be transmitted to the server when the application will go online. When there is no internet connection, the data is available only from the local database.
