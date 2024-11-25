<!-- __________________________________________________ Basic Repo Steps ___________________________________________________________________________ -->


<!-- # Repo-Template
This is an Internal WXSD Template to be used for GitHub Repos moving forward. Follow the steps below: For extended details, visit https://cisco.sharepoint.com/:w:/r/sites/WXSD-WebexSolutionsDevelopment/Shared%20Documents/Onboarding%20Instructions%20%26%20Guides/Github%20%26%20Security/Github%20Readme%20Detailed%20Standards.docx?d=wba3225a5102341cf874d319d3f334b9b&csf=1&web=1&e=yggr2S 



<!--   Step 1) Name your repository: Repo Name must ALWAYS end with "bot", "embeddedapp: or "macro"
      Examples: "<insert repo name>-bot", "<insert repo name>-embeddedapp", "<insert repo name>macro"

      

~3 words, kebab case, use words to indicate what it does. Visit https://github.com/wxsd-sales/readme-template/blob/master/README.md for more details  
-->

<!--  Step 2) Add One sentence description to your repository: Copy/Paste from Webex Labs Card sentence.
       Example: "Redirect an Auto Attendant caller to an SMS conversation to alleviate Call Queue Agent responsibilities."
-->

<!--  Step 3) Add at least 1 tag to the repo: Indicating if it’s a “bot”, “macro” or “embeddedapp”.       
                 *Additional tags are allowed: should be lowercase and hyphenated for spaces.
                Repo does not use “macros” as a tag (use “macro” instead)
-->

<!--  Step 4) MAKE SURE an MIT license is included in your Repository. If another license is needed, verify with management. This is for legal reasons.
-->

<!--  Step 4) Use following Template to copy/paste your details below in place of the directions 
Make sure you include the "Keep this here" portions (it is for legal, and security infosec reasons).
-->

<!-- _________________________________________________________ Actual Template Starts Below ___________________________________________________________ -->


# Call Favorite Contacts
 This project gets 3 favorite contacts of a user and lets the user speed dial them. This also has a timer, which checks the call minutes and doesnot let the user place any more calls once the timer ends.

## Setup

### Prerequisites & Dependencies: 

- Need RoomOS device to place the call


<!-- GETTING STARTED -->

### Installation Steps:
1. Clone this repository and change directory:

   ```
   git clone https://github.com/wxsd-sales/call-favorite-contacts && cd call-favorite-contacts
   ```
#### Server Setup
1.  change to server directory
    ```
    cd server
    ```
2.  Install dependencies
    ```
    npm install
    ```
3.  Start the server
    ```
    npm run start
    ```
Note: Make sure to deploy this server publicly and copy the server URL.

#### Macro Setup
1. Download the call-fav-kiosk.js file and upload it to your Webex Room device.
2. Enable the Macro.

#### Web app Setup
1. Copy `.env.example` file as `.env`:

   ```
   cp .env.example .env
   ```
   Add the Server URL value to PUBLIC_SERVER_URL in the `.env` file
2. Install dependencies
   ```
   npm install
   ```
3. Then run
   ```
   npm run dev
   ```
   Make sure to deploy this and add the deployed URL on RoomOS in kiosk mode.
Note: Placing a call will not work on a normal web browser. We need a Room OS device, to place the call.
    
    

## License
<!-- MAKE SURE an MIT license is included in your Repository. If another license is needed, verify with management. This is for legal reasons.--> 

<!-- Keep the following statement -->
All contents are licensed under the MIT license. Please see [license](LICENSE) for details.


## Disclaimer
<!-- Keep the following here -->  
 Everything included is for demo and Proof of Concept purposes only. Use of the site is solely at your own risk. This site may contain links to third party content, which we do not warrant, endorse, or assume liability for. These demos are for Cisco Webex usecases, but are not Official Cisco Webex Branded demos.


## Questions
Please contact the WXSD team at [wxsd@external.cisco.com](mailto:wxsd@external.cisco.com?subject=RepoName) for questions. Or, if you're a Cisco internal employee, reach out to us on the Webex App via our bot (globalexpert@webex.bot). In the "Engagement Type" field, choose the "API/SDK Proof of Concept Integration Development" option to make sure you reach our team. 
