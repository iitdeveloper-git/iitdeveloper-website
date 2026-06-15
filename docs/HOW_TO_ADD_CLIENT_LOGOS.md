# How to Add Client Logos

## Steps to Add Client Logo Images:

1. **Create the clients folder** (if it doesn't exist):
   ```
   frontend/public/clients/
   ```

2. **Add your logo images** to this folder:
   - Supported formats: PNG, JPG, SVG, WebP
   - Recommended size: 200x80px (or similar aspect ratio)
   - Use transparent backgrounds for best results
   - Name them descriptively: `google.png`, `microsoft.png`, etc.

3. **Update the client list** in `frontend/src/components/sections/Clients.tsx`:

   ```typescript
   const clients = [
     { name: 'Edu-Care', logo: '/clients/edu-care.png' },
     { name: 'NIIT', logo: '/clients/niit.png' },
     { name: 'Google', logo: '/clients/google.png' },
     // Add more clients here
   ];
   ```

## Current Client List:

Based on your testimonials, I've included:
- Edu-Care (from your testimonials)
- NIIT (from your testimonials)
- Plus major tech companies as placeholders

**Please provide the actual company names and logos you want to display!**

## Example Structure:

```
frontend/
  public/
    clients/
      edu-care.png
      niit.png
      google.png
      microsoft.png
      amazon.png
      etc...
```

## Tips:

- Keep logos in a consistent color scheme (grayscale or monochrome works well)
- Optimize images for web (compress them to reduce load time)
- Use SVG format when possible for crisp display at any size
