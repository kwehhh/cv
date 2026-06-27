//
// CV - John Yagiz - Front-End Engineer
//
// A wise man once said we cannot predict the future,
// ...but we can invent it.
//
// Shall we invent the future together?
//
// Email me with #letsgo to grab my attention.
//
// (0RGSDOFCJftli;:.:. .  )
//  T""""""""""""""""""""T
//  |.;....,..........;..|
//  |;;:: .  .    .      |
//  l;;;:. :   .     ..  ;
//  `;;:::.: .    .     .'
//   l;;:. ..  .     .: ;
//   `;;::.. .    .  ; .'
//    l;;:: .  .    /  ;
//     \;;:. .   .,'  /
//      `\;:.. ..'  .'
//        `\;:.. ..'
//          \;:. /
//           l; f
//           `;f'
//            ||
//            ;l.
//           ;: l
//          / ;  \
//        ,/  :   `.
//      ./' . :     `.
//     /' ,'  :       \
//    f  /  . :        i
//   ,' ;  .  :        `.
//   f ;  .   :      .  i
//  .'    :   :       . `.
//  f ,  .    ;       :  i
//  |    :  ,/`.       : |
//  |    ;,/;:. `.     . |
//  |___,/;;:. . .`._____|
// (QB0ZDOLC7itz!;:.:. .  )
//  """"""""""""""""""""""
//
// Single-page About scroll, built with the @nurvus/spawn DOM helper.
// No build step — serve over HTTP so the ES module imports resolve.
//

import Spawn from './node_modules/@nurvus/spawn/index.js';

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const LINKS = {
  github: 'https://github.com/kwehhh',
  linkedin: 'https://www.linkedin.com/in/real-yagiz/',
};

// Evergreen, non-sensitive highlights (no employer metrics).
const STATS = [
  { to: 10, suffix: '+', label: 'Years crafting UI' },
  { to: 4, suffix: '', label: 'Design systems shipped' },
  { to: 100, suffix: '%', label: 'Accessibility-first' },
  { display: '\u221E', label: 'Moments of delight' },
];

// Skills radar (0–100). Varied for shape; Creativity is the lone max.
const RADAR = [
  { label: 'React', value: 90 },
  { label: 'TypeScript', value: 78 },
  { label: 'CSS & Motion', value: 95 },
  { label: 'Accessibility', value: 84 },
  { label: 'Design Systems', value: 88 },
  { label: 'Data Viz', value: 70 },
  { label: 'Performance', value: 80 },
  { label: 'Creativity', value: 100, max: true },
];

const SKILL_BARS = [
  { label: 'Creativity & easter eggs', value: 100, max: true },
  { label: 'CSS & animation', value: 98 },
  { label: 'React / TypeScript', value: 95 },
  { label: 'Design systems', value: 95 },
  { label: 'Accessibility (WCAG 2.1)', value: 92 },
];

const TECH = [
  'HTML', 'CSS (Sass/Less)', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Node.js',
  'D3.js', 'Backbone.js', 'jQuery', 'REST', 'GraphQL', 'Webpack', 'Vite', 'Jest',
  'Playwright', 'Storybook', 'ESLint', 'Figma', 'Git', 'CircleCI', 'Lighthouse',
  'WCAG 2.1', 'i18n',
];

const EXPERIENCE = [
  {
    when: '2014 — Present', where: 'Seattle, WA',
    role: 'Front-End Engineer', co: 'Nutanix',
    desc: 'Building enterprise design systems, accessible UI components, and data visualizations at scale.',
    tags: ['React', 'TypeScript', 'Design Systems', 'Accessibility', 'Data Viz'],
  },
  {
    when: '2010 — 2014', where: 'Foster City, CA',
    role: 'Email Content Developer', co: 'Acxiom',
    desc: 'Crafted responsive, personalized email and landing-page experiences for major brands.',
    tags: ['HTML/CSS', 'Responsive Email', 'Personalization'],
  },
];

const PROJECTS = [
  { name: 'warp-gate', desc: 'Rapidly deploy modern web apps. Just insert token here.', lang: 'JavaScript', langClass: 'js', url: 'https://github.com/kwehhh/warp-gate' },
  { name: 'Respawn', desc: 'Build it. Break it. Respawn. Shape it.', lang: 'JavaScript', langClass: 'js', url: 'https://github.com/kwehhh/Respawn' },
  { name: 'treasure-goblin', desc: 'Plenty of utilities to last days or even weeks!', lang: 'TypeScript', langClass: 'ts', url: 'https://github.com/kwehhh/treasure-goblin' },
  { name: 'nurvus-design-system', desc: 'The NURVUS Design System.', lang: 'JavaScript', langClass: 'js', url: 'https://github.com/kwehhh/nurvus-design-system' },
  { name: 'css-animation-factory', desc: 'A playground of reusable CSS animations.', lang: 'JavaScript', langClass: 'js', url: 'https://github.com/kwehhh/css-animation-factory' },
];

