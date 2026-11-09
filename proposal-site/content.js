export const prototype = {
  mobile: 'https://www.figma.com/proto/wLkCtIKTRFJmxsnPiemdDa/Taharah?node-id=2-12&starting-point-node-id=2%3A12',
  cmsEn: 'https://www.figma.com/proto/aUD7mVBMfe6kC3UirfRKQ9/Taharah-CMS?node-id=8-777&starting-point-node-id=8%3A777',
  cmsUr: 'https://www.figma.com/proto/aUD7mVBMfe6kC3UirfRKQ9/Taharah-CMS?node-id=12-2991&starting-point-node-id=12%3A2991',
};

export const paths = [
  { title:['Children','بچے'], art:'welcome', copy:['Pictures and short questions help children learn one thing at a time.','بچے تصویروں اور چھوٹے سوالوں سے ایک وقت میں ایک بات سیکھیں گے۔'], example:['Look at the picture, then tell a grown-up what you remember.','تصویر دیکھیں، پھر کسی بڑے کو بتائیں کہ آپ کو کیا یاد ہے۔'] },
  { title:['Teens','ٹین ایجرز'], art:'teen-learning', copy:['Teens can read short lessons and try questions on their own.','ٹین ایجرز چھوٹے سبق خود پڑھ سکتے ہیں اور سوال حل کر سکتے ہیں۔'], example:['Look at the steps and say what comes next.','قدم دیکھیں اور بتائیں کہ اگلا قدم کیا ہے۔'] },
  { title:['Adults','بڑے'], art:'adult-learning', copy:['Get a clear answer first. Read about special cases and see more references if you need them.','پہلے سیدھا جواب پڑھیں۔ ضرورت ہو تو خاص صورتوں کی تفصیل اور مزید حوالے بھی دیکھیں۔'], example:['Read the Wudu guide and open the references from the original notes.','وضو کا طریقہ پڑھیں اور اصل لکھائی کے حوالے کھولیں۔'] },
  { title:['Parents and guardians','والدین اور سرپرست'], art:'parent-guidance', copy:['Parents can use the app to teach at home and find simple ways to talk about sensitive topics.','والدین گھر پر بچوں کے ساتھ سبق پڑھ سکتے ہیں اور نازک باتیں سمجھانے کا آسان طریقہ دیکھ سکتے ہیں۔'], example:['Read a short part together and ask your child to explain it in their own words.','تھوڑا سا سبق ساتھ پڑھیں، پھر بچے سے کہیں کہ اپنے لفظوں میں سمجھائے۔'] },
];

export const learning = [
  {title:['Choose how to learn','اپنے لیے سبق چنیں'], copy:['Pick the lessons that suit you.','بچوں، ٹین ایجرز، بڑوں یا والدین میں سے اپنا گروپ چنیں۔'], screens:['welcome','urdu']},
  {title:['Try the first lesson','پہلا سبق دیکھیں'], copy:['There are five short steps. Use Back and Next to move between them.','سبق کے پانچ چھوٹے حصے ہیں۔ بٹن سے پچھلے یا اگلے حصے پر جائیں۔'], screens:['step','stepUr']},
  {title:['Change the language','زبان بدلیں'], copy:['You’ll stay on the same step when you switch languages.','زبان بدلنے پر یہی حصہ کھلا رہے گا۔'], screens:['step','stepUr']},
  {title:['Open a reference','حوالہ دیکھیں'], copy:['See where the reference comes from and whether it has been checked.','دیکھیں حوالہ کہاں سے لیا گیا ہے اور چیک ہوا ہے یا نہیں۔'], screens:['source','source']},
  {title:['Try a question','ایک سوال حل کریں'], copy:['See how you did, then go back to the lesson.','اپنا جواب چیک کریں اور پھر سبق پر واپس جائیں۔'], screens:['quiz','quiz']},
];

