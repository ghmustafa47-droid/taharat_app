"""Prepare the media used by the private proposal preview."""
import json
from pathlib import Path
import re
from shutil import copyfile

site = Path(__file__).resolve().parent
project = site.parent
public = site / 'public'
for name in ('media', 'manuscript'):
    (public / name).mkdir(parents=True, exist_ok=True)

sources = json.loads((site / 'inventory.json').read_text())['sources']
for source in sources:
    original = project / source['file']
    if original.is_file():
        copyfile(original, public / 'manuscript' / f"{source['source_id']}.jpg")

english_promo = [
    'Ever wondered what comes next while making Wudu?',
    'Open Taharah.',
    'Watch each step, understand it, and go at your own pace.',
    'Learn in Urdu or English and try a quick practice question.',
    'Children and adults can choose a path and learn together at home.',
    'Have a question?',
    'See the original source alongside the answer.',
    'Install Taharah at release and start your first Wudu lesson.',
]
english_mobile = [
    'This is Taharah.',
    'We turned your handwritten research into easy-to-follow lessons.',
    'Let’s see how to follow the first Wudu lesson in the app.',
    'Start by choosing a learning path.',
    'There are separate paths for children, teens, adults, and parents.',
    'For example, parents can open a guide to learning with their children at home.',
    'The beginner Wudu lesson moves through five short steps.',
    'You can switch languages on any step.',
    'Choose Urdu to open the same step in a right-to-left layout.',
    'The practical guide includes Wudu steps, source references, and short activities.',
    'You can see which manuscript page the lesson draws from and where scholarly review is pending.',
]

english_cms = [
    'This is the Taharah editorial dashboard.',
    'From here, you can open lessons, the source index, drafts, and the review queue.',
    'The 29 handwritten pages are organized into seven topic groups.',
    'When building a lesson, add content from the learning block library.',
    'In this example, we add a frequently asked question and move the Qur’an reference before the illustrated steps.',
    'Separate rules govern who can open a lesson and which blocks they see inside it.',
    'Switch between the child and parent previews to see what each group gets in the same lesson.',
    'Switch languages to open the same editorial screen in Urdu.',
    'Before publishing, check the review status of sources, translations, and media.',
    'This prototype shows how to submit a lesson for review.',
]

video_dir = project / 'video'
videos = {
    'promo': ('taharah-urdu-promo-v2-uzma-nasheed-mix', 'taharah-urdu-promo-v2-uzma', english_promo),
    'mobile': ('taharah-urdu-mobile-uzma', 'taharah-urdu-mobile-uzma', english_mobile),
    'cms': ('taharah-urdu-cms-uzma', 'taharah-urdu-cms-uzma', english_cms),
    'client-walkthrough': (
        'taharah-urdu-client-walkthrough-uzma',
        'taharah-urdu-client-walkthrough-uzma',
        english_mobile + english_cms,
    ),
}
for alias, (video, captions, english_lines) in videos.items():
    copyfile(video_dir / f'{video}.mp4', public / 'media' / f'{alias}.mp4')
    srt = (video_dir / f'{captions}.srt').read_text(encoding='utf-8-sig')
    vtt = 'WEBVTT\n\n' + re.sub(r'(\d\d:\d\d:\d\d),(\d{3})', r'\1.\2', srt.strip()) + '\n'
    (public / 'media' / f'{alias}.vtt').write_text(vtt)
    timings = [line for line in vtt.splitlines() if ' --> ' in line]
    (public / 'media' / f'{alias}-en.vtt').write_text(
        'WEBVTT\n\n' + '\n\n'.join(
            timing + '\n' + line for timing, line in zip(timings, english_lines, strict=True)
        ) + '\n'
    )
