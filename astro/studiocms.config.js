import { defineStudioCMSConfig } from 'studiocms/config';

export default defineStudioCMSConfig({
  dbStartPage: false,
  defaultFrontEndConfig: {
    htmlDefaultLanguage: "ko",
  },
  dashboardConfig: {
    dashboardEnabled: true,
    AuthConfig: {
      enabled: true,
      providers: {
        auth0: true,
        usernameAndPassword: false
      }
    }
  }
});