Rubric
All of the below requirements must be met for the project to be considered complete:

The website must contain a drop-down which lists five users

- Manuel test by verifying the drop-down (select) contains five users options (User 1-5) after the page loads.

Selecting a user must display the list of bookmarks for the relevant user

- 1. Selected 'User 1' and added a bookmark.
- 2. Switched to other users and verified their list are not having that newer bookmark.
- 3. Switched back to 'User 1' to confirm the data is only user 1.
- 4. Compare the bookmarks information to the localstorage

If there are no bookmarks for the selected user, a message is displayed to explain this

- 1. Manuel click on the user that does not have any bookmarks to see the message,
- 2. clear the localstorage and see the bookmark page of any users to see the message.

The list of bookmarks must be shown in reverse chronological order

- 1. Add a bookmark to a user, and verify the time of each bookmark of that user to confirm if the date is in reverse chronological order that the newer will be on top of the older.
- 2. Unit test in script.test.js

Each bookmark has a title, description and created at timestamp displayed

- Verified that every displaying bookmark card confirm the Title, Description, and a Human-readable Timestamp.

Each bookmark’s title is a link to the bookmark’s URL

- Clicked a bookmark title and verified it successfully opened the correct URL in a new browser tab

Each bookmark's "Copy to clipboard" button must copy the URL of the bookmark

- 1. Clicked the "Copy" button on a bookmark.
- 2. Pasted the result into the browser address bar to verify the exact URL was copied.

Each bookmark's like counter works independently, and persists data across sessions

- Clicked different like buttons independently, closed the page, and reopened it to confirm the likes persistence.

The website must contain a form with inputs for a URL, a title, and a description. The form should have a submit button.

- Select a user, activate the add bookmark button, verify the form contains inputs for title, url, and description, and it has a submit button.

Submitting the form adds a new bookmark for the relevant user only

- 1. Select User 1 and submit a new bookmark 2. Inspect the localstorage and double confirm a new bookmark is only added to the relevant user only

After creating a new bookmark, the list of bookmarks for the current user is shown, including the new bookmark

- Verified that upon clicking "Submit" and confirming the dialog, the new bookmark immediately appears at the top of the UI without a manual page refresh.

The website must score 100 for accessibility in Lighthouse

- We will test this by making sure that "Snapshot" mode of Lighthouse gives 100% accessibility for any view we look at.

Unit tests must be written for at least one non-trivial function

- Unit tests in script.test.js