export const topics = [
  {en:'Qur’an and narrated sources', ur:'قرآن اور حدیث', outcome:['See where the lesson comes from and which words explain it.','دیکھیں سبق کا حوالہ کہاں سے ہے اور اس کی آسان وضاحت کیا ہے۔'], format:['Reference cards','حوالے']},
  {en:'Practice categories', ur:'وضو کے کاموں کی قسمیں', outcome:['See how the original notes group different Wudu practices.','دیکھیں اصل لکھائی میں وضو کے کام کس طرح الگ الگ بتائے گئے ہیں۔'], format:['Short cards by group','ہر گروپ کے الگ کارڈ']},
  {en:'Guided Wudu method', ur:'وضو کا طریقہ', outcome:['Follow the steps, then try a question.','ایک ایک قدم دیکھیں، پھر ایک سوال حل کریں۔'], format:['Lesson and short quiz','سبق اور چھوٹا سوال']},
  {en:'Miswak and oral care', ur:'مسواک اور منہ کی صفائی', outcome:['Read the original references about Miswak and caring for your mouth.','مسواک اور منہ کی صفائی کے بارے میں اصل حوالے دیکھیں۔'], format:['Picture and reference','تصویر اور حوالہ']},
  {en:'Purification in everyday situations', ur:'روزمرہ زندگی میں طہارت', outcome:['Find a checked answer to a question that comes up in daily life.','روزمرہ زندگی کے کسی سوال کا چیک کیا ہوا جواب ڈھونڈیں۔'], format:['Example and common questions','مثال اور عام سوال']},
  {en:'Health and personal circumstances', ur:'صحت اور ذاتی حالات', outcome:['Find advice for personal and health questions once experts have checked it.','ماہرین کی جانچ کے بعد صحت اور ذاتی سوالوں کے جواب پڑھیں۔'], format:['Short topic introduction','موضوع کا مختصر تعارف'], sensitive:true},
  {en:'Common misconceptions and reflection', ur:'عام غلط فہمیاں اور سوال', outcome:['Read a common question and see what you remember.','ایک عام سوال پڑھیں اور دیکھیں کہ آپ کو کیا یاد ہے۔'], format:['Question and quick recap','سوال اور چھوٹی سی دہرائی']},
];

export const comparisons = [
  { pages:[1], title:['A short start','چھوٹا تعارف'], before:['Introduction and reference in the notes','اصل لکھائی کا تعارف اور حوالہ'], after:['Start with a short explanation and show the Qur’an reference on its own.','شروع میں آسان وضاحت دیں اور قرآن کا حوالہ الگ دکھائیں۔'] },
  { pages:[10,11,12], title:['Groups of Wudu practices','وضو کے کاموں کی قسمیں'], before:['Groups and notes as written','اصل لکھائی میں درج قسمیں اور نوٹس'], after:['Give each group its own card and let people open the reference if they want more detail.','ہر قسم کا الگ کارڈ بنائیں۔ مزید جاننا ہو تو حوالہ کھول لیں۔'] },
  { pages:[13,14,15,16], title:['How to do Wudu','وضو کرنے کا طریقہ'], before:['Steps spread across several pages','طریقہ کئی صفحوں پر لکھا ہے'], after:['Show each step with a picture and ask a question at the end.','ہر قدم تصویر سے سمجھائیں اور آخر میں ایک سوال پوچھیں۔'] },
  { pages:[19,20,21,22], title:['Everyday examples','روزمرہ کی مثالیں'], before:['Questions and examples in the notes','اصل لکھائی کے سوال اور مثالیں'], after:['Turn them into short questions and answers for each age. Add the references once they’ve been checked.','ہر عمر کے لیے چھوٹے سوال اور جواب بنائیں۔ حوالے چیک ہونے کے بعد لگا دیں۔'] },
];

