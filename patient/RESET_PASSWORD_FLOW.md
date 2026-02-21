# Password Reset Flow - Patient App

## New Two-Page System

### 1. **Forgot Password Page** (`/password/forgot`)
- URL: `http://yourapp.com/password/forgot`
- User enters their email address
- System sends a reset link to the email
- User receives email with reset link

### 2. **Reset Password Page** (`/password/reset`)
- URL: `http://yourapp.com/password/reset?email=user@example.com&otp=123456`
- User enters verification code (OTP) from email
- After verification, user enters new password and confirmation
- Password is successfully reset
- User is redirected to login page

## How It Works

### User Flow:
1. User clicks "Forgot your password?" on Login page → Goes to `/password/forgot`
2. User enters email → System sends reset link to email
3. User clicks link in email → Redirected to `/password/reset?email=user@example.com&otp=123456`
4. User verifies code and enters new password → Password reset complete
5. User is redirected to `/login` page

## Email Configuration

The backend needs to send an email with the following reset link format:
```
https://yourapp.com/password/reset?email=user@example.com&otp=RESET_TOKEN
```

Make sure the `forgetPassword` API endpoint in your backend:
1. Validates the email
2. Generates an OTP/reset token
3. Sends email with reset link
4. Stores the OTP temporarily (e.g., 24 hours expiry)

## Routes Updated

### Old Route (Removed):
- `GET /reset-password` - Old multi-step form

### New Routes (Added):
- `GET /password/forgot` - Forgot password page
- `GET /password/reset` - Reset password page (with email and otp query params)

## Files Created/Modified

### Created:
- `src/pages/ForgotPassword.jsx` - Forgot password page
- `src/pages/PasswordReset.jsx` - Reset password page

### Modified:
- `src/App.jsx` - Updated imports and routes
- `src/pages/Login.jsx` - Updated "Forgot password" link

### Can Be Removed (Optional):
- `src/pages/ResetPassword.jsx` - Old multi-step form (no longer used)

## Features

### ForgotPassword Page:
- ✅ Email input validation
- ✅ Success message after sending
- ✅ Option to try another email
- ✅ Link back to login
- ✅ Professional styling with gradient background

### PasswordReset Page:
- ✅ Verify code from email
- ✅ New password input with show/hide toggle
- ✅ Confirm password input with show/hide toggle
- ✅ Password validation (min 6 characters)
- ✅ Password match validation
- ✅ Success page with redirect to login
- ✅ Option to request new code
- ✅ Professional styling with gradient background

## Testing

### Test Forgot Password:
1. Go to `http://localhost:5173/password/forgot`
2. Enter a registered email
3. Submit form
4. Should see success message

### Test Reset Password:
1. Go to `http://localhost:5173/password/reset?email=test@example.com&otp=123456`
2. Should land on verify code step
3. Enter email and OTP
4. Click "Verify & Continue"
5. Enter new password
6. Click "Reset Password"
7. Should see success and redirect to login

## Notes

- Both pages are public routes (not protected)
- OTP/token should be validated by backend before password reset
- Email link should expire after a certain time (suggested: 24 hours)
- Consider implementing rate limiting on forgot password endpoint to prevent abuse
