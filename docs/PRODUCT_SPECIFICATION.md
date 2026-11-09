# Taharah — Product specification

Status: working concept brief, not an approved production scope.
Created: 2026-11-06.

## Purpose
Present how the client's handwritten Islamic cleanliness research can become an engaging bilingual learning app, maintained by editors through reusable CMS blocks. The current deliverable is a client demonstration: mobile prototype, CMS prototype, presentation video, and private showcase. Production app and backend development follow scope agreement.

## Requirements carried forward
- Urdu and English, including proper RTL layout and native Arabic source text.
- Child, Teen, Adult and Parent learning modes with a shared design system and controlled theme, density and wording changes.
- Language, audience and scholarly perspective are independent preferences.
- Shared sources and lessons, with reviewed perspective-specific ruling variants where necessary. An unavailable interpretation must show a pending/unavailable state; it must not silently inherit another perspective.
- Editors can add, edit, reorder and target supported blocks, preview translations/audiences, and submit revisions for review. New block capabilities still require development.
- Preserve original manuscript images, faithful transcription and educational adaptation separately, with source links between them.
- Religious statements, translations and demonstrations require appropriate review. Medical-case content also requires qualified review before instructional use.
- The client presentation covers the manuscript's breadth through a curriculum map; detailed interactions concentrate on three representative journeys.

## Evidence and limitations
The shared chat describes 29 numbered manuscript pages. This workspace has 29 JPEG files in `Content_Taharat`, plus one separate JPEG in the project root. File count does not establish handwritten page numbering. The inventory assigns stable source IDs in filename order; page numbers and transcription remain unverified. Topic ranges below come from the previous chat, not a new reading of the originals. The separate image has an unclassified role.

## Demo journeys
1. Wudu Basics: introduction, illustrated steps, source detail, simple question and completion. Primary learner experience; Child and Urdu variations demonstrate adaptability.
2. Understanding Wudu Rules: categorized rule cards, source attribution and a clearly labeled pending-review perspective variant.
3. Special Situations: Adult/Parent scenario browsing, FAQ expansion and review-status messaging. Use topic headings until approved answers exist.

## Content model
Curriculum → module → lesson → ordered block instances. Sources, media and ruling variants are reusable records rather than duplicated lesson text.

Every lesson has a stable ID, title translations, source IDs, audience eligibility, revision, review status and ordered blocks. Each block has a stable ID, type, localized content, source references, applicable audiences, optional ruling-variant reference and review status. A ruling variant records its perspective, reviewer, source evidence and approval status. Asset records include original/generation provenance and visual review status.

Workflow: Draft → Editorial review → Scholarly review → Approved → Published. Revisions to published content create a new draft. Medical cases receive an additional relevant review. The demo simulates these states; it does not imply real publishing, authentication or synchronization.

## Initial reusable blocks
| Block | Demonstration |
|---|---|
| Heading | Lesson hierarchy |
| Rich text | Explanation with localized copy |
| Reference | Arabic text, translation, citation and verification state |
| Illustration | Approved image, caption and accessible description |
| Step sequence | Ordered actions with illustrations |
| Categorized list | Obligatory/recommended/disliked groupings after review |
| Callout | Summary or editorial review notice |
| FAQ | Expandable question and answer |
| Scenario | Case description and reviewed explanation |
| Quiz | Question, options and reviewed feedback |
| Media | Video/audio with caption/transcript |
| Ruling variant | Selected perspective with explicit unavailable state |

## Design constraints
Use native text rather than text baked into illustrations. Urdu layouts need appropriate type, line height, alignment, navigation and mixed-script testing. Keep Arabic quotations distinct from translated explanations. Use consistent, respectful illustrations and manually inspect physical actions. Sensitive scenarios use neutral imagery. Audience themes preserve accessible contrast and familiar navigation. Age targeting is editorial configuration, not inferred from language or perspective.

## Showcase structure
1. Overview: vision, learner modes and entry points.
2. Explore App: mobile prototype and language/audience examples.
3. Content Transformation: original → transcription → educational adaptation.
4. CMS Studio: block editing, preview and approval demonstration.
5. Technology & Roadmap: proposed architecture and phased delivery.
6. Proposal & Feedback: scope, responsibilities and decisions.

## Candidate production architecture
The previous discussion proposed Next.js for the showcase, React Native/Expo for the app, Payload CMS, PostgreSQL, and versioned content delivery with offline SQLite/media caching. These are candidates requiring technical validation, not installed dependencies or finalized commitments. The showcase can use local fixtures without a production backend.

## Completion criteria for the initial demo
- One coherent mobile journey is clickable from entry through completion.
- Urdu and English show visibly correct direction and typography.
- Audience changes alter presentation without conflating language or religious perspective.
- CMS add/edit/reorder actions update preview; review and publishing states are clearly simulated.
- Three transformation examples link back to source assets; unverified content is labeled.
- Private showcase presents prototypes, video and scope without publicly exposing manuscript assets.

## Decisions still open
Final brand/company identity; client deadline and budget; approved scholarly perspectives and reviewers; exact manuscript page numbering; approved bilingual copy; narration language/voice; Figma destination and connection; Nano Banana access; hosting destination and permission to host manuscript images. These do not prevent preparation of local plans.
