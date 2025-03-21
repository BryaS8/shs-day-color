# SHS Red/Blue Day Alarm

A simple web app that shows whether it's a Red or Blue day at SHS and sets an alarm for 7:50 AM.

## Features

- Automatically detects Red/Blue day from the school calendar
- Shows countdown to 7:50 AM
- Browser notifications at 7:50 AM
- Mobile-friendly design
- Works offline once loaded

## Deployment Instructions

1. Create a GitHub account if you don't have one
2. Create a new repository named `shs-day-color`
3. Upload these files to your repository:
   - index.html
   - style.css
   - script.js
   - README.md
4. Go to repository Settings > Pages
5. Under "Source", select "main" branch and click Save
6. Your website will be available at: `https://[your-username].github.io/shs-day-color/`

## Local Development

To test locally, you can use any static file server. For example:
1. Install Python
2. Run `python -m http.server` in the project directory
3. Open `http://localhost:8000` in your browser

## Notes

- Notifications only work when the webpage is open
- The alarm resets daily at 7:50 AM
- The page automatically updates the countdown every second 