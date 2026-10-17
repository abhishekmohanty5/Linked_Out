# Linked_Out

Linked_Out is a React + Vite web app for sharing workplace experiences in a LinkedIn-style feed, with an anonymity-first posting flow and lightweight moderation cues.

## Key Features

- **Experience feed UI** with seeded posts, reactions, reposts, and comment counts
- **Post composer** with:
  - anonymous vs identified posting toggle
  - company and topic tagging
  - character limit tracking
  - basic PII detection for emails and phone numbers before posting
- **Trending issues sidebar** showing popular workplace topics
- **Community context notes** area for moderator-style post annotations
- **Responsive, social-style layout** with top navigation and side panels

## Tech Stack

- **Frontend:** React 19
- **Build tool:** Vite 8
- **Routing package (installed):** react-router-dom 7
- **UI/icons:** lucide-react
- **Utilities:** clsx, date-fns
- **Linting:** oxlint

## Project Structure

```text
Linked_Out/
├── frontend/
│   ├── src/
│   │   ├── components/      # Post composer, post cards, logo
│   │   ├── layouts/         # App shell and page layout
│   │   ├── store/           # In-memory feed state/hooks
│   │   ├── App.jsx          # Feed screen composition
│   │   └── main.jsx         # React entry point
│   ├── public/              # Static assets (favicon/icons)
│   ├── package.json         # Scripts and dependencies
│   └── vite.config.js       # Vite config
└── README.md
```

## Prerequisites

- **Node.js** (modern LTS recommended; Vite 8 typically uses Node 18+)
- **npm**

## Local Installation & Setup

From the repository root:

```bash
cd frontend
npm install
```

## Run the Project

From `frontend/`:

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`).

## Available Commands

From `frontend/`:

- `npm run dev` — start development server
- `npm run build` — create production build in `frontend/dist`
- `npm run preview` — preview production build locally
- `npm run lint` — run oxlint

## Usage

1. Open the app in the browser.
2. Use **“Share a workplace experience…”** to create a post.
3. Choose **Anonymous** or **Identified** mode before submitting.
4. Add optional company/topic tags.
5. Interact with posts via like/repost actions and explore trending issues.

## Configuration

No required environment variables are currently defined for runtime in this repository.

The repository `.gitignore` includes common `.env` files, so environment-based configuration can be added safely in future if needed.

## Deployment

This frontend can be deployed as a static site:

1. Build from `frontend/`:
   ```bash
   npm run build
   ```
2. Deploy the generated `frontend/dist` directory to a static host (for example Vercel, Netlify, or GitHub Pages).

## Contributing

Contributions are welcome:

1. Create a feature branch.
2. Make focused changes.
3. Run lint/build checks locally.
4. Open a pull request with a clear summary.

## License

No license file is currently present in this repository. Licensing terms should be clarified by the repository maintainer before reuse or redistribution.

## Maintainer

- GitHub: [@abhishekmohanty5](https://github.com/abhishekmohanty5)
