// EmailJS Configuration
// 1. Sign up at https://www.emailjs.com/
// 2. Add an Email Service (Gmail) -> get your Service ID
// 3. Create an Email Template -> get your Template ID
// 4. In Account Settings -> get your Public Key
export const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_fbkb14f",
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_z64rk7f",
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "MyaSz6sH9MpdWX4Sk"
};

