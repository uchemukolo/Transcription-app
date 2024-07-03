## How to start the dev server

- `npm install`
- `npm run dev`

Trancscript IDs
- bk168068-93e8-4bb6-b762-dbc57d172111
- so164652-c0ef-4991-b7cc-474cc0ea911
- gg1aa17c-0a31-495c-8e9d-6179de3d3111

You can use the URL below for testing too:
 GET https://frontend-challenge-backend.vercel.app/api/transcripts/:id
// Response body
{
	id: string;
	title: string;
	audioUrl: string;
	blocks: {
			start: number; // Start time of this block in seconds
			end: number; // End time of this block in seconds
			text: string;
	}[];
}
