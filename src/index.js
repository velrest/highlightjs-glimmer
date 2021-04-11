import _glimmer from './glimmer.js';

export const glimmer = _glimmer;

export function setup(hljs) {
  registerLanguage(hljs);
  registerInjections(hljs);
}

export function registerLanguage(hljs) {
  hljs.registerLanguage('glimmer', _glimmer);
}

export function registerInjections(hljs) {
  registerJavaScriptInjections(hljs);
}

function registerJavaScriptInjections(hljs) {
  let js = hljs.getLanguage('javascript');

  if (!js) {
    console.warn(`JavaScript grammar not loaded`);

    return;
  }

  js = js.rawDefinition(hljs);

  let index = js.contains.findIndex((rule) => rule?.begin === 'css`');
  let css = js.contains[index];

  const HBS_TEMPLATE = hljs.inherit(css, { begin: /hbs`/ });

  HBS_TEMPLATE.starts.subLanguage = 'glimmer';

  js.contains.splice(index, 0, HBS_TEMPLATE);

  hljs.registerLanguage('javascript', () => js);
}
