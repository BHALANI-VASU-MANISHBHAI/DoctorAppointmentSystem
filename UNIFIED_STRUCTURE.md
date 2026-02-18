# Unified Doctor Appointment System

## Overview

Your Doctor Appointment System has been successfully converted from three separate React applications (Admin, Doctor, Patient) into a single unified website with role-based routing.

## Project Structure

```
/src
├── admin/                    # Admin-specific pages and components
│   ├── pages/               # Admin pages (Login, AllDoctors, AddDoctor, etc.)
│   └── components/          # Admin components (AdminNavbar, etc.)
├── doctor/                  # Doctor-specific pages and components
│   ├── pages/              # Doctor pages (Login, ViewSlots, AddSlot, etc.)
│   └── components/         # Doctor components (Navbar, etc.)
├── patient/                # Patient-specific pages and components
│   ├── pages/             # Patient pages (Login, Home, Profile, etc.)
│   └── components/        # Patient components (Navbar, etc.)
├── shared/                # Shared resources across all roles
│   ├── api/              # API client functions and endpoints
│   ├── contexts/         # Shared React contexts
│   └── utils/            # Shared utilities and helpers
├── App.jsx               # Main router with role-based routing
├── main.jsx              # Application entry point
└── index.css             # Global styles
```

## Key Changes

### 1. **Unified Root Structure**
- Single `package.json` with all dependencies
- Single `vite.config.js` for build configuration
- Root-level `index.html` and `eslint.config.js`

### 2. **Role-Based Routing**
The App.jsx implements role-based routing:
- `/admin/*` → Admin dashboard
- `/doctor/*` → Doctor portal
- `/*` → Patient portal (default)

### 3. **Shared Resources**
- **Contexts**: GlobalContext, DoctorContext, UserContext
- **API**: Unified API client with all endpoints
- **Utils**: Combined helper functions and constants

### 4. **Import Paths Updated**
All component imports have been updated to use the new shared structure:
```javascript
// Old (separate apps)
import { GlobalContext } from "../contexts/GlobalContext"

// New (unified)
import { GlobalContext } from "../../shared/contexts/GlobalContext"
```

## Running the Application

### Development
```bash
npm install
npm run dev
```

The app will start on `http://localhost:5174`

### Production Build
```bash
npm install
npm run build
```

Output is generated in the `dist/` folder.

### Lint Code
```bash
npm run lint
```

## URL Structure

After unification, access different portals using URL paths:

- **Admin**: http://localhost:5174/admin/
- **Doctor**: http://localhost:5174/doctor/
- **Patient**: http://localhost:5174/ (or /patient/)

The app automatically detects the role based on the URL path and displays the appropriate UI.

## Next Steps (Optional Enhancements)

1. **Role Detection**: Currently role is detected from URL. You can enhance this to:
   - Detect role from user token/JWT claims
   - Store user role in GlobalContext after login
   - Redirect to appropriate dashboard based on role

2. **Shared Navbar**: Consider creating a unified navbar that adapts based on user role

3. **Environment Variables**: Move API endpoints to `.env` files for different environments

4. **Old Directories**: The old `admin/`, `doctor/`, and `patient/` folders can now be archived or deleted

## Benefits of Unification

✅ Single codebase easier to maintain
✅ Shared utilities and components reduce duplication
✅ Consistent dependencies across all roles
✅ Easier to add shared features
✅ Simplified deployment (one app instead of three)
✅ Single build process
✅ Easier authentication and context management

## Migration from Old Folders

The new unified structure is production-ready. The old separate apps are still intact if you need to reference them. You can safely:

1. Archive the old `admin/`, `doctor/`, `patient/` folders
2. Update your deployment to use the new root `npm run build` command
3. Point your server to serve from `dist/` folder

---

Built with React 19, Vite, Tailwind CSS, and React Router v7