export const studio = [
  {title:['Dashboard','ڈیش بورڈ'], copy:['See the original pages, draft lessons, and lessons waiting for review.','اصل صفحے، ادھورے سبق اور چیک ہونے والے سبق دیکھیں۔'], screens:['dash','teaser-parent-urdu']},
  {title:['Add a common question','ایک عام سوال لگائیں'], copy:['Open a draft lesson and add a question and answer you can also use in other lessons.','سبق کھولیں اور ایسا سوال جواب شامل کریں جو دوسرے سبق میں بھی لگا سکیں۔'], screens:['added','urduCms']},
  {title:['Arrange parts and add references','ترتیب اور حوالے'], copy:['Move the lesson parts around and check which references have been reviewed.','سبق کے حصے آگے پیچھے کریں اور دیکھیں کون سے حوالے چیک ہو گئے ہیں۔'], screens:['reorder','reorder']},
  {title:['See what each group gets','دیکھیں کس کو کیا دکھے گا'], copy:['Check who can open the lesson and which parts each group sees.','دیکھیں سبق کون کھول سکتا ہے اور اسے کون سے حصے دکھیں گے۔'], screens:['parentCms','parentCms']},
  {title:['Send for review','چیک کرنے کے لیے بھیجیں'], copy:['The reviewer can ask for changes. The lesson goes live after all required checks.','چیک کرنے والا تبدیلی کہہ سکتا ہے۔ ساری ضروری جانچ کے بعد ہی سبق ایپ میں آئے گا۔'], screens:['review','review']},
];

export const roles = [
  [['Lesson writer','سبق لکھنے والا'],['Set the goal, write the lesson and quiz feedback, and prepare pictures, videos, captions, and scripts. Add the references and choose who sees each part before sending it for review.','طے کریں کہ سبق سے کیا سیکھنا ہے۔ سبق، سوال اور جواب لکھیں۔ تصویر، ویڈیو اور اس کا متن تیار کریں۔ پھر حوالے لگائیں اور طے کریں کون سا حصہ کس کو دکھے گا۔']],
  [['Language and lesson reviewer','زبان اور سبق چیک کرنے والا'],['Check that each group can read and use the lesson easily in both languages. Check the layout and ask for changes where needed.','دیکھیں کہ اردو اور انگریزی دونوں میں سبق پڑھنا اور استعمال کرنا آسان ہے۔ ہر گروپ کے لیے سبق کھول کر دیکھیں اور جہاں ضرورت ہو تبدیلی بتائیں۔']],
  [['Religious scholar','دینی عالم'],['Check the religious points, Qur’an and Hadith references, translations, explanations, and demonstrations. Ask a health expert to check health topics where needed.','دینی باتیں، قرآن و حدیث کے حوالے، ترجمہ، وضاحت اور دکھایا گیا طریقہ چیک کریں۔ صحت کی بات ہو تو ضرورت پر اس کے ماہر سے بھی پوچھیں۔']],
  [['Person who publishes lessons','سبق ایپ میں ڈالنے والا'],['Check that all approvals are in, then publish the lesson. Send later changes for review again.','دیکھیں کہ سب کی منظوری آ گئی ہے، پھر سبق ایپ میں ڈالیں۔ بعد کی تبدیلی دوبارہ چیک کرنے کے لیے بھیجیں۔']],
];

