import React, { useEffect, useRef, useState } from 'react';
import inventory from './inventory.json';
import { comparisons, decisions, learning, paths, priorities, prototype, roles, studio, topics } from './content';
import ProposalDetails, { proposalLinks } from './ProposalDetails';
import './style.css';

const sections = [
  ['vision','The vision','ہمارا تصور'],
  ['audiences','Learning paths','سیکھنے کے راستے'],
  ['lesson','Try a lesson','سبق آزمائیں'],
  ['manuscript','Manuscript','اصل لکھائی'],
  ['curriculum','Curriculum','سبق کے موضوعات'],
  ['studio','Content Studio','سبق بنانے کی جگہ'],
  ['release','First release','پہلا ورژن'],
];
const art = name => '/art/taharah-' + name + '-paper-cut.png';
const screen = name => '/screens/' + name + '.png';

function LinkButton({ href, children, secondary = false, external = false }) {
  return <a className={'action' + (secondary ? ' secondary' : '')} href={href}
    {...(external ? {target:'_blank', rel:'noreferrer'} : {})}>{children}<span aria-hidden="true">↗</span></a>;
}

function Heading({ number, tag, title, children }) {
  return <div className="section-heading"><div className="eyebrow"><b>{number}</b> {tag}</div>
    <h2>{title}</h2>{children && <p>{children}</p>}</div>;
}

function Video({ kind, locale, label, poster }) {
  const captions = locale === 'en' ? kind + '-en' : kind;
  return <video key={kind + locale} className={kind === 'promo' ? 'promo' : 'walkthrough'} controls playsInline preload="none"
    poster={poster} aria-label={label} src={'/media/' + kind + '.mp4'}>
    <track kind={locale === 'en' ? 'subtitles' : 'captions'} srcLang={locale} label={locale === 'ur' ? 'اردو' : 'English'} src={'/media/' + captions + '.vtt'} default />
    <a href={'/media/' + kind + '.mp4'}>{label}</a>
  </video>;
}

function Stepper({ items, locale, wide = false }) {
  const [selected, setSelected] = useState(0);
  const ur = locale === 'ur';
  const pick = values => values[Number(ur)];
  const t = (en, urdu) => ur ? urdu : en;
  const current = items[selected];
  const englishOnly = ur && current.screens[0] === current.screens[1];
  return <div className={'stepper ' + (wide ? 'wide' : '')}>
    <div className="step-list" role="group" aria-label={t('Choose a step','مرحلہ چنیں')}>
      {items.map((item,i) => <button key={i} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}>
        <span>{String(i+1).padStart(2,'0')}</span>{pick(item.title)}
      </button>)}
    </div>
    <figure className="step-display" aria-live="polite">
      <img src={screen(pick(current.screens))} alt={pick(current.title)} loading="lazy" />
      <figcaption><strong>{pick(current.title)}</strong><p>{pick(current.copy)}</p>
      {englishOnly && <small>یہ نمونہ انگریزی میں ہے۔</small>}</figcaption>
    </figure>
  </div>;
}

