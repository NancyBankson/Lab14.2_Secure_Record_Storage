# Lab 14.2 Secure Record Storage

## Overview

In this lab, we refactored a simple database app to add functions for authorized users only.  By using authorizaiton middleware, the user can view, update, or delete notes when logged in and only on their own notes.

## Features

Activity Tasks

Task 1: Associate Notes with Users
    1. Update the Note Model: Add a new field to the Note schema (models/Note.js). This field should be named user (or owner) and should store the ObjectId of the user who created the note. It should be a required reference to the User model.

        // Example snippet for the Note schema
        user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        }

    2. Modify the “Create Note” Route: In your notes route file (routes/api/notes.js), find the POST / route. When a new note is created, you must associate it with the currently logged-in user. The authenticated user’s data should be available on req.user from the authentication middleware. Save the user’s _id to the new note’s user field.

Task 2: Implement Ownership-Based Authorization

    1. Filter “Get All Notes”: Modify the GET / route. Instead of returning all notes in the database, it should now only return the notes where the user field matches the _id of the currently authenticated user (req.user._id).

    2. Secure “Update Note”: Modify the PUT /:id route. Before updating a note, you must first find the note by its ID. Then, check if the user field on that note matches the authenticated user’s _id.

        - If they match, proceed with the update.
            - If they do not match, return a 403 Forbidden status with an error message like "User is not authorized to update this note."
            
    3. Secure “Delete Note”: Modify the DELETE /:id route. Similar to the update route, you must check for ownership before deleting a note.

        - Find the note by its ID.
        - If the user is the owner, delete the note.
        - If the user is not the owner, return a 403 Forbidden status with an appropriate error message.

## Tools

- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- jsonwebtoken

## Reflection

In this lab we added authorization for a notes app.  The lab included code snipets for convenience, but there were multipe errors making the lab harder instead of easier.  Big thanks to Tishana, Hasna, and Revathi for helping me troubleshoot.