/* ------------------------------------------------------------------ */
/* Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

const ICON = {
  github: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-1.9c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
  folder: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></svg>',
  ext: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M9 7h8v8"/></svg>',
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

// Wrap a raw SVG string in a span so it survives Spawn's child handling.
const icon = (svg, cls = 'ico') => {
  const s = Spawn({ tag: 'span', className: cls });
  s.innerHTML = svg;
  return s;
};

const eyebrow = (text) => Spawn({ tag: 'p', className: 'section-eyebrow', children: text });
const title = (text) => Spawn({ tag: 'h2', className: 'section-title reveal', children: text });

const tagCloud = (tags) =>
  Spawn({
    className: 'tag-cloud',
    children: tags.map((t) => Spawn({ tag: 'span', className: 'tag', children: t })),
  });

/* ------------------------------------------------------------------ */
/* Radar chart (hand-rolled SVG)                                      */
/* ------------------------------------------------------------------ */

const buildRadar = (skills) => {
  // Wide viewBox leaves margin so edge labels never get clipped.
  const W = 440;
  const H = 360;
  const cx = W / 2;
  const cy = H / 2;
  const R = 112;
  const n = skills.length;
  const rings = [0.25, 0.5, 0.75, 1];

  const point = (value, i, radius = R) => {
    const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
    const r = radius * (value / 100);
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };

  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Skills radar chart">`;

  // grid rings
  rings.forEach((ring) => {
    const pts = skills.map((_, i) => point(100 * ring, i).map((v) => v.toFixed(1)).join(',')).join(' ');
    svg += `<polygon class="radar-grid-ring" points="${pts}" />`;
  });

  // axes + labels
  skills.forEach((s, i) => {
    const [ex, ey] = point(100, i);
    svg += `<line class="radar-axis-line" x1="${cx}" y1="${cy}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}" />`;
    const [lx, ly] = point(118, i);
    const dx = lx - cx;
    const anchor = Math.abs(dx) < 2 ? 'middle' : dx > 0 ? 'start' : 'end';
    const dy = ly < cy - 2 ? -6 : ly > cy + 2 ? 14 : 4;
    svg += `<text class="radar-label${s.max ? ' max' : ''}" x="${lx.toFixed(1)}" y="${(ly + dy).toFixed(1)}" text-anchor="${anchor}">${s.label}${s.max ? ' \u2605' : ''}</text>`;
  });

  // data polygon
  const dataPts = skills.map((s, i) => point(s.value, i).map((v) => v.toFixed(1)).join(',')).join(' ');
  svg += `<polygon class="radar-shape" points="${dataPts}" />`;

  // vertex dots
  skills.forEach((s, i) => {
    const [px, py] = point(s.value, i);
    svg += `<circle class="radar-dot${s.max ? ' max' : ''}" cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${s.max ? 5 : 3.5}" />`;
  });

  svg += `</svg>`;

  const wrap = Spawn({ className: 'card radar-card reveal' });
  wrap.innerHTML = svg;
  return wrap;
};

/* ------------------------------------------------------------------ */
/* Sections                                                           */
/* ------------------------------------------------------------------ */

const buildHero = () =>
  Spawn({
    tag: 'header',
    className: 'hero',
    children: [
      Spawn({ tag: 'img', className: 'hero-avatar reveal', src: 'avatar.png', alt: 'John Yagiz' }),
      Spawn({ tag: 'h1', className: 'hero-name reveal d1', children: 'John Yagiz' }),
      Spawn({ tag: 'p', className: 'hero-role reveal d1', children: 'Senior Front-End Engineer · Design Systems & UI Platform' }),
      Spawn({
        tag: 'p', className: 'hero-pitch reveal d2',
        children: 'I build accessible, pixel-perfect interfaces where thoughtful design meets clean, scalable code \u2014 driven by a passion for delightful, memorable user experiences.',
      }),
      Spawn({ tag: 'p', className: 'hero-meta reveal d2', children: 'Seattle, WA · 10+ years crafting UI' }),
      Spawn({
        className: 'hero-actions reveal d3',
        children: [
          Spawn({ tag: 'a', className: 'btn btn-primary', href: LINKS.github, target: '_blank', rel: 'noopener', children: [icon(ICON.github), 'GitHub'] }),
          Spawn({ tag: 'a', className: 'btn', href: LINKS.linkedin, target: '_blank', rel: 'noopener', children: [icon(ICON.linkedin), 'LinkedIn'] }),
        ],
      }),
      Spawn({ tag: 'p', className: 'scroll-cue', children: 'scroll to explore' }),
    ],
  });

