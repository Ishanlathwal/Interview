This app helps users to track and maintain their expenses.

App is secured using jwt token stored in cookies not in local storage
to run locally first run backend npm run dev
than frontend

App is deployed on render
Backend runs frontend after building it

1. User can add/delete their expenses
2. User can add/delete their budgets. User will get a warning or danger based on the budget they have used
3. Users can filter their expanses in Expense tab by amount, category, payment method
4. Dashboad have multiple features like total spending, Top category, amount spent on that category
5. There is also an All Expenses Admin page which only shows in side menu when a logged in user is an admin

6. Profile pictures are uploaded on cloudinary and default picture is also there

I have created 2 users

1. email-> admin@admin.com (password -> password) / its is an admin account

2. email-> user@user.com (password -> password) / its is an user account (All Expenses Admin page)