function Manuscript({ ur }) {
  const [topic, setTopic] = useState('');
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState(0);
  const [imageAllowed, setImageAllowed] = useState(false);
  const dialog = useRef(null);
  const t = (en, urdu) => ur ? urdu : en;
  const visible = inventory.sources.filter(s => !topic || s.prototype_topic_groups.includes(topic))
    .sort((a, b) => a.handwritten_page_number - b.handwritten_page_number);
  const match = selected && comparisons.find(c => c.pages.includes(selected.handwritten_page_number));

  function open(source) {
    setSelected(source);
    setView(0);
    dialog.current.showModal();
  }

  return <>
    <div className="comparison-grid">{comparisons.map(c => <article className="card" key={c.pages[0]}>
      <small>{t('Manuscript pages','مسودے کے صفحات')} <bdi>{c.pages.length === 1 ? c.pages[0] : c.pages[0] + '–' + c.pages.at(-1)}</bdi></small>
      <h3>{c.title[Number(ur)]}</h3><p>{c.before[Number(ur)]} <span aria-hidden="true">→</span> {c.after[Number(ur)]}</p>
      <button className="text-button" onClick={() => open(inventory.sources.find(s => s.handwritten_page_number === c.pages[0]))}>
        {t('See the original and the lesson idea','اصل صفحہ اور سبق کا نمونہ دیکھیں')}
      </button>
    </article>)}</div>
    <div className="inventory">
      <div className="inventory-head"><h3>{t('Browse 29 manuscript pages','مسودے کے ۲۹ صفحات دیکھیں')}</h3>
      <label>{t('Filter by topic','موضوع منتخب کریں')} <select value={topic} onChange={e => setTopic(e.target.value)}>
        <option value="">{t('All topics','تمام موضوعات')}</option>
        {topics.map(q => <option key={q.en} value={q.en}>{ur ? q.ur : q.en}</option>)}
      </select></label></div>
      <p className="muted">{t('I checked the page numbers against the original. The topic names are a first draft. We still need to check the references and any handwriting that is hard to read.',
          'میں نے صفحہ نمبر اصل تحریر سے ملا لیے ہیں۔ موضوعات کے نام ابھی عارضی ہیں۔ حوالے اور مشکل لکھائی ابھی دیکھنی ہے۔')}</p>
      <div className="page-list">{visible.map(s => <button key={s.source_id} onClick={() => open(s)}>
        <b>{s.handwritten_page_number}</b><span>{ur ? s.topic_urdu : s.topic}</span><span aria-hidden="true">↗</span>
      </button>)}</div>
    </div>
    <dialog ref={dialog} onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}>
      {selected && <div className="dialog-body">
        <div className="inventory-head"><h3>{t('Manuscript page','مسودے کا صفحہ')} {selected.handwritten_page_number}</h3>
          <button className="close" aria-label={t('Close manuscript viewer','مسودہ بند کریں')} onClick={() => dialog.current.close()}>×</button></div>
        <p>{ur ? selected.topic_urdu : selected.topic} <small className="badge">{t('Page number verified','صفحہ نمبر چیک ہو گیا')}</small></p>
        {match?.pages.length > 1 && <div className="tabs" role="group" aria-label={t('Pages in this comparison','اس موازنے کے صفحات')}>
          {match.pages.map(number => <button key={number} aria-pressed={number === selected.handwritten_page_number}
            onClick={() => setSelected(inventory.sources.find(source => source.handwritten_page_number === number))}>
            {t('Page','صفحہ')} {number}
          </button>)}
        </div>}
        <div className="tabs" role="group" aria-label={t('Source view','صفحہ کیسے دیکھیں')}>
          {[t('Original image','اصل تصویر'),t('Typed text','ٹائپ کی ہوئی لکھائی'),t('Translation','ترجمہ'),t('Teaching adaptation','سبق کا نمونہ')].map((name,i) =>
            <button aria-pressed={view === i} key={i} onClick={() => setView(i)}>{name}</button>)}
        </div>
        {view === 0 && (process.env.EXPO_PUBLIC_SHOW_MANUSCRIPTS !== '1'
          ? <p className="notice">{t('Original scans are available in the private review copy.','اصل تصویریں صرف نجی جائزے کی کاپی میں موجود ہیں۔')}</p>
          : imageAllowed ? <>
          <img className="manuscript-image" src={'/manuscript/' + selected.source_id + '.jpg'} alt={t('Handwritten manuscript page','قلمی مسودے کا صفحہ') + ' ' + selected.handwritten_page_number} />
          <LinkButton external secondary href={'/manuscript/' + selected.source_id + '.jpg'}>{t('Open full-size image','مکمل تصویر کھولیں')}</LinkButton>
        </> : <div className="notice"><p>{t('Open originals only if you have permission to review the manuscript.','اصل تصاویر صرف اس صورت میں کھولیں جب آپ کو مسودے کے جائزے کی اجازت ہو۔')}</p>
          <button className="action" onClick={() => setImageAllowed(true)}>{t('I have permission to view','مجھے دیکھنے کی اجازت ہے')}</button></div>)}
        {view === 1 && <p className="notice">{selected.transcription || t('We still need to check the typed text against the original and mark anything that is hard to read.',
          'اصل لکھائی کو ٹائپ کر کے ملانا باقی ہے۔ جو لفظ صاف نظر نہیں آئے گا، اسے الگ نشان لگائیں گے۔')}</p>}
        {view === 2 && <p className="notice">{t('The translation still needs review. The topic name only tells you what the page is about.',
          'ترجمہ ابھی چیک ہونا ہے۔ موضوع کا نام صرف یہ بتاتا ہے کہ صفحے پر کس بارے میں لکھا ہے۔')}</p>}
        {view === 3 && <div className="notice"><small className="badge">{t('Draft · review pending','مسودہ · جائزہ باقی')}</small><p>{match ? match.after[Number(ur)] : t('I’ll plan the lesson once the typed text and references have been checked.',
          'اصل لکھائی اور حوالوں کی جانچ کے بعد میں اس کا سبق بناؤں گا۔')}</p></div>}
      </div>}
    </dialog>
  </>;
}

