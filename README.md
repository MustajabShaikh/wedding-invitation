# Interactive Muslim Wedding Invitation

A React + Vite starter website with animated opening doors and a three-event wedding invitation.

## Run locally

1. Install Node.js (LTS) if it is not installed.
2. Open this folder in VS Code.
3. Open a terminal in this folder and run:

   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Customize event data

Edit the `wedding` object at the top of `src/WeddingInvitation.jsx`. Each event has a name, date, time, venue, tone, symbol, and short note.

## Export to PDF

Open the invitation, click **Print / Save as PDF**, and choose **Save as PDF** in the browser print dialog. The page includes print styles. Check the output before sending it to a printer.

## Notes

- This is a frontend prototype; it does not store guest RSVPs or send invitations.
- The original square artwork is included at `src/assets/invitation-reference.png` and can be shown using the “View original artwork” button.
- Google Fonts are loaded from the internet; system serif fonts are used as fallback.