const buildAbout = () =>
  Spawn({
    tag: 'section', className: 'section',
    children: [
      eyebrow('About'),
      title('A little about me'),
      Spawn({
        className: 'about-grid',
        children: [
          Spawn({
            className: 'card about-text reveal',
            children: [
              Spawn({ tag: 'p', children: [Spawn({ tag: 'span', className: 'about-wave', children: 'Hi, I\u2019m John ' }), '\uD83D\uDC4B \u2014 a Seattle-based front-end engineer who\u2019s spent the last decade making design systems that other engineers genuinely enjoy using.'] }),
              Spawn({ tag: 'p', children: [ 'I live at the intersection of ', Spawn({ tag: 'strong', children: 'design and engineering' }), ': buttery animations, pixel-perfect UI, and accessibility that works for everyone.' ] }),
              Spawn({ tag: 'p', children: [ 'Over the years I\u2019ve built secret 404 pages, hidden mini-games, and other subtle yet exciting touches into enterprise software. Bringing ', Spawn({ tag: 'strong', children: 'delight' }), ' to users is my passion \u2014 I\u2019m always chasing the ultimate user experience. Let\u2019s build something delightful together.' ] }),
            ],
          }),
          Spawn({
            className: 'card about-aside reveal d1',
            children: [
              { dot: true, html: ['Employment ', ['b', 'Front-End Engineer @ Nutanix']] },
              { html: [['b', '10+ years'], ' on the design-system & UI-platform frontier'] },
              { html: [['b', 'WCAG 2.1'], ' accessibility advocate'] },
              { html: ['D3 ', ['b', 'data-viz'], ' & custom virtualization nerd'] },
              { html: ['Easter-egg enthusiast \uD83E\uDD5A'] },
            ].map((f) =>
              Spawn({
                className: 'fact',
                children: [
                  Spawn({ className: 'dot' }),
                  Spawn({ tag: 'span', className: 'label', children: f.html.map((part) => Array.isArray(part) ? Spawn({ tag: part[0], children: part[1] }) : part) }),
                ],
              }),
            ),
          }),
        ],
      }),
    ],
  });

const buildStats = () =>
  Spawn({
    tag: 'section', className: 'section',
    children: [
      Spawn({
        className: 'stats',
        children: STATS.map((s, i) =>
          Spawn({
            className: `card stat reveal d${i % 3}`,
            children: [
              Spawn({
                tag: 'div', className: 'stat-num',
                children: s.display
                  ? [Spawn({ tag: 'span', children: s.display })]
                  : [
                      Spawn({ tag: 'span', class: 'count', 'data-to': String(s.to), children: '0' }),
                      Spawn({ tag: 'span', className: 'suffix', children: s.suffix }),
                    ],
              }),
              Spawn({ tag: 'div', className: 'stat-label', children: s.label }),
            ],
          }),
        ),
      }),
    ],
  });

const buildSkills = () =>
  Spawn({
    tag: 'section', className: 'section',
    children: [
      eyebrow('Capabilities'),
      title('Skills & strengths'),
      Spawn({
        className: 'skills-grid',
        children: [
          buildRadar(RADAR),
          Spawn({
            className: 'card skill-bars reveal d1',
            children: [
              Spawn({ tag: 'p', className: 'fact', style: { marginBottom: '6px' }, children: [Spawn({ tag: 'span', className: 'label', children: 'A decade of front-end craft \u2014 with creativity pegged at the max.' })] }),
              ...SKILL_BARS.map((b) =>
                Spawn({
                  className: `skill-bar${b.max ? ' max' : ''}`,
                  style: { '--w': `${b.value}%` },
                  children: [
                    Spawn({ className: 'row', children: [Spawn({ tag: 'span', children: b.label }), Spawn({ tag: 'span', className: 'pct', children: `${b.value}%` })] }),
                    Spawn({ className: 'track', children: [Spawn({ className: 'fill', style: { '--w': `${b.value}%` } })] }),
                  ],
                }),
              ),
            ],
          }),
        ],
      }),
      Spawn({ className: 'reveal', children: [tagCloud(TECH)] }),
    ],
  });