function ReleaseScope({ locale, launchOnly = false }) {
  const ur = locale === 'ur';
  const t = (en, urdu) => ur ? urdu : en;
  const pick = pair => pair[Number(ur)];
  const groups = launchOnly ? priorities.slice(0, 3) : priorities;
  return <div className="release-scope">{groups.map(({title, items}, index) => (
          <article className={index === 0 ? 'card release-essential' : 'card'} key={title[0]}>
            <h3>{pick(title)}</h3>
            <ul className="release-checklist" role="list">
              {items.map(([enTitle, enDetail, urTitle, urDetail]) => <li key={enTitle}>
                <strong>{t(enTitle, urTitle)}</strong>
                <span>{t(enDetail, urDetail)}</span>
              </li>)}
            </ul>
          </article>
        ))}</div>;
}

export default function App() {
  const [locale,setLocale] = useState(() => {
    const value = typeof window === 'undefined' ? null : new URLSearchParams(location.search).get('lang');
    return value === 'ur' ? 'ur' : 'en';
  });
  const [path,setPath] = useState(0);
  const [watch,setWatch] = useState(false);
  const ur = locale === 'ur';
  const t = (en, urdu) => ur ? urdu : en;
  const pick = pair => pair[Number(ur)];
  const activePath = paths[path];
  const detailed = typeof window !== 'undefined' && new URLSearchParams(location.search).get('view') === 'proposal';
  const pageSections = detailed ? proposalLinks : sections;
  const detailUrl = ur ? '/?view=proposal&lang=ur' : '/?view=proposal';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = ur ? 'rtl' : 'ltr';
    document.title = detailed ? t('Taharah · Full proposal','طہارت · پوری تجویز') : t('Taharah · Learn step by step','طہارت · قدم بہ قدم سیکھیں');
    if (!document.querySelector('meta[name="robots"]')) {
      const robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex, nofollow';
      document.head.append(robots);
    }
  }, [locale, detailed]);

  useEffect(() => {
    function pauseVideos() {
      document.querySelectorAll('.site video').forEach(video => {
        if (!video.paused) video.pause();
      });
    }

    window.addEventListener('scroll', pauseVideos, { passive: true });
    return () => window.removeEventListener('scroll', pauseVideos);
  }, []);

  function switchLanguage(value) {
    if (value === locale) return;
    const top = document.querySelector('header').getBoundingClientRect().bottom + 12;
    const current = pageSections.map(([id]) => document.getElementById(id)).filter(Boolean)
      .findLast(el => el.getBoundingClientRect().top <= top);
    const anchor = current || document.getElementById('main');
    const previous = anchor.getBoundingClientRect().top;
    const url = new URL(location.href);
    url.searchParams.set('lang',value);
    history.replaceState(null,'',url);
    setLocale(value);
    requestAnimationFrame(() => requestAnimationFrame(() =>
      window.scrollBy(0,anchor.getBoundingClientRect().top - previous)));
  }

  return <div className="site" lang={locale} dir={ur ? 'rtl' : 'ltr'}>
    <a className="skip" href="#main">{t('Skip to content','مواد پر جائیں')}</a>
    <header><div className="header-inner">
      <a className="brand" href={detailed ? (ur ? '/?lang=ur' : '/') : '#main'}><span className="brand-icon" aria-hidden="true">✦</span><span>{t('Taharah','طہارت')}</span></a>
      <nav aria-label={t('Proposal sections','تجویز کے حصے')}>
        {!detailed && <a className="full-proposal-link" href={detailUrl}>{t('Full proposal','پوری تجویز')}</a>}
        {pageSections.filter(s => s[0] !== 'audiences').map(([id,en,urdu]) => <a key={id} href={'#'+id}>{t(en,urdu)}</a>)}
      </nav>
      <div className="language" role="group" aria-label={t('Website language','ویب سائٹ کی زبان')}>
        <button lang="en" aria-pressed={!ur} onClick={() => switchLanguage('en')}>English</button>
        <button lang="ur" aria-pressed={ur} onClick={() => switchLanguage('ur')}>اردو</button>
      </div>
    </div></header>
    {detailed ? <ProposalDetails locale={locale} Video={Video} ReleaseScope={ReleaseScope} /> : <main id="main">
      <div className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="dot" /> {t('Private proposal · Learning companion','طہارت ایپ کی تجویز')}</div>
          <h1>{t('Learn Taharah,','طہارت سیکھیں،')}<br/><em>{t('Step by Step.','قدم بہ قدم۔')}</em></h1>
          <p>{t('My idea is to turn your handwritten notes into short lessons on Wudu and cleanliness in Islam. You can learn one step at a time, try a quick question, and see the references that have been checked for each lesson.',
          'میری تجویز ہے کہ آپ کی ہاتھ سے لکھی تحقیق سے وضو اور اسلامی صفائی کے چھوٹے چھوٹے سبق بنائیں۔ آپ ایک ایک قدم اپنی رفتار سے سیکھیں، ایک آسان سوال حل کریں اور سبق کے چیک کیے ہوئے حوالے دیکھیں۔')}</p>
          <div className="actions"><LinkButton external href={prototype.mobile}>{t('Try the mobile prototype','موبائل نمونہ آزمائیں')}</LinkButton>
          <LinkButton secondary href={detailUrl}>{t('Read the full proposal','پوری تجویز پڑھیں')}</LinkButton></div>
          <div className="hero-notes"><span>{t('No ads','اشتہار نہیں ہوں گے')}</span><span>{t('Offline learning planned','انٹرنیٹ کے بغیر سبق')}</span><span>{t('We’ll check the references','حوالے چیک ہوں گے')}</span></div>
        </div>
        <figure className="hero-art"><img src={art('welcome')} alt={t('Paper-cut illustration of a learner preparing for Wudu','وضو کی تیاری کرتے بچے کی کاغذی تصویر')} />
          <figcaption><span>{t('The Taharah learning experience','طہارت میں سیکھنے کا تجربہ')}</span><b>01 / 07</b></figcaption>
        </figure>
      </div>
      <section id="vision" className="feature">
        <div className="wrap vision-grid">
          <div><Heading number="01" tag={t('The vision','ہمارا تصور')} title={t('What comes next?','اگلا قدم کیا ہے؟')}>
            {t('Say you forget what comes next in Wudu. Open a short lesson, follow the pictures, try a question, and tap the reference if you want to read more.',
          'فرض کریں وضو کرتے ہوئے یاد نہیں آ رہا کہ اگلا قدم کیا ہے۔ سبق کھولیں، تصویریں دیکھیں، ایک سوال حل کریں اور مزید جاننا ہو تو حوالہ کھول لیں۔')}
          </Heading>
          <p>{t('We’ll keep the original notes. I want the app to be easy to use, with no ads and lessons you can read without internet. When a new lesson is approved, it can appear in the app without asking everyone to install a new version.',
          'اصل تحریر ہمارے پاس محفوظ رہے گی۔ میری کوشش ہے کہ ایپ چلانا آسان ہو، اشتہار نہ ہوں اور سبق انٹرنیٹ کے بغیر بھی پڑھے جا سکیں۔ نیا سبق منظور ہو جائے تو وہ ایپ میں آ جائے گا، سب کو نئی ایپ ڈالنے کی ضرورت نہیں ہوگی۔')}</p>
          <button className="action light" onClick={() => setWatch(!watch)} aria-expanded={watch}>
            {watch ? t('Hide full walkthrough','مکمل تعارف چھپائیں') : t('Watch the full walkthrough','مکمل تعارف دیکھیں')}</button>
          {watch && <Video kind="client-walkthrough" locale={locale} label={t('Full mobile and studio walkthrough','موبائل اور اسٹوڈیو کا مکمل تعارف')} poster={screen('welcome')} />}
          </div>
          <div className="video-frame"><Video kind="promo" locale={locale} label={t('27-second Taharah promo','طہارت کا ۲۷ سیکنڈ کا تعارف')} poster={art('welcome')} />
            <small>{t('27 sec · Urdu narration · Selectable captions','۲۷ سیکنڈ · اردو آواز · ویڈیو کا متن بھی موجود ہے')}</small></div>
        </div>
      </section>
      <section id="audiences" className="wrap section">
        <Heading number="02" tag={t('Learning paths','سیکھنے کے راستے')} title={t('One app, three audiences','ایک ایپ، تین طرح کے سیکھنے والے')}>
          {t('Everyone learns from the same references. Parents get help teaching at home, children learn with pictures, teens can try short questions on their own, and adults can read more detail.',
          'حوالے سب کے لیے ایک ہی ہوں گے۔ والدین کو گھر میں سمجھانے میں مدد ملے گی، بچے تصویروں سے سیکھیں گے، ٹین ایجر خود چھوٹے سوال حل کر سکیں گے اور بڑے مزید تفصیل پڑھ سکیں گے۔')}
        </Heading>
        <div className="tabs" role="group" aria-label={t('Choose an audience','گروہ منتخب کریں')}>
          {paths.map((p,i) => <button key={i} aria-pressed={path===i} onClick={() => setPath(i)}>{pick(p.title)}</button>)}
        </div>
        <article className="audience-panel" aria-live="polite"><img src={art(activePath.art)} alt={pick(activePath.title)} loading="lazy" />
          <div><div className="eyebrow">{t('Same topic · Wudu','ایک ہی موضوع · وضو')}</div><h3>{pick(activePath.title)}</h3>
          <p>{pick(activePath.copy)}</p><p className="notice">{pick(activePath.example)}</p></div>
        </article>
      </section>
      <section id="lesson" className="section wrap">
        <Heading number="03" tag={t('Mobile prototype','موبائل نمونہ')} title={t('Try a lesson','سبق آزمائیں')}>
          {t('Start with a short explanation, open its reference, then try a quick question.',
          'پہلے آسان وضاحت پڑھیں، پھر حوالہ دیکھیں اور آخر میں ایک چھوٹا سا سوال حل کریں۔')}
        </Heading>
        <Stepper items={learning} locale={locale}/>
        <div className="actions"><LinkButton external href={prototype.mobile}>{t('Try the prototype','نمونہ آزمائیں')}</LinkButton></div>
        <div className="media-row"><div><h3>{t('The practical Wudu guide','وضو کرنے کا طریقہ')}</h3>
          <p>{t('The first lesson explains Wudu in five short steps. The separate Wudu guide shows how to do it, with pictures, questions, and practice. The video is a sample while we check what it says and shows.',
          'پہلا سبق وضو کو پانچ آسان حصوں میں سمجھاتا ہے۔ وضو کرنے کا طریقہ الگ سبق میں تصویروں، سوالوں اور مشق کے ساتھ ہے۔ ابھی ویڈیو صرف نمونے کے لیے ہے۔ اس میں کہی اور دکھائی گئی باتیں چیک ہوں گی۔')}</p></div>
          <Video kind="mobile" locale={locale} label={t('Mobile walkthrough','موبائل کا تعارف')} poster={screen('lesson')} />
        </div>
      </section>
      <section id="manuscript" className="paper-section"><div className="wrap section">
        <Heading number="04" tag={t('The original research','اصل تحقیق')} title={t('From manuscript to lesson','مسودے سے سبق تک')}>
          {t('You can see the original page, the typed text, the translation, and the lesson idea separately. The examples below show how I’d use the notes in the app.',
          'یہاں اصل صفحہ، اس کی ٹائپ کی ہوئی لکھائی، ترجمہ اور سبق کا نمونہ الگ الگ دیکھ سکتے ہیں۔ نیچے مثالوں میں بتایا ہے کہ میں اس لکھائی سے سبق کیسے بنانا چاہتا ہوں۔')}
        </Heading>
        <Manuscript ur={ur}/>
        <div className="method"><h3>{t('One lesson, five learning blocks','ایک سبق کے پانچ حصے')}</h3>
          <ol>{[t('Introduction','تعارف'),t('Explanation','وضاحت'),t('Reference','حوالہ'),t('Guided practice','رہنمائی والی مشق'),t('Knowledge check','سمجھ کی جانچ')].map(s => <li key={s}>{s}</li>)}</ol>
          <p>{t('I’d shorten the opening, give each Qur’an verse its own card, and let readers tap to see Hadith references. Pictures can show each practical step. We’ll explain sensitive questions in words that suit each age. A scholar will check that the simpler wording keeps the original meaning.',
          'میں لمبا تعارف چھوٹا رکھوں گا۔ ہر قرآنی آیت الگ دکھائیں گے اور حدیث کا حوالہ دبانے پر کھلے گا۔ کرنے کا طریقہ تصویروں میں دکھائیں گے۔ نازک سوال عمر کے حساب سے آسان لفظوں میں سمجھائیں گے۔ دینی عالم دیکھیں گے کہ بات کا اصل مطلب وہی رہے۔')}</p></div>
      </div></section>
      <section id="curriculum" className="wrap section">
        <Heading number="05" tag={t('Seven topic groups','سات موضوعات')} title={t('Proposed curriculum','سبق میں کیا ہوگا؟')}>
          {t('I’d start with Wudu from beginning to end. We can add the other topics once they’ve been checked.',
          'میں پہلے وضو کا پورا طریقہ شامل کرنا چاہتا ہوں۔ باقی موضوعات چیک ہونے کے بعد شامل کر سکتے ہیں۔')}
        </Heading>
        <div className="topic-list">{topics.map((q,i) => <article key={q.en}>
          <span className="topic-index">{String(i+1).padStart(2,'0')}</span>
          <div><h3>{ur ? q.ur : q.en}</h3><p>{pick(q.outcome)}</p></div>
          <div><b>{pick(q.format)}</b><span className="badge">{q.sensitive ? t('An expert also needs to check this','اسے متعلقہ ماہر بھی چیک کرے گا') : t('Still to be checked','ابھی چیک ہونا ہے')}</span></div>
        </article>)}</div>
      </section>
      <section id="studio" className="paper-section"><div className="wrap section">
        <Heading number="06" tag={t('CMS prototype','اسٹوڈیو کا نمونہ')} title={t('How lessons are made','اسباق کیسے تیار ہوں گے')}>
          {t('This is where the team will write, check, and publish lessons. In the demo, you can see the dashboard, add a piece to a lesson, see what different learners will get, and check what needs approval.',
          'یہاں ٹیم سبق بنائے گی، چیک کرے گی اور ایپ میں ڈالے گی۔ نمونے میں آپ ڈیش بورڈ دیکھ سکتے ہیں، سبق میں نیا حصہ لگا سکتے ہیں اور دیکھ سکتے ہیں کہ کس کو کیا دکھے گا اور کس چیز کی منظوری باقی ہے۔')}
        </Heading>
        <Stepper items={studio} locale={locale} wide />
        <div className="actions">
          <LinkButton external href={ur ? prototype.cmsUr : prototype.cmsEn}>{t('Try the prototype · English','نمونہ آزمائیں · اردو')}</LinkButton>
          <LinkButton secondary external href={ur ? prototype.cmsEn : prototype.cmsUr}>{t('Try the prototype · Urdu','نمونہ آزمائیں · انگریزی')}</LinkButton>
        </div>
        <div className="media-row"><div><h3>{t('Who can open it? What will they see?','کون کھول سکتا ہے؟ اسے کیا دکھے گا؟')}</h3>
          <p>{t('The team makes two choices. Who can open the lesson? Which parts do they see? For example, a child and a parent can open the same lesson, but only the parent might see a longer note. The team checks each view before sending it for review. Language, learner group, and scholarly view are set separately. If a version is still being checked or isn’t available, the app says so.',
          'ٹیم دو باتیں طے کرے گی۔ سبق کون کھول سکتا ہے؟ اسے اندر کون سے حصے دکھیں گے؟ مثال کے طور پر بچے اور والدین ایک ہی سبق کھول سکتے ہیں، مگر لمبی وضاحت صرف والدین کو دکھائی جا سکتی ہے۔ سبق بھیجنے سے پہلے ٹیم دونوں کے لیے دیکھے گی کہ کیا دکھ رہا ہے۔ زبان، عمر کا گروپ اور دینی رائے الگ الگ چن سکتے ہیں۔ کوئی حصہ ابھی چیک ہو رہا ہو یا موجود نہ ہو تو ایپ بتا دے گی۔')}</p></div>
          <Video kind="cms" locale={locale} label={t('Content Studio walkthrough','مواد کے اسٹوڈیو کا تعارف')} poster={screen(ur?'urduCms':'dash')}/>
        </div>
        <h3 className="subheading">{t('Who does what','کس کی کیا ذمہ داری ہے؟')}</h3>
        <div className="comparison-grid">{roles.map(([name,description],i) => <article className="card" key={i}><small>0{i+1}</small>
          <h3>{pick(name)}</h3><p>{pick(description)}</p></article>)}</div>
        <div className="method"><h3>{t('How a lesson gets into the app','سبق ایپ میں کیسے آئے گا؟')}</h3>
          <ol>{[t('Draft','مسودہ'),t('Editorial and language review','لکھائی اور زبان کی جانچ'),t('Scholarly review','دینی جانچ'),t('Approved','منظور شدہ'),t('Published','شائع شدہ'),t('Available on next sync','انٹرنیٹ ملنے پر ایپ میں آئے گا')].map(s => <li key={s}>{s}</li>)}</ol>
          <p>{t('If a reviewer asks for changes, the draft goes back to the writer. The lesson goes live after all checks are done. Without internet, learners can still read the last approved version saved on their phone. The demo shows how this will work.',
          'اگر چیک کرنے والا تبدیلی کہے تو سبق لکھنے والے کے پاس واپس جائے گا۔ ساری جانچ کے بعد ہی سبق ایپ میں آئے گا۔ انٹرنیٹ نہ ہو تو فون پر پہلے سے محفوظ منظور شدہ سبق پڑھ سکیں گے۔ نمونے میں یہی طریقہ دکھایا ہے۔')}</p></div>
      </div></section>
      <section id="release" className="wrap section">
        <Heading number="07" tag={t('Delivery and review','تکمیل اور جائزہ')} title={t('First release and next steps','پہلا ورژن اور اگلے مراحل')}>
          {t('I’d test the full Wudu lesson first, then add more topics.',
          'میری تجویز ہے کہ پہلے وضو کا پورا سبق آزما لیں، پھر باقی موضوع شامل کریں۔')}
        </Heading>
        <ReleaseScope locale={locale} />
        <div className="media-row notes">
          <div><h3>{t('Privacy and safety checks','رازداری اور بچوں کی حفاظت')}</h3>
            <ul className="release-checklist" role="list">
              <li>{t('Lessons don’t ask for names, phone numbers, exact birthdays, or precise location.','سبق کے لیے نام، فون نمبر، پوری تاریخِ پیدائش یا ٹھیک جگہ بتانے کی ضرورت نہیں۔')}</li>
              <li>{t('The first version has no public profiles, social features, or open chat.','پہلے ورژن میں عوامی پروفائل، ایک دوسرے سے رابطہ یا کھلی چیٹ نہیں ہوگی۔')}</li>
              <li>{t('Experts check that lessons on puberty and personal hygiene suit each age.','ماہرین دیکھیں گے کہ بلوغت اور ذاتی صفائی کے سبق ہر عمر کے لیے مناسب ہیں۔')}</li>
            </ul>
          </div>
          <div><h3>{t('How I’ll test it','میں ایپ کیسے آزماؤں گا؟')}</h3>
            <ul className="release-checklist" role="list">
              <li>{t('Ask parents, teens, and adults to find a lesson, try a Wudu step and question, and find the reference. Ask a parent or guardian before testing with minors.','والدین، ٹین ایجرز اور بڑوں سے کہیں گے کہ سبق ڈھونڈیں، وضو کا ایک قدم اور سوال پورا کریں اور حوالہ دیکھیں۔ کم عمر بچوں کے لیے پہلے والدین یا سرپرست سے اجازت لیں گے۔')}</li>
              <li>{t('Check what people understood, whether they finished the lesson, and whether it worked offline.','دیکھیں گے کہ بات سمجھ آئی، سبق پورا ہوا اور انٹرنیٹ کے بغیر بھی چلا۔')}</li>
              <li>{t('Ask the team to write, preview, and send a lesson for review. Check how long it takes to publish after approval.','ٹیم سے کہیں گے کہ سبق لکھے، اسے کھول کر دیکھے اور جانچ کے لیے بھیجے۔ پھر دیکھیں گے کہ منظوری کے بعد اسے ایپ میں ڈالنے میں کتنا وقت لگا۔')}</li>
            </ul>
          </div>
        </div>
        <div className="closing"><div className="eyebrow">{t('Decisions before the first release','پہلے ورژن سے پہلے فیصلے')}</div>
          <h2>{t('Agree on the first learning journey','طے کریں کہ کہاں سے شروع کریں')}</h2>
          <ul>{decisions.map((d,i) => <li key={i}>{pick(d)}</li>)}</ul>
          <LinkButton external secondary href={prototype.mobile}>{t('Try the prototype','نمونہ آزمائیں')}</LinkButton>
        </div>
      </section>
    </main>}
    <footer className="wrap"><span>{t('Taharah · Private proposal','طہارت · نجی تجویز')}</span><a href="#main">{t('Back to top','اوپر جائیں')} ↑</a></footer>
  </div>;
}
