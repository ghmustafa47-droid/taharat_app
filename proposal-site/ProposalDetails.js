import React, { useRef, useState } from 'react';
import inventory from './inventory.json';
import { detailSections } from './proposal-details';
import { decisions, prototype } from './content';

const mobile = [
  ['welcome', 'Welcome', 'شروع کا صفحہ'], ['urdu', 'Urdu welcome', 'اردو میں شروع کا صفحہ'],
  ['child', 'Child path', 'بچوں کا راستہ'], ['parent', 'Parent path', 'والدین کا راستہ'],
  ['lesson', 'Wudu lesson', 'وضو کا سبق'], ['step', 'Lesson step', 'سبق کا ایک قدم'],
  ['stepUr', 'Lesson step in Urdu', 'سبق کا قدم اردو میں'], ['quiz', 'Practice question', 'مشق کا سوال'],
  ['source', 'Reference', 'حوالہ'],
];
const studio = [
  ['dash', 'Dashboard', 'ڈیش بورڈ'], ['builder', 'Lesson editor', 'سبق بنانے کی اسکرین'],
  ['added', 'Add a question', 'سوال شامل کریں'], ['reorder', 'Order the lesson parts', 'سبق کے حصوں کی ترتیب'],
  ['rules', 'Access rules', 'کون سبق کھول سکتا ہے'], ['parentCms', 'Parent preview', 'والدین کو کیا دکھے گا'],
  ['review', 'Review', 'جانچ'], ['urduCms', 'Urdu editor', 'اردو میں سبق بنائیں'],
  ['teaser-parent-urdu', 'Urdu dashboard', 'اردو ڈیش بورڈ'],
];
const screenItems = screens => screens.map(([file, en, ur]) => ({src: '/screens/' + file + '.png', title: [en, ur]}));
const manuscriptItems = [...inventory.sources].sort((a, b) => a.handwritten_page_number - b.handwritten_page_number)
  .map(page => ({ src: '/manuscript/' + page.source_id + '.jpg',
    title: ['Page ' + page.handwritten_page_number, 'صفحہ ' + page.handwritten_page_number] }));

export const proposalLinks = [
  ['purpose','Purpose','مقصد'],
  ['experience','Learning experience','سیکھنے کا طریقہ'],
  ['system','Lesson management','سبق سنبھالنے کا نظام'],
  ['offline','Offline and updates','آف لائن اور اپ ڈیٹ'],
  ['scope','Launch scope','پہلا ورژن'],
  ['examples','Mockups and videos','نمونے اور ویڈیو'],
];

function Gallery({ title, items, locale }) {
  const [selected, setSelected] = useState(0);
  const dialog = useRef(null);
  const ur = locale === 'ur';
  const t = (en, urdu) => ur ? urdu : en;
  const pick = pair => pair[Number(ur)];
  const current = items[selected];

  function open(index) {
    setSelected(index);
    dialog.current.showModal();
  }

  function move(delta) {
    setSelected(index => (index + delta + items.length) % items.length);
  }

  function onKeyDown(event) {
    if (event.target.tagName === 'SELECT') return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move((event.key === 'ArrowRight') === !ur ? 1 : -1);
  }

  return <div className="proposal-gallery">
    <h3>{title}</h3>
    <p>{t('Scroll across to see more. Open any image to see the full gallery.','مزید تصویروں کے لیے دائیں بائیں کریں۔ پوری گیلری دیکھنے کے لیے کوئی بھی تصویر کھولیں۔')}</p>
    <ul className="gallery-strip" role="list">{items.map((item, index) =>
      <li key={item.src}><button type="button" onClick={() => open(index)}>
        <img src={item.src} alt="" loading="lazy" /><span>{pick(item.title)}</span>
      </button></li>)}</ul>
    <dialog className="gallery-dialog" ref={dialog} aria-label={title} onKeyDown={onKeyDown}>
      <div className="gallery-bar">
        <strong>{title}</strong>
        <button type="button" autoFocus onClick={() => dialog.current.close()}>{t('Close','بند کریں')}</button>
      </div>
      <figure className="gallery-image">
        <img src={current.src} alt={pick(current.title)} loading="lazy" />
        <figcaption aria-live="polite">{pick(current.title)} · <bdi>{selected + 1} / {items.length}</bdi></figcaption>
      </figure>
      <div className="gallery-bar gallery-controls">
        <button type="button" onClick={() => move(-1)}>{t('Previous','پچھلی تصویر')}</button>
        <label>{t('Jump to image','تصویر چنیں')} <select value={selected} onChange={event => setSelected(Number(event.target.value))}>
          {items.map((item, index) => <option key={item.src} value={index}>{pick(item.title)}</option>)}
        </select></label>
        <button type="button" onClick={() => move(1)}>{t('Next','اگلی تصویر')}</button>
      </div>
    </dialog>
  </div>;
}

