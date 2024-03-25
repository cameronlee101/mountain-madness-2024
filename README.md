# SFU Webcam Viewer

## Description

View SFU with a new perspective through SFU Burnaby campus' live webcams! Easily see the location of each webcam and tune in by clicking on them. Images updated live every 10 seconds - swipe through to see previous images.

Additionally, view weather conditions for the day, and times for the next bus departures.

Visit the site here: [https://sfu-webcams.vercel.app/](https://sfu-webcams.vercel.app/)

## File Structure

Source code is located in /app/

Images used stored in /public/

.json files used in code stored in /assets/

## Instructions for Running Locally

- Demo Video: [https://youtu.be/gRRcCRb0RTw](https://youtu.be/gRRcCRb0RTw)

- Install node js [https://nodejs.org/en](https://nodejs.org/en)

- Create a Translink developer account: [https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/register](https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/register)
    - Verify your email and login - your API key will be emailed to you once logged in
    - Replace NEXT_PUBLIC_TRANSLINK_API_KEY value in .env with your API key

- cd into this project

- Run the development server:

```bash
npm install
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Participants

Cameron Lee, cal26@sfu.ca

Ana Premovic, apa109@sfu.ca

Ewan Brinkman, erb5@sfu.ca

## Resources and Libraries

NextUI library [https://nextui.org/](https://nextui.org/)

Next.JS [https://nextjs.org/](https://nextjs.org/)

Leaflet map [https://leafletjs.com/](https://leafletjs.com/)

## Asset Credits

- Camera icon image generated by Chat GPT
    - Project location: [public/cameras/base.png](public/cameras/base.png)
- Chat GPT used for code support
- Camera footage fetched from SFU: [click here to see if footage is currently running!](https://www.sfu.ca/information-systems/services/webcam/live-burnaby-campus-webcams.html)

## APIs used

Open-Meteo Weather API [https://open-meteo.com/](https://open-meteo.com/)

Translink Real-time Transit Information API [https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/rtti](https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/rtti)

## Github

[https://github.com/cameronlee101/mountain-madness-2024](https://github.com/cameronlee101/mountain-madness-2024)
