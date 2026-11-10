const URDU_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

export const num = (value, ur) => ur ? String(value).replace(/\d/g, d => URDU_DIGITS[d]) : String(value);
export const pad = (value, ur) => num(String(value).padStart(2, '0'), ur);
export const sitePath = path => (process.env.EXPO_BASE_URL || '') + '/' + path;
export const screen = name => sitePath('screens/' + name + '.png');
export const art = (name, width = 1200) => sitePath('art/taharah-' + name + '-paper-cut-' + width + '.webp');
export const artSet = name => art(name, 700) + ' 700w, ' + art(name, 1200) + ' 1200w';
