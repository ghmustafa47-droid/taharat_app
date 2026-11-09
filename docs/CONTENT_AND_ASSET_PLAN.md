# Master content and asset production plan

Status: provisional planning derived from the shared conversation. No manuscript transcription or religious verification has been completed in this workspace.

## Source-to-lesson map
The page ranges are claims from the shared chat and must be reconciled against handwritten numbering before use as citations.

| Reported pages | Proposed content | Blocks | Audience emphasis | Demo use |
|---|---|---|---|---|
| 1–9 | Introduction, importance, supporting narrations | Text, reference, callout | All, adapted by age | Opening and reference detail |
| 10–12 | Obligations, Sunnah, recommendations, disliked actions | Categorized list, ruling variant | Teen, Adult, Parent; curated Child | Rules journey and transformation A |
| 13–16 | Wudu method | Steps, illustration, media, quiz | All, adapted by age | Core journey and transformation B |
| 17–18 | Benefits | Text, callout, reference | All | Learning overview |
| 19–22 | Events/circumstances affecting Wudu | FAQ, scenario, reference | Teen/Adult/Parent after review | Transformation C |
| 23–24 | Medical situations, urine bags, dialysis | Scenario, FAQ, review notice | Adult/Parent | Advanced topic coverage |
| 25 | Laughter in prayer, intimate matters | Text, reference, FAQ | Audience eligibility per section | Curriculum coverage |
| 26–27 | Illness, discharge and private-part conditions | FAQ, scenario | Adult/Parent pending review | Curriculum coverage |
| 28–29 | Further exceptions and medical cases | Scenario, reference | Adult/Parent | Curriculum coverage |

## Manuscript processing workflow
1. Inspect each source image and enter its actual handwritten page number in `content/source-inventory.json`.
2. Check duplicates, missing pages, cropping and legibility; classify the extra reference image.
3. Transcribe faithfully; explicitly record unclear passages and reference uncertainty.
4. Split into source items where a page contains several topics. Map each item to lessons and blocks.
5. Prepare educational adaptations and translations separately from source transcription.
6. Obtain required reviews before presenting rulings or step illustrations as approved instruction.

## Audience presentation matrix
| Mode | Treatment | Content rule |
|---|---|---|
| Child | Short copy, large visuals, guided progression | Curated age-appropriate subset |
| Teen | Concise explanations and interactive questions | Reviewed age-appropriate depth |
| Adult | Detailed explanations and source access | Approved advanced topics available |
| Parent | Guided learning plus explanation for supporting a child | Adult material remains separate from child-facing views |

All modes support Urdu/English. Perspective selection controls approved interpretations only. A missing translation or interpretation is shown explicitly rather than silently substituted.

## Bounded first design batch
Use the smaller concept scope from the chat: 12 mobile frames, 5 CMS frames, 10 planned illustrations, and one 2–3 minute video. This is a working production batch, not a delivery-date promise. Expand only when this coherent demonstration is complete.

### Mobile frames
M01 audience/language setup; M02 learning home; M03 Wudu overview; M04 guided step; M05 source detail; M06 rules categories; M07 perspective availability; M08 special-situations list; M09 scenario detail with review state; M10 quiz/completion; M11 Urdu RTL version of the guided step; M12 Child version of the guided step.

### CMS frames
C01 content library/dashboard; C02 lesson builder with block library; C03 block properties and audience/language preview; C04 bilingual editing; C05 review/publish revision flow. These frames may have multiple interactive states; a static frame count is not a promise of complete functionality.

### Illustration production list
| IDs | Quantity | Purpose | Dependency |
|---|---|---|---|
| I01 | 1 | Warm learning hero | Visual style reference |
| I02 | 1 | Parent/child learning | Consistent characters/style |
| I03–I08 | 6 | Selected physical-action illustrations | Exact actions selected from verified steps; six images do not imply six canonical steps |
| I09 | 1 | Neutral advanced-guidance illustration | No implied medical or religious advice |
| I10 | 1 | Completion illustration | Shared visual style |

The initial plan covers 10 images. The audience batch adds four paper cut scenes for teen, adult, older adult and parent views. See the [illustration catalog](ILLUSTRATION_PILOT.md) for the generated files and their intended uses. Create UI, icons and text as editable design elements.

For every generated asset record: asset ID, target frames/scene, prompt, model/tool, reference images, dimensions, output path, provenance and visual-review status. Avoid generated Urdu/Arabic text inside illustrations. Physical-action images must match reviewed instructions.

## Design production order
Source identification → selected demo copy → storyboard/screen map → design tokens/components → one illustration style proof → mobile/CMS frames → prototype recording → final video → private showcase.

Figma remains the intended editable design destination. No Figma tool is currently exposed in this session; no file has been created or connection assumed. Proceed with local specifications while connection and destination are resolved.
