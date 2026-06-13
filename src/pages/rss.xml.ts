import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export function GET(context: APIContext) {
  return rss({
    title: 'GameBeliever',
    description: 'Your Ultimate Gaming Guide Platform',
    site: context.site!,
    items: [],
    customData: '<language>zh-CN</language>',
  });
}
