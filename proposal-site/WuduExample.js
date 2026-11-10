import React, { useState } from 'react';

export default function WuduExample({ locale }) {
  const [answer, setAnswer] = useState(null);
  const ur = locale === 'ur';
  const t = (en, urdu) => ur ? urdu : en;

  return <section className="detail-section" id="worked-lesson">
    <h2>{t('One Wudu step, from source to lesson','وضو کا ایک قدم، حوالے سے سبق تک')}</h2>
    <p className="notice">{t('Worked draft for review. A qualified religious reviewer still needs to approve the wording and teaching example.',
      'یہ سبق کا مسودہ ہے۔ اس کے الفاظ اور سمجھانے کا طریقہ ابھی دینی عالم سے منظور کروانا ہے۔')}</p>
    <p>{t('The source index points to manuscript page 1 for Qur’an 5:6. This example focuses on the part about washing the arms up to the elbows.',
      'اصل لکھائی کی فہرست میں صفحہ ۱ پر سورۃ المائدہ کی آیت ۶ کا حوالہ ہے۔ اس مثال میں ہم کہنیوں تک بازو دھونے والی بات سمجھاتے ہیں۔')}{' '}
      <a className="text-button" href="https://quran.com/al-maidah/6" target="_blank" rel="noreferrer">{t('Read Qur’an 5:6','سورۃ المائدہ، آیت ۶ پڑھیں')}</a>
    </p>
    <div className="detail-cards">
      <article className="card">
        <h3>{t('For children','بچوں کے لیے')}</h3>
        <p>{t('Find your elbow. When you wash your arm for Wudu, let the water reach your elbow too.',
          'اپنی کہنی دکھائیں۔ وضو میں بازو دھوئیں تو کہنی تک پانی پہنچائیں۔')}</p>
      </article>
      <article className="card">
        <h3>{t('For teens and adults','ٹین ایجرز اور بڑوں کے لیے')}</h3>
        <p>{t('The verse gives the elbow as the endpoint for washing the arm. Open the reference to see how this step fits into the rest of the verse.',
          'آیت میں بازو دھونے کے لیے کہنی تک کا ذکر ہے۔ حوالہ کھول کر دیکھیں کہ پوری آیت میں یہ قدم کہاں آتا ہے۔')}</p>
      </article>
      <article className="card">
        <h3>{t('For parents','والدین کے لیے')}</h3>
        <p>{t('Show the child where the elbow is. Let them try the step, then ask them where the water should reach.',
          'بچے کو دکھائیں کہ کہنی کہاں ہے۔ اسے یہ قدم کرنے دیں، پھر پوچھیں کہ پانی کہاں تک پہنچنا چاہیے۔')}</p>
      </article>
    </div>
    <div className="method">
      <h3>{t('Try the question','سوال حل کریں')}</h3>
      <p>{t('Where should the water reach when you wash your arm in this step?','اس قدم میں بازو دھوتے ہوئے پانی کہاں تک پہنچنا چاہیے؟')}</p>
      <div className="tabs" role="group" aria-label={t('Quiz answers','سوال کے جواب')}>
        <button type="button" aria-pressed={answer === 'wrist'} onClick={() => setAnswer('wrist')}>{t('The wrist','کلائی تک')}</button>
        <button type="button" aria-pressed={answer === 'elbow'} onClick={() => setAnswer('elbow')}>{t('The elbow','کہنی تک')}</button>
      </div>
      <p role="status">{answer === 'elbow' ? t('Correct. Wash up to the elbow.', 'درست۔ کہنی تک دھوئیں۔') :
        answer === 'wrist' ? t('Try again. Find where the arm bends and read the reference if you need help.', 'دوبارہ کوشش کریں۔ دیکھیں بازو کہاں سے مڑتا ہے۔ ضرورت ہو تو حوالہ پڑھیں۔') : ''}</p>
    </div>
    <h3>{t('Example CMS record','CMS میں اس سبق کا ریکارڈ')}</h3>
    <ul className="detail-list">
      <li>{t('Source: manuscript page 1 and Qur’an 5:6. Lesson: washing the arms during Wudu.', 'حوالہ: اصل لکھائی کا صفحہ ۱ اور سورۃ المائدہ کی آیت ۶۔ سبق: وضو میں بازو دھونا۔')}</li>
      <li>{t('Status: draft. Urdu and English wording, religious accuracy, and the demonstration still need review.', 'حالت: مسودہ۔ اردو، انگریزی، دینی بات اور دکھایا جانے والا طریقہ ابھی چیک ہونا ہے۔')}</li>
      <li>{t('Publication: locked until both reviews are recorded against this version. The publisher can release it after sign-off.', 'اشاعت: دونوں جانچیں اس ورژن کے ساتھ درج ہونے تک سبق ایپ میں نہیں جائے گا۔ منظوری کے بعد اسے جاری کیا جا سکے گا۔')}</li>
    </ul>
  </section>;
}