export default function ProposalDetails({ locale, Video, ReleaseScope }) {
  const [showOriginals, setShowOriginals] = useState(false);
  const ur = locale === 'ur';
  const t = (en, urdu) => ur ? urdu : en;
  const pick = pair => pair[Number(ur)];
  return <main id="main" className="wrap proposal-detail">
    <div className="proposal-intro">
      <div className="eyebrow">{t('Taharah · Full proposal','طہارت · پوری تجویز')}</div>
      <h1>{t('A practical way to learn Taharah','طہارت سیکھنے کا آسان طریقہ')}</h1>
      <p>{t('I’d start with one complete Wudu lesson and a clear way for the team to write, check, and publish the next one. Here’s what that means for the learner, the team, and the first version of the app.',
        'میں وضو کے ایک پورے سبق سے شروع کرنا چاہتا ہوں۔ ساتھ ٹیم کے لیے اگلا سبق لکھنے، چیک کرنے اور ایپ میں ڈالنے کا طریقہ ہوگا۔ یہاں بتایا ہے کہ پڑھنے والوں، ٹیم اور ایپ کے پہلے ورژن کے لیے اس کا کیا مطلب ہے۔')}</p>
    </div>
    {detailSections.map(({id, title, intro, items, ordered, cards}) => {
      const List = ordered ? 'ol' : 'ul';
      return <section className="detail-section" id={id} key={id}>
        <h2>{pick(title)}</h2>
        {intro && <p>{pick(intro)}</p>}
        {items && <List className="detail-list">{items.map(item => <li key={item[0]}>{pick(item)}</li>)}</List>}
        {cards && <div className="detail-cards">{cards.map(([heading, copy]) => <article className="card" key={heading[0]}>
          <h3>{pick(heading)}</h3><p>{pick(copy)}</p>
        </article>)}</div>}
        {id === 'offline' && <a className="text-button" href="https://docs.expo.dev/eas-update/runtime-versions/" target="_blank" rel="noreferrer">{t('Expo guide to compatible app updates','ایپ اپ ڈیٹ کے بارے میں Expo کی گائیڈ')}</a>}
      </section>;
    })}
    <section className="detail-section" id="scope">
      <h2>{t('What goes into the first version?', 'پہلے ورژن میں کیا ہوگا؟')}</h2>
      <p>{t('The first version should let someone find Wudu, learn it, check a reference, and open the lesson again without internet. Use the checklists to agree what has to be ready and what can follow.', 'پہلے ورژن میں وضو کا سبق ڈھونڈ سکیں، اس سے سیکھ سکیں، حوالہ دیکھ سکیں اور انٹرنیٹ کے بغیر دوبارہ سبق کھول سکیں۔ نیچے فہرست سے طے کریں کہ کیا پہلے چاہیے اور کیا بعد میں آ سکتا ہے۔')}</p>
      <ReleaseScope locale={locale} launchOnly />
      <div className="detail-cards proposal-roadmap">
        <article className="card">
          <h3>{t('Phase 2','دوسرا مرحلہ')}</h3>
          <p>{t('Use feedback from the first release to decide whether to add audio lessons or prayer times.', 'پہلا ورژن استعمال کرنے والوں کی رائے سے طے کریں کہ آڈیو سبق یا نماز کے اوقات شامل کرنے چاہییں۔')}</p>
        </article>
        <article className="card">
          <h3>{t('Future releases','آنے والے ورژن')}</h3>
          <p>{t('Consider donations later. Consider AI answers only after testing their accuracy and how they handle questions they cannot answer.', 'چندہ بعد میں دیکھیں۔ اے آئی کے جواب تبھی سوچیں جب یہ چیک ہو جائے کہ جواب کتنے درست ہیں اور جواب معلوم نہ ہو تو سسٹم کیا کرتا ہے۔')}</p>
        </article>
      </div>
    </section>
    <section className="detail-section" id="examples">
      <h2>{t('See the screens and hear the walkthroughs', 'اسکرینیں دیکھیں اور ویڈیو میں سمجھیں')}</h2>
      <Gallery title={t('Mobile app mockups','موبائل ایپ کے نمونے')} locale={locale} items={screenItems(mobile)} />
      <a className="action secondary" href={prototype.mobile} target="_blank" rel="noreferrer">{t('Try the mobile prototype','موبائل ایپ کا نمونہ آزمائیں')}</a>
      <Gallery title={t('Lesson management mockups','سبق سنبھالنے کی اسکرینیں')} locale={locale} items={screenItems(studio)} />
      <a className="action secondary" href={ur ? prototype.cmsUr : prototype.cmsEn} target="_blank" rel="noreferrer">{t('Try the CMS prototype','CMS کا نمونہ آزمائیں')}</a>
      <div className="proposal-videos">
        {[
          ['mobile','lesson','Mobile walkthrough','موبائل ایپ کا تعارف'],
          ['cms','dash','CMS walkthrough','سبق بنانے کا تعارف'],
          ['client-walkthrough','welcome','Full walkthrough','مکمل تعارف'],
          ['promo',null,'Short Taharah promo','طہارت کا چھوٹا تعارف'],
        ].map(([kind, poster, en, urdu]) => <div className="card" key={kind}>
          <h3>{t(en, urdu)}</h3>
          <Video kind={kind} locale={locale} label={t(en, urdu)} poster={poster ? '/screens/' + poster + '.png' : '/art/taharah-welcome-paper-cut.png'} />
        </div>)}
      </div>
      <div className="proposal-originals">
        {process.env.EXPO_PUBLIC_SHOW_MANUSCRIPTS !== '1' ? <>
          <h3>{t('Original handwritten pages','ہاتھ سے لکھے اصل صفحے')}</h3>
          <p>{t('Original scans are available in the private review copy.','اصل تصویریں صرف نجی جائزے کی کاپی میں موجود ہیں۔')}</p>
        </> : showOriginals ? <Gallery title={t('Original handwritten pages','ہاتھ سے لکھے اصل صفحے')} items={manuscriptItems} locale={locale} /> : <>
          <h3>{t('Original handwritten pages','ہاتھ سے لکھے اصل صفحے')}</h3>
          <p>{t('Open the originals only if you have permission to review them.','اصل صفحے تبھی کھولیں جب آپ کو انہیں دیکھنے کی اجازت ہو۔')}</p>
          <button className="action secondary" type="button" onClick={() => setShowOriginals(true)}>{t('I have permission to view','مجھے دیکھنے کی اجازت ہے')}</button>
        </>}
      </div>
    </section>
    <section className="closing">
      <h2>{t('What I’d agree before we start','شروع کرنے سے پہلے کیا طے کریں گے؟')}</h2>
      <p>{t('Put the learning experience first. Build the review process, content versions, and offline access alongside the first lesson so the team can keep adding material after launch.',
        'سب سے پہلے دیکھیں کہ سبق سمجھنا آسان ہو۔ پہلے سبق کے ساتھ جانچ، سبق کے پرانے ورژن اور انٹرنیٹ کے بغیر پڑھنے کا انتظام بنائیں تاکہ ٹیم بعد میں بھی نئے سبق ڈال سکے۔')}</p>
      <ul>{decisions.map(item => <li key={item[0]}>{pick(item)}</li>)}</ul>
      <a className="action secondary" href={ur ? '/?lang=ur' : '/'}>{t('Back to the overview','مختصر تجویز پر واپس جائیں')}</a>
    </section>
  </main>;
}