const buildExperience = () =>
  Spawn({
    tag: 'section', className: 'section',
    children: [
      eyebrow('Career'),
      title('Where I\u2019ve worked'),
      Spawn({
        className: 'timeline',
        children: EXPERIENCE.map((x, i) =>
          Spawn({
            className: `card xp reveal${i % 2 ? ' d1' : ''}`,
            children: [
              Spawn({ className: 'xp-when', children: [x.when, Spawn({ tag: 'span', className: 'where', children: x.where })] }),
              Spawn({
                children: [
                  Spawn({ tag: 'h3', className: 'xp-role', children: x.role }),
                  Spawn({ tag: 'span', className: 'xp-co', children: x.co }),
                  Spawn({ tag: 'p', className: 'xp-desc', children: x.desc }),
                  tagCloud(x.tags),
                ],
              }),
            ],
          }),
        ),
      }),
    ],
  });

const buildProjects = () =>
  Spawn({
    tag: 'section', className: 'section',
    children: [
      eyebrow('Projects'),
      title('Things I\u2019ve been building'),
      Spawn({
        className: 'projects',
        children: PROJECTS.map((p, i) =>
          Spawn({
            tag: 'a', className: `card project reveal d${i % 3}`, href: p.url, target: '_blank', rel: 'noopener',
            children: [
              Spawn({ className: 'project-top', children: [icon(ICON.folder, 'project-folder'), icon(ICON.ext, 'project-ext')] }),
              Spawn({ tag: 'h3', className: 'project-name', children: p.name }),
              Spawn({ tag: 'p', className: 'project-desc', children: p.desc }),
              Spawn({ className: 'project-lang', children: [Spawn({ className: `lang-dot ${p.langClass}` }), p.lang] }),
            ],
          }),
        ),
      }),
    ],
  });

const buildFooter = () =>
  Spawn({
    tag: 'footer', className: 'footer reveal',
    children: [
      eyebrow('Get in touch'),
      Spawn({ tag: 'h2', children: 'Let\u2019s build something delightful' }),
      Spawn({ tag: 'p', children: ['Recruiting or collaborating? Use ', Spawn({ tag: 'span', className: 'hashtag', children: '#itsforreal' }), ' in the subject line to grab my attention \u2014 I\u2019d love to hear what you\u2019re working on.'] }),
      Spawn({
        className: 'footer-actions',
        children: [
          Spawn({ tag: 'a', className: 'btn btn-primary', href: LINKS.github, target: '_blank', rel: 'noopener', children: [icon(ICON.github), 'GitHub'] }),
          Spawn({ tag: 'a', className: 'btn', href: LINKS.linkedin, target: '_blank', rel: 'noopener', children: [icon(ICON.linkedin), 'LinkedIn'] }),
        ],
      }),
      Spawn({ tag: 'br' }),
      Spawn({ tag: 'p', className: 'footer-note', children: '\u00A9 ' + new Date().getFullYear() + ' John Yagiz · Crafted with vanilla JS on a particle backdrop.' }),
    ],
  });

/* ------------------------------------------------------------------ */
/* Mount                                                              */
/* ------------------------------------------------------------------ */

const particlesEl = Spawn({ parentEl: document.body, className: 'particles' });

Spawn({
  parentEl: document.body,
  className: 'page',
  children: [
    buildHero(),
    buildAbout(),
    buildStats(),
    buildSkills(),
    buildExperience(),
    buildProjects(),
    buildFooter(),
  ],
});

/* ------------------------------------------------------------------ */
/* Particle background                                                */
/* ------------------------------------------------------------------ */

if (typeof window.particleground === 'function') {
  window.particleground(particlesEl, {
    dotColor: '#5cbdaa',
    lineColor: '#43a390',
    density: 12000,
    parallaxMultiplier: 7,
  });
}

/* ------------------------------------------------------------------ */
/* Animations: scroll reveal + count-up                               */
/* ------------------------------------------------------------------ */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animateCount = (el) => {
  const target = parseInt(el.getAttribute('data-to'), 10) || 0;
  if (reduceMotion) { el.textContent = target.toLocaleString(); return; }
  const duration = 1400;
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      entry.target.querySelectorAll('.count').forEach((c) => {
        if (!c.dataset.done) { c.dataset.done = '1'; animateCount(c); }
      });
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
