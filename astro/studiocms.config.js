import { defineStudioCMSConfig } from 'studiocms/config';

export default defineStudioCMSConfig({
  dbStartPage: false,
  defaultFrontEndConfig: {
    htmlDefaultLanguage: "ko",
  },
  dashboardConfig: {
    inject404Route: false,
    dashboardEnabled: true,
    AuthConfig: {
      enabled: true,
      providers: {
        auth0: true,
        usernameAndPassword: true
      }
    }
  }
});