## View the Web Application Here

# [https://zurich-ten.vercel.app/](https://zurich-ten.vercel.app/ "https://zurich-ten.vercel.app/")

##UPDATE
- implement USER/POST -   Implement recursive API call
-  business logic in the /api

This is a web application that provides user authentication, a dynamic home screen, and data retrieval from an API. Below are the key features and components of this application.

## Table of Contents

- [Login](#login)
- [Home Screen](#home-screen)
- [API Integration](#api-integration)
- [Data Filtering](#data-filtering)
- [Pagination](#pagination)

---

## Login

The application includes a login mechanism to authenticate users. Upon successful login, users will be redirected to the home screen. Unauthorized users attempting to access the URL directly will be shown an error page.

---

## Home Screen

The home screen comprises three major components:

1. **Header**: The header component is reusable and configurable. It typically contains navigation links, branding, or user-related information.

2. **Footer**: Similar to the header, the footer is also a reusable and configurable component that may include copyright information, contact details, or other relevant content.

3. **Content Area (Body)**: The content section of the home screen is the primary area where user-specific data is displayed.

---

## API Integration

To populate the content area, the application makes an API call to the following endpoint: [https://reqres.in/api/users](https://reqres.in/api/users).

---

## Data Filtering

The API response is filtered to display records that meet the following criteria:

- Records with a first name starting with "G" or a last name starting with "W" are included in the display.

Additionally, the user email addresses are masked by default for privacy. Users can reveal the email addresses by clicking on a designated button.

---

## Pagination

As the API response is paginated, the application ensures that all available records are retrieved by traversing through multiple pages. This ensures that the complete set of relevant records is displayed in the content area.

---

Feel free to explore and contribute to this web application. For more information on how to set up, install dependencies, or contribute to the project, please refer to the project documentation or reach out to the project maintainers.