export const priorities = [
  {
    title: ['Must be ready for launch','پہلے ورژن میں لازمی'],
    items: [
      ['Home and topics','Start from the home screen and browse by topic.','مرکزی صفحہ اور موضوعات','مرکزی صفحے سے موضوع چنیں اور سبق کھولیں۔'],
      ['One complete Wudu lesson','Learn the steps with pictures and try a short question. Add other topics we agree on.','وضو کا پورا سبق','تصویروں سے ایک ایک قدم سیکھیں اور آخر میں ایک چھوٹا سوال حل کریں۔ باقی موضوع مل کر طے کریں گے۔'],
      ['Lessons for each group','Show the right level of detail for children, teens, adults, and parents.','ہر گروپ کے لیے سبق','بچوں، ٹین ایجرز، بڑوں اور والدین کو ان کی ضرورت کے مطابق سبق دکھائیں۔'],
      ['Checked Qur’an and Hadith references','Show references after a qualified religious scholar checks them.','قرآن اور حدیث کے حوالے','دینی عالم کے چیک کرنے کے بعد ہی حوالے سبق میں دکھائیں۔'],
      ['Read without internet','Open approved lessons already saved on the phone.','انٹرنیٹ کے بغیر سبق','فون پر پہلے سے محفوظ، منظور شدہ سبق انٹرنیٹ کے بغیر کھولیں۔'],
      ['Lesson tools for the team','Write, preview, check, approve, and publish lessons. Approved updates can reach the app when it connects to the internet.','ٹیم کے لیے سبق بنانے کی جگہ','سبق لکھیں، دیکھیں، چیک کریں اور منظوری کے بعد ایپ میں ڈالیں۔ انٹرنیٹ ملنے پر نیا سبق ایپ میں آ سکتا ہے۔'],
      ['No ads or learner account','Open and read lessons without signing in or seeing ads.','اشتہار اور اکاؤنٹ کے بغیر سبق','اکاؤنٹ بنائے بغیر اور اشتہار دیکھے بغیر سبق پڑھیں۔'],
    ],
  },
  {
    title: ['High priority for launch','پہلے ورژن کے لیے اہم'],
    items: [
      ['Topic search','Find a lesson by searching for its topic.','موضوع کی تلاش','موضوع لکھ کر متعلقہ سبق ڈھونڈیں۔'],
      ['Saved lessons and progress','Save lessons and pick up where you stopped. Keep these on the phone at first.','سبق محفوظ کریں اور وہیں سے دوبارہ پڑھیں','سبق محفوظ کریں اور جہاں تک پڑھا تھا، وہیں سے شروع کریں۔ شروع میں یہ معلومات فون پر ہی رہیں گی۔'],
      ['Urdu and English lessons','Agree on which lessons can be ready and checked in both languages for launch.','اردو اور انگریزی میں سبق','مل کر طے کریں کہ پہلے ورژن تک کون سے سبق دونوں زبانوں میں تیار اور چیک ہو سکتے ہیں۔'],
    ],
  },
  {
    title: ['For selected lessons','صرف کچھ سبق کے لیے'],
    items: [
      ['Short animations','Use animation where it helps explain a step.','چھوٹی اینیمیشن','جہاں حرکت سے بات آسان ہو، وہاں چھوٹی اینیمیشن دکھائیں۔'],
      ['Wudu video for the app','Make it after a reviewer checks what it says and shows.','ایپ کے لیے وضو کی ویڈیو','ویڈیو بنانے سے پہلے اس کی باتیں اور دکھایا جانے والا طریقہ چیک کروائیں۔'],
    ],
  },
  {
    title: ['Ideas for later','بعد کے لیے'],
    items: [
      ['Audio lessons and prayer times','Consider these in the next phase.','آڈیو سبق اور نماز کے اوقات','ان پر اگلے مرحلے میں بات کریں گے۔'],
      ['Donations and AI answers','Consider donations later. Check how reliable AI answers are before adding them.','چندہ اور اے آئی کے جواب','چندہ بعد میں دیکھیں گے۔ اے آئی کے جواب شامل کرنے سے پہلے ان کی درستگی جانچیں گے۔'],
    ],
  },
];

export const decisions = [
  ['Agree on the first topics and which lessons need both languages.','طے کریں پہلے کون سے موضوع ہوں گے اور کون سے سبق دونوں زبانوں میں چاہییں۔'],
  ['Choose who writes the lessons and who checks the language and religious points.','طے کریں سبق کون لکھے گا اور زبان اور دینی باتیں کون چیک کرے گا۔'],
  ['Choose who can publish an approved lesson.','طے کریں منظور شدہ سبق ایپ میں کون ڈالے گا۔'],
  ['Agree on which original pages we can show for review.','طے کریں اصل لکھائی کے کون سے صفحے چیک کرنے کے لیے دکھا سکتے ہیں۔'],
];
